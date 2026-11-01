import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, NavLink, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useLang } from './i18n.jsx';
import { CONFIG, destinations, tours, gallery } from './data.js';
import Art from './Art.jsx';
import MapExplorer from './MapExplorer.jsx';
import { Reveal, Tilt, CountUp, useScrolled } from './ui.jsx';

const Hero3D = lazy(() => import('./Hero3D.jsx'));

// ---------- helpers ----------
const waLink = (text) => (CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}` : null);
const mailLink = (subject, text) => (CONFIG.email ? `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` : null);
const priceText = (tour, t) => (tour.priceUSD != null ? `${t.price}: $${tour.priceUSD} ${t.perPerson}` : t.quote);

function PriceBox({ tour }) {
  const { t } = useLang();
  const etb = Math.round((tour.priceUSD * CONFIG.usdToEtb) / 100) * 100;
  return (
    <div className="pricebox">
      <span className="pb-label">{t.price}</span>
      <span className="pb-val">
        {tour.from ? `${t.from} ` : ''}ETB {etb.toLocaleString('en-US')} <em>(${tour.priceUSD})</em>
        <small>{tour.from ? `${t.perPerson} / ${t.day}` : t.perPerson}</small>
      </span>
    </div>
  );
}

function SendButtons({ formRef, getMessage, subject }) {
  const { t } = useLang();
  const go = (make) => {
    if (formRef.current && !formRef.current.reportValidity()) return;
    const url = make();
    if (url) window.open(url, '_blank', 'noopener');
  };
  if (!CONFIG.whatsapp && !CONFIG.email) return <p className="err">{t.contact.notSet}</p>;
  return (
    <div className="row">
      {CONFIG.whatsapp && <button type="button" className="btn" onClick={() => go(() => waLink(getMessage()))}>{t.contact.viaWhatsApp}</button>}
      {CONFIG.email && <button type="button" className="btn btn-ghost-dark" onClick={() => go(() => mailLink(subject, getMessage()))}>{t.contact.viaEmail}</button>}
    </div>
  );
}

// ---------- layout ----------
function ScrollEffects() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [p, setP] = useState(0);
  const showTop = useScrolled(700);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, [pathname]);
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
      <button className={`totop ${showTop ? 'show' : ''}`} aria-label={t.top} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  );
}

function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(30);
  const links = [['/', t.nav.home], ['/about', t.nav.about], ['/destinations', t.nav.destinations], ['/tours', t.nav.tours], ['/transport', t.nav.transport], ['/gallery', t.nav.gallery], ['/contact', t.nav.contact]];
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-in">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark" aria-hidden="true">▲</span> {t.brand}
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <span className="langs" role="group" aria-label="Language">
            {[['en', 'EN'], ['am', 'አማ'], ['om', 'OM']].map(([k, l]) => (
              <button key={k} className={`lang ${lang === k ? 'on' : ''}`} aria-pressed={lang === k} onClick={() => setLang(k)}>{l}</button>
            ))}
          </span>
          <Link className="btn btn-sm" to="/book" onClick={() => setOpen(false)}>{t.nav.book}</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useLang();
  const links = [['/destinations', t.nav.destinations], ['/tours', t.nav.tours], ['/transport', t.nav.transport], ['/gallery', t.nav.gallery], ['/contact', t.nav.contact]];
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div><strong className="foot-brand">{t.brand}</strong><p>{t.foot.about}</p></div>
        <div><h4>{t.foot.explore}</h4>{links.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</div>
        <div><h4>{t.foot.contact}</h4>
          {CONFIG.whatsapp ? <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer">{t.foot.wa}</a> : <span>{t.foot.wa}: {t.foot.soon}</span>}
          {CONFIG.phone && <a href={`tel:${CONFIG.phone}`}>☎ {CONFIG.phone}</a>}
          {CONFIG.email ? <a href={`mailto:${CONFIG.email}`}>✉ {CONFIG.email}</a> : <span>{t.foot.mail}: {t.foot.soon}</span>}
          <span>Robe · Goba · Bale, Ethiopia</span>
        </div>
      </div>
      <div className="container small foot-base">© {new Date().getFullYear()} {t.brand}. {t.footer}</div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const url = waLink('Hello Discover Bale Ethiopia, I would like to ask about a tour.');
  if (!url) return null;
  return <a className="wa" href={url} target="_blank" rel="noreferrer" aria-label="WhatsApp">WhatsApp</a>;
}

// ---------- cards ----------
function DestCard({ d }) {
  const { lang } = useLang();
  return (
    <Tilt>
      <Link to={`/destinations/${d.id}`} className="card card-link">
        <Art kind={d.kind} id={d.id} label={d.name[lang]} className="thumb" />
        <div className="card-body">
          <h3>{d.name[lang]}</h3>
          <p>{d.summary[lang]}</p>
        </div>
      </Link>
    </Tilt>
  );
}

function TourCard({ tour }) {
  const { t, lang } = useLang();
  return (
    <Tilt>
      <article className="card">
        <Art kind={tour.kind} id={tour.id} label={tour.name[lang]} className="thumb" />
        <div className="card-body">
          <div className="badge">{tour.days ? `${tour.days} ${tour.days > 1 ? t.days : t.day}` : t.custom}</div>
          <h3>{tour.name[lang]}</h3>
          <p>{tour.description[lang]}</p>
          <PriceBox tour={tour} />
          <Link className="btn btn-sm" to={`/tours/${tour.id}`}>{t.details}</Link>
        </div>
      </article>
    </Tilt>
  );
}

function Grid({ children, className = '' }) {
  return (
    <div className={`grid ${className}`}>
      {React.Children.map(children, (c, i) => <Reveal delay={(i % 6) * 70}>{c}</Reveal>)}
    </div>
  );
}

// ---------- pages ----------
function Hero() {
  const { t } = useLang();
  const [webgl, setWebgl] = useState(true);
  const fail = useCallback(() => setWebgl(false), []);
  return (
    <section className="hero">
      <Art kind="plateau" className="hero-art" label="" />
      {webgl && <Suspense fallback={null}><Hero3D onFail={fail} /></Suspense>}
      <div className="hero-shade" />
      <div className="container hero-in">
        <p className="eyebrow rise" style={{ animationDelay: '.05s' }}>{t.slogan}</p>
        <h1 className="rise" style={{ animationDelay: '.15s' }}>{t.hero.title}</h1>
        <p className="lead rise" style={{ animationDelay: '.3s' }}>{t.hero.sub}</p>
        <div className="row rise" style={{ animationDelay: '.45s' }}>
          <Link className="btn" to="/tours">{t.hero.cta}</Link>
          <Link className="btn btn-ghost" to="/book">{t.nav.book}</Link>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>{t.hero.scroll}</span><i /></div>
    </section>
  );
}

function Home() {
  const { t } = useLang();
  return (
    <>
      <Hero />
      <section className="trust" aria-label="Highlights">
        <div className="container trust-in">{t.trust.map((x) => <span key={x}>✓ {x}</span>)}</div>
      </section>
      <section className="stats">
        <div className="container stats-in">
          <div><b><CountUp to={destinations.length} /></b><span>{t.stats.destinations}</span></div>
          <div><b><CountUp to={tours.length} /></b><span>{t.stats.tours}</span></div>
          <div><b><CountUp to={2} /></b><span>{t.stats.languages}</span></div>
        </div>
      </section>
      <section className="container section">
        <Reveal><h2>{t.sections.why}</h2></Reveal>
        <Grid className="grid-4">
          {t.why.map(([h, p]) => <div className="card pad lift" key={h}><h3>{h}</h3><p>{p}</p></div>)}
        </Grid>
      </section>
      <section className="container section">
        <Reveal><h2>{t.sections.tours}</h2></Reveal>
        <Grid>{tours.slice(0, 3).map((x) => <TourCard key={x.id} tour={x} />)}</Grid>
        <Reveal><p><Link to="/tours" className="more">{t.hero.cta} →</Link></p></Reveal>
      </section>
      <section className="container section">
        <Reveal><h2>{t.sections.destinations}</h2></Reveal>
        <Grid>{destinations.slice(0, 6).map((d) => <DestCard key={d.id} d={d} />)}</Grid>
        <Reveal><p><Link to="/destinations" className="more">{t.nav.destinations} →</Link></p></Reveal>
      </section>
      <section className="how">
        <div className="container section">
          <Reveal><h2>{t.sections.how}</h2></Reveal>
          <Grid className="grid-3">
            {t.how.map(([h, p], i) => (
              <div className="step-card" key={h}><span className="num">{i + 1}</span><h3>{h}</h3><p>{p}</p></div>
            ))}
          </Grid>
        </div>
      </section>
      <section className="container section narrow">
        <Reveal><h2>{t.sections.faq}</h2></Reveal>
        {t.faq.map(([q, a]) => (
          <Reveal key={q}><details className="faq"><summary>{q}</summary><p>{a}</p></details></Reveal>
        ))}
      </section>
      <section className="container section">
        <Reveal><h2>{t.sections.testimonials}</h2></Reveal>
        {t.testimonials.map(([a, b]) => <Reveal key={a}><blockquote><strong>{a}</strong><br />{b}</blockquote></Reveal>)}
      </section>
    </>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section className="container section narrow">
      <h1>{t.about.title}</h1>
      <p className="lead dark">{t.about.body}</p>
      <Art kind="village" id="about" className="wide-art" label="" />
    </section>
  );
}

function Transport() {
  const { t } = useLang();
  return (
    <section className="container section narrow">
      <h1>{t.transport.title}</h1>
      <Art kind="transport" id="transport" className="wide-art" label="" />
      <p className="lead dark">{t.transport.body}</p>
      <Link className="btn" to="/contact">{t.nav.contact}</Link>
    </section>
  );
}

function Destinations() {
  const { t } = useLang();
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? destinations : destinations.filter((d) => d.cat === cat);
  return (
    <section className="container section">
      <h1>{t.sections.destinations}</h1>
      <div className="chips" role="tablist">
        {Object.keys(t.cats).map((k) => (
          <button key={k} role="tab" aria-selected={cat === k} className={`chip ${cat === k ? 'on' : ''}`} onClick={() => setCat(k)}>{t.cats[k]}</button>
        ))}
      </div>
      <MapExplorer items={destinations} activeCat={cat} />
      <div className="grid" style={{ marginTop: 28 }}>
        {list.map((d) => <DestCard key={d.id} d={d} />)}
      </div>
    </section>
  );
}

function DestinationDetail() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const d = destinations.find((x) => x.id === id);
  if (!d) return <section className="container section"><p>Not found. <Link to="/destinations">←</Link></p></section>;
  const map = `https://www.google.com/maps/search/?api=1&query=${d.lat},${d.lng}`;
  return (
    <section className="container section narrow">
      <h1>{d.name[lang]}</h1>
      <Art kind={d.kind} id={d.id} className="wide-art" label={d.name[lang]} />
      <span className="badge">{t.cats[d.cat]}</span>
      <p className="lead dark">{d.summary[lang]}</p>
      <dl className="facts">
        <dt>{t.season}</dt><dd>{d.season}</dd>
        <dt>{t.fees}</dt><dd>{d.fees}</dd>
        <dt>{t.distance}</dt><dd>{d.distanceFromRobe}</dd>
      </dl>
      <p className="small">{t.mapNote}</p>
      <div className="row">
        <a className="btn btn-ghost-dark" href={map} target="_blank" rel="noreferrer">{t.map2}</a>
        <Link className="btn" to="/book">{t.nav.book}</Link>
      </div>
    </section>
  );
}

