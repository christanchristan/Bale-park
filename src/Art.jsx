import React, { useState } from 'react';
import { PHOTOS, ASSETS } from './photos.js';

// Built-in illustrations drawn with SVG, so no image files or backend are needed.
// kind -> colours + one extra shape drawn on top.
const SCENES = {
  plateau:   { sky: ['#f3c77a', '#e8f0f3'], layers: ['#9db3c2', '#6f9a7e', '#35634b'], extra: 'sun' },
  wolf:      { sky: ['#cfe0ea', '#f5efe0'], layers: ['#a9bcc8', '#c28a4a', '#7a5a2e'], extra: 'wolf' },
  peak:      { sky: ['#9fc3de', '#eef4f8'], layers: ['#7f97ab', '#52708a', '#2e4a5e'], extra: 'snow' },
  snow:      { sky: ['#a8c8e0', '#f1f6fa'], layers: ['#8aa2b6', '#58768f', '#34505f'], extra: 'snow' },
  forest:    { sky: ['#bcd6c4', '#e9f1e4'], layers: ['#5f8f70', '#2f6a4a', '#173f2e'], extra: 'trees' },
  grass:     { sky: ['#f5dca0', '#eef2dc'], layers: ['#b5c47a', '#8aa655', '#587a3a'], extra: 'sun' },
  cave:      { sky: ['#d9b88a', '#f1e2c6'], layers: ['#9a7048', '#6b4a2c', '#3a2616'], extra: 'cave' },
  dome:      { sky: ['#f0d8a8', '#faf1dc'], layers: ['#d8c08a', '#b89a5e', '#8a6f3c'], extra: 'dome' },
  valley:    { sky: ['#c9dfe8', '#f2f0e2'], layers: ['#8fb09a', '#5f8f70', '#3d6b52'], extra: 'river' },
  village:   { sky: ['#f6d9a0', '#f4ecd8'], layers: ['#b3c487', '#86a65a', '#5c7d3c'], extra: 'huts' },
  coffee:    { sky: ['#e8cfae', '#f6ecdc'], layers: ['#c9a47a', '#a07848', '#6e4a28'], extra: 'cup' },
  market:    { sky: ['#f7d6a2', '#f8eedc'], layers: ['#d9b27c', '#c08a52', '#8f5f34'], extra: 'stalls' },
  transport: { sky: ['#bcd8e8', '#f1f1e6'], layers: ['#8fb09a', '#5f8f70', '#3d6b52'], extra: 'car' }
};

function Extra({ type }) {
  switch (type) {
    case 'sun':
      return <circle cx="310" cy="70" r="26" fill="#fff" opacity="0.65" />;
    case 'snow':
      return (
        <g fill="#fff" opacity="0.95">
          <path d="M168 99 L190 80 L212 99 L202 95 L190 102 L180 95Z" />
          <path d="M310 109 L330 95 L350 109 L340 106 L330 111 L320 106Z" />
        </g>
      );
    case 'trees':
      return (
        <g fill="#0f2f21">
          {[30, 75, 125, 285, 335, 375].map((x, i) => (
            <path key={x} d={`M${x} ${225 - (i % 2) * 8} l14 -46 l14 46z`} />
          ))}
        </g>
      );
    case 'cave':
      return <path d="M150 232 Q200 140 250 232Z" fill="#1a0f08" />;
    case 'dome':
      return (
        <g fill="#f7efe0">
          <rect x="170" y="165" width="60" height="45" />
          <path d="M165 165 Q200 110 235 165Z" />
          <rect x="196" y="100" width="4" height="16" />
          <rect x="240" y="150" width="14" height="60" />
        </g>
      );
    case 'river':
      return <path d="M190 260 Q170 220 200 200 Q240 180 210 150" fill="none" stroke="#bfe3f2" strokeWidth="10" strokeLinecap="round" opacity="0.9" />;
    case 'huts':
      return (
        <g>
          {[110, 220, 300].map((x) => (
            <g key={x}>
              <rect x={x} y="190" width="34" height="26" fill="#e9d3a6" />
              <path d={`M${x - 6} 190 L${x + 17} 166 L${x + 40} 190Z`} fill="#8a5a2b" />
            </g>
          ))}
        </g>
      );
    case 'cup':
      return (
        <g>
          <path d="M155 175 h90 v34 a45 28 0 0 1 -90 0z" fill="#fff8ec" />
          <path d="M245 183 h14 a16 16 0 0 1 0 28 h-14" fill="none" stroke="#fff8ec" strokeWidth="8" />
          <path d="M180 165 q-8 -14 0 -26 M205 165 q-8 -14 0 -26 M230 165 q-8 -14 0 -26" fill="none" stroke="#fff" strokeWidth="4" opacity="0.75" strokeLinecap="round" />
        </g>
      );
    case 'stalls':
      return (
        <g>
          {[60, 170, 280].map((x, i) => (
            <g key={x}>
              <rect x={x} y="185" width="64" height="32" fill="#f3e3c3" />
              <path d={`M${x - 6} 185 L${x + 70} 185 L${x + 62} 165 L${x + 2} 165Z`} fill={['#c0392b', '#2f6a4a', '#e0a030'][i]} />
            </g>
          ))}
        </g>
      );
    case 'car':
      return (
        <g>
          <path d="M120 215 L135 185 L255 185 L285 205 L292 215Z" fill="#fff8ec" />
          <path d="M142 190 L155 190 L155 205 L138 205Z M165 190 L215 190 L215 205 L165 205Z M225 190 L248 190 L266 205 L225 205Z" fill="#9fc3de" />
          <circle cx="165" cy="218" r="14" fill="#222" /><circle cx="165" cy="218" r="6" fill="#bbb" />
          <circle cx="250" cy="218" r="14" fill="#222" /><circle cx="250" cy="218" r="6" fill="#bbb" />
        </g>
      );
    case 'wolf':
      return (
        <path
          d="M120 225 L128 196 Q132 186 146 188 L186 190 Q200 176 214 166 L222 150 L230 164 L246 168 L240 184 Q252 192 252 208 L256 225 L248 225 L244 208 L226 208 L222 225 L214 225 L210 208 L150 208 L146 225Z"
          fill="#a45a22"
        />
      );
    default:
      return null;
  }
}

export default function Art({ kind = 'plateau', id = '', label = '', className = '' }) {
  const [bad, setBad] = useState(false);
  const photo = (id && ASSETS[id.toLowerCase()] ? { src: ASSETS[id.toLowerCase()] } : null) || PHOTOS[kind];
  if (photo && !bad && !className.includes('hero-art')) {
    return <img className={`art photo ${className}`} src={photo.src} alt={label || kind} loading="lazy" referrerPolicy="no-referrer" onError={() => setBad(true)} />;
  }
  const s = SCENES[kind] || SCENES.plateau;
  const gid = `g-${kind}`;
  return (
    <svg className={`art ${className}`} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label || kind}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.sky[0]} />
          <stop offset="1" stopColor={s.sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gid})`} />
      <path d="M0 150 L60 100 L120 140 L190 80 L260 135 L330 95 L400 140 V260 H0Z" fill={s.layers[0]} />
      <path d="M0 185 Q80 130 160 175 T320 160 T400 175 V260 H0Z" fill={s.layers[1]} />
      <path d="M0 225 Q100 190 200 218 T400 208 V260 H0Z" fill={s.layers[2]} />
      <Extra type={s.extra} />
    </svg>
  );
}
