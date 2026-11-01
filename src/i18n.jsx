import React, { createContext, useContext, useState, useEffect } from 'react';

const dict = {
  en: {
    brand: 'Discover Bale Ethiopia',
    slogan: 'Experience Nature. Discover Culture. Explore Bale.',
    nav: { home: 'Home', about: 'About', destinations: 'Destinations', tours: 'Tours', transport: 'Transport', gallery: 'Gallery', contact: 'Contact', book: 'Plan your trip' },
    hero: { title: 'Discover the wild heart of Ethiopia', sub: 'Guided tours in the Bale Mountains: Ethiopian wolves, Afroalpine plateaus, ancient forests, caves and living culture.', cta: 'Explore tours', scroll: 'Scroll' },
    trust: ['UNESCO World Heritage Site (2023)', 'Local English-speaking host', 'Custom private tours', 'Reply within 24 hours'],
    foot: { explore: 'Explore', contact: 'Contact', about: 'Experience-led travel in the Bale Mountains, southeast Ethiopia.', wa: 'WhatsApp', mail: 'Email', soon: 'Details coming soon' },
    stats: { destinations: 'Destinations', tours: 'Tour options', languages: 'Languages' },
    sections: { destinations: 'Destinations', tours: 'Tour packages', why: 'Why travel with us', testimonials: 'What travelers say', how: 'How it works', faq: 'Good to know' },
    why: [
      ['Local host', 'Based in Bale, with an English-speaking host who knows the area.'],
      ['Flexible tours', 'From one day to five days, or a private custom trip.'],
      ['Transport included', 'Travel in our own vehicle with a friendly driver-host.'],
      ['Trusted partners', 'We work with local guides, hotels and communities.']
    ],
    how: [
      ['Choose', 'Pick a tour or the places you want to see.'],
      ['Send your request', 'Share your dates and group size on WhatsApp or email.'],
      ['We confirm', 'We reply to confirm availability, price and details.']
    ],
    faq: [
      ['Is my trip confirmed when I send the form?', 'No. The form is a request. We reply to confirm availability and price before anything is final.'],
      ['Are park fees and permits included?', 'Fees and permits can change, so we confirm the current ones for your dates before your trip is finalised.'],
      ['Can I design a private tour?', 'Yes. Choose the custom tour or pick your own places in the trip planner.'],
      ['Which languages do you speak?', 'Your host speaks English. The website is available in English and Amharic.']
    ],
    about: { title: 'About us', body: 'Discover Bale Ethiopia is a local tour organizer, transport provider and English-speaking host based in Bale. Our goal is to connect visitors from Ethiopia and around the world with the nature, wildlife and culture of Bale.' },
    transport: { title: 'Transportation services', body: 'Comfortable transport for tourists between Robe, Goba and the attractions of Bale. Vehicle suitability for specific routes is confirmed before each trip. Contact us for a quote based on distance and group size.' },
    gallery: { title: 'Gallery', note: 'Photos and illustrations of Bale. Click a picture to enlarge.', close: 'Close', prev: 'Previous', next: 'Next' },
    contact: { title: 'Contact us', name: 'Your name', email: 'Your email', message: 'Message', viaWhatsApp: 'Send on WhatsApp', viaEmail: 'Send by email', notSet: 'Contact details are not set yet. The site owner must add a WhatsApp number or email in src/data.js.' },
    cats: { all: 'All', nature: 'Nature', wildlife: 'Wildlife', adventure: 'Adventure', culture: 'Culture' },
    map: { title: 'Explore the map', hint: 'Hover or tap a pin to preview a place.', note: 'Schematic map. Pin positions are approximate and must be verified locally.', park: 'Bale Mountains area (approx.)', view: 'View details' },
    plan: { title: 'Plan your trip', intro: 'Three quick steps, then send your request on WhatsApp or by email. This is a request, not a confirmed booking.', s1: 'Your trip', s2: 'Dates & group', s3: 'Your details', tours: 'Choose a tour (optional)', places: 'Places you want to see', needOne: 'Please choose a tour or at least one place.', next: 'Next', back: 'Back', date: 'Preferred date', guests: 'Guests', phone: 'Phone / WhatsApp', country: 'Country', notes: 'Notes', summary: 'Your request', none: 'Not chosen' },
    price: 'Price', from: 'From', perPerson: 'per person', quote: 'Contact us for a quote', days: 'days', day: 'day', details: 'View details', custom: 'Custom',
    season: 'Best season', fees: 'Fees / permits', distance: 'Distance from Robe', includes: 'Includes', map2: 'Open in Google Maps', mapNote: 'Map pin is approximate. Verify location and access locally.',
    top: 'Back to top',
    footer: 'All rights reserved.',
    testimonials: [['Placeholder review', 'Replace with real traveler reviews once you have them (src/i18n.jsx).']]
  },
  am: {
    brand: 'ዲስከቨር ባሌ ኢትዮጵያ',
    slogan: 'ተፈጥሮን ይለማመዱ። ባህልን ያግኙ። ባሌን ያስሱ።',
    nav: { home: 'ዋና ገጽ', about: 'ስለ እኛ', destinations: 'መዳረሻዎች', tours: 'ጉብኝቶች', transport: 'ትራንስፖርት', gallery: 'ፎቶዎች', contact: 'ያግኙን', book: 'ጉዞዎን ያቅዱ' },
    hero: { title: 'የኢትዮጵያን የዱር ልብ ያግኙ', sub: 'በባሌ ተራሮች የሚደረጉ ጉብኝቶች፦ የኢትዮጵያ ተኩላ፣ ደጋማ ሜዳዎች፣ ጥንታዊ ጫካዎች፣ ዋሻዎች እና ባህል።', cta: 'ጉብኝቶችን ይመልከቱ', scroll: 'ወደ ታች' },
    trust: ['የዩኔስኮ ቅርስ (2023)', 'እንግሊዝኛ የሚናገር የአካባቢ አስተናጋጅ', 'ብጁ የግል ጉብኝቶች', 'በ24 ሰዓት ውስጥ ምላሽ'],
    foot: { explore: 'ያስሱ', contact: 'ያግኙን', about: 'በደቡብ ምሥራቅ ኢትዮጵያ ባሌ ተራሮች የሚደረግ ጉዞ።', wa: 'ዋትስአፕ', mail: 'ኢሜይል', soon: 'በቅርቡ' },
    stats: { destinations: 'መዳረሻዎች', tours: 'የጉብኝት አማራጮች', languages: 'ቋንቋዎች' },
    sections: { destinations: 'መዳረሻዎች', tours: 'የጉብኝት ፓኬጆች', why: 'ለምን ከእኛ ጋር', testimonials: 'የጎብኚዎች አስተያየት', how: 'እንዴት ይሰራል', faq: 'ማወቅ ጥሩ ነው' },
    why: [
      ['የአካባቢ አስተናጋጅ', 'በባሌ የተመሠረተ፣ እንግሊዝኛ የሚናገር አስተናጋጅ።'],
      ['ተለዋዋጭ ጉብኝቶች', 'ከአንድ እስከ አምስት ቀን ወይም ብጁ ጉዞ።'],
      ['ትራንስፖርት ተካቷል', 'በራሳችን ተሽከርካሪ።'],
      ['ታማኝ አጋሮች', 'ከአካባቢ አስጎብኚዎች፣ ሆቴሎች እና ማህበረሰቦች ጋር።']
    ],
    how: [
      ['ይምረጡ', 'ጉብኝት ወይም ማየት የሚፈልጓቸውን ቦታዎች ይምረጡ።'],
      ['ጥያቄ ይላኩ', 'ቀንዎን እና የቡድን ብዛትን በዋትስአፕ ወይም በኢሜይል ያጋሩን።'],
      ['እናረጋግጣለን', 'ዋጋ እና ዝርዝሩን አረጋግጠን እንመልሳለን።']
    ],
    faq: [
      ['ቅጹን ከላኩ በኋላ ጉዞዬ ተረጋግጧል?', 'አይደለም። ቅጹ ጥያቄ ነው። ከመወሰኑ በፊት ዋጋ እና ሁኔታውን እናረጋግጣለን።'],
      ['የፓርክ ክፍያ እና ፈቃድ ተካቷል?', 'ክፍያዎች ስለሚለወጡ ከጉዞው በፊት አረጋግጠን እናሳውቃለን።'],
      ['ብጁ ጉብኝት ማዘጋጀት እችላለሁ?', 'አዎ። ብጁ ጉብኝት ይምረጡ ወይም ቦታዎችን ይምረጡ።'],
      ['ምን ቋንቋ ትናገራላችሁ?', 'አስተናጋጁ እንግሊዝኛ ይናገራል። ድረ ገጹ በእንግሊዝኛ እና በአማርኛ ነው።']
    ],
    about: { title: 'ስለ እኛ', body: 'ዲስከቨር ባሌ ኢትዮጵያ በባሌ የሚገኝ የአካባቢ ጉብኝት አዘጋጅ እና የትራንስፖርት አገልግሎት ሰጪ ነው።' },
    transport: { title: 'የትራንስፖርት አገልግሎት', body: 'በሮቤ፣ ጎባ እና በባሌ መዳረሻዎች መካከል ምቹ ትራንስፖርት። ለዋጋ ያግኙን።' },
    gallery: { title: 'ፎቶዎች', note: 'ምሳሌ ስዕሎች ናቸው። ለማጉላት ይጫኑ።', close: 'ዝጋ', prev: 'ወደ ኋላ', next: 'ወደ ፊት' },
    contact: { title: 'ያግኙን', name: 'ስምዎ', email: 'ኢሜይልዎ', message: 'መልእክት', viaWhatsApp: 'በዋትስአፕ ላክ', viaEmail: 'በኢሜይል ላክ', notSet: 'የመገናኛ መረጃ ገና አልተሞላም።' },
    cats: { all: 'ሁሉም', nature: 'ተፈጥሮ', wildlife: 'የዱር እንስሳት', adventure: 'ጀብዱ', culture: 'ባህል' },
    map: { title: 'ካርታውን ያስሱ', hint: 'ቦታን ለማየት ምልክቱን ይጫኑ።', note: 'ይህ ምሳሌ ካርታ ነው። የቦታዎች አቀማመጥ ግምታዊ ነው።', park: 'የባሌ ተራሮች አካባቢ (ግምት)', view: 'ዝርዝር ይመልከቱ' },
    plan: { title: 'ጉዞዎን ያቅዱ', intro: 'በሦስት ቀላል ደረጃዎች ጥያቄዎን በዋትስአፕ ወይም በኢሜይል ይላኩ። ይህ ጥያቄ ነው እንጂ የተረጋገጠ ቦታ ማስያዝ አይደለም።', s1: 'ጉዞዎ', s2: 'ቀን እና ቡድን', s3: 'መረጃዎ', tours: 'ጉብኝት ይምረጡ (አማራጭ)', places: 'ማየት የሚፈልጓቸው ቦታዎች', needOne: 'እባክዎ ጉብኝት ወይም ቢያንስ አንድ ቦታ ይምረጡ።', next: 'ቀጣይ', back: 'ተመለስ', date: 'የሚፈልጉት ቀን', guests: 'የእንግዶች ብዛት', phone: 'ስልክ / ዋትስአፕ', country: 'አገር', notes: 'ማስታወሻ', summary: 'ጥያቄዎ', none: 'አልተመረጠም' },
    price: 'ዋጋ', from: 'ከ', perPerson: 'በአንድ ሰው', quote: 'ለዋጋ ያግኙን', days: 'ቀናት', day: 'ቀን', details: 'ዝርዝር ይመልከቱ', custom: 'ብጁ',
    season: 'ተስማሚ ወቅት', fees: 'ክፍያ / ፈቃድ', distance: 'ከሮቤ ርቀት', includes: 'የሚካተት', map2: 'በጉግል ካርታ ክፈት', mapNote: 'የካርታው ቦታ ግምታዊ ነው።',
    top: 'ወደ ላይ',
    footer: 'መብቱ በሕግ የተጠበቀ ነው።',
    testimonials: [['ምሳሌ አስተያየት', 'እውነተኛ አስተያየቶች ሲኖሩ ይተኩ።']]
  },
  om: {
    brand: 'Baale Itiyoophiyaa Argadhu',
    slogan: 'Uumama muuxannoo godhadhu. Aadaa beekii. Baale daawwadhu.',
    nav: { home: 'Mana', about: 'Waa’ee keenya', destinations: 'Iddoowwan', tours: 'Imalaawwan', transport: 'Geejjiba', gallery: 'Suuraalee', contact: 'Nu qunnamaa', book: 'Imala kee karoorfadhu' },
    hero: { title: 'Onnee bosonaa Itiyoophiyaa argadhu', sub: 'Imala qajeelfamaa Tulluu Baale keessatti: waraabessa Itiyoophiyaa, dirree Afroalpine, bosonoota durii, holqaawwan fi aadaa jiraataa.', cta: 'Imalaawwan ilaali', scroll: 'Gadi' },
    trust: ['Dhaalmaa Addunyaa UNESCO (2023)', 'Geggeessaa naannoo Afaan Ingiliffaa dubbatu', 'Imala dhuunfaa filatamaa', 'Sa’aatii 24 keessatti deebii'],
    foot: { explore: 'Qorradhu', contact: 'Nu qunnamaa', about: 'Imala muuxannoo irratti hundaa’e Tulluu Baale, Kibba-bahaa Itiyoophiyaa.', wa: 'WhatsApp', mail: 'Imeelii', soon: 'Dhiyeenya ni dhufa' },
    stats: { destinations: 'Iddoowwan', tours: 'Filannoo imalaa', languages: 'Afaanota' },
    sections: { destinations: 'Iddoowwan', tours: 'Paakeejii imalaa', why: 'Maaliif nu wajjin imaltu', testimonials: 'Yaada imaltootaa', how: 'Akkamitti hojjata', faq: 'Beekuun gaarii' },
    why: [
      ['Geggeessaa naannoo', 'Baale keessa kan jiru, geggeessaa Afaan Ingiliffaa dubbatu.'],
      ['Imalaawwan jijjiiramoo', 'Guyyaa tokkoo hanga guyyaa shanii, ykn imala dhuunfaa.'],
      ['Geejjiba dabalata', 'Konkolaataa keenyaan, konkolaachisaa fi geggeessaa gaarii wajjin.'],
      ['Hiriyoota amanamoo', 'Geggeessitoota, hoteelota fi hawaasa naannoo wajjin hojjanna.']
    ],
    how: [
      ['Filadhu', 'Imala ykn iddoo arguu barbaaddu filadhu.'],
      ['Gaaffii kee ergi', 'Guyyaa fi baay’ina gareetii WhatsApp ykn imeeliin nuuf ergi.'],
      ['Nu mirkaneessina', 'Argama, gatii fi bal’ina isaa mirkaneessinee sitti deebisna.']
    ],
    faq: [
      ['Foormii erguu koo booda imalli koo mirkanaa’aa?', 'Lakki. Foormiin gaaffii dha. Osoo hin murtaa’iin dura argama fi gatii mirkaneessinee sitti deebisna.'],
      ['Kaffaltiin paarkii fi hayyamni dabalataa?', 'Kaffaltiiwwan jijjiiramuu waan danda’aniif, imala kee osoo hin xumuriin dura kan ammaa mirkaneessina.'],
      ['Imala dhuunfaa qopheessuu nan danda’aa?', 'Eeyyee. Imala filatamaa filadhu ykn iddoowwan kee mataa kee filadhu.'],
      ['Afaan kamiin dubbattu?', 'Geggeessaan keessan Afaan Ingiliffaa dubbata. Marsariitiin Afaan Ingiliffaa, Amaariffaa fi Afaan Oromootiin jira.']
    ],
    about: { title: 'Waa’ee keenya', body: 'Baale Itiyoophiyaa Argadhu qopheessaa imala naannoo, dhiyeessaa geejjibaa fi geggeessaa Afaan Ingiliffaa dubbatu kan Baale keessa jiru dha. Kaayyoon keenya daawwattoota Itiyoophiyaa fi addunyaa maraa uumama, bineensota fi aadaa Baale wajjin walitti hidhuu dha.' },
    transport: { title: 'Tajaajila geejjibaa', body: 'Geejjiba mijataa daawwattootaaf Roobee, Gobaa fi iddoowwan Baale gidduutti. Konkolaataan daandii murtaa’eef mijaa’uu isaa imala hundaan dura mirkanaa’a. Fageenyaa fi baay’ina gareetiin gatii argachuuf nu qunnamaa.' },
    gallery: { title: 'Suuraalee', note: 'Suuraaleen fi fakkeenyi Baale. Guddisuuf suuraa tuqi.', close: 'Cufi', prev: 'Duubatti', next: 'Duraatti' },
    contact: { title: 'Nu qunnamaa', name: 'Maqaa kee', email: 'Imeelii kee', message: 'Ergaa', viaWhatsApp: 'WhatsApp irratti ergi', viaEmail: 'Imeeliin ergi', notSet: 'Odeeffannoon qunnamtii ammayyuu hin guutamne.' },
    cats: { all: 'Hundaa', nature: 'Uumama', wildlife: 'Bineensota', adventure: 'Of-yaalii', culture: 'Aadaa' },
    map: { title: 'Kaartaa qorradhu', hint: 'Iddoo ilaaluuf mallattoo tuqi.', note: 'Kaartaan kun fakkeenya. Iddoowwan jiran madaalliidhaan; naannootti mirkaneessi.', park: 'Naannoo Tulluu Baale (madaallii)', view: 'Bal’ina ilaali' },
    plan: { title: 'Imala kee karoorfadhu', intro: 'Tarkaanfii salphaa sadiin gaaffii kee WhatsApp ykn imeeliin ergi. Kun gaaffii malee iddoo qabachuu mirkanaa’e miti.', s1: 'Imala kee', s2: 'Guyyaa fi gareen', s3: 'Odeeffannoo kee', tours: 'Imala filadhu (filannoo)', places: 'Iddoowwan arguu barbaaddu', needOne: 'Maaloo imala ykn yoo xiqqaate iddoo tokko filadhu.', next: 'Itti aanu', back: 'Duubatti', date: 'Guyyaa barbaadde', guests: 'Baay’ina keessummaa', phone: 'Bilbila / WhatsApp', country: 'Biyya', notes: 'Yaada', summary: 'Gaaffii kee', none: 'Hin filatamne' },
    price: 'Gatii', from: 'Jalqabee', perPerson: 'nama tokkoof', quote: 'Gatii argachuuf nu qunnamaa', days: 'guyyoota', day: 'guyyaa', details: 'Bal’ina ilaali', custom: 'Filatamaa',
    season: 'Yeroo gaarii', fees: 'Kaffaltii / hayyama', distance: 'Roobee irraa fageenya', includes: 'Kan dabalatu', map2: 'Google Maps irratti bani', mapNote: 'Iddoon kaartaa madaallii dha. Iddoo fi karaa naannootti mirkaneessi.',
    top: 'Gara oliitti',
    footer: 'Mirgi seeraan eegameera.',
    testimonials: [['Yaada fakkeenyaa', 'Yaada imaltootaa dhugaa yeroo qabdu bakka buusi (src/i18n.jsx).']]
  }
};

const Ctx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'en'; } catch { return 'en'; }
  });
  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] || dict.en }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