function Tours() {
  const { t } = useLang();
  return (
    <section className="container section">
      <h1>{t.sections.tours}</h1>
      <Grid>{tours.map((x) => <TourCard key={x.id} tour={x} />)}</Grid>
    </section>
  );
}

function TourDetail() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const tour = tours.find((x) => x.id === id);
  if (!tour) return <section className="container section"><p>Not found. <Link to="/tours">←</Link></p></section>;
  return (
    <section className="container section narrow">
      <h1>{tour.name[lang]}</h1>
      <Art kind={tour.kind} id={tour.id} className="wide-art" label={tour.name[lang]} />
      <p className="lead dark">{tour.description[lang]}</p>
      {tour.destinations.length > 0 && (
        <>
          <h3>{t.nav.destinations}</h3>
          <ul>
            {tour.destinations.map((did) => {
              const d = destinations.find((x) => x.id === did);
              return d ? <li key={did}><Link to={`/destinations/${did}`}>{d.name[lang]}</Link></li> : null;
            })}
          </ul>
        </>
      )}
      <h3>{t.includes}</h3>
      <ul>{tour.includes.map((i) => <li key={i}>{i}</li>)}</ul>
      <PriceBox tour={tour} />
      {tour.note && <p className="small">{tour.note}</p>}
      <Link className="btn" to={`/book?tour=${tour.id}`}>{t.nav.book}</Link>
    </section>
  );
}

