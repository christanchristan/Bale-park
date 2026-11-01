// Your own photos: put image files in src/assets/images/ (jpg, jpeg, png, webp, avif).
// The site matches photos by FILE NAME (capital letters don't matter).
//
// Exact names the site looks for:
//   Destinations: sanetti-plateau, harenna-forest, sof-omar, dire-sheikh-hussein, ...
//   Tours:        one-day, two-day, three-day, four-day, five-day, private
//   Gallery:      gallery-1 ... gallery-8, plus about, transport
//
// Short names also work (see ALIASES), and tours borrow a destination photo
// when they have no photo of their own (see TOUR_FALLBACK).
const files = import.meta.glob('./assets/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });

export const ASSETS = {};
Object.entries(files).forEach(([path, url]) => {
  const name = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
  ASSETS[name] = url;
});

// short/your own file name  ->  id used by the site
const ALIASES = {
  harenna: 'harenna-forest',
  holqa: 'sof-omar',
  sanetti: 'sanetti-plateau',
  shek: 'dire-sheikh-hussein',
  bole: 'bale-mountains-np',
  dinsho: 'dinsho-gaysay',
  sanate: 'ethiopian-wolf'
};
Object.entries(ALIASES).forEach(([from, to]) => {
  if (ASSETS[from] && !ASSETS[to]) ASSETS[to] = ASSETS[from];
});

// tour id  ->  photo to use if there is no file named after the tour itself
const TOUR_FALLBACK = {
  'one-day': 'dinsho-gaysay',
  'two-day': 'sanetti-plateau',
  'three-day': 'harenna-forest',
  'four-day': 'dire-sheikh-hussein',
  'five-day': 'bale',
  private: 'bale-mountains-np'
};
Object.entries(TOUR_FALLBACK).forEach(([tour, photo]) => {
  if (!ASSETS[tour] && ASSETS[photo]) ASSETS[tour] = ASSETS[photo];
});

// gallery slot  ->  photo (used when gallery-N is missing)
const GALLERY_FALLBACK = {
  'gallery-1': 'sanetti-plateau',
  'gallery-2': 'ethiopian-wolf',
  'gallery-3': 'harenna-forest',
  'gallery-4': 'sof-omar',
  'gallery-5': 'dire-sheikh-hussein',
  'gallery-6': 'dinsho-gaysay',
  'gallery-7': 'bale-mountains-np',
  'gallery-8': 'bale'
};
Object.entries(GALLERY_FALLBACK).forEach(([slot, photo]) => {
  if (!ASSETS[slot] && ASSETS[photo]) ASSETS[slot] = ASSETS[photo];
});

// Optional fallback photos by illustration kind (left empty on purpose).
export const PHOTOS = {};