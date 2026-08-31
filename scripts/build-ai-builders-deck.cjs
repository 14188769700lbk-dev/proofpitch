const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'ProofPitch';
pptx.subject = 'AI Builders Hackathon 2026 submission deck';
pptx.title = 'ProofPitch — Evidence before applications';
pptx.company = 'Independent submission';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  lang: 'en-US',
};
pptx.defineSlideMaster({
  title: 'PROOFPITCH',
  background: { color: 'F7F8F3' },
  objects: [
    { line: { x: 0.55, y: 7.08, w: 12.23, h: 0, line: { color: 'D7DBD0', width: 0.7 } } },
    { text: { text: 'PROOFPITCH · AI BUILDERS 2026', options: { x: 0.6, y: 7.12, w: 4.2, h: 0.16, fontFace: 'Arial', fontSize: 6.5, bold: true, charSpacing: 1.4, color: '586072', margin: 0 } } },
    { text: { text: 'LOCAL SUBMISSION CANDIDATE', options: { x: 10.1, y: 7.12, w: 2.65, h: 0.16, fontFace: 'Arial', fontSize: 6.5, bold: true, charSpacing: 1.2, color: '586072', align: 'right', margin: 0 } } },
  ],
  slideNumber: { x: 12.85, y: 7.1, w: 0.18, h: 0.18, fontFace: 'Arial', fontSize: 6.5, color: '586072', align: 'right', margin: 0 },
});

const C = {
  bg: 'F7F8F3',
  white: 'FFFFFF',
  navy: '0A1638',
  navy2: '172348',
  gray: '586072',
  light: 'E9ECE4',
  line: 'CCD1C8',
  lime: 'B7EC00',
  limePale: 'EFF9C9',
  red: 'A83B34',
  redPale: 'FBE9E6',
  amber: 'B37416',
  amberPale: 'FFF1D8',
};

const root = path.resolve(__dirname, '..');
const workspaceImg = path.join(root, 'docs', 'workspace.png');
const riskImg = path.join(root, 'docs', 'risk-blocked.png');
const architectureImg = path.join(root, 'docs', 'architecture.png');
const outDir = path.join(root, 'artifacts');
const outPath = path.join(outDir, 'ProofPitch-AI-Builders-Deck.pptx');

function addTitle(slide, eyebrow, title, subtitle) {
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.62, y: 0.34, w: 4.9, h: 0.2, fontFace: 'Arial', fontSize: 7.5,
    bold: true, charSpacing: 2.2, color: C.gray, margin: 0,
  });
  slide.addText(title, {
    x: 0.6, y: 0.66, w: 12.1, h: 0.62, fontFace: 'Arial', fontSize: 27,
    bold: true, color: C.navy, margin: 0, breakLine: false, fit: 'shrink',
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.62, y: 1.34, w: 11.7, h: 0.42, fontFace: 'Arial', fontSize: 12.5,
      color: C.gray, margin: 0, fit: 'shrink',
    });
  }
}

function addPill(slide, text, x, y, w, fill = C.limePale, color = C.navy) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.34, rectRadius: 0.08,
    fill: { color: fill }, line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.08, y: y + 0.075, w: w - 0.16, h: 0.14,
    fontFace: 'Arial', fontSize: 7.5, bold: true, charSpacing: 0.7,
    color, align: 'center', margin: 0, fit: 'shrink',
  });
}

function addCard(slide, x, y, w, h, fill = C.white, line = C.line, radius = 0.12) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: radius,
    fill: { color: fill }, line: { color: line, width: 0.9 },
  });
}

function addImageFrame(slide, imagePath, x, y, w, h, mode = 'contain', fill = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: fill }, line: { color: C.line, width: 0.8 },
    shadow: { type: 'outer', color: '000000', opacity: 0.12, blur: 2, angle: 45, distance: 1.2 },
  });
  slide.addImage({
    path: imagePath,
    x: x + 0.05, y: y + 0.05,
    sizing: { type: mode, w: w - 0.1, h: h - 0.1 },
  });
}

