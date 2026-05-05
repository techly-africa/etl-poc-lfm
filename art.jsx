// SVG illustrations & icons — abstract, brand-driven, no stock photos.
// All take a size prop where useful.

// ── Icons (line, 1.75 stroke) ──────────────────────────────────────
const Icon = {
  home: (s = 24, c = 'currentColor', filled = false) => filled ? (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M3.5 11.5L12 4l8.5 7.5V20a1 1 0 0 1-1 1h-4.5v-6.5h-6V21H4.5a1 1 0 0 1-1-1v-8.5z"/>
    </svg>
  ) : (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 11.5L12 4l8.5 7.5V20a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-8.5z"/>
      <path d="M9.5 21v-6.5h5V21"/>
    </svg>
  ),
  search: (s = 24, c = 'currentColor', filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={filled ? 2.4 : 1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" fill={filled ? c : 'none'} fillOpacity={filled ? 0.15 : 0}/>
      <path d="M20 20l-4.5-4.5"/>
    </svg>
  ),
  user: (s = 24, c = 'currentColor', filled = false) => filled ? (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z"/>
    </svg>
  ) : (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    </svg>
  ),
  dumbbell: (s = 24, c = 'currentColor', filled = false) => filled ? (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <rect x="2" y="9" width="3" height="6" rx="1"/>
      <rect x="5" y="7" width="3" height="10" rx="1.2"/>
      <rect x="8" y="11" width="8" height="2"/>
      <rect x="16" y="7" width="3" height="10" rx="1.2"/>
      <rect x="19" y="9" width="3" height="6" rx="1"/>
    </svg>
  ) : (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="3" height="6" rx="1"/>
      <rect x="5" y="7" width="3" height="10" rx="1.2"/>
      <path d="M8 12h8"/>
      <rect x="16" y="7" width="3" height="10" rx="1.2"/>
      <rect x="19" y="9" width="3" height="6" rx="1"/>
    </svg>
  ),
  leaf: (s = 24, c = 'currentColor', filled = false) => filled ? (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M20 4c-9 0-15 4-15 11 0 3 1.5 5 3.5 6 0-4 3-8 8-10-4 3-6 6-7 10 1 .3 2 .5 3 .5 7 0 11-5 11-12 0-2-1-4-3.5-5.5z"/>
    </svg>
  ) : (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4c-9 0-15 4-15 11 0 3 1.5 5 3.5 6 7 0 11-5 11-12 0-2-1-4-3.5-5.5z"/>
      <path d="M5 21c0-4 3-8 8-10"/>
    </svg>
  ),
  trophy: (s = 24, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/>
      <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>
      <path d="M9 20h6M12 14v6"/>
    </svg>
  ),
  users: (s = 24, c = 'currentColor', filled = false) => filled ? (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <circle cx="9" cy="8" r="3.5"/>
      <circle cx="17" cy="9" r="2.8"/>
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6H2z"/>
      <path d="M16 14c3 0 6 1.8 6 5h-5.5c0-1.6-.5-3-1.5-4.2.3-.5.7-.8 1-.8z"/>
    </svg>
  ) : (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5"/>
      <circle cx="17" cy="9" r="2.5"/>
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
      <path d="M17 14c2.8 0 5 1.8 5 5"/>
    </svg>
  ),
  chevR: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
  ),
  chevL: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5"/></svg>
  ),
  check: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.5 3.5L13 5"/></svg>
  ),
  lock: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5"/>
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>
    </svg>
  ),
  flame: (s = 16, c = '#F4A261') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
      <path d="M8 1c0 3-3 4-3 7 0 2.2 1.5 4 3 4s3-1.8 3-4c0-2-1-3-1-5 0 1-1 2-2 1V1z" opacity="0.9"/>
      <path d="M8 6c0 1.5-2 2-2 4 0 1.5 1 3 2 3s2-1.5 2-3c0-1.5-1-2-1-4 0 1-.5 1.5-1 1z" fill="#fff" opacity="0.5"/>
    </svg>
  ),
  plus: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>
  ),
  play: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}><path d="M5 3.5v9a.5.5 0 0 0 .77.42l7-4.5a.5.5 0 0 0 0-.84l-7-4.5A.5.5 0 0 0 5 3.5z"/></svg>
  ),
  drop: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}><path d="M8 1.5s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9z"/></svg>
  ),
  walk: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="3" r="1.5"/>
      <path d="M9.5 6L7 9.5l2 2L8 15M9.5 6l2.5 1.5M7 9.5l-3 1"/>
    </svg>
  ),
  bowl: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h12a6 6 0 0 1-12 0z"/>
      <path d="M5 5c0-1 .5-2 1.5-2M9 4.5c0-.8.5-1.5 1.5-1.5"/>
    </svg>
  ),
  timer: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="9" r="5.5"/>
      <path d="M8 6v3l2 1.5M6 1.5h4M8 1.5v2"/>
    </svg>
  ),
  sparkle: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z"/>
      <path d="M13 11l.5 1.5L15 13l-1.5.5L13 15l-.5-1.5L11 13l1.5-.5L13 11z"/>
    </svg>
  ),
  scale: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="13" height="13" rx="2.5"/>
      <path d="M9 5v3M6.5 6.5L9 8l2.5-1.5"/>
    </svg>
  ),
  more: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill={c}><circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/></svg>
  ),
  bell: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8a5 5 0 0 1 10 0v4l1.5 2.5h-13L5 12V8zM8 17a2 2 0 0 0 4 0"/>
    </svg>
  ),
};

