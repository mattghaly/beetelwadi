# Beit El Wadi — GSAP prototype

Static site (no build step). GSAP, ScrollTrigger and Lenis load from the jsDelivr CDN.

## Run locally
```bash
npx serve .
```

## Deploy
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → import the repo**. Framework preset: *Other*. No build command, output directory `.`.
3. Every push to `main` redeploys.

## Before going live
- Images are hot-linked from the current Wix media CDN for the prototype. Download the originals, export to WebP/AVIF at ~1600px wide and put them in `/img`.
- Replace the client name marquee with real logos (SVG).
- Connect the booking form (Formspree, Resend, or a WhatsApp deep link `https://wa.me/<number>?text=...`).
- Add the real Donate link, hotel/room pages and a Google Maps embed.
- Review the Arabic copy with a native speaker.
- Self-host GSAP via npm if you want to avoid the CDN.

## Motion notes
- Respects `prefers-reduced-motion` (all scroll animation and smooth scroll are disabled).
- EN/AR toggle switches `dir` and re-splits the text reveals.
