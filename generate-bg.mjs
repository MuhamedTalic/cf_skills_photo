/**
 * generate-bg.mjs — AI background image generator for MixBox / Proton promo templates
 *
 * Usage:
 *   node generate-bg.mjs "<prompt>"            # custom prompt
 *   node generate-bg.mjs --brand mixbox        # built-in brand preset
 *   node generate-bg.mjs --brand proton-dark --out custom.jpg
 *
 * Requires: HF_TOKEN env var — free at https://huggingface.co/settings/tokens
 * Model: FLUX.1-schnell via HuggingFace Inference API (free tier)
 * Output: saves image to assets/images/bg-generated.jpg (or --out path)
 *
 * Available --brand presets:
 *   mixbox          autumn street, warm orange tones
 *   mixbox-studio   dark studio, dramatic lighting
 *   mixbox-outdoor  mountain trail, golden hour
 *   proton          clean white gym, soft light
 *   proton-dark     dark background, electric blue accent
 */

import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BRAND_PRESETS = {
  'mixbox':          'autumn street scene, warm orange tones, no people, shallow depth of field, overcast sky, professional fashion photography backdrop, photorealistic',
  'mixbox-studio':   'dark studio, dramatic side lighting, wooden floor, exposed brick wall, moody editorial fashion photography, photorealistic',
  'mixbox-outdoor':  'mountain trail, golden hour sunlight, pine forest, no people, outdoor lifestyle photography, photorealistic',
  'proton':          'clean white gym interior, blurred background, soft natural light, minimalist, photorealistic',
  'proton-dark':     'dark background, smoke particles, electric blue accent light, dramatic, high-energy atmosphere, photorealistic',
};

// ── Parse args ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let prompt = '';
let outArg = 'assets/images/bg-generated.jpg';

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--out' || args[i] === '-o') && args[i + 1]) {
    outArg = args[++i];
  } else if (args[i] === '--brand' && args[i + 1]) {
    const key = args[++i];
    if (!BRAND_PRESETS[key]) {
      console.error(`Unknown brand "${key}". Available: ${Object.keys(BRAND_PRESETS).join(', ')}`);
      process.exit(1);
    }
    prompt = BRAND_PRESETS[key];
  } else if (!args[i].startsWith('-')) {
    prompt = args[i];
  }
}

if (!prompt) {
  console.error('Usage:');
  console.error('  node generate-bg.mjs "<prompt>" [--out path.jpg]');
  console.error('  node generate-bg.mjs --brand <preset> [--out path.jpg]');
  console.error('\nPresets:', Object.keys(BRAND_PRESETS).join(', '));
  process.exit(1);
}

const token = process.env.HF_TOKEN;
if (!token) {
  console.error('Error: HF_TOKEN environment variable is not set.');
  console.error('Get a free token at https://huggingface.co/settings/tokens');
  console.error('  1. Sign up / log in at huggingface.co');
  console.error('  2. Go to Settings → Access Tokens → New token (Read role is enough)');
  console.error('  3. $env:HF_TOKEN = "hf_..."');
  process.exit(1);
}

// ── Call HuggingFace Inference API (FLUX.1-schnell) ──────────────────────────
const MODEL = 'black-forest-labs/FLUX.1-schnell';
console.log(`Prompt : "${prompt}"`);
console.log(`Model  : ${MODEL}`);
console.log('Generating... (first call may take ~20s if model is cold)');

const MAX_RETRIES = 3;
let res;

for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
  res = await fetch(
    `https://router.huggingface.co/hf-inference/models/${MODEL}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (res.status === 503) {
    const data = await res.json().catch(() => ({}));
    const wait = (data.estimated_time ?? 20) * 1000;
    console.log(`Model loading, retrying in ${Math.round(wait / 1000)}s... (attempt ${attempt}/${MAX_RETRIES})`);
    await new Promise(r => setTimeout(r, wait));
    continue;
  }

  break;
}

if (!res.ok) {
  const body = await res.text();
  console.error(`API error ${res.status}:`, body);
  process.exit(1);
}

const buffer = Buffer.from(await res.arrayBuffer());

// ── Save output ──────────────────────────────────────────────────────────────
const outPath = path.resolve(__dirname, outArg);
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, buffer);
console.log(`Saved  : ${outPath}`);
console.log('\nNext steps:');
console.log(`  1. Open post.html, set grid class to grid-1 and <img> src to "./${outArg}"`);
console.log('  2. In .overlay, try opacity 0.55 if the scene already has strong colour');
console.log('  3. node render.mjs post.html output/post.png');
