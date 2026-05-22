// AI Systems Studio Template Showcase v0.1 — Premium Light Deck
// Run: node "slides/build-deck-v0.1.js"
'use strict';

const pptxgen = require('/Users/jonathanmccrimmond/.nvm/versions/node/v22.17.1/lib/node_modules/pptxgenjs');
const sharp   = require('/Users/jonathanmccrimmond/.nvm/versions/node/v22.17.1/lib/node_modules/sharp');

// ─── Theme Tokens ─────────────────────────────────────────────────────────────
const T = {
  BG:     'FFFFFF',
  SURF:   'F7F9FC',
  CARD:   'FFFFFF',
  BORDER: 'E2E8F0',
  BLUE:   '2F6BFF',
  TEAL:   '0D9488',
  PURP:   '7C3AED',
  INDIGO: '4F46E5',
  BLUE_L: 'EFF6FF',
  TEAL_L: 'F0FDFA',
  PURP_L: 'F5F3FF',
  DECO:   'E8F0FE',
  TEXT:   '0F172A',
  TEXTM:  '475569',
  TEXTL:  '94A3B8',
  WHITE:  'FFFFFF',
  HEAD:   'Montserrat',
  BODY:   'Roboto',
};

// ─── SVG Icon Paths (Feather/Heroicons style) ─────────────────────────────────
const ICONS = {
  chartBar:  '<rect x="2" y="12" width="4" height="9" rx="1"/><rect x="9" y="7" width="4" height="14" rx="1"/><rect x="16" y="3" width="4" height="18" rx="1"/>',
  search:    '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  database:  '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>',
  layers:    '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  checkCirc: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  clock:     '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  puzzle:    '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  target:    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  building:  '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="2" x2="9" y2="22"/><line x1="15" y1="2" x2="15" y2="22"/><line x1="4" y1="12" x2="20" y2="12"/>',
  file:      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>',
  folder:    '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  mapPin:    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  globe:     '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  shield:    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  cpu:       '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  monitor:   '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  code:      '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  robot:     '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="9" y1="15" x2="9" y2="17"/><line x1="15" y1="15" x2="15" y2="17"/>',
  lightbulb: '<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
  lock:      '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  users:     '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  star:      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  zap:       '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  user:      '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  pieChart:  '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  activity:  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  barChart2: '<rect x="2" y="14" width="4" height="8" rx="1"/><rect x="9" y="8" width="4" height="14" rx="1"/><rect x="16" y="2" width="4" height="20" rx="1"/>',
  check:     '<polyline points="20 6 9 17 4 12"/>',
  network:   '<circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="13" x2="5" y2="16"/><line x1="12" y1="13" x2="19" y2="16"/>',
  cubes:     '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  expand:    '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
  trendUp:   '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 6 23 6 23 12"/>',
  trendDown: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><line x1="1" y1="18" x2="7" y2="18"/><line x1="1" y1="12" x2="1" y2="18"/>',
  handshake: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  repeat:    '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  edit:      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  send:      '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  book:      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  flame:     '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  scale:     '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/>',
};

// ─── Icon PNG generator ───────────────────────────────────────────────────────
async function iconPng(key, color, size = 256) {
  const inner = ICONS[key] || ICONS.star;
  const c = (color || '#' + T.BLUE).startsWith('#') ? (color || '#' + T.BLUE) : '#' + (color || T.BLUE);
  const sw = key === 'check' ? '2.5' : '1.8';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}

// ─── Layout helpers ───────────────────────────────────────────────────────────
const makeShadow = () => ({ type: 'outer', color: '94A3B8', blur: 8, offset: 3, angle: 135, opacity: 0.14 });

function badge(slide, pres, n, x, y) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: 0.38, h: 0.38, fill: { color: T.BLUE }, line: { color: T.BLUE } });
  slide.addText(String(n), { x, y: y + 0.05, w: 0.38, h: 0.26, fontSize: 13, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'center', margin: 0 });
}

function slideHeader(slide, pres, n, title, subtitle) {
  badge(slide, pres, n, 0.42, 0.2);
  slide.addText(title, { x: 0.92, y: 0.22, w: 8.7, h: 0.35, fontSize: 20, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'left', margin: 0 });
  if (subtitle) slide.addText(subtitle, { x: 0.42, y: 0.63, w: 9.2, h: 0.26, fontSize: 11, fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
}

function card(slide, pres, x, y, w, h) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: T.CARD }, line: { color: T.BORDER, width: 0.75 }, shadow: makeShadow() });
}

