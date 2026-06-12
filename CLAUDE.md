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

| Brand | Skill file | Template |
|---|---|---|
| **Proton Suplementi** | `SKILL-proton-image.md` | `assets/templates/proton-template.html` |
| **MixBox** | `SKILL-social-image.md` | see skill file for inline template |

## Workflow

```
1. Product image provided
       ↓
2. Background not clean? → /background-removal → transparent PNG
       ↓
3. /image or edit HTML template → place product on brand background
       ↓
4. Export: open post.html in browser → screenshot at 1080×1080
```

## Export as PNG

```bash
# Render any template to PNG (1080x1080)
node render.mjs assets/templates/post.html output/post.png

# Or shorthand via npm
npm run render assets/templates/post.html output/post.png
```

## Project Structure

- `index.html` — MixBox brand composition reference
- `SKILL-social-image.md` — full HTML template spec and format variants
- `.agents/skills/hyperframes/` — design system: palettes, typography, house-style, css-patterns
- `assets/images/` — placeholder product images

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
