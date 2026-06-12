// Usage: node render.mjs <input.html> [output.png]
// Example: node render.mjs assets/templates/post.html output/post.png
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

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
  : htmlPath.replace(/\.(html?)$/, '.png');

if (outPath === htmlPath) {
  console.error('Error: output path cannot equal input path. Pass an explicit output filename.');
  process.exit(1);
}

mkdirSync(path.dirname(outPath), { recursive: true });

// Chrome detection: try known install paths, fall back to Puppeteer's bundled browser
const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];

const executablePath = CHROME_CANDIDATES.find(p => existsSync(p)) ?? undefined;

if (executablePath) {
  console.log(`Using Chrome: ${executablePath}`);
} else {
  console.log('Using Puppeteer bundled browser');
}

const browser = await puppeteer.launch({
  ...(executablePath ? { executablePath } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
await page.goto(`file:///${htmlPath}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
await browser.close();
console.log(`Saved: ${outPath}`);
