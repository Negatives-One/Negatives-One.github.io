// Procedural terrain lab — NDA-safe recreation, written from scratch for this page.
// Side-view tile world built in stages: surface → strata → caverns → Physarum tunnels → Perlin worms → BFS water → structure.
(() => {
const AIR = 0, GRASS = 1, DIRT = 2, CLAY = 3, STONE = 4, ORE = 5, WATER = 6, WALL = 7;
// [line colour, fill colour] per tile type — the grid look comes from the 1px line on top/left
const COL = [null, ['#35b03e', '#1f8a27'], ['#7a4122', '#5c2e18'], ['#eabb92', '#d59a6a'], ['#868c91', '#62686d'],
  ['#94512a', '#79391a'], ['#7eeef2', '#2fc7d0'], ['#f6dcb2', '#e4c08e']];
const BG = '#0b1a1a';

function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function makeNoise(r) {
  const p = new Uint8Array(512), g = [];
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 256; i++) { p[i + 256] = p[i]; const a = r() * Math.PI * 2; g.push([Math.cos(a), Math.sin(a)]); }
  const f = t => t * t * t * (t * (t * 6 - 15) + 10), dot = (h, x, y) => { const v = g[h & 255]; return v[0] * x + v[1] * y; };
  return (x, y) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255; x -= Math.floor(x); y -= Math.floor(y);
    const u = f(x), v = f(y), a = p[X] + Y, b = p[X + 1] + Y;
    const l1 = dot(p[a], x, y) + u * (dot(p[b], x - 1, y) - dot(p[a], x, y));
    const l2 = dot(p[a + 1], x, y - 1) + u * (dot(p[b + 1], x - 1, y - 1) - dot(p[a + 1], x, y - 1));
    return l1 + v * (l2 - l1);
  };
}
const fbm = (n, x, y, o = 4) => { let v = 0, a = 1, s = 0, f = 1; for (let i = 0; i < o; i++) { v += a * n(x * f, y * f); s += a; a *= .5; f *= 2; } return v / s; };

class Terrain {
  constructor(cv, { W = 160, H = 110, T = 6, speed = 1 } = {}) {
    Object.assign(this, { cv, W, H, T, speed });
    cv.width = W * T; cv.height = H * T;
    this.ctx = cv.getContext('2d');
    this.ov = document.createElement('canvas'); this.ov.width = W; this.ov.height = H;
    this.octx = this.ov.getContext('2d');
    this.stage = -1; this.it = null; this.listeners = [];
  }
  setT(T) { if (T === this.T) return; this.T = T; this.cv.width = this.W * T; this.cv.height = this.H * T; this.draw(); }
  on(fn) { this.listeners.push(fn); }
  emit(e) { this.listeners.forEach(f => f(e, this)); }
  reset(seed) {
    this.seed = seed; const r = this.r = rng(seed);
    this.n1 = makeNoise(r); this.n2 = makeNoise(r); this.n3 = makeNoise(r);
    this.g = new Uint8Array(this.W * this.H); this.h = new Int16Array(this.W);
    this.stage = -1; this.it = null; this.overlay = null; this.draw(); this.emit('reset');
  }
  idx(x, y) { return y * this.W + x; }
  in(x, y) { return x >= 0 && y >= 0 && x < this.W && y < this.H; }

