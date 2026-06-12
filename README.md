# Promo Image Generator

Generates branded promotional images for social media (Facebook, Instagram) and OLX listings.
Output is a 1080×1080px PNG exported via Puppeteer — no manual screenshots needed.

## Brands

| Brand | Background | Templates |
|---|---|---|
| **MixBox** | Orange gradient `#D4500A → #8B2E00` | `assets/templates/mixbox-a/b/c.html` |
| **Proton Suplementi** | Soft pink `#F2C8CB` | `assets/templates/proton-template/b/c.html` |

## Template Formats

| Format | Canvas | Use |
|---|---|---|
| A — Image + Text | 1080×1080 | Standard promo post: product collage + headline + contact footer |
| B — Image Only | 1080×1080 | Clean product grid with logo watermark |
| C — Text Only | 1080×1080 | Announcement or offer with no product image |
| Story | 1080×1920 | Instagram / Facebook Stories |

## Workflow

```
1. Product image provided
       ↓
2. Background not clean?
   → /background-removal → transparent PNG
       ↓
3. Need a lifestyle background scene?
   → node generate-bg.mjs --brand mixbox
       ↓
4. Copy template → post.html, edit headline + image paths
       ↓
5. node render.mjs post.html output/post.png
```

## AI Background Generation

Generates a background scene via FLUX.1-schnell (HuggingFace, free).

**Setup (once):**
1. Sign up at [huggingface.co](https://huggingface.co)
2. Go to Settings → Access Tokens → New token → enable **Make calls to Inference Providers**
3. `$env:HF_TOKEN = "hf_..."`

**Usage:**
```bash
# Brand presets
node generate-bg.mjs --brand mixbox           # autumn street, warm orange tones
node generate-bg.mjs --brand mixbox-studio    # dark studio, dramatic lighting
node generate-bg.mjs --brand mixbox-outdoor   # mountain trail, golden hour
node generate-bg.mjs --brand proton           # clean white gym, soft light
node generate-bg.mjs --brand proton-dark      # dark bg, electric blue accent

# Custom prompt
node generate-bg.mjs "industrial warehouse, warm accent light"

# Custom output path
node generate-bg.mjs --brand mixbox --out assets/images/bg-street.jpg

# Via npm
npm run generate -- --brand mixbox
```

Output saved to `assets/images/bg-generated.jpg`. In `post.html` set grid class to `grid-1` and point the `<img>` src at the file.

## Export

```bash
node render.mjs post.html output/post.png

# Via npm
npm run render -- post.html output/post.png
```

## Skills

| Skill | When to use |
|---|---|
| `/hyperframes` | Edit HTML templates and animated compositions |
| `/image` | AI image generation and editing guidance |
| `/background-removal` | Strip product image backgrounds → transparent PNG |

## File Reference

| File | Purpose |
|---|---|
| `post.html` | Working file — copy a template here and edit |
| `render.mjs` | Puppeteer renderer (1080×1080 PNG output) |
| `generate-bg.mjs` | AI background generator (FLUX via HuggingFace) |
| `index.html` | MixBox animated video composition (HyperFrames reference) |
| `assets/templates/` | Brand HTML templates |
| `assets/images/` | Product images + AI-generated backgrounds |
| `SKILL-social-image.md` | MixBox template spec |
| `SKILL-proton-image.md` | Proton Suplementi template spec |