function addDot(slide, x, y, color = C.lime, size = 0.16) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: size, h: size, fill: { color }, line: { color },
  });
}

function addStep(slide, n, title, detail, x, y, w, accent = C.lime) {
  addCard(slide, x, y, w, 1.16, C.white, C.line);
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.18, y: y + 0.2, w: 0.42, h: 0.42,
    fill: { color: accent }, line: { color: accent },
  });
  slide.addText(String(n), {
    x: x + 0.18, y: y + 0.285, w: 0.42, h: 0.14,
    fontFace: 'Arial', fontSize: 9, bold: true, color: C.navy, align: 'center', margin: 0,
  });
  slide.addText(title, {
    x: x + 0.73, y: y + 0.18, w: w - 0.9, h: 0.26,
    fontFace: 'Arial', fontSize: 12, bold: true, color: C.navy, margin: 0, fit: 'shrink',
  });
  slide.addText(detail, {
    x: x + 0.73, y: y + 0.52, w: w - 0.9, h: 0.44,
    fontFace: 'Arial', fontSize: 8.5, color: C.gray, margin: 0, fit: 'shrink', valign: 'mid',
  });
}

function addFooterNote(slide, text) {
  slide.addText(text, {
    x: 0.62, y: 6.74, w: 11.9, h: 0.18, fontFace: 'Arial', fontSize: 7,
    color: C.gray, italic: true, margin: 0, fit: 'shrink',
  });
}

// 1 — Hero
{
  const slide = pptx.addSlide('PROOFPITCH');
  slide.background = { color: C.navy };
  slide.addText('PROOFPITCH', {
    x: 0.7, y: 0.48, w: 4.2, h: 0.22, fontFace: 'Arial', fontSize: 8,
    bold: true, charSpacing: 2.5, color: C.lime, margin: 0,
  });
  slide.addText('Evidence before\napplications.', {
    x: 0.68, y: 1.0, w: 5.4, h: 1.55, fontFace: 'Arial', fontSize: 34,
    bold: true, color: C.white, margin: 0, breakLine: false, fit: 'shrink',
  });
  slide.addText('An AI agent that grounds every claim, exposes gaps, and blocks hard scam signals before a human decides.', {
    x: 0.72, y: 2.8, w: 5.15, h: 0.92, fontFace: 'Arial', fontSize: 15,
    color: 'D6DCEB', margin: 0, breakLine: false, fit: 'shrink',
  });
  addPill(slide, 'BEST SAAS PRODUCT CANDIDATE', 0.72, 4.08, 2.5, C.lime, C.navy);
  addPill(slide, 'PUBLIC REPO + DEMO VIDEO', 3.38, 4.08, 2.25, '26335D', C.white);
  addImageFrame(slide, workspaceImg, 6.3, 0.75, 6.35, 5.58, 'cover', C.white);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.62, y: 5.7, w: 5.7, h: 0.82, rectRadius: 0.1,
    fill: { color: C.lime }, line: { color: C.lime },
  });
  slide.addText('Truthful drafting · visible gaps · human control', {
    x: 6.88, y: 5.95, w: 5.18, h: 0.22, fontFace: 'Arial', fontSize: 11.5,
    bold: true, color: C.navy, align: 'center', margin: 0, fit: 'shrink',
  });
  slide.addText('AI Builders Hackathon 2026 · local submission candidate', {
    x: 0.72, y: 6.54, w: 5.4, h: 0.2, fontFace: 'Arial', fontSize: 8,
    color: 'AEB7CC', margin: 0,
  });
}

