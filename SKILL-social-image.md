# MixBox Social Media Image Post — SKILL.md

## Purpose
Generate branded MixBox social media image posts as self-contained HTML files.
Output is a single `post.html` file that renders at exact social media dimensions,
ready to screenshot or print-to-PDF for posting on Facebook, Instagram, and OLX.

---

## Brand Identity

### Colors
- **Primary orange**: `#D4500A` (MixBox brand orange — backgrounds, accents)
- **Deep orange/dark**: `#8B2E00` (darker variant for gradients, overlays)
- **White**: `#FFFFFF` (main text, logo text)
- **Red accent**: `#E63329` (the "Mix" in MixBox logo, highlight words)
- **Dark overlay**: `rgba(0,0,0,0.55)` (over product image backgrounds)

### Typography
- Headlines: `'Arial Black', 'Impact', sans-serif` — bold, heavy
- Body/subtext: `'Arial', sans-serif`
- Logo text: **Mix** in red (`#E63329`), **Box** in white — both bold

### Logo (text-based, no external image required)
```html
<div class="mixbox-logo">
  <span style="color:#E63329;">Mix</span><span style="color:#fff;">Box</span>
</div>
```
Add the box/package icon using a Unicode or inline SVG if needed.

---

## Post Formats

### Format A — Image + Text (standard promo post)
Canvas: **1080×1080px** (square, Instagram/Facebook)

Layout sections:
1. **Header** (top ~15%): MixBox logo left, page name right
2. **Body** (middle ~60%): product image grid + promo headline
3. **Footer** (bottom ~25%): tagline, contact info strip

### Format B — Image Only
Canvas: **1080×1080px**
Same as Format A but no text body — just the image grid, logo watermark in corner, thin footer strip.

### Format C — Text Only
Canvas: **1080×1080px**
Orange gradient background, large centered text, logo top, contact footer bottom.

---

## HTML Template Structure

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    font-family: 'Arial', sans-serif;
    background: #D4500A;
  }

  .post {
    width: 1080px;
    height: 1080px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: linear-gradient(160deg, #D4500A 0%, #8B2E00 100%);
  }

  /* ── HEADER ── */
  .header {
    height: 140px;
    padding: 24px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0,0,0,0.25);
    flex-shrink: 0;
  }

  .mixbox-logo {
    font-family: 'Arial Black', sans-serif;
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1;
  }

  .logo-mix { color: #E63329; }
  .logo-box { color: #ffffff; }

  .header-tagline {
    color: rgba(255,255,255,0.85);
    font-size: 18px;
    font-weight: 600;
    text-align: right;
    letter-spacing: 0.5px;
  }

  /* ── BODY ── */
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 40px 20px;
    gap: 24px;
  }

  .promo-headline {
    color: #ffffff;
    font-family: 'Arial Black', sans-serif;
    font-size: 80px;
    font-weight: 900;
    text-align: center;
    line-height: 1.0;
    text-shadow: 3px 3px 0 rgba(0,0,0,0.35);
    letter-spacing: -1px;
  }

  .promo-sub {
    color: rgba(255,255,255,0.9);
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin-top: -8px;
  }

  .highlight { color: #E63329; }

  /* ── IMAGE GRID ── */
  .image-grid {
    display: grid;
    gap: 8px;
    width: 100%;
  }

  .image-grid.grid-1 { grid-template-columns: 1fr; }
  .image-grid.grid-2 { grid-template-columns: 1fr 1fr; }
  .image-grid.grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .image-grid.grid-4 { grid-template-columns: 1fr 1fr; }
  .image-grid.grid-6 { grid-template-columns: 1fr 1fr 1fr; }

  .image-grid img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
    border: 3px solid rgba(255,255,255,0.2);
  }

  .image-grid.grid-1 img { height: 400px; }
  .image-grid.grid-2 img { height: 300px; }

  /* ── FOOTER ── */
  .footer {
    height: 130px;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 40px;
    flex-shrink: 0;
    border-top: 2px solid rgba(255,255,255,0.15);
  }

  .footer-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #ffffff;
  }

  .footer-icon {
    width: 48px;
    height: 48px;
    background: #E63329;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .footer-text {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
  }

  .footer-text small {
    display: block;
    font-size: 13px;
    font-weight: 400;
    opacity: 0.75;
    margin-bottom: 2px;
  }

  .footer-divider {
    width: 1px;
    height: 60px;
    background: rgba(255,255,255,0.2);
  }
</style>
</head>
<body>
<div class="post">

  <!-- HEADER -->
  <div class="header">
    <div class="mixbox-logo">
      <span class="logo-mix">Mix</span><span class="logo-box">Box</span>
    </div>
    <div class="header-tagline">
      XXL Moda<br>
      <span style="font-size:14px; font-weight:400;">Od 3XL do 10XL</span>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="promo-headline">
      XXL <span class="highlight">moda</span>
    </div>
    <div class="promo-sub">(Od 3XL do 10XL)</div>

    <!-- IMAGE GRID — replace src values with actual product image URLs -->
    <div class="image-grid grid-3">
      <img src="PRODUCT_IMAGE_1.jpg" alt="Proizvod 1">
      <img src="PRODUCT_IMAGE_2.jpg" alt="Proizvod 2">
      <img src="PRODUCT_IMAGE_3.jpg" alt="Proizvod 3">
    </div>

    <div style="color:rgba(255,255,255,0.85); font-size:26px; text-align:center; margin-top:8px;">
      Sve što želiš, na <span class="highlight" style="font-weight:700;">jednom mjestu</span>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-item">
      <div class="footer-icon">📞</div>
      <div class="footer-text">
        <small>Telefon</small>
        +387 62 631 517
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-item">
      <div class="footer-icon">🌐</div>
      <div class="footer-text">
        <small>Web</small>
        mixbox.ba
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-item">
      <div class="footer-icon" style="background:#3b5998;">f</div>
      <div class="footer-text">
        <small>Facebook</small>
        mixboxbosna
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-item">
      <div class="footer-icon" style="background:#666; font-size:14px; font-weight:700;">OLX</div>
      <div class="footer-text">
        <small>OLX</small>
        mixbox.olx.ba
      </div>
    </div>
  </div>

</div>
</body>
</html>
```

---

## Usage Instructions

### When user provides images
1. Replace `PRODUCT_IMAGE_N.jpg` with actual URLs or local file paths
2. Choose grid class based on image count:
   - 1 image → `grid-1`
   - 2 images → `grid-2`
   - 3 images → `grid-3`
   - 4 images → `grid-4` (2×2)
   - 6 images → `grid-6` (3×2)
3. Adjust `.promo-headline` text to match the campaign
4. Open `post.html` in browser → screenshot at 1080×1080

### Format variants
- **Text only**: remove `.image-grid`, expand `.body` padding, increase headline font size to 120px
- **Image only**: remove `.promo-headline` and `.promo-sub`, expand image grid to fill body, add logo watermark bottom-right
- **Story format (1080×1920)**: change `body` and `.post` height to `1920px`, increase header to 180px, footer to 160px

### To export as image
```bash
# Using puppeteer (Node.js)
npx puppeteer-screenshot --url post.html --output post.png --width 1080 --height 1080

# Or use browser: open post.html, DevTools → capture screenshot
```

---

## Customization Parameters
When generating a post, always confirm:
- [ ] Post format (A/B/C)
- [ ] Number of images
- [ ] Promo headline text
- [ ] Any special offer or size info
- [ ] Language (BS/HR/SR or EN)
