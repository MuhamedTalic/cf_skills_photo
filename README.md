# Promo Image Generator

Generates branded promotional images for social media and OLX listings.
Output is a single HTML file that renders at 1080×1080px, exported as PNG via browser screenshot.

## Template Layout

```
┌─────────────────────────────────┐
│         [Brand Logo]            │  ← top: logo centered
├─────────────────────────────────┤
│                                 │
│        [Product Image]          │  ← center: product (bg removed)
│                                 │
├──────────────┬──────────────────┤
│  Cijena:     │   Naša cijena:   │  ← prices: market left, ours right
│  ~~49.99 KM~~│   34.99 KM       │
├─────────────────────────────────┤
│       www.brand.ba              │  ← footer: website
└─────────────────────────────────┘
```

## Supported Brands

| Brand | Background | Logo |
|---|---|---|
| Proton Suplementi | Soft pink `#F2C8CB` | Image top-center |
| MixBox | Orange gradient `#D4500A → #8B2E00` | Text-based top-left |

## Workflow

### 1. Product has a clean background
Drop the image directly into the template.

### 2. Product has a messy background
Run `/background-removal` first to get a transparent PNG, then place it on the template.

### 3. Generate the image
Use `/image` to describe what you want, or edit `post.html` directly with the product and prices.

### 4. Export
Open `post.html` in browser → right-click → screenshot, or:
```bash
node render.mjs assets/templates/post.html output/post.png
```

## Installed Skills

- `/background-removal` — remove product backgrounds via inference.sh BiRefNet
- `/image` — AI image generation and editing (Gemini, Flux, Ideogram)
- `/hyperframes` — HTML composition editor

## Quick Start (Proton Suplementi)

1. Provide a product image
2. If background is not clean: `/background-removal` on the image
3. Tell Claude: product name, market price, your price
4. Claude generates `post.html` using the Proton template
5. Open in browser, screenshot at 1080×1080, done

## File Reference

| File | Purpose |
|---|---|
| `index.html` | MixBox brand composition (reference) |
| `SKILL-social-image.md` | Full HTML template spec |
| `.agents/skills/hyperframes/` | Design system (palettes, typography, patterns) |
| `assets/images/` | Placeholder product images |
