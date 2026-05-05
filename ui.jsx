// Shared UI primitives — buttons, chips, progress, nav.
// Enhanced with Rwandan visual identity: Imigongo nav accent, richer screen headers.

function Btn({ kind = 'primary', children, onClick, full = false, size = 'md', icon, disabled = false, style = {} }) {
  const sizes = {
    sm: { h: 36, px: 14, fs: 13, fw: 600 },
    md: { h: 48, px: 20, fs: 15, fw: 600 },
    lg: { h: 56, px: 24, fs: 16, fw: 600 },
  }[size];
  const palettes = {
    primary:   { bg: ETL.color.primary,  fg: '#fff', bd: 'transparent' },
    secondary: { bg: '#fff',             fg: ETL.color.primary, bd: ETL.color.primary },
    inverted:  { bg: ETL.color.neutral,  fg: '#fff', bd: 'transparent' },
    outlined:  { bg: 'transparent',      fg: ETL.color.neutral, bd: ETL.color.neutral20 },
    ghost:     { bg: 'transparent',      fg: ETL.color.primary, bd: 'transparent' },
  }[kind];
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        height: sizes.h,
        padding: `0 ${sizes.px}px`,
        background: disabled ? ETL.color.neutral20 : palettes.bg,
        color: disabled ? ETL.color.neutral40 : palettes.fg,
        border: `1.5px solid ${disabled ? 'transparent' : palettes.bd}`,
        borderRadius: ETL.radius.full,
        fontFamily: ETL.font.family,
        fontSize: sizes.fs,
        fontWeight: sizes.fw,
        letterSpacing: '-0.1px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: full ? '100%' : undefined,
        transition: 'transform 0.12s, box-shadow 0.12s, background 0.12s',
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        boxShadow: kind === 'primary' && !pressed && !disabled ? ETL.shadow.glow : 'none',
        ...style,
      }}>
      {icon}
      {children}
    </button>
  );
}

function Chip({ children, active = false, onClick, locked = false, size = 'md', accent = 'primary', style = {} }) {
  const sizes = { sm: { h: 28, px: 10, fs: 12 }, md: { h: 36, px: 14, fs: 13 } }[size];
  const accentColor = accent === 'orange' ? ETL.color.secondary : ETL.color.primary;
  return (
    <button onClick={onClick} disabled={locked} style={{
      height: sizes.h, padding: `0 ${sizes.px}px`,
      background: active ? accentColor : (locked ? ETL.color.neutral10 : '#fff'),
      color: active ? '#fff' : (locked ? ETL.color.neutral40 : ETL.color.neutral),
      border: `1.5px solid ${active ? accentColor : ETL.color.neutral20}`,
      borderRadius: ETL.radius.full,
      fontFamily: ETL.font.family, fontSize: sizes.fs, fontWeight: 500,
      cursor: locked ? 'not-allowed' : 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      transition: 'all 0.15s',
      whiteSpace: 'nowrap',
      ...style,
    }}>{children}</button>
  );
}

function ProgressBar({ value, max = 100, color = ETL.color.primary, height = 8, bg = ETL.color.tertiaryDeep }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ width: '100%', height, background: bg, borderRadius: height, overflow: 'hidden' }}>
      <div style={{
        width: `${pct}%`, height: '100%', background: color, borderRadius: height,
        transition: 'width 0.6s cubic-bezier(0.2, 0.8, 0.3, 1)',
      }}/>
    </div>
  );
}

function ProgressDots({ count, current }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          height: 6, borderRadius: 3,
          width: i === current ? 22 : 6,
          background: i <= current ? ETL.color.primary : ETL.color.neutral20,
          transition: 'all 0.3s',
        }}/>
      ))}
    </div>
  );
}

// Donut / arc progress
function ArcProgress({ value, max = 100, size = 120, stroke = 12, color = ETL.color.primary, bg = ETL.color.tertiaryDeep, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.2, 0.8, 0.3, 1)' }}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

// Macro ring — three concentric arcs
function MacroRing({ size = 88, protein = 0.7, carbs = 0.5, fat = 0.4 }) {
  const stroke = 6;
  const gap = 3;
  const arc = (r, p, c) => {
    const C = 2 * Math.PI * r;
    return <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c} strokeWidth={stroke}
      strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)}
      style={{ transition: 'stroke-dashoffset 0.8s' }}/>;
  };
  const arcBg = (r) => <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EDEDEA" strokeWidth={stroke}/>;
  const r1 = (size - stroke) / 2;
  const r2 = r1 - stroke - gap;
  const r3 = r2 - stroke - gap;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {arcBg(r1)}{arc(r1, protein, ETL.color.primary)}
      {arcBg(r2)}{arc(r2, carbs, ETL.color.secondary)}
      {arcBg(r3)}{arc(r3, fat, ETL.color.neutral60)}
    </svg>
  );
}

// Card — base surface
function Card({ children, padding = 16, bg = '#fff', radius = ETL.radius.lg, style = {}, onClick, elev = 'sm' }) {
  return (
    <div onClick={onClick} style={{
      background: bg, borderRadius: radius, padding,
      boxShadow: elev === 'none' ? 'none' : ETL.shadow[elev],
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.12s, box-shadow 0.12s',
      ...style,
    }}>{children}</div>
  );
}

// Section header — with optional Kinyarwanda sub
function SectionTitle({ children, sub, rw, style = {} }) {
  return (
    <div style={{ ...style }}>
      {rw && (
        <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', marginBottom: 2, letterSpacing: 1 }}>
          {rw}
        </div>
      )}
      <div style={{ ...tStyle('h2'), color: ETL.color.neutral }}>{children}</div>
      {sub && <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// Bottom nav — Rwandan identity: Imigongo top-border + active pill
function BottomNav({ active, onChange }) {
  const t = useT();
  const tabs = [
    { id: 'home',      labelKey: 'nav.home',      icon: 'home' },
    { id: 'move',      labelKey: 'nav.move',       icon: 'dumbbell' },
    { id: 'nourish',   labelKey: 'nav.nourish',    icon: 'leaf' },
    { id: 'community', labelKey: 'nav.community',  icon: 'users' },
    { id: 'me',        labelKey: 'nav.me',         icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 10,
    }}>
      {/* Imigongo top accent strip */}
      <ImigongoBand width={390} height={6} palette="light"/>
      <div style={{
        padding: '8px 4px 28px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              background: isActive ? ETL.color.tertiary : 'transparent',
              border: isActive ? `1px solid ${ETL.color.tertiaryDeep}` : '1px solid transparent',
              borderRadius: 14,
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '7px 10px', minWidth: 52,
              color: isActive ? ETL.color.primary : ETL.color.neutral60,
              fontFamily: ETL.font.family,
              transition: 'all 0.2s',
            }}>
              {Icon[tab.icon](22, 'currentColor', isActive)}
              <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, letterSpacing: 0.2, lineHeight: 1.2 }}>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Top bar — screen header with optional Imigongo divider
function ScreenHeader({ title, sub, action, leading, imigongo = false }) {
  return (
    <div>
      {imigongo && <ImigongoBand width={390} height={8} palette="light"/>}
      <div style={{ padding: '12px 20px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {leading}
        <div style={{ flex: 1 }}>
          {sub && <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', marginBottom: 4 }}>{sub}</div>}
          <div style={{ ...tStyle('h1'), color: ETL.color.neutral }}>{title}</div>
        </div>
        {action}
      </div>
    </div>
  );
}

Object.assign(window, {
  Btn, Chip, ProgressBar, ProgressDots, ArcProgress, MacroRing, Card, SectionTitle, BottomNav, ScreenHeader,
});
