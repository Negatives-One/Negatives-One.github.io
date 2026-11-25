// Language switcher: English (source), Português (Brasil), Español.
// Text nodes and alt/aria-label/title attributes are swapped from this dictionary; code blocks stay in English.
(() => {
const D = {
  // nav + hero
  'Work': ['Projetos', 'Proyectos'],
  'Lab': ['Lab', 'Lab'],
  'Experience': ['Experiência', 'Experiencia'],
  'Get in Touch': ['Fale comigo', 'Contáctame'],
  'Game developer from Fortaleza, building multiplayer, procedural and multi-platform games in Unity & C#.':
    ['Desenvolvedor de jogos de Fortaleza. Faço jogos multiplayer, procedurais e multiplataforma em Unity e C#.',
     'Desarrollador de videojuegos de Fortaleza. Hago juegos multijugador, procedurales y multiplataforma en Unity y C#.'],
  "Let's talk": ['Vamos conversar', 'Hablemos'],
  'Showreel 2026. Footage from the official trailers of games I worked on, plus the terrain lab.':
    ['Showreel 2026. Cenas dos trailers oficiais dos jogos em que trabalhei, mais o laboratório de terreno.',
     'Showreel 2026. Escenas de los tráilers oficiales de los juegos en los que trabajé, más el laboratorio de terreno.'],

  // projects
  'My projects': ['Meus projetos', 'Mis proyectos'],
  'A cozy noir detective game built on logic puzzles. I worked on porting and development, getting it onto PC, PlayStation 5, Xbox, Switch, iOS and Android.':
    ['Um jogo de detetive noir e aconchegante, baseado em quebra-cabeças de lógica. Trabalhei no porte e no desenvolvimento, levando o jogo para PC, PlayStation 5, Xbox, Switch, iOS e Android.',
     'Un juego de detectives noir y acogedor, basado en acertijos de lógica. Trabajé en el port y el desarrollo, llevándolo a PC, PlayStation 5, Xbox, Switch, iOS y Android.'],
  "A free-to-play jigsaw game with puzzles drawn by real illustrators. I'm part of the development team. It sits at 98% positive reviews on Steam.":
    ['Um jogo de quebra-cabeça gratuito com ilustrações de artistas de verdade. Faço parte da equipe de desenvolvimento. Tem 98% de avaliações positivas na Steam.',
     'Un juego de rompecabezas gratuito con ilustraciones de artistas reales. Formo parte del equipo de desarrollo. Tiene un 98% de reseñas positivas en Steam.'],
  '2D survival crafting game': ['Jogo 2D de sobrevivência e crafting', 'Juego 2D de supervivencia y crafteo'],
  'Built on a custom C# engine. I made the terrain generation (Perlin noise, Physarum, Perlin worms, BFS) and worked on core engine features. The game is under NDA, so I rebuilt the techniques in the lab below.':
    ['Feito em uma engine própria em C#. Criei a geração de terreno (Perlin noise, Physarum, Perlin worms, BFS) e trabalhei em funcionalidades centrais da engine. O jogo está sob NDA, então recriei as técnicas no laboratório abaixo.',
     'Hecho en un motor propio en C#. Creé la generación de terreno (Perlin noise, Physarum, Perlin worms, BFS) y trabajé en funciones clave del motor. El juego está bajo NDA, así que recreé las técnicas en el laboratorio de abajo.'],
  'Open the lab': ['Abrir o laboratório', 'Abrir el laboratorio'],
  'How the multiplayer works': ['Como funciona o multiplayer', 'Cómo funciona el multijugador'],
  'A cozy 2D life sim. I designed and built the peer-to-peer multiplayer with Netcode for GameObjects, from syncing gameplay to the UI, HUD and animations.':
    ['Um simulador de vida 2D aconchegante. Projetei e construí o multiplayer peer-to-peer com Netcode for GameObjects, da sincronização do gameplay à UI, ao HUD e às animações.',
     'Un simulador de vida 2D acogedor. Diseñé y construí el multijugador peer-to-peer con Netcode for GameObjects, desde la sincronización del gameplay hasta la UI, el HUD y las animaciones.'],
  "An app that turns kids' book drawings into a world they can play in. I worked on LiveOps, updates and production fixes, mini games, in-game video streaming and island building. 50K+ downloads on Google Play.":
    ['Um app que transforma os desenhos dos livros das crianças em um mundo para jogar. Trabalhei com LiveOps, atualizações e correções em produção, minigames, streaming de vídeo dentro do jogo e construção de ilhas. Mais de 50 mil downloads no Google Play.',
     'Una app que convierte los dibujos de los libros de los niños en un mundo para jugar. Trabajé en LiveOps, actualizaciones y correcciones en producción, minijuegos, streaming de video dentro del juego y construcción de islas. Más de 50 mil descargas en Google Play.'],
  'Vertical slices for pitching and internal validation, and web and cloud gaming projects with Piepacker / Jam.gg.':
    ['Vertical slices para pitches e validação interna, e projetos para web e cloud gaming com a Piepacker / Jam.gg.',
     'Vertical slices para pitches y validación interna, y proyectos para web y cloud gaming con Piepacker / Jam.gg.'],
  'Full portfolio': ['Portfólio completo', 'Portafolio completo'],

  // lab
  'Terrain lab': ['Laboratório de terreno', 'Laboratorio de terreno'],
  'The survival game I worked on is under NDA, so I rebuilt the same generation steps from scratch to run here in the browser. Press play or pick a step.':
    ['O jogo de sobrevivência em que trabalhei está sob NDA, então recriei do zero as mesmas etapas de geração para rodar aqui no navegador. Aperte play ou escolha uma etapa.',
     'El juego de supervivencia en el que trabajé está bajo NDA, así que recreé desde cero los mismos pasos de generación para que funcionen aquí en el navegador. Pulsa play o elige un paso.'],
  'Surface': ['Superfície', 'Superficie'],
  'Strata': ['Camadas', 'Capas'],
  'Caverns': ['Cavernas', 'Cavernas'],
  'Physarum tunnels': ['Túneis Physarum', 'Túneles Physarum'],
  'Perlin worms': ['Vermes de Perlin', 'Gusanos de Perlin'],
  'Water (BFS)': ['Água (BFS)', 'Agua (BFS)'],
  'Structure': ['Estrutura', 'Estructura'],
  '▶ Play': ['▶ Play', '▶ Play'],
  '❚❚ Pause': ['❚❚ Pausar', '❚❚ Pausa'],
  'New seed': ['Nova seed', 'Nueva semilla'],
  'seed': ['seed', 'semilla'],
  'Terrain generation': ['Geração de terreno', 'Generación de terreno'],
  'Press play or pick a step.': ['Aperte play ou escolha uma etapa.', 'Pulsa play o elige un paso.'],
  'The ground line comes from 1D Perlin noise, layered at a few scales so it gets big hills and small bumps.':
    ['A linha do chão vem de Perlin noise 1D, somado em algumas escalas para ter morros grandes e pequenas ondulações.',
     'La línea del suelo sale de Perlin noise 1D, sumado a varias escalas para tener colinas grandes y pequeños relieves.'],
  'Grass, dirt and stone follow the ground line. Clay and ore patches come from 2D noise.':
    ['Grama, terra e pedra acompanham a linha do chão. Manchas de argila e minério vêm de noise 2D.',
     'Pasto, tierra y piedra siguen la línea del suelo. Las manchas de arcilla y mineral salen de noise 2D.'],
  'Caves are the spots where a 2D noise value passes a threshold. A smoothing pass rounds them off.':
    ['As cavernas são os pontos onde um valor de noise 2D passa de um limite. Uma etapa de suavização arredonda as formas.',
     'Las cavernas son los puntos donde un valor de noise 2D supera un umbral. Un paso de suavizado redondea las formas.'],
  'Hundreds of agents move like slime mould, following each other’s trails. The busiest paths become tunnels.':
    ['Centenas de agentes se movem como um bolor limoso, seguindo os rastros uns dos outros. Os caminhos mais usados viram túneis.',
     'Cientos de agentes se mueven como un moho mucilaginoso, siguiendo los rastros de los demás. Los caminos más transitados se vuelven túneles.'],
  'A few worms start at the surface and dig down, turning based on noise. They make the cave entrances.':
    ['Alguns vermes começam na superfície e cavam para baixo, mudando de direção com base em noise. Eles criam as entradas das cavernas.',
     'Algunos gusanos empiezan en la superficie y cavan hacia abajo, girando según el noise. Crean las entradas de las cavernas.'],
  'A breadth-first search finds each separate underground pocket, then water fills it from the bottom.':
    ['Uma busca em largura encontra cada bolsão subterrâneo separado, e a água enche cada um a partir do fundo.',
     'Una búsqueda en anchura encuentra cada bolsa subterránea separada, y el agua la llena desde el fondo.'],
  'It looks for the flattest stretch of ground, levels it and places a tower with a basement.':
    ['Procura o trecho de chão mais plano, nivela e coloca uma torre com porão.',
     'Busca el tramo de suelo más plano, lo nivela y coloca una torre con sótano.'],
  'Copy': ['Copiar', 'Copiar'],
  'Copied': ['Copiado', 'Copiado'],
  'Select and copy': ['Selecione e copie', 'Selecciona y copia'],

  // notes
  'Notes': ['Notas', 'Notas'],
  'Consoles': ['Consoles', 'Consolas'],
  'Mobile': ['Mobile', 'Móvil'],
  'Multiplayer in Little Sim World': ['Multiplayer em Little Sim World', 'Multijugador en Little Sim World'],
  'Little Sim World started out single-player. For multiplayer we went peer to peer: one player hosts and the others join, using Netcode for GameObjects.':
    ['Little Sim World começou como um jogo single-player. Para o multiplayer, fomos de peer-to-peer: um jogador hospeda e os outros entram, usando Netcode for GameObjects.',
     'Little Sim World empezó como un juego para un jugador. Para el multijugador optamos por peer-to-peer: un jugador hace de host y los demás se unen, usando Netcode for GameObjects.'],
  'The host owns the game state. When a player does something, like eating or using an object, their client asks the host through an RPC. The host checks it and updates a NetworkVariable, and every client reacts to that change. The UI, HUD and animations all read from those synced values, so everyone sees the same thing.':
    ['O host é dono do estado do jogo. Quando um jogador faz algo, como comer ou usar um objeto, o cliente dele pede ao host por meio de um RPC. O host valida e atualiza uma NetworkVariable, e todos os clientes reagem a essa mudança. A UI, o HUD e as animações leem esses valores sincronizados, então todo mundo vê a mesma coisa.',
     'El host es dueño del estado del juego. Cuando un jugador hace algo, como comer o usar un objeto, su cliente se lo pide al host mediante un RPC. El host lo valida y actualiza una NetworkVariable, y todos los clientes reaccionan a ese cambio. La UI, el HUD y las animaciones leen esos valores sincronizados, así que todos ven lo mismo.'],
  'Multiplayer shipped with the game on Steam, which left Early Access in August 2026.':
    ['O multiplayer foi lançado com o jogo na Steam, que saiu do Acesso Antecipado em agosto de 2026.',
     'El multijugador salió con el juego en Steam, que dejó el Acceso Anticipado en agosto de 2026.'],
  'Show code': ['Ver código', 'Ver código'],
  'Porting Case Solved to six platforms': ['Portando Case Solved para seis plataformas', 'Port de Case Solved a seis plataformas'],
  'Case Solved launched on Steam, PS5, Xbox Series X|S, Switch and Switch 2, iOS and Android from one Unity project.':
    ['Case Solved foi lançado na Steam, PS5, Xbox Series X|S, Switch e Switch 2, iOS e Android a partir de um único projeto Unity.',
     'Case Solved salió en Steam, PS5, Xbox Series X|S, Switch y Switch 2, iOS y Android desde un solo proyecto de Unity.'],
  'Most of the work was keeping platform differences out of the game code. Saves, achievements and store features sit behind one interface with a different implementation per platform, picked at build time. Input prompts change with the device, and the UI had to hold up on a TV, a Switch in handheld mode and a phone.':
    ['A maior parte do trabalho foi manter as diferenças entre plataformas fora do código do jogo. Saves, conquistas e recursos da loja ficam atrás de uma única interface, com uma implementação diferente para cada plataforma, escolhida no build. Os prompts de input mudam conforme o dispositivo, e a UI precisava funcionar bem numa TV, num Switch no modo portátil e num celular.',
     'La mayor parte del trabajo fue mantener las diferencias entre plataformas fuera del código del juego. Los guardados, los logros y las funciones de la tienda están detrás de una sola interfaz, con una implementación distinta para cada plataforma, elegida al compilar. Los indicadores de controles cambian según el dispositivo, y la UI tenía que verse bien en una TV, en un Switch en modo portátil y en un teléfono.'],
  'It launched on all six storefronts in July 2026, including Google Play Pass.':
    ['Foi lançado nas seis lojas em julho de 2026, incluindo o Google Play Pass.',
     'Salió en las seis tiendas en julio de 2026, incluido Google Play Pass.'],

  // AI
  'AI in my workflow': ['IA no meu fluxo de trabalho', 'IA en mi flujo de trabajo'],
  'I can work with AI tools whenever a project needs it or a team asks for it, from an assistant in the editor to an orchestrated pipeline. Either way, what ships goes through the same process as any other code: version control, review and testing on the target platform.':
    ['Consigo trabalhar com ferramentas de IA sempre que um projeto precisar ou o time pedir, de um assistente no editor a um pipeline orquestrado. De um jeito ou de outro, o que vai para produção passa pelo mesmo processo que qualquer outro código: controle de versão, revisão e testes na plataforma de destino.',
     'Puedo trabajar con herramientas de IA siempre que un proyecto lo necesite o el equipo lo pida, desde un asistente en el editor hasta un pipeline orquestado. En cualquier caso, lo que llega a producción pasa por el mismo proceso que cualquier otro código: control de versiones, revisión y pruebas en la plataforma de destino.'],
  'In the editor': ['No editor', 'En el editor'],
  'Boilerplate, refactors and first drafts of systems, with every line read and understood before it gets merged.':
    ['Boilerplate, refatorações e primeiras versões de sistemas, com cada linha lida e entendida antes do merge.',
     'Boilerplate, refactorizaciones y primeras versiones de sistemas, con cada línea leída y entendida antes del merge.'],
  'Orchestrated pipelines': ['Pipelines orquestrados', 'Pipelines orquestados'],
  'Agents · CI': ['Agentes · CI', 'Agentes · CI'],
  'Multi-step pipelines where agents plan, implement, test and review a change in sequence. Each step is checked before the next one runs, and a person approves what gets merged.':
    ['Pipelines de várias etapas em que agentes planejam, implementam, testam e revisam uma mudança em sequência. Cada etapa é verificada antes de a próxima rodar, e uma pessoa aprova o que entra no merge.',
     'Pipelines de varias etapas en los que agentes planifican, implementan, prueban y revisan un cambio en secuencia. Cada etapa se verifica antes de que corra la siguiente, y una persona aprueba lo que se fusiona.'],
  'Research and debugging': ['Pesquisa e depuração', 'Investigación y depuración'],
  'Getting up to speed on a new API or SDK, reading crash logs and comparing approaches before picking one.':
    ['Aprender rápido uma API ou SDK nova, ler logs de crash e comparar abordagens antes de escolher uma.',
     'Ponerme al día con una API o SDK nueva, leer logs de crash y comparar enfoques antes de elegir uno.'],
  'Production standards': ['Padrões de produção', 'Estándares de producción'],
  'Branches and pull requests, code review, profiling before optimising, testing on real devices and consoles, and notes the rest of the team can follow. AI-generated code follows the same rules.':
    ['Branches e pull requests, code review, profiling antes de otimizar, testes em dispositivos e consoles reais, e documentação que o resto do time consegue seguir. Código gerado por IA segue as mesmas regras.',
     'Branches y pull requests, code review, profiling antes de optimizar, pruebas en dispositivos y consolas reales, y documentación que el resto del equipo puede seguir. El código generado por IA sigue las mismas reglas.'],

  // side projects
  'Side projects': ['Projetos pessoais', 'Proyectos personales'],
  'Code': ['Código', 'Código'],
  'A boat trip through the sky of north-east Brazil, all sound, colour and texture.':
    ['Uma viagem de barco pelo céu do Nordeste, feita de som, cor e textura.',
     'Un viaje en barco por el cielo del nordeste de Brasil, hecho de sonido, color y textura.'],
  'My take on the Atari 2600 Centipede.': ['Minha versão do Centipede do Atari 2600.', 'Mi versión del Centipede de Atari 2600.'],
  'Foosball mixed with dodgeball. Made for a game jam.': ['Pebolim misturado com queimada. Feito para uma game jam.', 'Futbolín mezclado con quemados. Hecho para una game jam.'],
  'A strategy game for tokusatsu fans.': ['Um jogo de estratégia para fãs de tokusatsu.', 'Un juego de estrategia para fans del tokusatsu.'],
  'Strategy': ['Estratégia', 'Estrategia'],
  'A racing game against the clock.': ['Um jogo de corrida contra o relógio.', 'Un juego de carreras contra el reloj.'],
  'A small auto-battler, written as a C# exercise.': ['Um pequeno auto-battler, escrito como exercício de C#.', 'Un pequeño auto-battler, escrito como ejercicio de C#.'],

  // skills + experience
  'Skills': ['Habilidades', 'Habilidades'],
  'Game Programming': ['Programação de jogos', 'Programación de videojuegos'],
  'Multiplayer / P2P': ['Multiplayer / P2P', 'Multijugador / P2P'],
  'Procedural Generation': ['Geração procedural', 'Generación procedural'],
  'Console Porting': ['Porte para consoles', 'Port a consolas'],
  'UI & HUD Systems': ['Sistemas de UI e HUD', 'Sistemas de UI y HUD'],
  'Custom Engines': ['Engines próprias', 'Motores propios'],
  'AI-assisted development': ['Desenvolvimento assistido por IA', 'Desarrollo asistido por IA'],
  'Task Management': ['Gestão de tarefas', 'Gestión de tareas'],
  'Good Communication': ['Boa comunicação', 'Buena comunicación'],
  'English (B2)': ['Inglês (B2)', 'Inglés (B2)'],
  'Game Developer': ['Desenvolvedor de jogos', 'Desarrollador de videojuegos'],
  'Multiplayer Programmer': ['Programador de multiplayer', 'Programador de multijugador'],
  'Game Engineer': ['Engenheiro de jogos', 'Ingeniero de videojuegos'],
  'Currently': ['Atualmente', 'Actualmente'],
  'Jun 2025 – Mar 2026': ['jun 2025 – mar 2026', 'jun 2025 – mar 2026'],
  'Mar 2024 – Jun 2025': ['mar 2024 – jun 2025', 'mar 2024 – jun 2025'],
  'Mar 2023 – Dec 2024': ['mar 2023 – dez 2024', 'mar 2023 – dic 2024'],
  'Apr 2022 – Mar 2023': ['abr 2022 – mar 2023', 'abr 2022 – mar 2023'],
  'Education': ['Formação', 'Formación'],
  'B.Sc. Systems and Digital Media': ['Bacharelado em Sistemas e Mídias Digitais', 'Licenciatura en Sistemas y Medios Digitales'],
  'Bruno Carvalho Lima – 2026 · Fortaleza, Brazil (GMT-3)': ['Bruno Carvalho Lima – 2026 · Fortaleza, Brasil (GMT-3)', 'Bruno Carvalho Lima – 2026 · Fortaleza, Brasil (GMT-3)'],

  // attributes
  'Tools': ['Ferramentas', 'Herramientas'],
  'Language': ['Idioma', 'Idioma'],
  'Case Solved gameplay: filling in the deduction board': ['Gameplay de Case Solved: preenchendo o quadro de dedução', 'Gameplay de Case Solved: completando el tablero de deducción'],
  'Puzzle Gallery gameplay: assembling a jigsaw': ['Gameplay de Puzzle Gallery: montando um quebra-cabeça', 'Gameplay de Puzzle Gallery: armando un rompecabezas'],
  'Live procedural terrain preview': ['Prévia ao vivo do terreno procedural', 'Vista previa en vivo del terreno procedural'],
  'Little Sim World gameplay: several players together in town': ['Gameplay de Little Sim World: vários jogadores juntos na cidade', 'Gameplay de Little Sim World: varios jugadores juntos en la ciudad'],
  'Magic Land screenshots': ['Capturas de tela de Magic Land', 'Capturas de pantalla de Magic Land'],
  "Magic Land: kids' book drawings turned into a world": ['Magic Land: desenhos de livros infantis que viram um mundo', 'Magic Land: dibujos de libros infantiles convertidos en un mundo'],
  'Magic Land: mini games and ranking': ['Magic Land: minigames e ranking', 'Magic Land: minijuegos y ranking'],
  "Magic Land: visiting friends' worlds": ['Magic Land: visitando os mundos dos amigos', 'Magic Land: visitando los mundos de amigos'],
  'Terrain lab: side-view tile world': ['Laboratório de terreno: mundo de tiles em visão lateral', 'Laboratorio de terreno: mundo de tiles en vista lateral'],
  'Little Sim World gameplay': ['Gameplay de Little Sim World', 'Gameplay de Little Sim World'],
  'Case Solved: The London Files gameplay': ['Gameplay de Case Solved: The London Files', 'Gameplay de Case Solved: The London Files'],
  'Bruno Lima - Portfolio': ['Bruno Lima - Portfólio', 'Bruno Lima - Portafolio']
};

const BIO = {
  pt: 'Desenvolvedor de jogos com <span class="pill">4+ anos</span> de experiência na indústria, trabalhando com <span class="pill">Unity e C#</span>. Tenho experiência em <span class="pill">multiplayer</span> e <span class="pill">geração procedural</span>, com jogos lançados na Steam, em mobile e em consoles. Atualmente trabalho como <span class="pill">Game Developer</span> na Minimol Games.',
  es: 'Desarrollador de videojuegos con <span class="pill">más de 4 años</span> de experiencia en la industria, trabajando con <span class="pill">Unity y C#</span>. Tengo experiencia en <span class="pill">multijugador</span> y <span class="pill">generación procedural</span>, con juegos publicados en Steam, móviles y consolas. Actualmente trabajo como <span class="pill">Game Developer</span> en Minimol Games.'
};

const IDX = { pt: 0, es: 1 };
let lang = 'en';
window.tr = s => (lang === 'en' || !D[s]) ? s : D[s][IDX[lang]];

const origText = new WeakMap(), origAttr = new WeakMap();
let bioEN = null;
const SKIP = 'pre,code,script,style,svg,#bio,.lang';

function apply(l) {
  lang = l in IDX ? l : 'en';
  document.documentElement.lang = { en: 'en', pt: 'pt-BR', es: 'es' }[lang];
  if (!origText.has(document)) origText.set(document, document.title);
  document.title = window.tr(origText.get(document));
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const p = n.parentElement; if (!p || p.closest(SKIP)) continue;
    if (!origText.has(n)) { const raw = n.nodeValue, key = raw.trim(); if (!key || !D[key]) continue; origText.set(n, raw); }
    const raw = origText.get(n), key = raw.trim();
    n.nodeValue = raw.replace(key, window.tr(key));
  }
  document.querySelectorAll('[alt],[aria-label],[title]').forEach(el => {
    if (el.closest('svg')) return;
    let o = origAttr.get(el);
    if (!o) { o = {}; for (const a of ['alt', 'aria-label', 'title']) { const v = el.getAttribute(a); if (v && D[v]) o[a] = v; } origAttr.set(el, o); }
    for (const a in o) el.setAttribute(a, window.tr(o[a]));
  });
  const bio = document.getElementById('bio');
  if (bio && window.setBio) { if (bioEN === null) bioEN = window.bioHTML || ''; window.setBio(lang === 'en' ? bioEN : BIO[lang]); }
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === lang));
  dispatchEvent(new Event('langchange'));
}

function initial() {
  try { const s = localStorage.getItem('lang'); if (s) return s; } catch (_) {}
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  return nav.startsWith('pt') ? 'pt' : nav.startsWith('es') ? 'es' : 'en';
}

document.addEventListener('click', e => {
  const b = e.target.closest('.lang button'); if (!b) return;
  try { localStorage.setItem('lang', b.dataset.l); } catch (_) {}
  apply(b.dataset.l);
});
document.addEventListener('DOMContentLoaded', () => apply(initial()));
})();
