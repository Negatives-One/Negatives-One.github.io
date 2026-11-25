// Tiled Physarum background for the hero: slime-mould agents follow the cursor; their trails light up grid tiles.
(() => {
const cv = document.getElementById('hero-bg');
if (!cv) return;
const hero = cv.parentElement, ctx = cv.getContext('2d');
const reduce = false;   // the hero always animates (owner's choice); reduced-motion handling kept below if needed
const TS = 14, SUB = 2;                       // tile size in CSS px, sim cells per tile side
const SA = .6, SD = 6, TURN = .6, SPEED = 1.4, DECAY = .92;
const LEVELS = 8;
const COLORS = Array.from({ length: LEVELS }, (_, i) => {
  const k = (i + 1) / LEVELS;                 // navy → steel blue → glow → pale
  const r = Math.round(40 + 160 * k ** 1.4), g = Math.round(80 + 160 * k ** 1.1), b = Math.round(120 + 135 * k ** .8);
  return `rgba(${r},${g},${b},${(.08 + .62 * k).toFixed(3)})`;
});

let W, H, cols, rows, SW, SH, trail, tmp, agents, mul, gridPat, peak = 1;
let mx = -1e4, my = -1e4, lastMove = -1e9, visible = true, t = 0;

function size() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  W = hero.clientWidth; H = hero.clientHeight;
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cols = Math.ceil(W / TS); rows = Math.ceil(H / TS); SW = cols * SUB; SH = rows * SUB;
  trail = new Float32Array(SW * SH); tmp = new Float32Array(SW * SH);
  const n = Math.min(4600, Math.round(SW * SH * .24));
  agents = Array.from({ length: n }, () => ({ x: Math.random() * SW, y: Math.random() * SH, a: Math.random() * 6.283 }));
  // dim the tiles behind the hero text (centre) so it stays readable
  mul = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const dx = (x + .5) / cols - .5, dy = ((y + .5) / rows - .48) * 1.3, d = Math.hypot(dx, dy);
    mul[y * cols + x] = Math.min(1, .5 + Math.max(0, d - .12) * 2.6);
  }
  const p = document.createElement('canvas'); p.width = p.height = TS;
  const pc = p.getContext('2d'); pc.fillStyle = 'rgba(180,210,230,.045)'; pc.fillRect(0, 0, TS, 1); pc.fillRect(0, 0, 1, TS);
  gridPat = ctx.createPattern(p, 'repeat');
}

const sense = (a, o) => {
  const x = (a.x + Math.cos(a.a + o) * SD) | 0, y = (a.y + Math.sin(a.a + o) * SD) | 0;
  return x >= 0 && y >= 0 && x < SW && y < SH ? trail[y * SW + x] : -1;
};

function food(px, py, r, amt) {
  const cx = (px / TS * SUB) | 0, cy = (py / TS * SUB) | 0;
  for (let oy = -r; oy <= r; oy++) for (let ox = -r; ox <= r; ox++) {
    if (ox * ox + oy * oy > r * r) continue;
    const X = cx + ox, Y = cy + oy;
    if (X >= 0 && Y >= 0 && X < SW && Y < SH) trail[Y * SW + X] += amt;
  }
}
let pulseAt = 0;
function step() {
  // the cursor (real or autopilot) keeps dropping food, so the network grows toward it
  food(mx, my, 3, 1.4);
  // a second, slower food source wanders on its own so the web keeps shifting
  food(W * (.5 - .38 * Math.cos(t * .17 + 2)), H * (.5 + .3 * Math.cos(t * .27 + 1)), 3, .9);
  // every few seconds a burst of food appears somewhere and pulls a new branch out
  if (t > pulseAt) { pulseAt = t + .8 + Math.random() * 1.2; food(W * (.05 + Math.random() * .9), H * (.08 + Math.random() * .8), 5, 4); }
  for (const a of agents) {
    if (Math.random() < .005) { a.x = Math.random() * SW; a.y = Math.random() * SH; a.a = Math.random() * 6.283; }
    const l = sense(a, -SA), f = sense(a, 0), r = sense(a, SA);
    if (f < l || f < r) a.a += l > r ? -TURN : TURN; else a.a += (Math.random() - .5) * .25;
    let nx = a.x + Math.cos(a.a) * SPEED, ny = a.y + Math.sin(a.a) * SPEED;
    if (nx < 0 || ny < 0 || nx >= SW || ny >= SH) { a.a = Math.random() * 6.283; nx = Math.min(SW - 1, Math.max(0, nx)); ny = Math.min(SH - 1, Math.max(0, ny)); }
    a.x = nx; a.y = ny; trail[(ny | 0) * SW + (nx | 0)] += 1;
  }
  // separable 3x3 blur + decay
  for (let y = 0; y < SH; y++) { const o = y * SW; for (let x = 0; x < SW; x++) tmp[o + x] = (trail[o + Math.max(0, x - 1)] + trail[o + x] + trail[o + Math.min(SW - 1, x + 1)]) / 3; }
  for (let y = 0; y < SH; y++) { const u = Math.max(0, y - 1) * SW, o = y * SW, d = Math.min(SH - 1, y + 1) * SW; for (let x = 0; x < SW; x++) trail[o + x] = (trail[o + x] * .4 + (tmp[u + x] + tmp[o + x] + tmp[d + x]) / 3 * .6) * DECAY; }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = gridPat; ctx.fillRect(0, 0, W, H);
  const buckets = Array.from({ length: LEVELS }, () => []);
  let max = 0;
  const live = performance.now() - lastMove < 2500, R = 110;   // instant glow under a real cursor
  for (let ty = 0; ty < rows; ty++) for (let tx = 0; tx < cols; tx++) {
    let s = 0;
    for (let sy = 0; sy < SUB; sy++) { const o = (ty * SUB + sy) * SW + tx * SUB; for (let sx = 0; sx < SUB; sx++) s += trail[o + sx]; }
    s /= SUB * SUB; if (s > max) max = s;
    let v = Math.min(1, Math.sqrt(s / (peak * .7)));
    if (live) { const d = Math.hypot((tx + .5) * TS - mx, (ty + .5) * TS - my); if (d < R) v = Math.max(v, (1 - d / R) ** 1.3 * .85); }
    v *= mul[ty * cols + tx];
    const lv = Math.floor(v * LEVELS) - 1;
    if (lv >= 0) buckets[lv].push(tx, ty);
  }
  peak = peak * .96 + Math.max(.5, max) * .04;
  for (let l = 0; l < LEVELS; l++) {
    const b = buckets[l]; if (!b.length) continue;
    ctx.fillStyle = COLORS[l]; ctx.beginPath();
    for (let i = 0; i < b.length; i += 2) ctx.rect(b[i] * TS + 1, b[i + 1] * TS + 1, TS - 1, TS - 1);
    ctx.fill();
  }
}

