// ============================================================
// ALL SITE DATA LIVES HERE (replaces the old backend).
// Edit this file to change contact details, tours, prices, etc.
//
// IMPORTANT: Nothing below is verified. Prices are empty (null) and
// distances / fees / seasons say "Confirm locally" on purpose.
// Fill them in only after checking with the park office and locals.
// ============================================================

export const CONFIG = {
  businessName: 'Discover Bale Ethiopia',
  // WhatsApp number: international format, digits only, e.g. '2519XXXXXXXX'
  whatsapp: '',
  // Email address that receives booking/contact messages
  email: 'bale@gmail.com',
  // Phone shown on the site (call link)
  phone: '09090909',
  currency: 'USD',
  // Birr per 1 US dollar. Official NBE rate was about 160.9 ETB in Oct 2026. Update it when the rate changes.
  usdToEtb: 160
};

const CONFIRM = 'Confirm locally';

export const destinations = [
  { id: 'bale-mountains-np', cat: 'nature', kind: 'peak', name: { en: 'Bale Mountains National Park', am: 'የባሌ ተራሮች ብሔራዊ ፓርክ' }, summary: { en: "Africa's largest afromontane habitat, home to endemic wildlife and dramatic highland scenery.", am: 'የአፍሪካ ትልቁ የተራራ ሥነ ምህዳር፣ ልዩ የዱር እንስሳት መኖሪያ።' }, season: 'Confirm locally (generally the drier months)', fees: 'Confirm with park office', distanceFromRobe: CONFIRM, lat: 7.0, lng: 39.75 },
  { id: 'sanetti-plateau', cat: 'nature', kind: 'plateau', name: { en: 'Sanetti Plateau', am: 'ሳነቲ ደጋማ ሜዳ' }, summary: { en: 'High-altitude plateau with Afroalpine moorland and Ethiopian wolf sightings.', am: 'ከፍተኛ ቦታ ላይ የሚገኝ ደጋማ ሜዳ፣ የኢትዮጵያ ተኩላ የሚታይበት።' }, season: CONFIRM, fees: 'Confirm with park office', distanceFromRobe: CONFIRM, lat: 6.85, lng: 39.85 },
  { id: 'ethiopian-wolf', cat: 'wildlife', kind: 'wolf', name: { en: 'Ethiopian Wolf Habitats', am: 'የኢትዮጵያ ተኩላ መኖሪያዎች' }, summary: { en: "Spot one of the world's rarest canids in its natural highland habitat.", am: 'ከዓለም ብርቅዬ ሥጋ በል እንስሳት አንዱን በተፈጥሮ መኖሪያው ይመልከቱ።' }, season: CONFIRM, fees: 'Confirm with park office', distanceFromRobe: CONFIRM, lat: 6.9, lng: 39.8 },
  { id: 'tullu-dimtu', cat: 'adventure', kind: 'snow', name: { en: 'Tullu Dimtu Mountain', am: 'ቱሉ ድምቱ ተራራ' }, summary: { en: "Ethiopia's second-highest peak, reached via the Sanetti Plateau.", am: 'የኢትዮጵያ ሁለተኛው ከፍተኛ ጫፍ።' }, season: CONFIRM, fees: 'Confirm with park office', distanceFromRobe: CONFIRM, lat: 6.82, lng: 39.87 },
  { id: 'harenna-forest', cat: 'nature', kind: 'forest', name: { en: 'Harenna Forest', am: 'ሀረና ጫካ' }, summary: { en: 'Mist-covered ancient forest with rich birdlife and forest wildlife.', am: 'ጭጋግ የለበሰ ጥንታዊ ጫካ።' }, season: CONFIRM, fees: 'Confirm with park office', distanceFromRobe: CONFIRM, lat: 6.6, lng: 39.75 },
  { id: 'dinsho-gaysay', cat: 'wildlife', kind: 'grass', name: { en: 'Dinsho and Gaysay Grasslands', am: 'ዲንሾ እና ጋይሳይ ሜዳዎች' }, summary: { en: "Grasslands good for mountain nyala, Menelik's bushbuck and birdwatching.", am: 'ለማዳ ንያላ እና ለወፍ ምልከታ ተስማሚ ሜዳዎች።' }, season: CONFIRM, fees: 'Confirm with park office', distanceFromRobe: CONFIRM, lat: 7.1, lng: 39.77 },
  { id: 'sof-omar', cat: 'adventure', kind: 'cave', name: { en: 'Sof Omar Cave', am: 'ሶፍ ዑመር ዋሻ' }, summary: { en: "One of Africa's longest cave systems, carved by the Web River, with deep cultural and religious significance.", am: 'ከአፍሪካ ረጅም ዋሻዎች አንዱ፣ በዌብ ወንዝ የተፈጠረ።' }, season: CONFIRM, fees: CONFIRM, distanceFromRobe: 'Confirm locally (separate circuit from the mountains)', lat: 6.9, lng: 40.85 },
  { id: 'dire-sheikh-hussein', cat: 'culture', kind: 'dome', name: { en: 'Dire Sheikh Hussein', am: 'ዲሬ ሼክ ሁሴን' }, summary: { en: 'Important pilgrimage site and cultural heritage destination.', am: 'ታዋቂ የሐጅ እና የባህል ቅርስ ስፍራ።' }, season: 'Confirm locally (pilgrimage periods can be very busy)', fees: CONFIRM, distanceFromRobe: CONFIRM, lat: 7.1, lng: 40.5 },
  { id: 'web-valley', cat: 'nature', kind: 'valley', name: { en: 'Web Valley', am: 'ዌብ ሸለቆ' }, summary: { en: 'Scenic valley on the northern side of the park with river and highland views.', am: 'ውብ ሸለቆ።' }, season: CONFIRM, fees: CONFIRM, distanceFromRobe: CONFIRM, lat: 7.0, lng: 39.9 },
  { id: 'rira', cat: 'culture', kind: 'village', name: { en: 'Rira Village', am: 'ሪራ መንደር' }, summary: { en: 'Highland community offering village culture and homestay-style experiences.', am: 'የገጠር ባህል የሚታይበት መንደር።' }, season: CONFIRM, fees: CONFIRM, distanceFromRobe: CONFIRM, lat: 6.95, lng: 39.9 },
  { id: 'manyete-coffee', cat: 'culture', kind: 'coffee', name: { en: 'Manyete and Local Coffee', am: 'ማኒየተ እና የአካባቢ ቡና' }, summary: { en: 'Traditional coffee ceremony and local coffee experiences.', am: 'ባህላዊ የቡና ሥነ ሥርዓት።' }, season: 'Year-round (confirm harvest timing)', fees: CONFIRM, distanceFromRobe: CONFIRM, lat: 7.1, lng: 40.0 },
  { id: 'markets-culture', cat: 'culture', kind: 'market', name: { en: 'Markets, Food and Culture', am: 'ገበያ፣ ምግብ እና ባህል' }, summary: { en: 'Local markets, traditional dishes and cultural encounters in Robe and Goba.', am: 'የአካባቢ ገበያዎች እና ባህላዊ ምግቦች።' }, season: 'Year-round', fees: 'Varies', distanceFromRobe: CONFIRM, lat: 7.12, lng: 40.0 }
];

