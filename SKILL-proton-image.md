# Proton Suplementi — Product Image Skill

Generate branded promotional images for Proton Suplementi.
Output: `post.html` at 1080×1080px, exported as PNG via browser screenshot.

---

## Brand Identity

- **Background**: soft pink radial gradient — `radial-gradient(ellipse at 50% 38%, #f5d0d5 0%, #dba0ac 55%, #c98090 100%)`
- **Logo**: `assets/proton-logo.png` — centered top, height 100px
- **Footer**: `www.protonsuplementi.ba` — dark muted text, bottom center
- **Price — market**: strikethrough, muted dark rose, font-size 40px
- **Price — ours**: bold dark green `#1e5c1e`, font-size 54px, white frosted box behind it
- **Font**: Arial / Arial Black, no Google Fonts required

## Template File

`assets/templates/proton-template.html`

Open this file and replace:
| Placeholder | Replace with |
|---|---|
| `PRODUCT_IMAGE.jpg` | path to product image (or transparent PNG) |
| `59.99 KM` (market) | actual market price |
| `39.99 KM` (ours) | Proton Suplementi price |

---

## Workflow

### Case A — Product already has pink background (like sample images)
1. Copy `assets/templates/proton-template.html` → `post.html`
2. Set `PRODUCT_IMAGE.jpg` to the product file path
3. Enter both prices
4. Open in browser, screenshot at 1080×1080

### Case B — Product has a different or messy background
1. Run `/background-removal` on the product image → get transparent PNG
2. Copy template → `post.html`
3. Set product src to the transparent PNG path
4. Enter prices
5. Screenshot

### Case C — No product image, generate one
1. Run `/image` — describe the product
2. Place result into template
3. Enter prices, screenshot

---

## Layout

```
┌─────────────────────────────────┐  1080px wide
│      [Proton Suplementi Logo]   │  150px — logo centered
├─────────────────────────────────┤
│                                 │
│         [Product Image]         │  flex: 1 — product fills center
│                                 │
├──────────────┬──────────────────┤
│ Tržišna:     │  Naša cijena:   │  150px — price bar
│ ~~59.99 KM~~ │  39.99 KM       │
├─────────────────────────────────┤
│    www.protonsuplementi.ba      │  58px — footer
└─────────────────────────────────┘
```

---

## Export

```bash
# Render to PNG (auto-detects Chrome, falls back to bundled browser)
node render.mjs assets/templates/post.html output/post.png

# Or: open post.html in browser → right-click → screenshot
```

---

## Checklist before export

- [ ] Logo file exists at `assets/proton-logo.png`
- [ ] Product image path is correct
- [ ] Market price entered (with KM suffix)
- [ ] Our price entered (with KM suffix)
- [ ] Opened in browser at 1080×1080 to verify layout before screenshotting