async function iconCircle(slide, pres, key, iconColor, bgColor, x, y, size) {
  size = size || 0.45;
  slide.addShape(pres.shapes.OVAL, { x, y, w: size, h: size, fill: { color: bgColor }, line: { color: bgColor } });
  const data = await iconPng(key, '#' + iconColor);
  const pad = size * 0.2;
  slide.addImage({ data, x: x + pad, y: y + pad, w: size - pad * 2, h: size - pad * 2 });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.title  = 'AI Systems Studio Template Showcase v0.1';
  pres.author = 'Jonathan McCrimmond';

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — HERO
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };

    // Right-panel soft decoration
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 0, w: 4.5, h: 5.625, fill: { color: T.DECO }, line: { color: T.DECO } });
    s.addShape(pres.shapes.OVAL, { x: 6.2, y: -0.5, w: 4.2, h: 4.2, fill: { color: 'DBEAFE', transparency: 40 }, line: { color: 'DBEAFE', transparency: 40 } });

    badge(s, pres, 1, 0.42, 0.2);

    // Brand icon
    s.addShape(pres.shapes.OVAL, { x: 0.42, y: 0.72, w: 0.9, h: 0.9, fill: { color: T.BLUE_L }, line: { color: T.BLUE_L } });
    const brandImg = await iconPng('cubes', '#' + T.BLUE);
    s.addImage({ data: brandImg, x: 0.6, y: 0.9, w: 0.54, h: 0.54 });

    s.addText('AI Systems Studio', { x: 1.45, y: 0.78, w: 4.0, h: 0.38, fontSize: 18, fontFace: T.HEAD, bold: true, color: T.BLUE, align: 'left', margin: 0 });

    // Main title
    s.addText('The Studio', { x: 0.42, y: 1.28, w: 5.4, h: 0.62, fontSize: 36, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'left', margin: 0 });
    s.addText('Template', { x: 0.42, y: 1.88, w: 5.4, h: 0.62, fontSize: 36, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'left', margin: 0 });

    // Tagline
    s.addText('The operating system behind every studio project — a reusable, agent-driven repo template for consistent docs, decks, and portfolio.', { x: 0.42, y: 2.65, w: 5.0, h: 0.9, fontSize: 12.5, fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });

    // Right-side decorative stack (folder cubes)
    const stackColors = [T.TEAL, T.BLUE, T.PURP, T.INDIGO];
    stackColors.forEach((c, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.6 + i * 0.12, y: 1.2 + i * 0.45, w: 2.6, h: 0.4, rectRadius: 0.06, fill: { color: c, transparency: 25 }, line: { color: c, transparency: 25 } });
    });
    s.addText('PROJECT_MASTER.md', { x: 6.7, y: 1.28, w: 2.5, h: 0.24, fontSize: 9, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });
    s.addText('ROADMAP.md',         { x: 6.82, y: 1.73, w: 2.5, h: 0.24, fontSize: 9, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });
    s.addText('ARCHITECTURE.md',    { x: 6.94, y: 2.18, w: 2.5, h: 0.24, fontSize: 9, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });
    s.addText('agents/  templates/  slides/  docs/', { x: 7.06, y: 2.63, w: 2.5, h: 0.24, fontSize: 9, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });

    // 3 bottom proof cards
    const proofCards = [
      { icon: 'file',       ic: T.BLUE,  bg: T.BLUE_L, label: 'Single Source of Truth', desc: 'One file governs every downstream artifact.' },
      { icon: 'robot',      ic: T.TEAL,  bg: T.TEAL_L, label: 'Agent-Driven',            desc: 'Documentation, showcase, portfolio, social — automated.' },
      { icon: 'repeat',     ic: T.PURP,  bg: T.PURP_L, label: 'Reusable Across Projects',desc: 'Every new project ships with the same operating discipline.' },
    ];
    const pcY = 3.95, pcH = 1.28, pcW = 2.82, pcGap = 0.17, pcX0 = 0.42;
    for (let i = 0; i < proofCards.length; i++) {
      const p = proofCards[i];
      const x = pcX0 + i * (pcW + pcGap);
      card(s, pres, x, pcY, pcW, pcH);
      await iconCircle(s, pres, p.icon, p.ic, p.bg, x + 0.18, pcY + 0.22, 0.42);
      s.addText(p.label, { x: x + 0.72, y: pcY + 0.22, w: pcW - 0.85, h: 0.28, fontSize: 11.5, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'left', margin: 0 });
      s.addText(p.desc,  { x: x + 0.18, y: pcY + 0.75, w: pcW - 0.3,  h: 0.44, fontSize: 10,   fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — THE PROBLEM
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 2, 'The Problem', 'Solo AI builders drift. Projects fragment. Decks, docs and portfolio pages diverge from reality.');

    const problems = [
      { icon: 'puzzle',    ic: T.BLUE, bg: T.BLUE_L, label: 'Fragmented Projects',  desc: 'Each project reinvents its own folder layout, naming and cadence.' },
      { icon: 'trendDown', ic: T.TEAL, bg: T.TEAL_L, label: 'Drift From Reality',   desc: 'Slides, READMEs and portfolio pages slowly stop matching the code.' },
      { icon: 'clock',     ic: T.PURP, bg: T.PURP_L, label: 'No Shared Cadence',    desc: 'Updates happen ad-hoc; weekly and milestone rituals never form.' },
    ];
    const pY = 1.0, pH = 2.35, pW = 2.82, pGap = 0.17, pX0 = 0.42;
    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      const x = pX0 + i * (pW + pGap);
      card(s, pres, x, pY, pW, pH);
      const cx = x + (pW - 0.6) / 2;
      await iconCircle(s, pres, p.icon, p.ic, p.bg, cx, pY + 0.22, 0.6);
      s.addText(p.label, { x, y: pY + 1.0,  w: pW, h: 0.32, fontSize: 13, fontFace: T.HEAD, bold: true, color: T.TEXT,  align: 'center', margin: 0 });
      s.addText(p.desc,  { x: x + 0.12, y: pY + 1.38, w: pW - 0.24, h: 0.82, fontSize: 11, fontFace: T.BODY, color: T.TEXTM, align: 'center', margin: 0 });
    }

    // Result bar
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.42, y: 3.55, w: 9.16, h: 1.65, rectRadius: 0.08, fill: { color: T.INDIGO }, line: { color: T.INDIGO }, shadow: makeShadow() });
    const chk = await iconPng('checkCirc', '#FFFFFF');
    s.addImage({ data: chk, x: 0.62, y: 3.92, w: 0.42, h: 0.42 });
    s.addText('The Result:', { x: 1.14, y: 3.65, w: 2.5, h: 0.3, fontSize: 12, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });
    s.addText("Every project starts from scratch, every showcase feels improvised, and nothing compounds across the studio's body of work.", { x: 1.14, y: 3.98, w: 7.9, h: 0.72, fontSize: 11.5, fontFace: T.BODY, color: T.WHITE, align: 'left', margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — THE SOLUTION
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 3, 'The Solution', 'A reusable, agent-driven repo template so every project ships with consistent docs, decks, and portfolio.');

    const steps = [
      { num: '01', icon: 'file',   ic: T.BLUE, bg: T.BLUE_L, label: 'Start From SSOT',  desc: 'New project inherits PROJECT_MASTER.md and a vetted folder scaffold.' },
      { num: '02', icon: 'robot',  ic: T.TEAL, bg: T.TEAL_L, label: 'Run The Agents',   desc: 'Four agents keep docs, slides, portfolio and social in lockstep with reality.' },
      { num: '03', icon: 'send',   ic: T.PURP, bg: T.PURP_L, label: 'Ship Consistently',desc: 'Every project produces the same shaped showcase, portfolio page and update cadence.' },
    ];
    const sY = 1.0, sH = 2.7, sW = 2.82, sGap = 0.17, sX0 = 0.42;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const x = sX0 + i * (sW + sGap);
      card(s, pres, x, sY, sW, sH);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.15, y: sY + 0.18, w: 0.45, h: 0.3, rectRadius: 0.08, fill: { color: T.BLUE }, line: { color: T.BLUE } });
      s.addText(st.num, { x: x + 0.15, y: sY + 0.19, w: 0.45, h: 0.26, fontSize: 11, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'center', margin: 0 });
      const cx = x + (sW - 0.65) / 2;
      await iconCircle(s, pres, st.icon, st.ic, st.bg, cx, sY + 0.65, 0.65);
      s.addText(st.label, { x, y: sY + 1.48, w: sW, h: 0.32, fontSize: 13, fontFace: T.HEAD, bold: true, color: T.TEXT,  align: 'center', margin: 0 });
      s.addText(st.desc,  { x: x + 0.12, y: sY + 1.84, w: sW - 0.24, h: 0.75, fontSize: 10.5, fontFace: T.BODY, color: T.TEXTM, align: 'center', margin: 0 });
    }

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.42, y: 3.9, w: 9.16, h: 1.32, rectRadius: 0.08, fill: { color: T.INDIGO }, line: { color: T.INDIGO }, shadow: makeShadow() });
    const chk2 = await iconPng('checkCirc', '#FFFFFF');
    s.addImage({ data: chk2, x: 0.65, y: 4.1, w: 0.45, h: 0.45 });
    s.addText('The Outcome', { x: 1.22, y: 3.97, w: 4, h: 0.3, fontSize: 13, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });
    s.addText('Faster project setup.  Documentation that stays true.  A studio body of work that visibly compounds.', { x: 1.22, y: 4.3, w: 7.9, h: 0.6, fontSize: 11.5, fontFace: T.BODY, color: T.WHITE, align: 'left', margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — CORE PRINCIPLE: PROJECT_MASTER.md IS SSOT
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 4, 'Core Principle — SSOT', 'PROJECT_MASTER.md is the single source of truth. Everything else traces back to it.');

    // Center: SSOT card
    const ssotX = 4.05, ssotY = 1.2, ssotW = 1.9, ssotH = 1.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ssotX, y: ssotY, w: ssotW, h: ssotH, rectRadius: 0.1, fill: { color: T.BLUE }, line: { color: T.BLUE }, shadow: makeShadow() });
    const fileImg = await iconPng('file', '#FFFFFF');
    s.addImage({ data: fileImg, x: ssotX + 0.7, y: ssotY + 0.12, w: 0.5, h: 0.5 });
    s.addText('PROJECT_MASTER.md', { x: ssotX, y: ssotY + 0.66, w: ssotW, h: 0.28, fontSize: 10, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'center', margin: 0 });

    // Downstream artifacts radiating
    const arts = [
      { icon: 'book',     ic: T.TEAL, bg: T.TEAL_L, label: 'ROADMAP.md',     desc: 'Sprint plan and milestones.' },
      { icon: 'cubes',    ic: T.PURP, bg: T.PURP_L, label: 'ARCHITECTURE.md',desc: 'ADRs and rationale.' },
      { icon: 'edit',     ic: T.BLUE, bg: T.BLUE_L, label: 'CHANGELOG.md',   desc: 'Dated milestone history.' },
      { icon: 'monitor',  ic: T.TEAL, bg: T.TEAL_L, label: 'slides/',        desc: 'Showcase decks.' },
      { icon: 'star',     ic: T.PURP, bg: T.PURP_L, label: 'portfolio',      desc: 'Notion project pages.' },
      { icon: 'send',     ic: T.BLUE, bg: T.BLUE_L, label: 'social',         desc: 'Distribution content.' },
    ];
    const positions = [
      { x: 0.42, y: 2.65 }, { x: 3.55, y: 2.65 }, { x: 6.68, y: 2.65 },
      { x: 0.42, y: 4.05 }, { x: 3.55, y: 4.05 }, { x: 6.68, y: 4.05 },
    ];
    const aW = 2.9, aH = 1.25;
    for (let i = 0; i < arts.length; i++) {
      const a = arts[i];
      const { x, y } = positions[i];
      card(s, pres, x, y, aW, aH);
      await iconCircle(s, pres, a.icon, a.ic, a.bg, x + 0.18, y + 0.2, 0.5);
      s.addText(a.label, { x: x + 0.82, y: y + 0.2,  w: aW - 0.95, h: 0.28, fontSize: 11.5, fontFace: T.HEAD, bold: true, color: T.TEXT,  align: 'left', margin: 0 });
      s.addText(a.desc,  { x: x + 0.18, y: y + 0.72, w: aW - 0.3,  h: 0.42, fontSize: 10,   fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
    }

    // Rule chip
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.4, y: 2.32, w: 5.2, h: 0.3, rectRadius: 0.15, fill: { color: T.BLUE_L }, line: { color: T.BORDER, width: 0.5 } });
    s.addText('Update SSOT first. No downstream file may contradict it.', { x: 2.4, y: 2.32, w: 5.2, h: 0.3, fontSize: 9.5, fontFace: T.HEAD, bold: true, color: T.BLUE, align: 'center', valign: 'middle', margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — THE AGENT ROSTER
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 5, 'The Agent Roster', 'Four specialised agents keep every downstream artifact aligned with the SSOT.');

    const agents = [
      { icon: 'book',  ic: T.BLUE, bg: T.BLUE_L, label: 'Documentation Agent', desc: 'Maintains PROJECT_MASTER, ROADMAP, ARCHITECTURE and CHANGELOG.' },
      { icon: 'monitor', ic: T.TEAL, bg: T.TEAL_L, label: 'Showcase Agent',      desc: 'Generates and refreshes showcase decks from project state.' },
      { icon: 'star',  ic: T.PURP, bg: T.PURP_L, label: 'Portfolio Agent',     desc: 'Keeps Notion portfolio pages aligned with project reality.' },
      { icon: 'send',  ic: T.INDIGO,bg: T.BLUE_L, label: 'Social Media Agent',  desc: 'Drafts platform-ready posts from milestones and releases.' },
    ];
    const positions = [
      { x: 0.42, y: 0.98 }, { x: 5.2, y: 0.98 },
      { x: 0.42, y: 3.2  }, { x: 5.2, y: 3.2  },
    ];
    const vW = 4.5, vH = 2.0;
    for (let i = 0; i < agents.length; i++) {
      const a = agents[i];
      const { x, y } = positions[i];
      card(s, pres, x, y, vW, vH);
      await iconCircle(s, pres, a.icon, a.ic, a.bg, x + 0.2, y + 0.3, 0.7);
      s.addText(a.label, { x: x + 1.05, y: y + 0.42, w: vW - 1.2, h: 0.36, fontSize: 14, fontFace: T.HEAD, bold: true, color: T.TEXT,  align: 'left', margin: 0 });
      s.addText(a.desc,  { x: x + 0.2,  y: y + 1.18, w: vW - 0.4, h: 0.7,  fontSize: 11.5, fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — REPO ANATOMY
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 6, 'Repo Anatomy', 'Everything a studio project needs, organised so updates are obvious.');

    const items = [
      { icon: 'file',    ic: T.BLUE, bg: T.BLUE_L, label: 'PROJECT_MASTER.md', desc: 'SSOT — strategy, scope, state.' },
      { icon: 'book',    ic: T.TEAL, bg: T.TEAL_L, label: 'ROADMAP.md',         desc: 'Milestones and sprint plan.' },
      { icon: 'cubes',   ic: T.PURP, bg: T.PURP_L, label: 'ARCHITECTURE.md',    desc: 'Decisions and rationale.' },
      { icon: 'edit',    ic: T.BLUE, bg: T.BLUE_L, label: 'CHANGELOG.md',       desc: 'Dated milestone history.' },
      { icon: 'robot',   ic: T.TEAL, bg: T.TEAL_L, label: 'agents/',            desc: 'Four role definitions.' },
      { icon: 'layers',  ic: T.PURP, bg: T.PURP_L, label: 'templates/',         desc: 'Reusable scaffolds.' },
      { icon: 'monitor', ic: T.BLUE, bg: T.BLUE_L, label: 'slides/',            desc: 'Showcase deck sources.' },
      { icon: 'folder',  ic: T.TEAL, bg: T.TEAL_L, label: 'docs/',              desc: 'Project documentation.' },
    ];
    const cols = 4, rows = 2;
    const iW = 2.18, iH = 1.85, gapX = 0.14, gapY = 0.18, x0 = 0.42, y0 = 1.0;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const c = i % cols, r = Math.floor(i / cols);
      const x = x0 + c * (iW + gapX);
      const y = y0 + r * (iH + gapY);
      card(s, pres, x, y, iW, iH);
      const cx = x + (iW - 0.6) / 2;
      await iconCircle(s, pres, it.icon, it.ic, it.bg, cx, y + 0.2, 0.6);
      s.addText(it.label, { x, y: y + 0.94, w: iW, h: 0.3, fontSize: 11.5, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'center', margin: 0 });
      s.addText(it.desc,  { x: x + 0.08, y: y + 1.26, w: iW - 0.16, h: 0.5, fontSize: 9.5, fontFace: T.BODY, color: T.TEXTM, align: 'center', margin: 0 });
    }

    s.addText('Plus .github/workflows/ for CI checks and assets/ for shared media.', { x: 0.42, y: 5.08, w: 9.16, h: 0.24, fontSize: 9.5, fontFace: T.BODY, color: T.TEXTL, align: 'center', italic: true, margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — PROJECT LIFECYCLE
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 7, 'Project Lifecycle', 'Init through distribution — the same disciplined flow on every project.');

    const steps = [
      { num: '01', icon: 'zap',    ic: T.BLUE, bg: T.BLUE_L, label: 'Init',      desc: 'Clone template, rename, set identity.' },
      { num: '02', icon: 'file',   ic: T.TEAL, bg: T.TEAL_L, label: 'SSOT',      desc: 'Fill PROJECT_MASTER.md.' },
      { num: '03', icon: 'book',   ic: T.PURP, bg: T.PURP_L, label: 'Docs',      desc: 'Roadmap, architecture, changelog.' },
      { num: '04', icon: 'monitor',ic: T.BLUE, bg: T.BLUE_L, label: 'Showcase',  desc: 'Generate the deck from state.' },
      { num: '05', icon: 'star',   ic: T.TEAL, bg: T.TEAL_L, label: 'Portfolio', desc: 'Publish Notion page.' },
      { num: '06', icon: 'send',   ic: T.PURP, bg: T.PURP_L, label: 'Social',    desc: 'Distribute milestone posts.' },
    ];

    const stW = 1.42, stH = 2.65, stGap = 0.1, stX0 = 0.42, stY = 1.02;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i];
      const x = stX0 + i * (stW + stGap);
      card(s, pres, x, stY, stW, stH);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.12, y: stY + 0.12, w: 0.42, h: 0.26, rectRadius: 0.07, fill: { color: T.BLUE }, line: { color: T.BLUE } });
      s.addText(st.num, { x: x + 0.12, y: stY + 0.13, w: 0.42, h: 0.22, fontSize: 10, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'center', margin: 0 });
      const cx = x + (stW - 0.5) / 2;
      await iconCircle(s, pres, st.icon, st.ic, st.bg, cx, stY + 0.52, 0.5);
      s.addText(st.label, { x, y: stY + 1.12, w: stW, h: 0.28, fontSize: 12, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'center', margin: 0 });
      s.addText(st.desc,  { x: x + 0.06, y: stY + 1.44, w: stW - 0.12, h: 1.0, fontSize: 9, fontFace: T.BODY, color: T.TEXTM, align: 'center', margin: 0 });

      if (i < steps.length - 1) {
        const ax = x + stW + 0.01;
        s.addShape(pres.shapes.RECTANGLE, { x: ax, y: stY + stH / 2 - 0.02, w: stGap - 0.02, h: 0.04, fill: { color: T.TEXTL }, line: { color: T.TEXTL } });
      }
    }

    // Cadence row
    const cadences = [
      { label: 'Weekly',     desc: 'PROJECT_MASTER + ROADMAP + AGENT_LOG' },
      { label: 'Milestone',  desc: 'CHANGELOG + slides + portfolio' },
      { label: 'Decision',   desc: 'ARCHITECTURE.md ADR entry' },
    ];
    const cW = 2.96, cH = 0.8, cGap = 0.14, cX0 = 0.42, cY = 3.95;
    cadences.forEach((cd, i) => {
      const x = cX0 + i * (cW + cGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: cY, w: cW, h: cH, rectRadius: 0.08, fill: { color: T.BLUE_L }, line: { color: T.BORDER, width: 0.5 } });
      s.addText(cd.label, { x: x + 0.12, y: cY + 0.1, w: cW - 0.24, h: 0.26, fontSize: 11, fontFace: T.HEAD, bold: true, color: T.BLUE, align: 'left', margin: 0 });
      s.addText(cd.desc,  { x: x + 0.12, y: cY + 0.38, w: cW - 0.24, h: 0.4, fontSize: 9.5, fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — THE STUDIO DASHBOARD
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 8, 'The Studio Dashboard', 'A single static page that surfaces every studio project at a glance.');

    const features = [
      { icon: 'pieChart', ic: T.BLUE, bg: T.BLUE_L, label: 'Live Studio Hub',       desc: 'One page lists every project.' },
      { icon: 'file',     ic: T.TEAL, bg: T.TEAL_L, label: 'projects.json Manifest',desc: 'Single file drives the page.' },
      { icon: 'shield',   ic: T.PURP, bg: T.PURP_L, label: 'Studio-Only',           desc: 'Excluded from inheritance.' },
      { icon: 'globe',    ic: T.BLUE, bg: T.BLUE_L, label: 'GitHub Pages',          desc: 'jonathanmccrimmond.github.io/ai-systems-studio-template/' },
      { icon: 'repeat',   ic: T.TEAL, bg: T.TEAL_L, label: 'Synced With SSOT',      desc: 'Each entry mirrors a PROJECT_MASTER.' },
    ];
    const fX0 = 0.42, fY0 = 0.98, fW = 4.35, fH = 0.78, fGap = 0.1;
    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const y = fY0 + i * (fH + fGap);
      card(s, pres, fX0, y, fW, fH);
      await iconCircle(s, pres, f.icon, f.ic, f.bg, fX0 + 0.14, y + 0.17, 0.44);
      s.addText(f.label, { x: fX0 + 0.68, y: y + 0.12, w: fW - 0.8, h: 0.26, fontSize: 11.5, fontFace: T.HEAD, bold: true, color: T.TEXT,  align: 'left', margin: 0 });
      s.addText(f.desc,  { x: fX0 + 0.68, y: y + 0.40, w: fW - 0.8, h: 0.32, fontSize: 9.5,  fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
    }

    // Dashboard mockup panel
    const dX = 5.05, dY = 0.95, dW = 4.53, dH = 4.38;
    card(s, pres, dX, dY, dW, dH);
    s.addShape(pres.shapes.RECTANGLE, { x: dX, y: dY, w: dW, h: 0.34, fill: { color: T.BLUE }, line: { color: T.BLUE } });
    s.addText('AI Systems Studio — Projects', { x: dX + 0.12, y: dY + 0.06, w: dW - 0.24, h: 0.22, fontSize: 8.5, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });

    const projCards = [
      { name: 'CPI Engine',     status: 'Active',   c: T.TEAL,  desc: 'Sector-agnostic premises intelligence.' },
      { name: 'Macfire Scout',  status: 'Active',   c: T.BLUE,  desc: 'Fire-safety lead scout for Scotland.' },
      { name: 'Weight Tracker', status: 'Planning', c: T.PURP,  desc: 'WhatsApp-based health tracker.' },
      { name: 'Studio Template',status: 'Shipped',  c: T.INDIGO,desc: 'This repo — the studio operating system.' },
    ];
    const rowY0 = dY + 0.5, rowH = 0.88, rowGap = 0.08;
    projCards.forEach((p, i) => {
      const ry = rowY0 + i * (rowH + rowGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: dX + 0.12, y: ry, w: dW - 0.24, h: rowH, rectRadius: 0.06, fill: { color: T.SURF }, line: { color: T.BORDER, width: 0.5 } });
      // status dot
      s.addShape(pres.shapes.OVAL, { x: dX + 0.24, y: ry + 0.16, w: 0.18, h: 0.18, fill: { color: p.c }, line: { color: p.c } });
      s.addText(p.name,   { x: dX + 0.5, y: ry + 0.08, w: 2.4, h: 0.26, fontSize: 10, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'left', margin: 0 });
      // status pill
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: dX + dW - 1.1, y: ry + 0.1, w: 0.9, h: 0.24, rectRadius: 0.12, fill: { color: p.c, transparency: 75 }, line: { color: p.c, transparency: 60 } });
      s.addText(p.status, { x: dX + dW - 1.1, y: ry + 0.1, w: 0.9, h: 0.24, fontSize: 7.5, fontFace: T.HEAD, bold: true, color: p.c, align: 'center', valign: 'middle', margin: 0 });
      s.addText(p.desc,   { x: dX + 0.5, y: ry + 0.36, w: dW - 0.7, h: 0.44, fontSize: 8.5, fontFace: T.BODY, color: T.TEXTM, align: 'left', margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — EVIDENCE: BUILT ON THIS
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 9, 'Evidence — Built On This', 'Three real studio projects already running on the template.');

    const proofs = [
      { icon: 'chartBar', ic: T.BLUE, bg: T.BLUE_L, name: 'CPI Engine',     tag: 'Sector-Agnostic Premises Intelligence', desc: 'AI-powered discovery, enrichment and qualification of commercial opportunities. Currently the most mature inheritor.' },
      { icon: 'flame',    ic: T.TEAL, bg: T.TEAL_L, name: 'Macfire Scout',  tag: 'Scottish Fire-Safety Lead Scout',       desc: 'Targeted scouting agent that surfaces fire-safety leads across Scottish commercial premises.' },
      { icon: 'scale',    ic: T.PURP, bg: T.PURP_L, name: 'Weight Tracker', tag: 'WhatsApp Health Tracker',                desc: 'Conversational health-tracking app delivered through WhatsApp — same governance, smaller surface area.' },
    ];
    const pY = 0.98, pH = 3.95, pW = 2.95, pGap = 0.15, pX0 = 0.42;
    for (let i = 0; i < proofs.length; i++) {
      const p = proofs[i];
      const x = pX0 + i * (pW + pGap);
      card(s, pres, x, pY, pW, pH);
      const cx = x + (pW - 0.85) / 2;
      await iconCircle(s, pres, p.icon, p.ic, p.bg, cx, pY + 0.32, 0.85);
      s.addText(p.name, { x, y: pY + 1.4, w: pW, h: 0.36, fontSize: 14, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'center', margin: 0 });
      // tag chip
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: pY + 1.84, w: pW - 0.5, h: 0.34, rectRadius: 0.17, fill: { color: p.bg }, line: { color: p.bg } });
      s.addText(p.tag, { x: x + 0.25, y: pY + 1.84, w: pW - 0.5, h: 0.34, fontSize: 9, fontFace: T.HEAD, bold: true, color: p.ic, align: 'center', valign: 'middle', margin: 0 });
      s.addText(p.desc, { x: x + 0.18, y: pY + 2.4, w: pW - 0.36, h: 1.4, fontSize: 10.5, fontFace: T.BODY, color: T.TEXTM, align: 'center', margin: 0 });
    }

    s.addText('Every project ships a deck, a portfolio page, and a place on the studio dashboard — without a bespoke setup.', { x: 0.42, y: 5.08, w: 9.16, h: 0.24, fontSize: 9.5, fontFace: T.BODY, color: T.TEXTL, align: 'center', italic: true, margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — ROADMAP & CLOSE
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: T.BG };
    slideHeader(s, pres, 10, 'Roadmap and Close', 'Where the template goes next — and the studio idea behind it.');

    const milestones = [
      { icon: 'checkCirc', ic: T.BLUE, bg: T.BLUE_L, num: '1', label: 'Foundation',  desc: 'Template + dashboard baseline (May 21).' },
      { icon: 'cubes',     ic: T.TEAL, bg: T.TEAL_L, num: '2', label: 'First Inheritor', desc: 'CPI Engine fully aligned (Jun 07).' },
      { icon: 'repeat',    ic: T.PURP, bg: T.PURP_L, num: '3', label: 'More Projects',   desc: 'Macfire, Weight Tracker onboarded.' },
      { icon: 'robot',     ic: T.BLUE, bg: T.BLUE_L, num: '4', label: 'Agent Automation',desc: 'Showcase + portfolio agents productive.' },
      { icon: 'zap',       ic: T.TEAL, bg: T.TEAL_L, num: '5', label: 'Scale + CI',      desc: 'Workflow enhancements (Jun 30).' },
    ];
    const mW = 1.65, mH = 1.95, mGap = 0.14, mX0 = 0.42, mY = 1.0;
    for (let i = 0; i < milestones.length; i++) {
      const m = milestones[i];
      const x = mX0 + i * (mW + mGap);
      card(s, pres, x, mY, mW, mH);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.12, y: mY + 0.12, w: 0.38, h: 0.26, rectRadius: 0.07, fill: { color: T.BLUE }, line: { color: T.BLUE } });
      s.addText(m.num, { x: x + 0.12, y: mY + 0.13, w: 0.38, h: 0.22, fontSize: 10, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'center', margin: 0 });
      const cx = x + (mW - 0.55) / 2;
      await iconCircle(s, pres, m.icon, m.ic, m.bg, cx, mY + 0.52, 0.55);
      s.addText(m.label, { x: x + 0.06, y: mY + 1.18, w: mW - 0.12, h: 0.36, fontSize: 10.5, fontFace: T.HEAD, bold: true, color: T.TEXT, align: 'center', margin: 0 });
      s.addText(m.desc,  { x: x + 0.06, y: mY + 1.54, w: mW - 0.12, h: 0.34, fontSize: 8.5,  fontFace: T.BODY, color: T.TEXTM, align: 'center', margin: 0 });

      if (i < milestones.length - 1) {
        const ax = x + mW + 0.01;
        s.addShape(pres.shapes.RECTANGLE, { x: ax, y: mY + mH / 2 - 0.02, w: mGap - 0.02, h: 0.04, fill: { color: T.BLUE }, line: { color: T.BLUE } });
      }
    }

    // Closing tagline bar
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.42, y: 3.25, w: 9.16, h: 1.55, rectRadius: 0.1, fill: { color: T.INDIGO }, line: { color: T.INDIGO }, shadow: makeShadow() });
    const starImg = await iconPng('star', '#FFFFFF');
    s.addImage({ data: starImg, x: 0.72, y: 3.62, w: 0.5, h: 0.5 });
    s.addText('The operating system behind every studio project.', { x: 1.4, y: 3.4, w: 7.8, h: 0.5, fontSize: 17, fontFace: T.HEAD, bold: true, color: T.WHITE, align: 'left', margin: 0 });
    s.addText('Reusable. Agent-driven. SSOT-disciplined. Built so every project compounds the studio.', { x: 1.4, y: 3.95, w: 7.8, h: 0.7, fontSize: 11.5, fontFace: T.BODY, color: 'BFDBFE', align: 'left', margin: 0 });

    s.addText('AI Systems Studio — Jonathan McCrimmond', { x: 0.42, y: 5.1, w: 9.16, h: 0.24, fontSize: 9.5, fontFace: T.BODY, color: T.TEXTL, align: 'right', italic: true, margin: 0 });
  }

  // ─── Write output ──────────────────────────────────────────────────────────
  const outPath = '/Users/jonathanmccrimmond/Projects/ai-systems-studio-template/slides/AISS-Template-Showcase-v0.1.pptx';
  await pres.writeFile({ fileName: outPath });
  console.log('Done:', outPath);

})().catch(err => { console.error(err); process.exit(1); });