// ── Hero illustrations (used on onboarding & cards) ────────────────
function HeroBody({ size = 240 }) {
  // Abstract figure: torso silhouette with arc + leaf, in brand greens.
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none">
      <defs>
        <linearGradient id="hb-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2D6A4F"/>
          <stop offset="1" stopColor="#3F8A68"/>
        </linearGradient>
        <linearGradient id="hb-o" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4A261"/>
          <stop offset="1" stopColor="#E08A41"/>
        </linearGradient>
      </defs>
      {/* Soft mint backdrop circle */}
      <circle cx="120" cy="120" r="110" fill="#E9F5EF"/>
      {/* Orbital arc */}
      <path d="M30 145 a 95 75 -10 1 0 175 -45" stroke="#F4A261" strokeWidth="2.5" strokeDasharray="2 6" fill="none" opacity="0.6"/>
      {/* Body — abstract figure */}
      <g>
        <circle cx="120" cy="78" r="20" fill="url(#hb-g)"/>
        <path d="M88 130c0-18 14-32 32-32s32 14 32 32v18c0 8 4 16 8 22l-12 6c-6-6-10-14-10-22v18c0 18-14 32-32 32-3 0-6-.4-9-1l-3-15c5 2 8 2 12 2 12 0 22-10 22-22v-30c0-6-4-10-10-10s-10 4-10 10v22l-12-2v-26z" fill="url(#hb-g)"/>
        {/* Leaf accent */}
        <path d="M148 60c12-2 22 4 24 16-10 0-20-6-24-16z" fill="url(#hb-o)"/>
        <path d="M152 64c5 1 9 4 11 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </g>
      {/* Dots — particles */}
      <circle cx="48" cy="80" r="3" fill="#F4A261"/>
      <circle cx="200" cy="180" r="4" fill="#2D6A4F"/>
      <circle cx="180" cy="50" r="2.5" fill="#2D6A4F" opacity="0.6"/>
      <circle cx="60" cy="200" r="3" fill="#F4A261" opacity="0.7"/>
    </svg>
  );
}

// Workout thumbnail — abstract motion
function WorkoutThumb({ w = 80, h = 80, hue = 'green' }) {
  const fg = hue === 'green' ? '#2D6A4F' : '#F4A261';
  const bg = hue === 'green' ? '#E9F5EF' : '#FCEDDC';
  return (
    <svg width={w} height={h} viewBox="0 0 80 80">
      <rect width="80" height="80" rx="16" fill={bg}/>
      <g opacity="0.9">
        <circle cx="28" cy="28" r="6" fill={fg}/>
        <path d="M24 38l-4 18 6 4 4-12 8 8v14h6V52l-4-8 4-10-2-2-10 4-8-4z" fill={fg}/>
        <path d="M56 24l8 4-2 4-8-2 2-6z" fill={fg} opacity="0.6"/>
      </g>
      <circle cx="60" cy="56" r="3" fill={fg} opacity="0.4"/>
      <circle cx="14" cy="62" r="2" fill={fg} opacity="0.4"/>
    </svg>
  );
}