// priceUSD: price per person in US dollars. Change the numbers below to your real prices.
// (These are starting figures - confirm them before launch.) from: true shows "From $X".
export const tours = [
  { id: 'one-day', days: 1, kind: 'grass', name: { en: 'One-Day Bale Highlights', am: 'የአንድ ቀን የባሌ ጉብኝት' }, description: { en: 'A taste of Bale: highland scenery and wildlife viewing.', am: 'የባሌ አጭር ጉብኝት።' }, destinations: ['dinsho-gaysay', 'sanetti-plateau'], priceUSD: 120, includes: ['Transport (own vehicle)', 'English-speaking host'], note: 'Final itinerary and price to be confirmed.' },
  { id: 'two-day', days: 2, kind: 'plateau', name: { en: 'Two-Day Bale Adventure', am: 'የሁለት ቀን የባሌ ጀብዱ' }, description: { en: 'Sanetti Plateau, Ethiopian wolf habitat and Dinsho.', am: 'ሳነቲ፣ ተኩላ እና ዲንሾ።' }, destinations: ['dinsho-gaysay', 'sanetti-plateau', 'ethiopian-wolf'], priceUSD: 240, includes: ['Transport', 'Host', 'Accommodation (partner)'], note: 'Final itinerary and price to be confirmed.' },
  { id: 'three-day', days: 3, kind: 'peak', name: { en: 'Three-Day Bale Mountains Experience', am: 'የሦስት ቀን የባሌ ተራሮች ልምድ' }, description: { en: 'Plateau, Tullu Dimtu and Harenna Forest.', am: 'ሳነቲ፣ ቱሉ ድምቱ እና ሀረና ጫካ።' }, destinations: ['sanetti-plateau', 'tullu-dimtu', 'harenna-forest'], priceUSD: 360, includes: ['Transport', 'Host', 'Accommodation (partner)'], note: 'Final itinerary and price to be confirmed.' },
  { id: 'four-day', days: 4, kind: 'village', name: { en: 'Four-Day Nature and Culture Tour', am: 'የአራት ቀን ተፈጥሮ እና ባህል ጉብኝት' }, description: { en: 'Mountains plus village culture and coffee.', am: 'ተራሮች፣ የመንደር ባህል እና ቡና።' }, destinations: ['sanetti-plateau', 'harenna-forest', 'rira', 'manyete-coffee'], priceUSD: 480, includes: ['Transport', 'Host', 'Accommodation (partner)'], note: 'Final itinerary and price to be confirmed.' },
  { id: 'five-day', days: 5, kind: 'cave', name: { en: 'Five-Day Complete Bale Experience', am: 'የአምስት ቀን ሙሉ የባሌ ልምድ' }, description: { en: 'Mountains circuit plus Sof Omar Cave circuit.', am: 'የተራሮች እና የሶፍ ዑመር ጉዞ።' }, destinations: ['sanetti-plateau', 'harenna-forest', 'sof-omar', 'dire-sheikh-hussein'], priceUSD: 620, includes: ['Transport', 'Host', 'Accommodation (partner)'], note: 'Sof Omar is a separate travel circuit; timings to be confirmed.' },
  { id: 'private', days: 0, kind: 'valley', name: { en: 'Customized Private Tour', am: 'ብጁ የግል ጉብኝት' }, description: { en: 'Tell us your interests and we will design your trip.', am: 'ፍላጎትዎን ይንገሩን።' }, destinations: [], priceUSD: 150, from: true, includes: ['Tailored to you'], note: 'Quote on request.' }
];

