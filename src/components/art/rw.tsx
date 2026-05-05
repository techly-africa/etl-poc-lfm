import React from 'react';
import { ETL, tStyle } from '../../constants/tokens';

// Rwanda-inflected art: imigongo geometric pattern, agaseke basket, hills.
// Enhanced: richer visuals, new components for deeper cultural presence.

// Imigongo — traditional Rwandan geometric pattern (diamond/spiral motifs).
export function ImigongoBand({ width = '100%', height = 28, palette = 'forest' }) {
  const colors = {
    forest: { bg: '#1F4D3A', a: '#F4A261', b: '#E9F5EF', c: '#0E2A1F' },
    warm:   { bg: '#3D2818', a: '#E8B57A', b: '#F4E4D2', c: '#7A3F1F' },
    light:  { bg: '#E9F5EF', a: '#2D6A4F', b: '#1B1B1B', c: '#F4A261' },
    gold:   { bg: '#7A3F1F', a: '#FFD27A', b: '#F4E4D2', c: '#3D2818' },
  }[palette] || { bg: '#1F4D3A', a: '#F4A261', b: '#E9F5EF', c: '#0E2A1F' };
  const unit = 28;
  const repeats = 20; // Standard repeat count for the pattern strip
  return (
    <svg width={width} height={height} viewBox={`0 0 ${repeats * unit} ${unit}`} preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}>
      <rect width="100%" height="100%" fill={colors.bg}/>
      {Array.from({ length: repeats }).map((_, i) => {
        const x = i * unit;
        return (
          <g key={i} transform={`translate(${x} 0)`}>
            <path d={`M${unit/2} 4 L${unit-4} ${unit/2} L${unit/2} ${unit-4} L4 ${unit/2} Z`} fill={i % 2 === 0 ? colors.a : colors.b} opacity="0.4"/>
            <path d={`M${unit/2} 10 L${unit-10} ${unit/2} L${unit/2} ${unit-10} L10 ${unit/2} Z`} fill={i % 2 === 0 ? colors.c : colors.bg} opacity="0.3"/>
          </g>
        );
      })}
    </svg>
  );
}

// Imigongo corner accent — decorative quarter-pattern for card corners
export function ImigongoCorner({ size = 48, palette = 'forest', flip = false }) {
  const colors = {
    forest: { bg: '#1F4D3A', a: '#F4A261', b: '#E9F5EF' },
    light:  { bg: '#E9F5EF', a: '#2D6A4F', b: '#F4A261' },
    gold:   { bg: '#7A3F1F', a: '#FFD27A', b: '#F4E4D2' },
  }[palette] || { bg: '#1F4D3A', a: '#F4A261', b: '#E9F5EF' };
  const scale = flip ? 'scale(-1, 1)' : '';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: 'block' }}>
      <rect width="48" height="48" fill={colors.bg} opacity="0"/>
      <g transform={scale ? `translate(48,0) ${scale}` : ''}>
        {/* Triangular quadrant fill */}
        <path d="M0 0 L48 0 L0 48 Z" fill={colors.bg} opacity="0.9"/>
        {/* Diamond nested */}
        <path d="M0 0 L24 12 L0 24 Z" fill={colors.a} opacity="0.9"/>
        <path d="M0 0 L12 6 L0 12 Z" fill={colors.b} opacity="0.8"/>
        <circle cx="6" cy="6" r="2.5" fill={colors.a}/>
        {/* Step lines */}
        <path d="M0 36 L12 24" stroke={colors.a} strokeWidth="1.2" opacity="0.6"/>
        <path d="M0 48 L24 24" stroke={colors.b} strokeWidth="1" opacity="0.4"/>
      </g>
    </svg>
  );
}

// Agaseke (peace basket) — woven basket icon
export function Agaseke({ size = 80, accent = '#F4A261' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* lid (cone) */}
      <path d="M16 32 L40 8 L64 32 Z" fill="#1F4D3A"/>
      <path d="M22 30 L40 14 L58 30" stroke="#F4E4D2" strokeWidth="1.2" fill="none"/>
      <path d="M28 28 L40 18 L52 28" stroke={accent} strokeWidth="1.2" fill="none"/>
      <path d="M34 27 L40 22 L46 27" stroke="#F4E4D2" strokeWidth="1.2" fill="none"/>
      {/* knob */}
      <circle cx="40" cy="8" r="3" fill={accent}/>
      {/* basket body */}
      <path d="M14 32 L66 32 L60 64 Q40 70 20 64 Z" fill="#E8B57A"/>
      <path d="M14 32 L66 32 L60 64 Q40 70 20 64 Z" fill="url(#agk-w)"/>
      <defs>
        <pattern id="agk-w" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 L6 3" stroke="#7A3F1F" strokeWidth="0.6" opacity="0.5"/>
          <path d="M3 0 L3 6" stroke="#7A3F1F" strokeWidth="0.4" opacity="0.3"/>
        </pattern>
      </defs>
      {/* decorative band */}
      <rect x="14" y="32" width="52" height="6" fill="#1F4D3A"/>
      <path d="M18 35 L22 32 L26 35 L30 32 L34 35 L38 32 L42 35 L46 32 L50 35 L54 32 L58 35 L62 32" stroke={accent} strokeWidth="1" fill="none"/>
    </svg>
  );
}

