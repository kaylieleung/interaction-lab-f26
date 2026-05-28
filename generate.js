import {
  SENTENCES, POEMS, COLOR_MAP, EMOTION_KEYWORDS,
  ERA_PALETTES, NAME_ADJECTIVES, NAME_PLACES
} from './content';

// ---------- seeded RNG ----------
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function() {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

// ---------- tag detection ----------
function detectEra(yearStr) {
  if (!yearStr) return 'timeless';
  const m = String(yearStr).match(/\d{4}/);
  if (!m) {
    // No explicit year. Try decade words.
    const s = String(yearStr).toLowerCase();
    if (s.includes('eighties') || s.includes('80s')) return '80s';
    if (s.includes('nineties') || s.includes('90s')) return '90s';
    if (s.includes('two thousand') || s.includes('00s')) return 'early2000s';
    return 'timeless';
  }
  const y = parseInt(m[0]);
  if (y < 1980) return 'pre80s';
  if (y < 1990) return '80s';
  if (y < 2000) return '90s';
  if (y < 2010) return 'early2000s';
  if (y < 2020) return '2010s';
  return 'recent';
}

function detectColor(colorStr) {
  if (!colorStr) return null;
  const hex = String(colorStr).match(/#[0-9a-f]{6}/i);
  if (hex) return hex[0];
  const lower = String(colorStr).toLowerCase();
  for (const [name, h] of Object.entries(COLOR_MAP)) {
    if (lower.includes(name)) return h;
  }
  return null;
}

function detectEmotion(str) {
  if (!str) return 'any';
  const lower = String(str).toLowerCase();
  const scores = {};
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    scores[emotion] = keywords.reduce((acc, k) => acc + (lower.includes(k) ? 1 : 0), 0);
  }
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return top && top[1] > 0 ? top[0] : 'any';
}

// ---------- color utilities ----------
function desaturate(hex, amount = 0.6) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const avg = (r + g + b) / 3;
  const nr = Math.round(r + (avg - r) * amount);
  const ng = Math.round(g + (avg - g) * amount);
  const nb = Math.round(b + (avg - b) * amount);
  return `#${nr.toString(16).padStart(2,'0')}${ng.toString(16).padStart(2,'0')}${nb.toString(16).padStart(2,'0')}`;
}

function buildPalette(seedColor, era, rng) {
  const base = [...(ERA_PALETTES[era] || ERA_PALETTES.timeless)];
  if (seedColor) {
    base[1] = desaturate(seedColor, 0.55);
  }
  // Light shuffle so two same-era generations don't look identical
  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base;
}

// ---------- sentence selection ----------
function filterByTags(sentences, era, emotion, rng) {
  // Tier 1: matches both
  let pool = sentences.filter(s =>
    (s.era === era || s.era === 'any') && (s.emotion === emotion || s.emotion === 'any')
  );
  // Tier 2: matches at least one
  if (pool.length < 2) {
    pool = sentences.filter(s => s.era === era || s.emotion === emotion || s.era === 'any' || s.emotion === 'any');
  }
  if (pool.length === 0) pool = sentences;
  return pool;
}

function pickUnique(sentences, count, era, emotion, rng) {
  const pool = filterByTags(sentences, era, emotion, rng).slice();
  const out = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool.splice(idx, 1)[0].text);
  }
  return out;
}

// ---------- main ----------
export function generate(answers) {
  const seedSource = JSON.stringify(answers) + '|' + Date.now().toString().slice(0, -4);
  // Note: Date.now() adds slight variation so reloading the same answers gives a slightly
  // different layout. Remove the Date.now() part if you want fully deterministic output.
  const rng = mulberry32(hashString(seedSource));

  const era = detectEra(answers.revisit_year);
  const emotion = detectEmotion(answers.unspoken);
  const seedColor = detectColor(answers.avoided_color);
  const palette = buildPalette(seedColor, era, rng);

  // Description = opener + sceneSetter + sensory + uncanny + closer
  const opener = pickUnique(SENTENCES.openers, 1, era, emotion, rng)[0];
  const scene = pickUnique(SENTENCES.sceneSetters, 1, era, emotion, rng)[0];
  const sensory = pickUnique(SENTENCES.sensory, 1, era, emotion, rng)[0];
  const uncanny = pickUnique(SENTENCES.uncanny, 1, era, emotion, rng)[0];
  const closer = pickUnique(SENTENCES.closers, 1, era, emotion, rng)[0];
  const description = [opener, scene, sensory, uncanny, closer].join(' ');

  // Poem selection
  let poemPool = POEMS.filter(p =>
    (p.era === era || p.era === 'any') && (p.emotion === emotion || p.emotion === 'any')
  );
  if (poemPool.length === 0) poemPool = POEMS.filter(p => p.era === 'any' || p.emotion === 'any');
  if (poemPool.length === 0) poemPool = POEMS;
  const poem = pick(poemPool, rng);

  // Name
  const name = `the ${pick(NAME_ADJECTIVES, rng)} ${pick(NAME_PLACES, rng)}`;

  // Fragments = poem stanzas scattered across the space
  const fragments = poem.stanzas.map((stanza) => ({
    x: 0.12 + rng() * 0.76,
    y: 0.15 + rng() * 0.7,
    text: stanza
  }));

  // Visual elements
  const elements = [];
  const numElements = 5 + Math.floor(rng() * 3);
  const types = ['glow', 'glow', 'glow', 'shape', 'doorway'];
  for (let i = 0; i < numElements; i++) {
    elements.push({
      type: pick(types, rng),
      x: rng(),
      y: rng(),
      size: 0.15 + rng() * 0.25,
      hue: pick(palette, rng)
    });
  }

  // Mood / music params
  const tempo = 42 + Math.floor(rng() * 22);
  const keys = ['D', 'A', 'E', 'F', 'C', 'B', 'G'];
  const rootNote = pick(keys, rng);
  const key = rootNote + 'm';
  // Drone notes: root in low octave plus a fifth-ish
  const droneNotes = [`${rootNote}2`, `${rootNote}3`];

  return {
    name,
    description,
    poemStanzas: poem.stanzas,
    palette,
    fog_density: 0.4 + rng() * 0.35,
    elements,
    fragments,
    mood: { key, tempo, drone_notes: droneNotes },
    _debug: { era, emotion, seedColor: seedColor || 'none' }
  };
}
