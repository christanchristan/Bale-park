# Discover Bale Ethiopia (frontend only, React + Vite + three.js)

No backend. All data (tours, destinations, prices, contact details, gallery) is in `src/data.js`.

## Run
1. Install Node.js 18+
2. `npm install`
3. `npm run dev`  (open the address shown)

## Publish
`npm run build` creates a `dist` folder. Upload `dist` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## What's interactive
- 3D mountain hero (three.js) that follows the mouse. Falls back to a flat illustration if WebGL is unavailable, and stays still if the visitor prefers reduced motion.
- 3D tilt cards, scroll reveal animations, count-up stats, page transitions, scroll progress bar.
- Destinations page: category filter + clickable schematic map.
- Trip planner (3 steps): choose a tour and/or places, dates and group size, contact details. It builds a message and opens WhatsApp or email.
- Gallery with full-screen viewer (arrow keys, Esc).

## Before launch
- Open `src/data.js` and set `CONFIG.whatsapp` (digits only, e.g. 2519XXXXXXXX) and `CONFIG.email`.
- Add real prices (`priceUSD`) and replace every "Confirm locally" ONLY after verifying it.
- Map pin positions (`lat`/`lng` in `src/data.js`) are approximate. Verify them.
- Add your own photos: create `public/gallery/`, add images, and set `src: '/gallery/name.jpg'` on gallery items.
- Edit text, FAQs and Amharic and Afaan Oromoo translations in `src/i18n.jsx` (have a native Amharic speaker review).
- Replace the placeholder testimonial with real reviews.

## Notes
- Bookings are REQUESTS sent as messages. Nothing is stored. No admin dashboard, email automation or online payment without a backend.
- Pictures: built-in SVG illustrations, plus real photos where listed in `src/photos.js` (falls back to the illustration if a photo fails). Add more photos there. Only use images you have the licence for, and keep the credit.

- Prices show Birr first and US dollars in brackets. Birr is calculated from `priceUSD` x `CONFIG.usdToEtb` (src/data.js), rounded to the nearest 100. Update `usdToEtb` when the exchange rate changes.