// Rolling hills silhouette — "Land of a Thousand Hills" backdrop.
// Enhanced with richer layering, terraced hills, and dramatic sky.
export function HillsBackdrop({ width = '100%', height = 180 }) {
  const W = 390, H = 180; // Fixed viewbox base
  return (
    <svg width={width} height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="hb-sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4E4D2"/>
          <stop offset="0.5" stopColor="#FCEDDC"/>
          <stop offset="1" stopColor="#E9F5EF"/>
        </linearGradient>
        <linearGradient id="hb-hill3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8D5BA"/>
          <stop offset="1" stopColor="#6DBE9A"/>
        </linearGradient>
        <linearGradient id="hb-hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3F8A68"/>
          <stop offset="1" stopColor="#2D6A4F"/>
        </linearGradient>
        <linearGradient id="hb-hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F4D3A"/>
          <stop offset="1" stopColor="#0E2A1F"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width={W} height={H} fill="url(#hb-sky2)"/>
      {/* Sun + glow */}
      <circle cx={W * 0.80} cy={H * 0.28} r={H * 0.18} fill="#F4A261" opacity="0.15"/>
      <circle cx={W * 0.80} cy={H * 0.28} r={H * 0.12} fill="#F4A261" opacity="0.25"/>
      <circle cx={W * 0.80} cy={H * 0.28} r={H * 0.07} fill="#F4A261" opacity="0.9"/>
      {/* Far hills */}
      <path d={`M0 ${H*0.55} Q${W*0.15} ${H*0.38} ${W*0.3} ${H*0.5} Q${W*0.45} ${H*0.38} ${W*0.6} ${H*0.48} Q${W*0.75} ${H*0.35} ${W*0.88} ${H*0.47} Q${W*0.95} ${H*0.4} ${W} ${H*0.48} L${W} ${H} L0 ${H} Z`}
        fill="url(#hb-hill3)" opacity="0.65"/>
      {/* mid hills */}
      <path d={`M0 ${H*0.68} Q${W*0.12} ${H*0.54} ${W*0.28} ${H*0.64} Q${W*0.45} ${H*0.52} ${W*0.62} ${H*0.63} Q${W*0.78} ${H*0.54} ${W*0.9} ${H*0.62} Q${W*0.96} ${H*0.58} ${W} ${H*0.6} L${W} ${H} L0 ${H} Z`}
        fill="url(#hb-hill2)"/>
      {/* near hills */}
      <path d={`M0 ${H*0.85} Q${W*0.18} ${H*0.73} ${W*0.38} ${H*0.82} Q${W*0.55} ${H*0.74} ${W*0.72} ${H*0.83} Q${W*0.86} ${H*0.77} ${W} ${H*0.82} L${W} ${H} L0 ${H} Z`}
        fill="url(#hb-hill1)"/>
      {/* minimalist trees */}
      {[0.12, 0.45, 0.85].map((p, i) => (
        <g key={i} transform={`translate(${W * p} ${H * 0.82})`}>
          <rect x="-0.75" y="-10" width="1.5" height="10" fill="#0E2A1F" opacity="0.4"/>
          <circle cx="0" cy="-10" r="3" fill="#0E2A1F" opacity="0.3"/>
        </g>
      ))}
    </svg>
  );
}