  // ---------- stages (generators yield once per animation frame) ----------
  *surface() {
    const { W, H } = this;
    for (let x = 0; x < W; x++) this.h[x] = Math.round(H * .3 + fbm(this.n1, x / 38, .3, 4) * 16);
    for (let x = 0; x < W; x += 1) {
      for (let y = this.h[x]; y < H; y++) this.g[this.idx(x, y)] = STONE;
      this.overlay = c => { c.strokeStyle = '#7dcbff'; c.lineWidth = .6; c.beginPath(); for (let i = 0; i <= x; i++) c.lineTo(i + .5, this.h[i]); c.stroke(); };
      if (x % (3 * this.speed) === 0) yield;
    }
    this.overlay = null;
  }
  *strata() {
    const { W, H, h } = this, top = Math.min(...h);
    for (let y = top; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (y < h[x]) continue;
        const d = 5 + Math.round((fbm(this.n2, x / 20, 1.7) + .5) * 4);
        let t = y === h[x] ? GRASS : y <= h[x] + d ? DIRT : STONE;
        if (t === DIRT && fbm(this.n3, x / 9, y / 4) > .2) t = CLAY;
        if (t === STONE && fbm(this.n2, x / 10, y / 9) > .34) t = ORE;
        if (t === STONE && fbm(this.n3, x / 5, y / 5 + 40) > .44) t = CLAY;
        this.g[this.idx(x, y)] = t;
      }
      if (y % (3 * this.speed) === 0) yield;
    }
  }
  *caverns() {
    const { W, H, h } = this, field = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) field[this.idx(x, y)] = fbm(this.n3, x / 15, y / 10 + 9, 3) + (y - h[x]) / H * .12 + (y > H - 4 || x < 1 || x > W - 2 ? -1 : 0);
    const steps = Math.ceil(24 / this.speed);
    for (let s = 1; s <= steps; s++) {
      const thr = .6 - (.6 - .2) * (s / steps);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = this.idx(x, y);
        if (y > h[x] + 7 && field[i] > thr) this.g[i] = AIR;
      }
      yield;
    }
    for (let it = 0; it < 2; it++) {                       // cellular-automata smoothing → rounder caverns
      const src = this.g.slice();
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        if (y <= h[x] + 7) continue;
        let a = 0; for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) if ((ox || oy) && src[(y + oy) * W + x + ox] === AIR) a++;
        const i = this.idx(x, y);
        if (a >= 5) this.g[i] = AIR; else if (a <= 2 && src[i] === AIR) this.g[i] = STONE;
      }
      yield;
    }
  }
  *physarum() {
    const { W, H, h, r } = this, trail = new Float32Array(W * H), tmp = new Float32Array(W * H);
    const ok = (x, y) => x >= 2 && x < W - 2 && y < H - 3 && y > h[Math.max(0, Math.min(W - 1, x | 0))] + 6;
    const air = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (this.g[this.idx(x, y)] === AIR && ok(x, y)) air.push([x, y]);
    const N = 420, agents = [];
    for (let k = 0; k < N; k++) { const c = air.length ? air[Math.floor(r() * air.length)] : [W / 2, H * .7]; agents.push({ x: c[0] + .5, y: c[1] + .5, a: r() * Math.PI * 2 }); }
    const SA = .55, SD = 4, TURN = .4;
    const sense = (ag, off) => { const x = Math.round(ag.x + Math.cos(ag.a + off) * SD), y = Math.round(ag.y + Math.sin(ag.a + off) * SD); return this.in(x, y) && ok(x, y) ? trail[this.idx(x, y)] : -1; };
    const STEPS = 150;
    for (let s = 0; s < STEPS; s++) {
      for (const ag of agents) {
        const l = sense(ag, -SA), f = sense(ag, 0), rr = sense(ag, SA);
        if (f < l || f < rr) ag.a += (l > rr ? -1 : 1) * TURN; else ag.a += (r() - .5) * .2;
        const nx = ag.x + Math.cos(ag.a), ny = ag.y + Math.sin(ag.a);
        if (ok(nx, ny)) { ag.x = nx; ag.y = ny; trail[this.idx(nx | 0, ny | 0)] += 1; } else ag.a += Math.PI * (.5 + r());
      }
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        let v = 0; for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) v += trail[(y + oy) * W + x + ox];
        tmp[y * W + x] = v / 9 * .92;
      }
      trail.set(tmp);
      if (s % (12 * this.speed) === 0) yield;
    }
    // carve the strongest ~4% of underground trail cells
    const vals = []; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (ok(x, y) && trail[this.idx(x, y)] > 0) vals.push(trail[this.idx(x, y)]);
    vals.sort((a, b) => a - b);
    const cut = vals.length ? vals[Math.floor(vals.length * .93)] : 1e9;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = this.idx(x, y); if (ok(x, y) && trail[i] >= cut) this.g[i] = AIR; }
    yield;
    this.overlay = null;
  }
  trailOverlay(trail, agents, fade = 1) {
    const { W, H } = this, img = this.octx.createImageData(W, H), d = img.data;
    let mx = 0; for (const v of trail) if (v > mx) mx = v;
    for (let i = 0; i < W * H; i++) { const v = Math.min(1, trail[i] / (mx * .35 || 1)); d[i * 4] = 125; d[i * 4 + 1] = 230; d[i * 4 + 2] = 255; d[i * 4 + 3] = v * 220 * fade; }
    return c => {
      this.octx.putImageData(img, 0, 0); c.imageSmoothingEnabled = true; c.drawImage(this.ov, 0, 0);
      if (agents) { c.fillStyle = '#eaffff'; for (const a of agents) c.fillRect(a.x - .25, a.y - .25, .5, .5); }
    };
  }
  *worms() {
    const { W, H, h, r } = this, count = 3, heads = [];
    for (let w = 0; w < count; w++) {
      const x0 = Math.floor(W * (.12 + .76 * (w + r() * .6) / count));
      heads.push({ x: x0, y: h[x0] - 1, a: Math.PI / 2 + (r() - .5) * .8, len: 55 + Math.floor(r() * 35), rad: 1.3 + r() * .7, t: 0, id: w * 13.7 });
    }
    const carve = (cx, cy, rad) => {
      for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++)
        if (this.in(x, y) && y < H - 2 && (x - cx) ** 2 + (y - cy) ** 2 <= rad * rad) this.g[this.idx(x, y)] = AIR;
    };
    let alive = true;
    while (alive) {
      alive = false;
      for (let k = 0; k < 2 * this.speed; k++) for (const wm of heads) {
        if (wm.t >= wm.len || wm.y > H - 4) continue;
        alive = true;
        wm.a += this.n2(wm.t * .08, wm.id) * .55;
        wm.a += (Math.PI / 2 - wm.a) * .035;
        wm.x = Math.max(2, Math.min(W - 3, wm.x + Math.cos(wm.a)));
        wm.y += Math.sin(wm.a);
        carve(wm.x, wm.y, wm.rad); wm.t++;
      }
      this.overlay = c => { for (const wm of heads) { if (wm.t >= wm.len) continue; c.fillStyle = 'rgba(255,220,120,.9)'; c.beginPath(); c.arc(wm.x, wm.y, wm.rad + .6, 0, 7); c.fill(); } };
      yield;
    }
    this.overlay = null;
  }
  *water() {
    const { W, H, h, r } = this, label = new Int32Array(W * H).fill(-1), order = [], comps = [];
    const under = (x, y) => y > h[x] + 2;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const s = this.idx(x, y);
      if (this.g[s] !== AIR || label[s] >= 0 || !under(x, y)) continue;
      const id = comps.length, cells = [], q = [s]; label[s] = id; let qi = 0;
      while (qi < q.length) {                                  // breadth-first flood fill
        const c = q[qi++], cx = c % W, cy = (c / W) | 0; cells.push(c); order.push(c);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy; if (!this.in(nx, ny)) continue;
          const n = this.idx(nx, ny);
          if (this.g[n] === AIR && label[n] < 0 && under(nx, ny)) { label[n] = id; q.push(n); }
        }
      }
      comps.push(cells);
    }
    // animate the BFS visiting order
    const per = Math.max(80, Math.ceil(order.length / 60)) * this.speed;
    for (let k = 0; k < order.length; k += per) {
      const upto = k + per;
      this.overlay = c => {
        const img = this.octx.createImageData(W, H), d = img.data;
        for (let i = 0; i < Math.min(upto, order.length); i++) { const p = order[i] * 4, hue = label[order[i]] % 2; d[p] = 120; d[p + 1] = hue ? 200 : 255; d[p + 2] = 255; d[p + 3] = i > upto - per ? 230 : 70; }
        this.octx.putImageData(img, 0, 0); c.imageSmoothingEnabled = false; c.drawImage(this.ov, 0, 0);
      };
      yield;
    }
    this.overlay = null;
    // each pocket fills from its lowest row
    const plans = comps.filter(c => c.length > 20).map(cells => {
      let maxY = 0; for (const c of cells) maxY = Math.max(maxY, (c / W) | 0);
      return { cells, maxY, level: maxY - (1 + Math.floor(r() * 3)) };
    });
    for (let lift = 0; lift <= 3; lift++) {
      for (const p of plans) for (const c of p.cells) { const y = (c / W) | 0; if (y >= p.maxY - lift && y >= p.level) this.g[c] = WATER; }
      yield; yield;
    }
  }
  *structure() {
    const { W, h } = this, TW = 11;
    let best = W / 2 | 0, bestScore = 1e9;
    for (let x = Math.floor(W * .28); x < W * .72 - TW; x++) {
      let s = 0; for (let k = 0; k < TW + 8; k++) s += Math.abs(h[x + k] - h[x]); if (s < bestScore) { bestScore = s; best = x; }
    }
    const x0 = best + 4, base = h[best + 4 + (TW >> 1)];
    const set = (x, y, t) => { if (this.in(x, y)) this.g[this.idx(x, y)] = t; };
    // level the plot: fill dips with dirt, clear bumps
    for (let x = best; x < best + TW + 8; x++) {
      for (let y = base + 1; y <= h[x]; y++) set(x, y, DIRT);
      for (let y = Math.min(h[x], base) - 1; y >= base - 30; y--) set(x, y, AIR);
      set(x, base, WALL); h[x] = base;
    }
    yield;
    const room = (rx, ry, rw, rh, furn, lid) => {          // walls + floor (+ optional ceiling), dark interior
      for (let y = ry; y < ry + rh; y++) for (let x = rx; x < rx + rw; x++) set(x, y, (x === rx || x === rx + rw - 1 || y === ry + rh - 1 || (lid && y === ry)) ? WALL : AIR);
      if (furn) for (let x = rx + 3; x < rx + 3 + furn; x++) set(x, ry + rh - 3, WALL);
    };
    room(x0, base + 1, TW, 7, 3); yield; yield;                    // basement
    for (let f = 0; f < 4; f++) {                                  // floors, bottom-up
      room(x0, base - 6 * (f + 1) + 1, TW, 7, f % 2 ? 4 : 2);
      if (f === 1) { for (let x = x0 + TW; x < x0 + TW + 7; x++) set(x, base - 6 * (f + 1) + 3, WALL); room(x0 + TW + 3, base - 6 * (f + 1) - 2, 6, 6, 0, 1); }
      if (f === 2) { for (let x = x0 - 8; x < x0; x++) set(x, base - 6 * (f + 1) + 5, WALL); room(x0 - 9, base - 6 * (f + 1), 7, 6, 0, 1); }
      yield; yield; yield;
    }
    const roofY = base - 24;                                       // roof
    for (let y = roofY - 3; y <= roofY; y++) for (let x = x0 - 3 + (roofY - y); x < x0 + TW + 3 - (roofY - y); x++) set(x, y, WALL);
    for (let x = x0 - 3; x < x0 + TW + 3; x += 2) set(x, roofY + 1, WALL);
    yield;
  }

  get stages() { return [this.surface, this.strata, this.caverns, this.physarum, this.worms, this.water, this.structure]; }
  startStage(k) { this.stage = k; this.it = this.stages[k].call(this); this.emit('stage'); }
  tick() { // advance one frame; returns false when the current stage finished
    if (!this.it) return false;
    const r = this.it.next(); this.draw();
    if (r.done) { this.it = null; this.emit('done'); return false; }
    return true;
  }
  runInstant(k) { // complete stages up to k without animation
    while (this.stage < k) { if (!this.it) this.startStage(this.stage + 1); while (this.it) { const r = this.it.next(); if (r.done) this.it = null; } }
    this.overlay = null; this.draw(); this.emit('done');
  }

  draw() {
    const { ctx, W, H, T, g } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const sky = ctx.createLinearGradient(0, 0, 0, H * T * .45); sky.addColorStop(0, '#08141a'); sky.addColorStop(1, '#10262b');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W * T, H * T * .45); ctx.fillStyle = BG; ctx.fillRect(0, H * T * .45, W * T, H * T * .55);
    for (let t = 1; t < COL.length; t++) {
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = COL[t][pass]; ctx.beginPath();
        for (let i = 0; i < W * H; i++) if (g[i] === t) { const x = (i % W) * T, y = ((i / W) | 0) * T; pass ? ctx.rect(x + 1, y + 1, T - 1, T - 1) : ctx.rect(x, y, T, T); }
        ctx.fill();
      }
    }
    if (this.overlay) { ctx.save(); ctx.scale(T, T); this.overlay(ctx); ctx.restore(); }
  }
}