// Meal illustration — abstract bowl
function MealThumb({ w = 80, h = 80, kind = 'breakfast' }) {
  const palette = {
    breakfast: { bg: '#FCEDDC', a: '#F4A261', b: '#2D6A4F', c: '#FFD89B' },
    lunch:     { bg: '#E9F5EF', a: '#2D6A4F', b: '#F4A261', c: '#A8D5BA' },
    dinner:    { bg: '#EDE6F2', a: '#6B4E8C', b: '#F4A261', c: '#C8B6DC' },
    snack:     { bg: '#F4F1E6', a: '#B8924A', b: '#2D6A4F', c: '#E6D4A8' },
  }[kind];
  return (
    <svg width={w} height={h} viewBox="0 0 80 80">
      <rect width="80" height="80" rx="16" fill={palette.bg}/>
      {/* bowl */}
      <ellipse cx="40" cy="48" rx="26" ry="6" fill={palette.a} opacity="0.2"/>
      <path d="M14 46h52a26 13 0 0 1-52 0z" fill={palette.a}/>
      {/* contents */}
      <circle cx="32" cy="40" r="8" fill={palette.c}/>
      <circle cx="46" cy="38" r="6" fill={palette.b} opacity="0.8"/>
      <circle cx="40" cy="44" r="4" fill={palette.a}/>
      {/* leaf garnish */}
      <path d="M48 30c4-2 8 0 8 4-4 1-7-1-8-4z" fill={palette.b}/>
    </svg>
  );
}

// Phase emblem — circular badge with phase number
function PhaseBadge({ size = 80, n = 1, locked = false, label = 'Foundation' }) {
  const c = locked ? '#9CA8A1' : '#2D6A4F';
  const bg = locked ? '#EDEDEA' : '#E9F5EF';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="36" fill={bg}/>
      <circle cx="40" cy="40" r="36" fill="none" stroke={c} strokeWidth="2" strokeDasharray={locked ? '4 4' : '0'} opacity={locked ? 0.5 : 1}/>
      <text x="40" y="36" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill={c} letterSpacing="0.5">PHASE</text>
      <text x="40" y="56" textAnchor="middle" fontFamily="Inter" fontSize="22" fontWeight="700" fill={c}>{n}</text>
    </svg>
  );
}

// Reward badges
function RewardBadge({ size = 56, icon = 'leaf', earned = true }) {
  const c = earned ? '#2D6A4F' : '#9CA8A1';
  const bg = earned ? '#E9F5EF' : '#EDEDEA';
  const accent = earned ? '#F4A261' : '#C8C8C5';
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <path d="M28 4l5 4 6-1 2 6 5 4-2 6 2 6-5 4-2 6-6-1-5 4-5-4-6 1-2-6-5-4 2-6-2-6 5-4 2-6 6 1z" fill={bg} stroke={c} strokeWidth="1.5"/>
      <g transform="translate(16 16)">
        {icon === 'leaf' && <path d="M22 2c-9 0-15 4-15 11 0 3 1.5 5 3.5 6 7 0 11-5 11-12 0-2-1-4-3.5-5.5z" fill={c} transform="scale(0.8)"/>}
        {icon === 'drop' && <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" fill={c} transform="scale(0.8)"/>}
        {icon === 'bowl' && <path d="M2 12h20a10 10 0 0 1-20 0z M5 9c0-2 1-3 2-3M11 8c0-1.5 1-2 2-2" fill={c} stroke={c} strokeWidth="1" transform="scale(0.8)"/>}
        {icon === 'flame' && <path d="M12 1c0 4-4 5-4 9 0 3 2 5 4 5s4-2 4-5c0-3-2-4-2-7 0 1.5-1 2.5-2 2V1z" fill={c} transform="scale(0.8)"/>}
        {icon === 'trophy' && <g fill={c} transform="scale(0.7)"><path d="M7 4h10v5a5 5 0 0 1-10 0V4zM9 20h6M12 14v6"/></g>}
      </g>
      {earned && <circle cx="46" cy="10" r="5" fill={accent}/>}
    </svg>
  );
}

Object.assign(window, { Icon, HeroBody, WorkoutThumb, MealThumb, PhaseBadge, RewardBadge });