// Coach avatar — warm earth tones with Kente-inspired collar
export function CoachAvatar({ size = 56, kind = 'fitness' }) {
  const skin = '#8B5A3C';
  const accent = kind === 'fitness' ? '#2D6A4F' : '#F4A261';
  const accentB = kind === 'fitness' ? '#F4A261' : '#2D6A4F';
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <circle cx="28" cy="28" r="28" fill="#FCEDDC"/>
      {/* Kente-style collar pattern on shoulders */}
      <path d="M6 56 Q6 38 28 38 Q50 38 50 56 Z" fill={accent}/>
      {/* Woven collar stripes */}
      <path d="M12 50 L16 42 M20 52 L22 40 M28 53 L28 38 M34 52 L36 40 M44 50 L40 42"
        stroke={accentB} strokeWidth="1.5" opacity="0.5"/>
      <path d="M8 56 Q17 46 28 44 Q39 46 48 56"
        stroke={accentB} strokeWidth="1" fill="none" opacity="0.4"/>
      {/* neck */}
      <rect x="24" y="30" width="8" height="8" fill={skin}/>
      {/* head */}
      <circle cx="28" cy="22" r="11" fill={skin}/>
      {/* hair */}
      <path d="M17 22 Q17 12 28 12 Q39 12 39 22 Q39 16 28 16 Q17 16 17 22 Z" fill="#1B1B1B"/>
      {kind === 'nutrition' && <path d="M19 20 Q22 8 28 12 Q34 8 37 20" stroke="#1B1B1B" strokeWidth="2" fill="none"/>}
      {/* smile */}
      <path d="M25 26 Q28 28 31 26" stroke="#1B1B1B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// Greeting seal — circular, woven ring effect
export function MuraSeal({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="34" fill="#1F4D3A"/>
      {/* outer woven ring */}
      <circle cx="36" cy="36" r="34" fill="none" stroke="#F4A261" strokeWidth="2.5" strokeDasharray="3 4" opacity="0.7"/>
      <circle cx="36" cy="36" r="30" fill="none" stroke="#E9F5EF" strokeWidth="1" strokeDasharray="2 6" opacity="0.5"/>
      {/* inner diamond pattern */}
      {[0,1,2,3,4,5,6,7].map(i => {
        const a = (i / 8) * Math.PI * 2;
        const r = 24;
        const x = 36 + Math.cos(a) * r;
        const y = 36 + Math.sin(a) * r;
        return <circle key={i} cx={x} cy={y} r="2" fill="#F4A261" opacity="0.7"/>;
      })}
      <text x="36" y="32" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#F4A261" letterSpacing="1.4">MURAHO</text>
      <text x="36" y="46" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#FFFFFF">welcome</text>
      <path d="M22 52 Q36 56 50 52" stroke="#F4A261" strokeWidth="1" fill="none"/>
    </svg>
  );
}

// Rwanda Map Badge — abstract outline of Rwanda as a badge/icon
export function RwandaMapBadge({ size = 48, color = '#2D6A4F', bg = '#E9F5EF' }) {
  // Simplified Rwanda outline path (normalised to 40×36 viewport)
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill={bg}/>
      <circle cx="24" cy="24" r="22" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3"/>
      {/* Simplified Rwanda outline — scaled and centred */}
      <path
        d="M14 17 L16 14 L20 13 L24 11 L28 12 L32 15 L34 18 L35 22 L34 26 L32 29 L30 32 L27 34 L24 35 L20 33 L17 30 L14 27 L13 23 L14 17 Z"
        fill={color} opacity="0.18"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Kigali star */}
      <circle cx="24" cy="23" r="2.5" fill={color}/>
      <circle cx="24" cy="23" r="4.5" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

// Kinyarwanda proverb display block
export function KinyarwandaProverb({ rw, en, style = {} }) {
  return (
    <div style={{
      padding: '16px 20px',
      background: '#fff',
      border: `1px solid ${ETL.color.neutral10}`,
      borderRadius: ETL.radius.md,
      position: 'relative',
      ...style,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5, marginBottom: 4 }}>
          "{rw}"
        </div>
        <div style={{ ...tStyle('small'), color: ETL.color.neutral60, fontSize: 11 }}>
          {en}
        </div>
      </div>
    </div>
  );
}

// Branded Water Bottle illustration
export function BrandedWaterBottle({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="bw-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ETL.color.primary}/>
          <stop offset="1" stopColor={ETL.color.primaryLight || '#3F8A68'}/>
        </linearGradient>
      </defs>
      {/* Body */}
      <path d="M45 40 Q45 30 50 30 L70 30 Q75 30 75 40 L75 100 Q75 110 60 110 Q45 110 45 100 Z" fill="url(#bw-grad)"/>
      {/* Cap */}
      <rect x="52" y="22" width="16" height="8" rx="2" fill={ETL.color.neutral}/>
      {/* Label/Logo */}
      <rect x="45" y="55" width="30" height="20" fill="rgba(255,255,255,0.15)"/>
      <text x="60" y="70" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800" fontFamily="Inter">ETL</text>
      {/* Highlights */}
      <rect x="48" y="45" width="2" height="50" rx="1" fill="rgba(255,255,255,0.1)"/>
    </svg>
  );
}

// Supplement Jar illustration
export function SupplementJar({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="sj-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ETL.color.neutral}/>
          <stop offset="1" stopColor="#1B1B1B"/>
        </linearGradient>
      </defs>
      {/* Body */}
      <rect x="35" y="40" width="50" height="65" rx="8" fill="url(#sj-grad)"/>
      {/* Lid */}
      <rect x="32" y="32" width="56" height="12" rx="4" fill="#3D2818"/>
      {/* Label */}
      <rect x="35" y="55" width="50" height="35" fill={ETL.color.secondary}/>
      <text x="60" y="72" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800" fontFamily="Inter">RESET</text>
      <text x="60" y="82" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="500" fontFamily="Inter">PLANT PROTEIN</text>
    </svg>
  );
}

// Hills strip — used as header band
export function HillsStrip({ height = 70 }) {
  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden', borderRadius: 12 }}>
      <HillsBackdrop width={400} height={height}/>
    </div>
  );
}