// ---------- page wiring ----------
const STAGES = [
  ['Surface', 'The ground line comes from 1D Perlin noise, layered at a few scales so it gets big hills and small bumps.',
`for (int x = 0; x < W; x++)
    height[x] = baseY + (int)(Fbm(noise, x / 38f, octaves: 4) * 16);`],
  ['Strata', 'Grass, dirt and stone follow the ground line. Clay and ore patches come from 2D noise.',
`int dirtDepth = 5 + (int)((Fbm(n2, x / 20f) + .5f) * 4);
Tile t = y == height[x] ? Grass : y <= height[x] + dirtDepth ? Dirt : Stone;
if (t == Stone && Fbm(n2, x / 6f, y / 6f) > .36f) t = Ore;`],
  ['Caverns', 'Caves are the spots where a 2D noise value passes a threshold. A smoothing pass rounds them off.',
`float c = Fbm(n3, x / 16f, y / 11f, octaves: 3);
if (y > height[x] + 7 && c > threshold) grid[x, y] = Tile.Air;`],
  ['Physarum tunnels', 'Hundreds of agents move like slime mould, following each other\u2019s trails. The busiest paths become tunnels.',
`float l = Sense(a.Angle - SA), f = Sense(a.Angle), r = Sense(a.Angle + SA);
if (f < l || f < r) a.Angle += (l > r ? -1 : 1) * TurnSpeed;
a.Position += Dir(a.Angle);
trail[a.Cell] += Deposit;
trail = Blur3x3(trail) * Decay;`],
  ['Perlin worms', 'A few worms start at the surface and dig down, turning based on noise. They make the cave entrances.',
`angle += noise.Sample(step * .08f, wormId) * .55f;
angle = Mathf.Lerp(angle, Down, .035f);   // bias downwards
pos += new Vector2(Mathf.Cos(angle), Mathf.Sin(angle));
CarveCircle(pos, radius);`],
  ['Water (BFS)', 'A breadth-first search finds each separate underground pocket, then water fills it from the bottom.',
`var queue = new Queue<int>(); queue.Enqueue(start); label[start] = id;
while (queue.Count > 0) {
    int c = queue.Dequeue(); pocket.Add(c);
    foreach (int n in Neighbours4(c))
        if (IsAir(n) && label[n] < 0) { label[n] = id; queue.Enqueue(n); }
}`],
  ['Structure', 'It looks for the flattest stretch of ground, levels it and places a tower with a basement.',
`int best = MinBy(range, x => Sum(k => Math.Abs(height[x + k] - height[x])));
Level(best, width);                 // fill dips, clear bumps
StampRooms(best, floors: 4, basement: 1);`]
];

