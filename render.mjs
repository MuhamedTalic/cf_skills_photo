// Usage: node render.mjs <input.html> [output.png]
// Example: node render.mjs assets/templates/post.html output/post.png
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlArg = process.argv[2];
const outArg  = process.argv[3];

if (!htmlArg) {
  console.error('Usage: node render.mjs <input.html> [output.png]');
  process.exit(1);
}

const htmlPath = path.resolve(__dirname, htmlArg);
const outPath  = outArg
  ? path.resolve(__dirname, outArg)
  : htmlPath.replace(/\.html$/, '.png');

mkdirSync(path.dirname(outPath), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
await page.goto(`file:///${htmlPath}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
await browser.close();
console.log(`Saved: ${outPath}`);