function settle() {                 // set the brightness scale from the current trail (for still frames)
  let max = 0;
  for (let ty = 0; ty < rows; ty++) for (let tx = 0; tx < cols; tx++) {
    let s = 0;
    for (let sy = 0; sy < SUB; sy++) { const o = (ty * SUB + sy) * SW + tx * SUB; for (let sx = 0; sx < SUB; sx++) s += trail[o + sx]; }
    if (s > max) max = s;
  }
  peak = Math.max(.5, max / (SUB * SUB) * .6);
}

function autopilot() {               // slow drifting point when nobody is steering
  mx = W * (.5 + .38 * Math.cos(t * .39) * Math.sin(t * .19 + 1));
  my = H * (.5 + .34 * Math.sin(t * .53));
}

addEventListener('pointermove', e => {
  if (e.pointerType === 'touch') return;
  const r = hero.getBoundingClientRect();
  if (e.clientY < r.top || e.clientY > r.bottom) return;
  mx = e.clientX - r.left; my = e.clientY - r.top; lastMove = performance.now();
}, { passive: true });
hero.addEventListener('pointerdown', e => {            // a click drops a big burst of food
  const r = hero.getBoundingClientRect(), cx = ((e.clientX - r.left) / TS * SUB) | 0, cy = ((e.clientY - r.top) / TS * SUB) | 0;
  for (let oy = -8; oy <= 8; oy++) for (let ox = -8; ox <= 8; ox++) { const X = cx + ox, Y = cy + oy; if (ox * ox + oy * oy <= 64 && X >= 0 && Y >= 0 && X < SW && Y < SH) trail[Y * SW + X] += 12; }
});

new ResizeObserver(() => { size(); draw(); }).observe(hero);
new IntersectionObserver(es => es.forEach(e => visible = e.isIntersecting), { threshold: 0 }).observe(hero);
size();
for (let i = 0; i < 240; i++) { t += 1 / 60; autopilot(); step(); }   // start with a network already grown
settle();
let boost = 720;                    // then fast-forward through the first second so it opens well developed
if (reduce) {                       // reduced motion: show the grown network as a still image
  for (let i = 0; i < 160; i++) { t += 1 / 60; autopilot(); step(); }
  mx = my = -1e4; for (let i = 0; i < 25; i++) step();   // let the cursor blob fade so only the web remains
  settle(); draw();
  new ResizeObserver(() => { for (let i = 0; i < 300; i++) { t += 1 / 60; autopilot(); step(); } mx = my = -1e4; for (let i = 0; i < 25; i++) step(); settle(); draw(); }).observe(hero);
}
let last = 0;
const loop = now => {
  requestAnimationFrame(loop);
  if (!visible || document.hidden) return;
  if (boost > 0) {                     // fast-forward: ~12 simulation steps per frame until the boost is spent
    const n = Math.min(boost, 12);
    for (let i = 0; i < n; i++) { t += 1 / 60; if (now - lastMove >= 2500) autopilot(); step(); }
    boost -= n; draw(); return;
  }
  if (now - last < 21) return;   // ~45 fps
  const steering = now - lastMove < 2500;
  if (reduce && !steering) return;     // reduced motion: only moves while the visitor moves the mouse
  last = now;
  t += 1 / 45;
  if (!steering) autopilot();
  step(); draw();
};
requestAnimationFrame(loop);
})();
