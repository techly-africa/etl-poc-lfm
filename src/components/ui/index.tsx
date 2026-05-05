import React, { ReactNode, CSSProperties } from 'react';
import { ETL, tStyle, DesignTokens } from '../../constants/tokens';
import { useT } from '../../i18n/index';
import { Icon } from '../art/index';
import { ImigongoBand } from '../art/rw';

// Shared UI primitives — buttons, chips, progress, nav.
// Enhanced with Rwandan visual identity: Imigongo nav accent, richer screen headers.

interface BtnProps {
  kind?: 'primary' | 'secondary' | 'inverted' | 'outlined' | 'ghost';
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
}

export function Btn({ kind = 'primary', children, onClick, full = false, size = 'md', icon, disabled = false, style = {} }: BtnProps) {
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

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  locked?: boolean;
  size?: 'sm' | 'md';
  accent?: 'primary' | 'orange';
  style?: CSSProperties;
}

export function Chip({ children, active = false, onClick, locked = false, size = 'md', accent = 'primary', style = {} }: ChipProps) {
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

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  bg?: string;
}

export function ProgressBar({ value, max = 100, color = ETL.color.primary, height = 8, bg = ETL.color.tertiaryDeep }: ProgressBarProps) {
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

export function ProgressDots({ count, current }: { count: number; current: number }) {
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

interface ArcProgressProps {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color?: string;
  bg?: string;
  children?: ReactNode;
}

export function ArcProgress({ value, max = 100, size = 120, stroke = 12, color = ETL.color.primary, bg = ETL.color.tertiaryDeep, children }: ArcProgressProps) {
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

interface MacroRingProps {
  size?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export function MacroRing({ size = 88, protein = 0.7, carbs = 0.5, fat = 0.4 }: MacroRingProps) {
  const stroke = 6;
  const gap = 3;
  const arc = (r: number, p: number, c: string) => {
    const C = 2 * Math.PI * r;
    return <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c} strokeWidth={stroke}
      strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)}
      style={{ transition: 'stroke-dashoffset 0.8s' }}/>;
  };
  const arcBg = (r: number) => <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EDEDEA" strokeWidth={stroke}/>;
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

interface CardProps {
  children: ReactNode;
  padding?: number;
  bg?: string;
  radius?: number;
  style?: CSSProperties;
  onClick?: () => void;
  elev?: 'none' | 'sm' | 'md' | 'lg' | 'glow';
}

export function Card({ children, padding = 16, bg = '#fff', radius = ETL.radius.lg, style = {}, onClick, elev = 'sm' }: CardProps) {
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

interface SectionTitleProps {
  children: ReactNode;
  sub?: string;
  rw?: string;
  style?: CSSProperties;
}

export function SectionTitle({ children, sub, rw, style = {} }: SectionTitleProps) {
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

interface BottomNavProps {
  active: string;
  onChange: (id: string) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const t = useT();
  const tabs: { id: string; labelKey: string; icon: keyof typeof Icon }[] = [
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
      <ImigongoBand width="100%" height={6} palette="light"/>
      <div style={{
        padding: '8px 4px calc(env(safe-area-inset-bottom, 0px) + 12px)',
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
              {(Icon as any)[tab.icon](22, 'currentColor', isActive)}
              <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, letterSpacing: 0.2, lineHeight: 1.2 }}>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ScreenHeaderProps {
  title: string;
  sub?: string;
  action?: ReactNode;
  leading?: ReactNode;
  imigongo?: boolean;
}

export function ScreenHeader({ title, sub, action, leading, imigongo = false }: ScreenHeaderProps) {
  return (
    <div>
      {imigongo && <ImigongoBand width="100%" height={8} palette="light"/>}
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

export function ScrollPage({ children, bg = ETL.color.surface }: { children: ReactNode; bg?: string }) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: bg, 
      overflowY: 'auto', 
      overflowX: 'hidden',
      paddingTop: 10, 
      paddingBottom: 120, // Space for BottomNav
      WebkitOverflowScrolling: 'touch',
      position: 'absolute',
      inset: 0,
    }}>{children}</div>
  );
}

export function NotificationDrawer({ onBack }: { onBack: () => void }) {
  const notifications = [
    { id: 1, title: 'Session confirmed', body: 'Your meeting with Coach Aline is set for Thursday at 14:00.', time: '2h ago', icon: 'check', kind: 'primary' },
    { id: 2, title: 'Agaseke Reward!', body: 'You earned a new reward for your 7-day streak. Open it now!', time: '5h ago', icon: 'sparkle', kind: 'secondary' },
    { id: 3, title: 'Form Feedback', body: 'Aline U. left a note on your Squats. Quality over quantity!', time: '1d ago', icon: 'dumbbell', kind: 'primary' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: ETL.color.surface, zIndex: 150, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'max(60px, env(safe-area-inset-top, 0px) + 20px) 20px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 20, background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: ETL.shadow.sm }}>
          {(Icon as any).chevL(18, ETL.color.neutral, false)}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ ...tStyle('h2'), fontSize: 20 }}>Notifications</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifications.map(n => (
          <Card key={n.id} padding={14} elev="sm">
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: n.kind === 'primary' ? ETL.color.tertiary : '#FCEDDC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {(Icon as any)[n.icon](18, n.kind === 'primary' ? ETL.color.primary : ETL.color.secondary, false)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ ...tStyle('h4'), fontSize: 14 }}>{n.title}</div>
                  <div style={{ ...tStyle('small'), color: ETL.color.neutral40 }}>{n.time}</div>
                </div>
                <div style={{ ...tStyle('small'), color: ETL.color.neutral60, lineHeight: 1.4 }}>{n.body}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface PillProps {
  children: ReactNode;
  color?: 'primary' | 'orange' | 'neutral';
  size?: 'sm' | 'md';
  style?: CSSProperties;
}

export function Pill({ children, color = 'neutral', size = 'md', style = {} }: PillProps) {
  const colors = {
    primary:   { bg: ETL.color.tertiary,  fg: ETL.color.primary },
    orange:    { bg: '#FCEDDC',           fg: '#B86E20' },
    neutral:   { bg: ETL.color.neutral10, fg: ETL.color.neutral80 },
  }[color] || { bg: ETL.color.neutral10, fg: ETL.color.neutral80 };
  return (
    <div style={{
      padding: size === 'sm' ? '2px 8px' : '4px 10px', borderRadius: 6,
      background: colors.bg, color: colors.fg,
      ...tStyle('overline'), fontSize: size === 'sm' ? 9 : 10, fontWeight: 700,
      display: 'inline-block',
      ...style,
    }}>{children}</div>
  );
}

export function IOSDevice({ children, isMobile = false }: { children: ReactNode; isMobile?: boolean }) {
  if (isMobile) {
    return <div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden', position: 'relative' }}>{children}</div>;
  }
  return (
    <div style={{
      width: 390, height: 844, position: 'relative',
      borderRadius: 44,
      background: '#000',
      padding: 12,
      boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
      border: '8px solid #1c1c1e',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 140, height: 32, background: '#000', borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zIndex: 100 }}>
        <div style={{ position: 'absolute', right: 28, top: 12, width: 6, height: 6, borderRadius: 3, background: '#1c1c1e' }}/>
      </div>
      <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 32, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}