const tr = s => (window.tr ? window.tr(s) : s);
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Big lab
const labCv = document.getElementById('lab-canvas');
if (labCv) {
  const lab = new Terrain(labCv, { T: 6 });
  const list = document.getElementById('lab-stages'), desc = document.getElementById('lab-desc'), code = document.getElementById('lab-code'), ttl = document.getElementById('lab-title'), tag = document.getElementById('lab-tag');
  const seedEl = document.getElementById('lab-seed'), playBtn = document.getElementById('lab-play');
  const renderList = () => { list.innerHTML = STAGES.map((s, i) => `<li><button type="button" data-k="${i}">${esc(tr(s[0]))}</button></li>`).join(''); };
  renderList();
  let playing = false, raf = 0, wait = 0;
  const show = k => {
    list.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === k));
    const s = STAGES[Math.max(0, k)];
    if (ttl) ttl.textContent = tr(k < 0 ? 'Terrain generation' : s[0]);
    if (tag) { tag.textContent = k < 0 ? '' : `${k + 1}/${STAGES.length}  ${tr(s[0])}`; tag.hidden = k < 0; }
    desc.textContent = tr(k < 0 ? 'Press play or pick a step.' : s[1]);
    const src = k < 0 ? STAGES[0][2] : s[2];
    if (window.hlCode) code.innerHTML = window.hlCode(src); else code.textContent = src;
  };
  lab.on(e => { show(lab.stage); seedEl.textContent = tr('seed') + ' ' + lab.seed; });
  const loop = t => {
    raf = requestAnimationFrame(loop);
    if (!playing) return;
    if (lab.it) { lab.tick(); return; }
    if (lab.stage >= STAGES.length - 1) { playing = false; playBtn.textContent = tr('▶ Play'); return; }
    if (!wait) wait = t + 450; if (t < wait) return; wait = 0;
    lab.startStage(lab.stage + 1);
  };
  const play = () => { if (lab.stage >= STAGES.length - 1 && !lab.it) lab.reset(lab.seed); playing = true; playBtn.textContent = tr('❚❚ Pause'); };
  playBtn.addEventListener('click', () => { if (playing) { playing = false; playBtn.textContent = tr('▶ Play'); } else play(); });
  const stepBtn = document.getElementById('lab-step');
  if (stepBtn) stepBtn.addEventListener('click', () => { playing = false; playBtn.textContent = tr('▶ Play'); if (lab.it) { while (lab.it) lab.tick(); } else if (lab.stage < STAGES.length - 1) { lab.startStage(lab.stage + 1); while (lab.it) lab.tick(); } });
  document.getElementById('lab-new').addEventListener('click', () => { lab.reset(Math.floor(Math.random() * 99999)); reduce ? lab.runInstant(STAGES.length - 1) : play(); });
  list.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; const k = +b.dataset.k;
    playing = false; playBtn.textContent = tr('▶ Play');
    if (k <= lab.stage) lab.reset(lab.seed);
    if (k > 0) lab.runInstant(k - 1);
    lab.startStage(k); playing = !reduce; if (reduce) { while (lab.it) lab.tick(); } else playBtn.textContent = tr('❚❚ Pause');
    // stop after this stage
    const stopAt = k; const chk = () => { if (lab.stage === stopAt && !lab.it) { playing = false; playBtn.textContent = tr('▶ Play'); } else requestAnimationFrame(chk); }; chk();
  });
  const fit = () => { const t = Math.max(3, Math.round(labCv.clientWidth * (window.devicePixelRatio || 1) / lab.W)); lab.setT(t); };
  const labRO = new ResizeObserver(fit); labRO.observe(labCv);
  addEventListener('langchange', () => { renderList(); show(lab.stage); seedEl.textContent = tr('seed') + ' ' + lab.seed; playBtn.textContent = tr(playing ? '❚❚ Pause' : '▶ Play'); });
  lab.reset(Number(new URLSearchParams(location.search).get('seed')) || 4242);
  // autostart when the lab scrolls into view
  let started = false;
  new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && !started) { started = true; reduce ? lab.runInstant(STAGES.length - 1) : play(); } }), { threshold: .35 }).observe(labCv);
  raf = requestAnimationFrame(loop);
  window.__lab = lab;
}