// Gallery: 'kind' draws a built-in illustration.
// To use your own real photo instead, add: src: '/gallery/photo.jpg'
// (put the file in a "public/gallery" folder you create)
export const gallery = [
  { kind: 'plateau', caption: { en: 'Sanetti Plateau', am: 'ሳነቲ ደጋማ ሜዳ' } },
  { kind: 'wolf', caption: { en: 'Ethiopian wolf country', am: 'የኢትዮጵያ ተኩላ ምድር' } },
  { kind: 'forest', caption: { en: 'Harenna Forest', am: 'ሀረና ጫካ' } },
  { kind: 'cave', caption: { en: 'Sof Omar Cave', am: 'ሶፍ ዑመር ዋሻ' } },
  { kind: 'village', caption: { en: 'Highland village life', am: 'የደጋ መንደር ሕይወት' } },
  { kind: 'coffee', caption: { en: 'Coffee ceremony', am: 'የቡና ሥነ ሥርዓት' } },
  { kind: 'market', caption: { en: 'Local market', am: 'የአካባቢ ገበያ' } },
  { kind: 'transport', caption: { en: 'Travel in comfort', am: 'በምቾት ይጓዙ' } }
];

// ---- Afaan Oromoo (om) text. Have a native speaker review before launch. ----
const OM = {
  destinations: {
    'bale-mountains-np': ['Paarkii Biyyaalessaa Tulluu Baale', 'Naannoo gaarreen Afrikaa isa guddaa, bineensota addaa fi mul’ata dhaabbataa qabu.'],
    'sanetti-plateau': ['Dirree Saaneettii', 'Dirree olka’aa Afroalpine fi iddoo waraabessi Itiyoophiyaa itti argamu.'],
    'ethiopian-wolf': ['Iddoo Jireenyaa Waraabessa Itiyoophiyaa', 'Bineensa foonii nyaatu baay’ee dhabamaa ta’e iddoo uumamaa isaa keessatti ilaali.'],
    'tullu-dimtu': ['Tulluu Dimtu', 'Gaarreen Itiyoophiyaa isa lammaffaa olka’aa, dirree Saaneettiitiin ga’amu.'],
    'harenna-forest': ['Bosona Hareenaa', 'Bosona durii duumessa uffate, simbirroota fi bineensota bosonaa qabu.'],
    'dinsho-gaysay': ['Dirree Diinshoo fi Gaaysaay', 'Dirree niyaalaa tulluu, bushbuck Meneelik fi simbirroo ilaaluuf mijataa.'],
    'sof-omar': ['Holqa Sof Umar', 'Holqaawwan Afrikaa keessaa isa dheeraa, Laga Webiin kan uumame, bakka amantii fi aadaa guddaa qabu.'],
    'dire-sheikh-hussein': ['Dirree Sheek Hussein', 'Iddoo ziyaaraa fi dhaalmaa aadaa barbaachisaa.'],
    'web-valley': ['Gooroo Webii', 'Gooroo bareedaa gara kaabaa paarkii, laga fi mul’ata dhaaba qabu.'],
    'rira': ['Ganda Riraa', 'Hawaasa dhaaba aadaa gandaa fi muuxannoo mana keessa jiraachuu dhiyeessu.'],
    'manyete-coffee': ['Maniyeteef Buna Naannoo', 'Sirna bunaa aadaa fi muuxannoo buna naannoo.'],
    'markets-culture': ['Gabaa, Nyaata fi Aadaa', 'Gabaawwan naannoo, nyaata aadaa fi walitti dhufeenya aadaa Roobee fi Gobaa keessatti.']
  },
  tours: {
    'one-day': ['Imala Baale Guyyaa Tokkoo', 'Mul’ata dhaabaa fi bineensota Baale daawwachuu gabaabaa.'],
    'two-day': ['Imala Baale Guyyaa Lamaa', 'Dirree Saaneettii, iddoo waraabessaa fi Diinshoo.'],
    'three-day': ['Muuxannoo Tulluu Baale Guyyaa Sadii', 'Dirree, Tulluu Dimtu fi Bosona Hareenaa.'],
    'four-day': ['Imala Uumama fi Aadaa Guyyaa Afur', 'Tulluuwwan, aadaa gandaa fi buna.'],
    'five-day': ['Muuxannoo Baale Guutuu Guyyaa Shan', 'Marsaa tulluuwwanii fi marsaa Holqa Sof Umar.'],
    'private': ['Imala Dhuunfaa Filatamaa', 'Fedhii kee nutti himi, imala kee isaaf qopheessina.']
  },
  gallery: ['Dirree Saaneettii', 'Biyya waraabessa Itiyoophiyaa', 'Bosona Hareenaa', 'Holqa Sof Umar', 'Jireenya gandaa dhaaba', 'Sirna bunaa', 'Gabaa naannoo', 'Imala mijataa']
};
destinations.forEach((d) => { const o = OM.destinations[d.id]; if (o) { d.name.om = o[0]; d.summary.om = o[1]; } });
tours.forEach((x) => { const o = OM.tours[x.id]; if (o) { x.name.om = o[0]; x.description.om = o[1]; } });
gallery.forEach((g, k) => { g.caption.om = OM.gallery[k]; });