// 2 — Problem
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Problem', 'Application volume creates a trust problem.', 'The product thesis: help applicants move faster without inventing experience or ignoring obvious risk.');
  const items = [
    ['01', 'Claims inflate', 'Generic drafting can turn willingness to learn into experience that does not exist.', C.amberPale, C.amber],
    ['02', 'Risk hides', 'Upfront payment, crypto, and off-platform contact can be lost inside a fast workflow.', C.redPale, C.red],
    ['03', 'Review fragments', 'Listings, portfolios, risk checks, and drafts live in separate mental tabs.', C.limePale, C.navy],
  ];
  items.forEach((it, i) => {
    const x = 0.68 + i * 4.18;
    addCard(slide, x, 2.05, 3.78, 3.7, it[3], it[3]);
    slide.addText(it[0], { x: x + 0.25, y: 2.28, w: 0.7, h: 0.38, fontFace: 'Arial', fontSize: 22, bold: true, color: it[4], margin: 0 });
    slide.addText(it[1], { x: x + 0.25, y: 3.0, w: 3.15, h: 0.42, fontFace: 'Arial', fontSize: 19, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
    slide.addText(it[2], { x: x + 0.25, y: 3.62, w: 3.15, h: 1.1, fontFace: 'Arial', fontSize: 12, color: C.gray, margin: 0, breakLine: false, fit: 'shrink', valign: 'mid' });
    slide.addShape(pptx.ShapeType.line, { x: x + 0.25, y: 5.2, w: 2.95, h: 0, line: { color: it[4], width: 2.5 } });
  });
  addFooterNote(slide, 'These are product hypotheses illustrated by synthetic fixtures—not measured market statistics.');
}

// 3 — Product loop
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Product', 'One reviewable decision, not another writing box.', 'Every stage leaves evidence for the next stage—and the risk gate can stop the workflow.');
  addStep(slide, 1, 'Parse', 'Turn a listing into explicit, typed requirements.', 0.7, 2.05, 2.28);
  addStep(slide, 2, 'Match', 'Use only public artifacts supplied to the run.', 3.12, 2.05, 2.28);
  addStep(slide, 3, 'Gate', 'Detect payment, crypto, suspicious checks, and off-platform-only contact.', 5.54, 2.05, 2.28);
  addStep(slide, 4, 'Draft', 'Cite supported evidence and preserve every gap.', 7.96, 2.05, 2.28);
  addStep(slide, 5, 'Review', 'Keep the result local until a human approves.', 10.38, 2.05, 2.28);
  [2.98, 5.4, 7.82, 10.24].forEach((x) => {
    slide.addShape(pptx.ShapeType.chevron, { x, y: 2.41, w: 0.14, h: 0.36, fill: { color: C.navy }, line: { color: C.navy } });
  });
  addCard(slide, 0.7, 3.72, 7.0, 1.65, C.limePale, C.lime);
  slide.addText('SAFE OR CAVEATED', { x: 1.0, y: 4.0, w: 2.3, h: 0.24, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 1.6, color: C.gray, margin: 0 });
  slide.addText('Grounded draft + visible gaps', { x: 1.0, y: 4.42, w: 5.9, h: 0.42, fontFace: 'Arial', fontSize: 19, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
  addCard(slide, 7.98, 3.72, 4.65, 1.65, C.redPale, 'D88983');
  slide.addText('HARD RISK', { x: 8.28, y: 4.0, w: 1.7, h: 0.24, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 1.6, color: C.red, margin: 0 });
  slide.addText('Draft withheld · approval blocked', { x: 8.28, y: 4.42, w: 3.8, h: 0.42, fontFace: 'Arial', fontSize: 17, bold: true, color: C.red, margin: 0, fit: 'shrink' });
  addFooterNote(slide, 'External sending is intentionally absent from the current product boundary.');
}

// 4 — Evidence state
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Evidence grounding', 'A gap stays a gap.', 'ProofPitch links supported requirements to public artifacts and labels unsupported requirements instead of smoothing them over.');
  addImageFrame(slide, workspaceImg, 0.7, 1.95, 8.35, 4.48, 'cover', C.white);
  addCard(slide, 9.38, 1.95, 3.25, 4.48, C.white, C.line);
  addPill(slide, 'APPLY WITH CAVEAT', 9.72, 2.28, 2.55, C.limePale, C.navy);
  const points = [
    ['Python + FastAPI', 'Verified from supplied public work'],
    ['Responsible AI docs', 'Verified from reviewable artifacts'],
    ['MLflow', 'No public evidence → disclose gap'],
  ];
  points.forEach((p, i) => {
    const y = 3.02 + i * 0.86;
    addDot(slide, 9.72, y + 0.08, i === 2 ? C.amber : C.lime, 0.14);
    slide.addText(p[0], { x: 10.0, y, w: 2.2, h: 0.2, fontFace: 'Arial', fontSize: 10.5, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
    slide.addText(p[1], { x: 10.0, y: y + 0.3, w: 2.18, h: 0.32, fontFace: 'Arial', fontSize: 8, color: C.gray, margin: 0, fit: 'shrink' });
  });
  slide.addText('The draft can say “I would ramp up.”\nIt cannot say “I have experience.”', { x: 9.72, y: 5.78, w: 2.55, h: 0.38, fontFace: 'Arial', fontSize: 9.5, bold: true, color: C.navy, margin: 0, fit: 'shrink', align: 'center' });
}

// 5 — Risk state
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Safety gate', 'Hard risk means no draft.', 'The risk output is a required input to drafting—not a warning that can be ignored downstream.');
  addCard(slide, 0.7, 2.05, 3.25, 4.15, C.redPale, 'D88983');
  addPill(slide, 'DO NOT APPLY', 1.05, 2.42, 2.55, C.red, C.white);
  const signals = ['Upfront payment', 'Crypto transfer', 'Off-platform-only contact'];
  signals.forEach((t, i) => {
    const y = 3.18 + i * 0.68;
    slide.addShape(pptx.ShapeType.ellipse, { x: 1.05, y, w: 0.26, h: 0.26, fill: { color: C.red }, line: { color: C.red } });
    slide.addText('×', { x: 1.05, y: y + 0.015, w: 0.26, h: 0.18, fontFace: 'Arial', fontSize: 10, bold: true, color: C.white, align: 'center', margin: 0 });
    slide.addText(t, { x: 1.48, y: y - 0.01, w: 1.95, h: 0.25, fontFace: 'Arial', fontSize: 10.5, bold: true, color: C.red, margin: 0, fit: 'shrink' });
  });
  slide.addText('Result', { x: 1.05, y: 5.32, w: 0.8, h: 0.2, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 1.3, color: C.gray, margin: 0 });
  slide.addText('Draft withheld\nApproval blocked', { x: 1.05, y: 5.58, w: 2.4, h: 0.5, fontFace: 'Arial', fontSize: 14, bold: true, color: C.red, margin: 0, fit: 'shrink' });
  addImageFrame(slide, riskImg, 4.28, 2.05, 8.35, 4.15, 'cover', C.white);
  addFooterNote(slide, 'The screenshot uses synthetic fixtures; no employer is contacted and no payment data is transmitted.');
}

// 6 — Architecture
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Architecture', 'Four tools, one explicit dependency chain.', 'A credential-free replay lets judges reproduce the workflow; an optional Bedrock path exists but is not claimed as executed.');
  addCard(slide, 0.72, 2.08, 2.1, 1.3, C.white, C.line);
  slide.addText('INPUT', { x: 0.96, y: 2.31, w: 0.8, h: 0.18, fontFace: 'Arial', fontSize: 7, bold: true, charSpacing: 1.3, color: C.gray, margin: 0 });
  slide.addText('React workspace', { x: 0.96, y: 2.66, w: 1.55, h: 0.28, fontFace: 'Arial', fontSize: 13, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
  slide.addText('Synthetic listing + public evidence', { x: 0.96, y: 3.02, w: 1.55, h: 0.2, fontFace: 'Arial', fontSize: 7.5, color: C.gray, margin: 0, fit: 'shrink' });
  slide.addShape(pptx.ShapeType.chevron, { x: 2.92, y: 2.53, w: 0.18, h: 0.38, fill: { color: C.navy }, line: { color: C.navy } });
  addCard(slide, 3.2, 2.08, 1.72, 1.3, C.white, C.line);
  slide.addText('API', { x: 3.43, y: 2.31, w: 0.45, h: 0.18, fontFace: 'Arial', fontSize: 7, bold: true, charSpacing: 1.3, color: C.gray, margin: 0 });
  slide.addText('FastAPI', { x: 3.43, y: 2.66, w: 1.05, h: 0.28, fontFace: 'Arial', fontSize: 13, bold: true, color: C.navy, margin: 0 });
  slide.addText('Typed request + response', { x: 3.43, y: 3.02, w: 1.14, h: 0.2, fontFace: 'Arial', fontSize: 7.5, color: C.gray, margin: 0, fit: 'shrink' });
  slide.addShape(pptx.ShapeType.chevron, { x: 5.02, y: 2.53, w: 0.18, h: 0.38, fill: { color: C.navy }, line: { color: C.navy } });
  addCard(slide, 5.3, 1.95, 7.32, 2.42, 'F0F2F6', C.line);
  slide.addText('STRANDS AGENTS SDK TOOL REGISTRY', { x: 5.62, y: 2.16, w: 4.0, h: 0.2, fontFace: 'Arial', fontSize: 7.5, bold: true, charSpacing: 1.4, color: C.gray, margin: 0 });
  const tools = [
    ['1 · Parse', 'Validate listing'],
    ['2 · Match', 'Public evidence'],
    ['3 · Risk', 'Hard-signal gate'],
    ['4 · Draft', 'Risk-aware'],
  ];
  tools.forEach((t, i) => {
    const x = 5.62 + i * 1.7;
    addCard(slide, x, 2.6, 1.48, 1.22, i === 3 ? C.limePale : C.white, i === 3 ? C.lime : C.line);
    slide.addText(t[0], { x: x + 0.14, y: 2.87, w: 1.18, h: 0.25, fontFace: 'Arial', fontSize: 10.5, bold: true, color: C.navy, align: 'center', margin: 0, fit: 'shrink' });
    slide.addText(t[1], { x: x + 0.14, y: 3.31, w: 1.18, h: 0.18, fontFace: 'Arial', fontSize: 7.2, color: C.gray, align: 'center', margin: 0, fit: 'shrink' });
    if (i < 3) slide.addShape(pptx.ShapeType.chevron, { x: x + 1.52, y: 3.02, w: 0.13, h: 0.3, fill: { color: C.navy }, line: { color: C.navy } });
  });
  addCard(slide, 0.72, 4.05, 4.2, 1.56, C.navy, C.navy);
  slide.addText('DEFAULT REPLAY', { x: 1.02, y: 4.31, w: 1.75, h: 0.2, fontFace: 'Arial', fontSize: 7.5, bold: true, charSpacing: 1.5, color: C.lime, margin: 0 });
  slide.addText('Credential-free and deterministic', { x: 1.02, y: 4.72, w: 3.45, h: 0.32, fontFace: 'Arial', fontSize: 15, bold: true, color: C.white, margin: 0, fit: 'shrink' });
  slide.addText('Optional live path: same tools through a Strands model loop with Amazon Bedrock.', { x: 1.02, y: 5.14, w: 3.44, h: 0.24, fontFace: 'Arial', fontSize: 7.4, color: 'D6DCEB', margin: 0, fit: 'shrink' });
  addCard(slide, 5.3, 4.72, 3.15, 1.02, C.limePale, C.lime);
  slide.addText('SAFE OR CAVEATED', { x: 5.58, y: 4.94, w: 1.65, h: 0.18, fontFace: 'Arial', fontSize: 7, bold: true, charSpacing: 1.1, color: C.gray, margin: 0 });
  slide.addText('Grounded draft + visible gaps', { x: 5.58, y: 5.26, w: 2.47, h: 0.22, fontFace: 'Arial', fontSize: 11.5, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
  addCard(slide, 8.72, 4.72, 3.9, 1.02, C.redPale, 'D88983');
  slide.addText('HARD RISK', { x: 9.0, y: 4.94, w: 1.25, h: 0.18, fontFace: 'Arial', fontSize: 7, bold: true, charSpacing: 1.1, color: C.red, margin: 0 });
  slide.addText('Draft withheld · approval blocked', { x: 9.0, y: 5.26, w: 3.14, h: 0.22, fontFace: 'Arial', fontSize: 11.5, bold: true, color: C.red, margin: 0, fit: 'shrink' });
  slide.addShape(pptx.ShapeType.line, { x: 9.35, y: 3.82, w: 0, h: 0.3, line: { color: C.navy, width: 1.4 } });
  slide.addShape(pptx.ShapeType.line, { x: 6.9, y: 4.12, w: 3.67, h: 0, line: { color: C.navy, width: 1.4 } });
  slide.addShape(pptx.ShapeType.line, { x: 6.9, y: 4.12, w: 0, h: 0.6, line: { color: C.navy, width: 1.4, endArrowType: 'triangle' } });
  slide.addShape(pptx.ShapeType.line, { x: 10.57, y: 4.12, w: 0, h: 0.6, line: { color: C.red, width: 1.4, endArrowType: 'triangle' } });
  addPill(slide, 'REACT', 0.88, 6.03, 1.0, 'E7EBF6', C.navy);
  addPill(slide, 'FASTAPI', 2.0, 6.03, 1.2, 'E7EBF6', C.navy);
  addPill(slide, 'STRANDS SDK', 3.32, 6.03, 1.55, C.limePale, C.navy);
  addPill(slide, 'PYDANTIC', 4.99, 6.03, 1.3, 'E7EBF6', C.navy);
  addPill(slide, 'DOCKER', 6.41, 6.03, 1.15, 'E7EBF6', C.navy);
  addPill(slide, 'PYTEST', 7.68, 6.03, 1.12, 'E7EBF6', C.navy);
}

// 7 — Boundaries
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Human control', 'Useful autonomy has a hard edge.', 'The agent can prepare a review record; it cannot impersonate the applicant or create an irreversible external action.');
  addCard(slide, 0.72, 1.95, 5.85, 4.42, C.limePale, C.lime);
  addPill(slide, 'THE AGENT CAN', 1.06, 2.3, 1.72, C.lime, C.navy);
  const can = [
    'Parse a synthetic or supplied listing',
    'Map claims to named public evidence',
    'Expose unsupported requirements',
    'Detect hard risk signals',
    'Prepare or withhold a draft',
    'Record a local human decision',
  ];
  can.forEach((t, i) => {
    const y = 3.04 + i * 0.48;
    addDot(slide, 1.08, y + 0.03, C.lime, 0.14);
    slide.addText(t, { x: 1.38, y, w: 4.55, h: 0.22, fontFace: 'Arial', fontSize: 10, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
  });
  addCard(slide, 6.8, 1.95, 5.82, 4.42, C.redPale, 'D88983');
  addPill(slide, 'THE AGENT CANNOT', 7.14, 2.3, 1.98, C.red, C.white);
  const cannot = [
    'Invent experience or conceal a gap',
    'Send an application or message',
    'Contact an employer',
    'Transmit payment or identity data',
    'Override a hard risk block',
    'Turn local approval into an external send',
  ];
  cannot.forEach((t, i) => {
    const y = 3.04 + i * 0.48;
    slide.addShape(pptx.ShapeType.ellipse, { x: 7.16, y: y + 0.01, w: 0.17, h: 0.17, fill: { color: C.red }, line: { color: C.red } });
    slide.addText('×', { x: 7.16, y: y + 0.005, w: 0.17, h: 0.13, fontFace: 'Arial', fontSize: 7, bold: true, color: C.white, align: 'center', margin: 0 });
    slide.addText(t, { x: 7.46, y, w: 4.45, h: 0.22, fontFace: 'Arial', fontSize: 10, bold: true, color: C.red, margin: 0, fit: 'shrink' });
  });
  addFooterNote(slide, 'Current boundary is deliberate product behavior, not an unimplemented promise of autonomous sending.');
}

// 8 — Readiness
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'Reproducible readiness', 'Judges can inspect the product today.', 'The current evidence is technical—not a claim of customers, deployment, or commercial traction.');
  const metrics = [
    ['10', 'automated tests', 'Core, API, and agent-tool behavior'],
    ['4', 'registered tools', 'Parse · match · risk · draft'],
    ['2:49', 'public demo', 'Real local UI and API path'],
    ['0', 'external sends', 'Human-controlled boundary'],
  ];
  metrics.forEach((m, i) => {
    const x = 0.72 + i * 3.04;
    addCard(slide, x, 2.02, 2.72, 2.15, i === 3 ? C.redPale : C.white, i === 3 ? 'D88983' : C.line);
    slide.addText(m[0], { x: x + 0.22, y: 2.33, w: 2.28, h: 0.58, fontFace: 'Arial', fontSize: 30, bold: true, color: i === 3 ? C.red : C.navy, align: 'center', margin: 0 });
    slide.addText(m[1], { x: x + 0.22, y: 3.0, w: 2.28, h: 0.26, fontFace: 'Arial', fontSize: 11.5, bold: true, color: C.navy, align: 'center', margin: 0, fit: 'shrink' });
    slide.addText(m[2], { x: x + 0.28, y: 3.42, w: 2.16, h: 0.42, fontFace: 'Arial', fontSize: 8, color: C.gray, align: 'center', margin: 0, fit: 'shrink' });
  });
  addCard(slide, 0.72, 4.58, 11.88, 1.42, C.navy, C.navy);
  const checks = [
    ['✓', 'Frontend production build'],
    ['✓', 'Docker build in CI'],
    ['✓', 'Apache-2.0 public repository'],
    ['✓', 'Synthetic reproducible fixtures'],
  ];
  checks.forEach((c, i) => {
    const x = 1.0 + i * 2.85;
    slide.addShape(pptx.ShapeType.ellipse, { x, y: 5.0, w: 0.32, h: 0.32, fill: { color: C.lime }, line: { color: C.lime } });
    slide.addText(c[0], { x, y: 5.06, w: 0.32, h: 0.13, fontFace: 'Arial', fontSize: 8, bold: true, color: C.navy, align: 'center', margin: 0 });
    slide.addText(c[1], { x: x + 0.46, y: 4.98, w: 1.95, h: 0.36, fontFace: 'Arial', fontSize: 8.5, bold: true, color: C.white, margin: 0, fit: 'shrink', valign: 'mid' });
  });
  addFooterNote(slide, 'Verification counts are based on the current local repository; re-run before any external submission.');
}

// 9 — Market and model
{
  const slide = pptx.addSlide('PROOFPITCH');
  addTitle(slide, 'SaaS path', 'Start with applicants. Expand through trust.', 'The user and business model below are hypotheses to validate—not current customers or revenue.');
  const stages = [
    ['1', 'Independent developers', 'Evidence-first review for roles and freelance work.', 'SUBSCRIPTION'],
    ['2', 'Career support teams', 'Shared, reviewable evidence and safety workspaces.', 'SEAT-BASED'],
    ['3', 'Opportunity platforms', 'A grounded-review and hard-risk API layer.', 'PLATFORM API'],
  ];
  stages.forEach((s, i) => {
    const x = 0.72 + i * 4.05;
    addCard(slide, x, 2.0, 3.66, 3.92, i === 0 ? C.limePale : C.white, i === 0 ? C.lime : C.line);
    slide.addShape(pptx.ShapeType.ellipse, { x: x + 0.28, y: 2.3, w: 0.62, h: 0.62, fill: { color: i === 0 ? C.lime : C.navy }, line: { color: i === 0 ? C.lime : C.navy } });
    slide.addText(s[0], { x: x + 0.28, y: 2.47, w: 0.62, h: 0.2, fontFace: 'Arial', fontSize: 12, bold: true, color: i === 0 ? C.navy : C.white, align: 'center', margin: 0 });
    slide.addText(s[1], { x: x + 0.28, y: 3.25, w: 3.05, h: 0.45, fontFace: 'Arial', fontSize: 17, bold: true, color: C.navy, margin: 0, fit: 'shrink' });
    slide.addText(s[2], { x: x + 0.28, y: 4.0, w: 3.05, h: 0.84, fontFace: 'Arial', fontSize: 11, color: C.gray, margin: 0, fit: 'shrink', valign: 'mid' });
    addPill(slide, s[3], x + 0.28, 5.22, 1.45, i === 0 ? C.lime : 'E7EBF6', C.navy);
  });
  addFooterNote(slide, 'No pricing, willingness-to-pay, retention, or acquisition claim has been validated yet.');
}

// 10 — Close
{
  const slide = pptx.addSlide('PROOFPITCH');
  slide.background = { color: C.navy };
  slide.addText('WHAT EXISTS NOW', { x: 0.72, y: 0.5, w: 2.4, h: 0.22, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 2.2, color: C.lime, margin: 0 });
  slide.addText('A working, inspectable\nSaaS product loop.', { x: 0.7, y: 1.02, w: 5.6, h: 1.36, fontFace: 'Arial', fontSize: 31, bold: true, color: C.white, margin: 0, fit: 'shrink' });
  slide.addText('Repository', { x: 0.74, y: 2.78, w: 1.2, h: 0.2, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 1.3, color: 'AEB7CC', margin: 0 });
  slide.addText('github.com/14188769700lbk-dev/proofpitch', { x: 0.74, y: 3.08, w: 5.5, h: 0.28, fontFace: 'Arial', fontSize: 11.5, bold: true, color: C.white, margin: 0, hyperlink: { url: 'https://github.com/14188769700lbk-dev/proofpitch' }, fit: 'shrink' });
  slide.addText('Demo', { x: 0.74, y: 3.72, w: 1.2, h: 0.2, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 1.3, color: 'AEB7CC', margin: 0 });
  slide.addText('youtu.be/Z6wc1sby9Vo', { x: 0.74, y: 4.02, w: 5.3, h: 0.28, fontFace: 'Arial', fontSize: 11.5, bold: true, color: C.white, margin: 0, hyperlink: { url: 'https://youtu.be/Z6wc1sby9Vo' } });
  addCard(slide, 6.82, 0.78, 5.8, 5.45, '172348', '384566');
  addPill(slide, 'NEXT VALIDATION', 7.22, 1.18, 1.75, C.lime, C.navy);
  const next = [
    'Observe real review behavior with consent',
    'Test whether evidence links improve trust',
    'Validate willingness to pay',
    'Add hosted access and privacy controls',
    'Verify employer identity before any handoff',
  ];
  next.forEach((t, i) => {
    const y = 2.0 + i * 0.58;
    addDot(slide, 7.24, y + 0.03, C.lime, 0.14);
    slide.addText(t, { x: 7.56, y, w: 4.42, h: 0.26, fontFace: 'Arial', fontSize: 11.2, bold: true, color: C.white, margin: 0, fit: 'shrink' });
  });
  slide.addShape(pptx.ShapeType.line, { x: 7.24, y: 5.17, w: 4.66, h: 0, line: { color: '4A5677', width: 1 } });
  slide.addText('Development disclosure', { x: 7.24, y: 5.39, w: 2.4, h: 0.2, fontFace: 'Arial', fontSize: 8, bold: true, charSpacing: 1.2, color: C.lime, margin: 0 });
  slide.addText('Primarily generated and iterated by OpenAI Codex under the solo entrant’s authorization. No customers, revenue, production deployment, or unverified AWS execution is claimed.', { x: 7.24, y: 5.7, w: 4.66, h: 0.45, fontFace: 'Arial', fontSize: 7.7, color: 'D6DCEB', margin: 0, fit: 'shrink' });
  slide.addText('AI BUILDERS 2026 · BEST SAAS PRODUCT CANDIDATE', { x: 0.74, y: 6.58, w: 5.6, h: 0.2, fontFace: 'Arial', fontSize: 7.5, bold: true, charSpacing: 1.2, color: 'AEB7CC', margin: 0 });
}

fs.mkdirSync(outDir, { recursive: true });
pptx.writeFile({ fileName: outPath });
console.log(outPath);
