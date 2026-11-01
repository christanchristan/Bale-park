import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from './i18n.jsx';

// Schematic (not survey-accurate) map. Pin positions come from the approximate
// lat/lng values in data.js and MUST be verified locally before relying on them.
const B = { latMax: 7.22, latMin: 6.5, lngMin: 39.6, lngMax: 40.95 };
const W = 600;
const H = 400;
const place = (lat, lng) => ({
  x: 24 + ((lng - B.lngMin) / (B.lngMax - B.lngMin)) * (W - 48),
  y: 24 + ((B.latMax - lat) / (B.latMax - B.latMin)) * (H - 48)
});

const CAT_COLOR = { nature: '#2f7d57', wildlife: '#c2761f', adventure: '#3b6ea5', culture: '#a8445a' };

export default function MapExplorer({ items, activeCat }) {
  const { t, lang } = useLang();
  const [activeId, setActiveId] = useState(null);
  const active = items.find((d) => d.id === activeId);
  const park = place(6.85, 39.82);
  const robe = place(7.13, 39.97);

  return (
    <div className="map-wrap">
      <div className="map-card">
        <svg viewBox={`0 0 ${W} ${H}`} className="map-svg" role="group" aria-label={t.map.title}>
          <defs>
            <linearGradient id="mapbg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#dfeadb" />
              <stop offset="1" stopColor="#f3ecd6" />
            </linearGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#1f4d3a" strokeOpacity="0.07" />
            </pattern>
          </defs>
          <rect width={W} height={H} rx="16" fill="url(#mapbg)" />
          <rect width={W} height={H} rx="16" fill="url(#grid)" />
          <ellipse cx={park.x} cy={park.y} rx="118" ry="88" fill="#2f7d57" opacity="0.16" stroke="#2f7d57" strokeDasharray="6 6" strokeOpacity="0.5" />
          <text x={park.x} y={park.y + 74} textAnchor="middle" className="map-label">{t.map.park}</text>
          <path d="M10 330 Q150 300 260 345 T590 320" fill="none" stroke="#9fc9dd" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <g transform={`translate(${robe.x - 6} ${robe.y - 6})`}>
            <rect width="12" height="12" transform="rotate(45 6 6)" fill="#143528" />
          </g>
          <text x={robe.x - 14} y={robe.y - 12} textAnchor="end" className="map-label strong">Robe</text>

          {items.map((d) => {
            const p = place(d.lat, d.lng);
            const dim = activeCat !== 'all' && d.cat !== activeCat;
            const isActive = d.id === activeId;
            return (
              <g
                key={d.id}
                className={`pin ${dim ? 'dim' : ''} ${isActive ? 'on' : ''}`}
                transform={`translate(${p.x} ${p.y})`}
                tabIndex={dim ? -1 : 0}
                role="button"
                aria-label={d.name[lang]}
                onMouseEnter={() => !dim && setActiveId(d.id)}
                onFocus={() => !dim && setActiveId(d.id)}
                onClick={() => !dim && setActiveId(d.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveId(d.id); } }}
              >
                {isActive && <circle cy="-13" r="16" fill={CAT_COLOR[d.cat]} opacity="0.3" className="pulse" />}
                <path d="M0 0 C-10 -12 -11 -26 0 -26 C11 -26 10 -12 0 0Z" fill={CAT_COLOR[d.cat]} stroke="#fff" strokeWidth="1.5" />
                <circle cy="-17" r="4" fill="#fff" />
              </g>
            );
          })}
        </svg>
        <p className="small map-note">{t.map.note}</p>
      </div>

      <aside className="map-panel" aria-live="polite">
        {active ? (
          <>
            <span className="badge" style={{ background: CAT_COLOR[active.cat] }}>{t.cats[active.cat]}</span>
            <h3>{active.name[lang]}</h3>
            <p>{active.summary[lang]}</p>
            <Link className="btn btn-sm" to={`/destinations/${active.id}`}>{t.map.view}</Link>
          </>
        ) : (
          <p className="small">{t.map.hint}</p>
        )}
      </aside>
    </div>
  );
}
