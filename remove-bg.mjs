import { removeBackground } from '@imgly/background-removal-node';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error('Usage: node remove-bg.mjs <input.jpg> <output.png>');
  process.exit(1);
}

const inputPath = path.resolve(__dirname, input);
const outputPath = path.resolve(__dirname, output);

const inputUrl = new URL(`file:///${inputPath.replace(/\\/g, '/')}`);
console.log(`Processing: ${inputUrl.href}`);
const blob = await removeBackground(inputUrl.href);
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(outputPath, buffer);
console.log(`Saved: ${outputPath}`);
