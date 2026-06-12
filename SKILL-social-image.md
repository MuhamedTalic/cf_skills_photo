# MixBox — Social Image Skill

Generate branded MixBox promotional images for Facebook, Instagram, and OLX.
Output: HTML file at 1080×1080px, exported as PNG via `node render.mjs`.

---

## Brand Identity

- **Background**: orange gradient — `linear-gradient(155deg, #D4500A 0%, #8B2E00 100%)`
- **Overlay** (Format A): `rgba(190, 65, 5, 0.78) → rgba(90, 18, 0, 0.88)`
- **Logo**: `assets/mixbox-logo.png` — top left in Format A/C, top-right watermark in Format B
- **Headline font**: Arial Black / Impact, 900 weight
- **Red accent**: `#E63329` — highlight words, phone icon
- **Contact**: +387 62 631 517 · mixbox.ba · mixbox.olx.ba

---

## Templates

| Format | File | Use |
|---|---|---|
| **A — Image + Text** | `assets/templates/mixbox-a.html` | Products as background collage + headline + contact footer |
| **B — Image Only** | `assets/templates/mixbox-b.html` | Clean product grid, logo watermark, URL footer |
| **C — Text Only** | `assets/templates/mixbox-c.html` | Orange gradient, large headline, full contact footer |

---

## Image Grid (Formats A and B)

Change the class on `.bg-collage` or `.image-grid` and remove unused `<img>` tags:

| Class | Layout | Images |
|---|---|---|
| `grid-1` | single full-frame | 1 |
| `grid-2` | side by side | 2 |
| `grid-3` | row of 3 | 3 |
| `grid-4` | 2×2 | 4 |
| `grid-6` | 3×2 | 6 |

---

## Workflow

1. Copy the relevant template → `post.html`
2. Set image src paths (relative to the templates folder)
3. Edit headline/tagline text in the `<!-- BODY -->` section
4. Place `mixbox-logo.png` in `assets/` (provided separately)
5. Render: `node render.mjs assets/templates/post.html output/post.png`

---

## Logo

Place logo file at `assets/mixbox-logo.png`.
All three templates reference it as `../mixbox-logo.png` (relative from `assets/templates/`).

---

## Checklist before export

- [ ] Logo file exists at `assets/mixbox-logo.png`
- [ ] Correct grid class set and unused `<img>` tags removed
- [ ] Image paths are correct (relative to templates folder)
- [ ] Headline and tagline text reviewed
- [ ] Rendered and checked at 1080×1080
