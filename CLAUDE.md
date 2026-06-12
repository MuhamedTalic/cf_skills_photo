# Image Composition Project

## Purpose

Generate branded promotional images as self-contained HTML files.
Output renders at exact social media dimensions (1080×1080px) and is exported as PNG via browser screenshot or Puppeteer.

## Skills — USE THESE FIRST

| Skill | Command | When to use |
|---|---|---|
| **hyperframes** | `/hyperframes` | Creating or editing HTML compositions and static layouts |
| **image** | `/image` | AI image generation, background changes, style edits via Gemini/Flux/Ideogram |
| **background-removal** | `/background-removal` | Strip product backgrounds → transparent PNG before placing on template |

## Brand Templates

| Brand | Skill file | Templates |
|---|---|---|
| **Proton Suplementi** | `SKILL-proton-image.md` | `assets/templates/proton-template.html`, `proton-b.html`, `proton-c.html` |
| **MixBox** | `SKILL-social-image.md` | `assets/templates/mixbox-a.html`, `mixbox-b.html`, `mixbox-c.html` |

## Workflow

```
1. Product image provided
       ↓
2. Background not clean? → /background-removal → transparent PNG
       ↓
3. Need a background scene? → node generate-bg.mjs --brand <name> (see below)
       ↓
4. Copy template (e.g. mixbox-a.html) → post.html, edit headline/images
       ↓
5. Export: node render.mjs post.html output/post.png
```

## AI Background Generation

Use `generate-bg.mjs` to generate a background scene with AI instead of using product photos as the collage.

Requires `HF_TOKEN` — free at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) (sign up, New token, Read role). Uses FLUX.1-schnell.

```bash
# Built-in brand presets (recommended starting point)
node generate-bg.mjs --brand mixbox           # autumn street, warm orange tones
node generate-bg.mjs --brand mixbox-studio    # dark studio, dramatic lighting
node generate-bg.mjs --brand mixbox-outdoor   # mountain trail, golden hour
node generate-bg.mjs --brand proton           # clean white gym, soft light
node generate-bg.mjs --brand proton-dark      # dark bg, electric blue accent

# Custom prompt
node generate-bg.mjs "dark warehouse interior, industrial, warm accent light"

# Custom output path
node generate-bg.mjs --brand mixbox --out assets/images/bg-street.jpg

# Via npm
npm run generate -- --brand mixbox
```

Output is saved to `assets/images/bg-generated.jpg` by default.

**After generating:**
1. In `post.html`, set the single `<img>` src to `./assets/images/bg-generated.jpg` and change the grid class to `grid-1`
2. If the scene already has strong colour, lower `.overlay` opacity to `0.55` so it reads through
3. `node render.mjs post.html output/post.png`

## Export as PNG

```bash
# 1. Copy the relevant template to post.html and edit it, then render:
node render.mjs post.html output/post.png

# Pass args through npm (note the --):
npm run render -- post.html output/post.png
```

## Project Structure

- `post.html` — working file (copy of a template, edited per post)
- `render.mjs` — Puppeteer renderer: `node render.mjs post.html output/post.png`
- `generate-bg.mjs` — AI background generator (FLUX.1-schnell via HuggingFace)
- `index.html` — MixBox animated video composition reference (HyperFrames)
- `SKILL-social-image.md` — MixBox template spec and format variants
- `SKILL-proton-image.md` — Proton Suplementi template spec
- `assets/templates/` — brand HTML templates (mixbox-a/b/c, proton-*)
- `assets/images/` — product images and AI-generated backgrounds
- `.agents/skills/hyperframes/` — design system: palettes, typography, house-style

## Template Formats

| Format | Canvas | Use |
|---|---|---|
| A — Image + Text | 1080×1080 | Standard promo post (product + headline + prices) |
| B — Image Only | 1080×1080 | Clean product shot with logo watermark |
| C — Text Only | 1080×1080 | Announcement or offer with no product image |
| Story | 1080×1920 | Instagram/Facebook Stories |

## Key Rules

1. Always confirm brand before generating: colors, logo, fonts differ per brand
2. Price display: left = market price (strikethrough), right = our price (highlighted)
3. Background: soft pink `#F2C8CB` for Proton Suplementi; orange gradient for MixBox
4. Export at exactly 1080×1080 — never scale up after export
5. Product images without clean cutouts must go through `/background-removal` first