// Compact looping preview on the project card
const cardCv = document.getElementById('terrain');
if (cardCv) {
  const mini = new Terrain(cardCv, { T: 4, speed: 2 });
  const miniRO = new ResizeObserver(() => mini.setT(Math.max(2, Math.round(cardCv.clientWidth * (window.devicePixelRatio || 1) / mini.W)))); miniRO.observe(cardCv);
  const seedEl = document.getElementById('seed');
  mini.on(() => { if (seedEl) seedEl.textContent = tr('seed') + ' ' + mini.seed + (mini.stage >= 0 ? ' · ' + tr(STAGES[mini.stage][0]).toLowerCase() : ''); });
  let visible = false, hold = 0;
  mini.reset(Math.floor(Math.random() * 99999));
  if (reduce) mini.runInstant(STAGES.length - 1);
  new IntersectionObserver(es => es.forEach(en => visible = en.isIntersecting), { threshold: .1 }).observe(cardCv);
  const loop = t => {
    requestAnimationFrame(loop);
    if (!visible || reduce) return;
    if (mini.it) { mini.tick(); return; }
    if (mini.stage < STAGES.length - 1) { mini.startStage(mini.stage + 1); return; }
    if (!hold) hold = t + 2600; if (t < hold) return; hold = 0;
    mini.reset(Math.floor(Math.random() * 99999));
  };
  requestAnimationFrame(loop);
}
})();
