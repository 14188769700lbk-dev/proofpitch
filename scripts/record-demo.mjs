import { createRequire } from "node:module";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const outputDir = path.resolve(process.argv[2] || path.join(projectRoot, "..", "output", "proofpitch-demo"));
const outputPath = path.join(outputDir, "proofpitch-demo-silent.webm");
const appUrl = process.env.PROOFPITCH_URL || "http://127.0.0.1:8080";
const architecturePath = path.join(projectRoot, "docs", "architecture.png");
const architectureData = `data:image/png;base64,${(await readFile(architecturePath)).toString("base64")}`;

await mkdir(outputDir, { recursive: true });

const launchOptions = { headless: true };
if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
  launchOptions.executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
}
const browser = await chromium.launch(launchOptions);
const context = await browser.newContext({
  viewport: { width: 1536, height: 864 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: outputDir,
    size: { width: 1536, height: 864 },
  },
});
const page = await context.newPage();
const video = page.video();

await page.goto(appUrl, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "One honest application, ready for review" }).waitFor();

await page.addStyleTag({
  content: `
    #proofpitch-demo-caption {
      position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
      z-index: 2147483647; width: min(1180px, calc(100vw - 72px));
      box-sizing: border-box; padding: 15px 22px; border: 1px solid rgba(255,255,255,.2);
      border-radius: 14px; background: rgba(10,18,24,.93); color: #f8fbf7;
      font: 600 22px/1.35 Inter, ui-sans-serif, system-ui, sans-serif;
      text-align: center; box-shadow: 0 18px 50px rgba(0,0,0,.3);
      opacity: 0; transition: opacity .35s ease;
    }
    #proofpitch-demo-caption.visible { opacity: 1; }
    #proofpitch-demo-chapter {
      position: fixed; inset: 0; z-index: 2147483646; display: none;
      align-items: center; justify-content: center; flex-direction: column;
      padding: 72px; box-sizing: border-box; color: #f7fbf5;
      background: radial-gradient(circle at 18% 18%, #244d42 0, #132c29 34%, #0b1618 100%);
      text-align: center; font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    }
    #proofpitch-demo-chapter.visible { display: flex; animation: proofpitchFade .5s ease; }
    #proofpitch-demo-chapter h2 { margin: 0; max-width: 1100px; font-size: 68px; line-height: 1.04; letter-spacing: -.04em; }
    #proofpitch-demo-chapter p { max-width: 980px; margin: 24px 0 0; color: #cbd9d4; font-size: 28px; line-height: 1.4; }
    #proofpitch-demo-chapter img { max-width: 1180px; max-height: 620px; margin-bottom: 24px; border-radius: 18px; box-shadow: 0 28px 80px rgba(0,0,0,.4); }
    .proofpitch-demo-focus { outline: 4px solid #72d09f !important; outline-offset: 5px; border-radius: 12px; transition: outline .2s ease; }
    @keyframes proofpitchFade { from { opacity: 0 } to { opacity: 1 } }
  `,
});

await page.evaluate(() => {
  const caption = document.createElement("div");
  caption.id = "proofpitch-demo-caption";
  document.body.appendChild(caption);
  const chapter = document.createElement("div");
  chapter.id = "proofpitch-demo-chapter";
  document.body.appendChild(chapter);
});

async function clearFocus() {
  await page.locator(".proofpitch-demo-focus").evaluateAll((nodes) => {
    for (const node of nodes) node.classList.remove("proofpitch-demo-focus");
  });
}

async function caption(text, milliseconds, selector) {
  await clearFocus();
  if (selector) {
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    await target.evaluate((node) => node.classList.add("proofpitch-demo-focus"));
  }
  await page.locator("#proofpitch-demo-caption").evaluate((node, nextText) => {
    node.textContent = nextText;
    node.classList.add("visible");
  }, text);
  await page.waitForTimeout(milliseconds);
}

async function chapter(title, subtitle, milliseconds, imageUrl = "") {
  await clearFocus();
  await page.locator("#proofpitch-demo-caption").evaluate((node) => node.classList.remove("visible"));
  await page.locator("#proofpitch-demo-chapter").evaluate((node, data) => {
    node.innerHTML = `${data.imageUrl ? `<img src="${data.imageUrl}" alt="">` : ""}<h2>${data.title}</h2><p>${data.subtitle}</p>`;
    node.classList.add("visible");
  }, { title, subtitle, imageUrl });
  await page.waitForTimeout(milliseconds);
  await page.locator("#proofpitch-demo-chapter").evaluate((node) => node.classList.remove("visible"));
}

await chapter(
  "ProofPitch",
  "Evidence before applications. Human judgment before action.",
  12_000,
);

await caption(
  "A review agent for independent developers: move quickly without exaggerating experience or overlooking risk.",
  18_000,
  ".workspace-heading",
);

await chapter(
  "Four Strands tools, one gated decision",
  "Parse → match public evidence → review risk → prepare a grounded draft",
  24_000,
  architectureData,
);

await caption(
  "The demo uses synthetic listings. Start with a junior model-card role and inspect only supplied public evidence.",
  17_000,
  ".opportunity-row.selected",
);

await caption(
  "Python and FastAPI are verified. Responsible-AI documentation is verified. MLflow remains an explicit disclosure gap.",
  22_000,
  ".evidence-table",
);

await page.locator("#review").scrollIntoViewIfNeeded();
await caption(
  "The draft preserves that gap. Recording human review stays local and sends no application.",
  10_000,
  ".draft-section",
);
await page.getByRole("button", { name: "Request human approval" }).click();
await page.getByRole("status").waitFor();
await caption(
  "Human review recorded locally. No external application was sent.",
  10_000,
  ".approval-message",
);

await page.getByRole("button", { name: /Suspicious AI Setup Assistant/ }).click();
await page.getByRole("heading", { name: "Do not apply" }).waitFor();
await caption(
  "A Telegram-only contact request and crypto registration fee trigger the hard-risk gate.",
  16_000,
  ".risk-rail",
);
await caption(
  "ProofPitch withholds the draft, disables approval, and blocks the final workflow stages.",
  16_000,
  ".timeline",
);

await chapter(
  "Narrow by design",
  "No automatic sending. No invented experience. No claim that optional Bedrock execution occurred.",
  13_000,
);

await chapter(
  "Evidence before applications",
  "Ten tests · FastAPI · React · Strands Agents SDK · reproducible synthetic fixtures",
  10_000,
);

await clearFocus();
await context.close();
await video.saveAs(outputPath);
await browser.close();

console.log(outputPath);