// Step-by-step trip planner
function Plan() {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const ref = useRef(null);
  const [step, setStep] = useState(1);
  const [err, setErr] = useState('');
  const [f, setF] = useState({ tourId: params.get('tour') || '', places: [], date: '', guests: 1, name: '', email: '', phone: '', country: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (id) => setF((p) => ({ ...p, places: p.places.includes(id) ? p.places.filter((x) => x !== id) : [...p.places, id] }));
  const tour = tours.find((x) => x.id === f.tourId);
  const placeNames = f.places.map((id) => destinations.find((d) => d.id === id)?.name.en).filter(Boolean);

  const next = () => {
    if (step === 1 && !f.tourId && f.places.length === 0) { setErr(t.plan.needOne); return; }
    setErr('');
    setStep(step + 1);
  };
  const message = () =>
    `Hello ${CONFIG.businessName}, I would like to request a tour.\n\n` +
    `Tour: ${tour ? tour.name.en : 'Not chosen'}\nPlaces: ${placeNames.join(', ') || '-'}\n` +
    `Preferred date: ${f.date || 'Flexible'}\nGuests: ${f.guests}\n\n` +
    `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nCountry: ${f.country}\nNotes: ${f.message}`;

  const steps = [t.plan.s1, t.plan.s2, t.plan.s3];
  return (
    <section className="container section narrow">
      <h1>{t.plan.title}</h1>
      <p>{t.plan.intro}</p>
      <ol className="stepper" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className={step === i + 1 ? 'on' : step > i + 1 ? 'done' : ''}><span>{step > i + 1 ? '✓' : i + 1}</span>{s}</li>
        ))}
      </ol>

      <form ref={ref} onSubmit={(e) => e.preventDefault()} className="form panel">
        {step === 1 && (
          <>
            <h3>{t.plan.tours}</h3>
            <div className="chips">
              {tours.map((x) => (
                <button type="button" key={x.id} aria-pressed={f.tourId === x.id} className={`chip ${f.tourId === x.id ? 'on' : ''}`} onClick={() => setF({ ...f, tourId: f.tourId === x.id ? '' : x.id })}>{x.name[lang]}</button>
              ))}
            </div>
            <h3>{t.plan.places}</h3>
            <div className="pick-grid">
              {destinations.map((d) => (
                <button type="button" key={d.id} aria-pressed={f.places.includes(d.id)} className={`pick ${f.places.includes(d.id) ? 'on' : ''}`} onClick={() => toggle(d.id)}>
                  <Art kind={d.kind} id={d.id} label="" className="pick-art" />
                  <span>{d.name[lang]}</span>
                  <i aria-hidden="true">{f.places.includes(d.id) ? '✓' : '+'}</i>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <label>{t.plan.date}<input type="date" value={f.date} onChange={set('date')} /></label>
            <div className="qty">
              <span>{t.plan.guests}</span>
              <button type="button" aria-label="-" onClick={() => setF({ ...f, guests: Math.max(1, Number(f.guests) - 1) })}>−</button>
              <b>{f.guests}</b>
              <button type="button" aria-label="+" onClick={() => setF({ ...f, guests: Math.min(50, Number(f.guests) + 1) })}>+</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <label>{t.contact.name}<input required value={f.name} onChange={set('name')} /></label>
            <label>{t.contact.email}<input required type="email" value={f.email} onChange={set('email')} /></label>
            <label>{t.plan.phone}<input value={f.phone} onChange={set('phone')} /></label>
            <label>{t.plan.country}<input value={f.country} onChange={set('country')} /></label>
            <label>{t.plan.notes}<textarea rows="3" value={f.message} onChange={set('message')} /></label>
            <div className="summary">
              <h3>{t.plan.summary}</h3>
              <p><b>{t.nav.tours}:</b> {tour ? tour.name[lang] : t.plan.none}</p>
              {placeNames.length > 0 && <p><b>{t.plan.places}:</b> {placeNames.join(', ')}</p>}
              <p><b>{t.plan.date}:</b> {f.date || '—'} · <b>{t.plan.guests}:</b> {f.guests}</p>
            </div>
            <SendButtons formRef={ref} getMessage={message} subject={`Tour request: ${tour ? tour.name.en : 'custom'}`} />
          </>
        )}

        {err && <p className="err">{err}</p>}
        <div className="row between">
          {step > 1 ? <button type="button" className="btn btn-ghost-dark" onClick={() => { setErr(''); setStep(step - 1); }}>{t.plan.back}</button> : <span />}
          {step < 3 && <button type="button" className="btn" onClick={next}>{t.plan.next}</button>}
        </div>
      </form>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const message = () => `Hello ${CONFIG.businessName},\n\n${f.message}\n\n— ${f.name} (${f.email})`;
  return (
    <section className="container section narrow">
      <h1>{t.contact.title}</h1>
      <div className="contact-info">
        {CONFIG.phone && <a href={`tel:${CONFIG.phone}`}>☎ {CONFIG.phone}</a>}
        {CONFIG.email && <a href={`mailto:${CONFIG.email}`}>✉ {CONFIG.email}</a>}
        <span>📍 Robe · Goba · Bale, Ethiopia</span>
      </div>
      <form ref={ref} onSubmit={(e) => e.preventDefault()} className="form panel">
        <label>{t.contact.name}<input required value={f.name} onChange={set('name')} /></label>
        <label>{t.contact.email}<input required type="email" value={f.email} onChange={set('email')} /></label>
        <label>{t.contact.message}<textarea required rows="5" value={f.message} onChange={set('message')} /></label>
        <SendButtons formRef={ref} getMessage={message} subject="Message from website" />
      </form>
    </section>
  );
}

function Lightbox({ index, onClose, onNav }) {
  const { t, lang } = useLang();
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [onClose, onNav]);
  const g = gallery[index];
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={g.caption[lang]} onClick={onClose}>
      <button className="lb-x" aria-label={t.gallery.close} onClick={onClose}>✕</button>
      <button className="lb-nav prev" aria-label={t.gallery.prev} onClick={(e) => { e.stopPropagation(); onNav(-1); }}>‹</button>
      <div className="lb-body" onClick={(e) => e.stopPropagation()}>
        {g.src ? <img src={g.src} alt={g.caption[lang]} /> : <Art kind={g.kind} id={`gallery-${index + 1}`} label={g.caption[lang]} className="lb-art" />}
        <p>{g.caption[lang]} · {index + 1}/{gallery.length}</p>
      </div>
      <button className="lb-nav next" aria-label={t.gallery.next} onClick={(e) => { e.stopPropagation(); onNav(1); }}>›</button>
    </div>
  );
}

function Gallery() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback((d) => setOpen((i) => (i === null ? null : (i + d + gallery.length) % gallery.length)), []);
  return (
    <section className="container section">
      <h1>{t.gallery.title}</h1>
      <p className="small">{t.gallery.note}</p>
      <div className="gallery">
        {gallery.map((g, i) => (
          <Reveal key={i} delay={(i % 4) * 60}>
            <Tilt>
              <button className="shot" onClick={() => setOpen(i)} aria-label={g.caption[lang]}>
                {g.src ? <img src={g.src} alt={g.caption[lang]} loading="lazy" /> : <Art kind={g.kind} id={`gallery-${i + 1}`} label={g.caption[lang]} />}
                <span className="cap">{g.caption[lang]}</span>
              </button>
            </Tilt>
          </Reveal>
        ))}
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
    </section>
  );
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollEffects />
      <Header />
      <main>
        <div key={pathname} className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/book" element={<Plan />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
