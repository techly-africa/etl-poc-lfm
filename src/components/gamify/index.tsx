import React from 'react';
import { ETL, tStyle } from '../../constants/tokens';
import { Icon, RewardBadge } from '../art/index';
import { ImigongoBand, HillsBackdrop, Agaseke } from '../art/rw';

// Gamification + Rwandan visual layer.
// Provides: XP burst, level meter (Inkindi → Igisirimba → Intare), animated streak flame,
// imigongo dividers, Kinyarwanda greeting helper, daily quest ribbon, agaseke reward popper.

export const RW_LEVELS = [
  { n: 1, name: 'Inkindi',   meaning: 'Spark',     min: 0,    max: 250 },
  { n: 2, name: 'Inyenyeri', meaning: 'Star',      min: 250,  max: 600 },
  { n: 3, name: 'Igisirimba',meaning: 'Mountain',  min: 600,  max: 1100 },
  { n: 4, name: 'Intare',    meaning: 'Lion',      min: 1100, max: 2000 },
  { n: 5, name: 'Umugani',   meaning: 'Legend',    min: 2000, max: 3000 },
];

export function rwGreeting(hour) {
  const h = hour ?? new Date().getHours();
  if (h < 11)  return { rw: 'Mwaramutse',  en: 'Good morning' };
  if (h < 17)  return { rw: 'Mwiriwe',     en: 'Good afternoon' };
  return         { rw: 'Muramuke',    en: 'Good evening' };
}

export function levelFor(xp) {
  return RW_LEVELS.find(l => xp >= l.min && xp < l.max) || RW_LEVELS[RW_LEVELS.length-1];
}

// Animated XP gain burst (toast)
export function XPBurst({ amount, label, onDone }) {
  React.useEffect(() => {
    const id = setTimeout(onDone, 1800);
    return () => clearTimeout(id);
  }, []);
  return (
    <div style={{
      position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
      zIndex: 90, pointerEvents: 'none',
      animation: 'xpFly 1.8s cubic-bezier(0.2, 0.8, 0.3, 1) forwards',
    }}>
      <div style={{
        padding: '10px 18px', borderRadius: 999,
        background: ETL.color.primary, color: '#fff',
        boxShadow: '0 8px 24px rgba(45,106,79,0.4)',
        display: 'flex', alignItems: 'center', gap: 10,
        border: `2px solid ${ETL.color.secondary}`,
      }}>
        {Icon.sparkle(16, '#F4A261')}
        <span style={{ ...tStyle('h4'), color: '#fff', fontSize: 15 }}>+{amount} XP</span>
        {label && <span style={{ ...tStyle('small'), color: 'rgba(255,255,255,0.85)' }}>· {label}</span>}
      </div>
      <style>{`@keyframes xpFly {
        0% { opacity: 0; transform: translate(-50%, 20px) scale(0.7); }
        15% { opacity: 1; transform: translate(-50%, 0) scale(1.05); }
        80% { opacity: 1; transform: translate(-50%, -8px) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -32px) scale(0.95); }
      }`}</style>
    </div>
  );
}

// Animated streak flame — pulses when day count incremented today
export function RWStreakFlame({ n, today = true }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px 8px 10px', borderRadius: 999,
      background: 'linear-gradient(135deg, #FFF4E6 0%, #FCEDDC 100%)',
      border: `1.5px solid #F4A26144`,
    }}>
      <div style={{ position: 'relative', width: 22, height: 24 }}>
        <svg viewBox="0 0 22 24" width="22" height="24" style={{ animation: today ? 'flameFlick 1.2s infinite ease-in-out' : 'none' }}>
          <path d="M11 2 Q14 8 16 11 Q20 16 16 21 Q13 24 11 22 Q9 24 6 21 Q2 16 6 11 Q8 8 11 2 Z" fill="#F4A261"/>
          <path d="M11 8 Q13 12 14 14 Q16 17 14 20 Q11 22 8 20 Q6 17 8 14 Q9.5 12 11 8 Z" fill="#FFD27A"/>
          <circle cx="11" cy="17" r="2.5" fill="#fff" opacity="0.7"/>
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span style={{ ...tStyle('overline'), color: '#B86E20', textTransform: 'uppercase', fontSize: 9, letterSpacing: 0.8 }}>Akarasisi</span>
        <span style={{ ...tStyle('h4'), color: '#7A3F1F', fontSize: 15, lineHeight: 1.1 }}>{n} day{n === 1 ? '' : 's'}</span>
      </div>
      <style>{`@keyframes flameFlick {
        0%,100% { transform: scale(1) rotate(-1deg); }
        50% { transform: scale(1.08) rotate(2deg); }
      }`}</style>
    </div>
  );
}

// Imigongo divider — slim band of diamond pattern
export function ImigongoDivider({ palette = 'light', height = 12 }) {
  return <div style={{ margin: '4px 0' }}><ImigongoBand width={420} height={height} palette={palette}/></div>;
}

// Level meter — XP toward next Rwandan-named level
export function LevelMeter({ xp = 340 }) {
  const lvl = levelFor(xp);
  const next = RW_LEVELS[lvl.n] || lvl;
  const pct = ((xp - lvl.min) / (lvl.max - lvl.min)) * 100;
  return (
    <div style={{ padding: 14, borderRadius: ETL.radius.lg, background: '#fff', boxShadow: ETL.shadow.sm, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <ImigongoBand width={400} height={6} palette="forest"/>
      </div>
      <div style={{ paddingTop: 4, display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 22,
          background: `linear-gradient(135deg, ${ETL.color.primary} 0%, ${ETL.color.primaryLight || '#3F8A68'} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 4px 10px rgba(45,106,79,0.25)',
        }}>
          <span style={{ color: '#fff', fontFamily: ETL.font.family, fontWeight: 700, fontSize: 14 }}>L{lvl.n}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 15 }}>{lvl.name}</span>
            <span style={{ ...tStyle('small'), color: ETL.color.neutral60, fontStyle: 'italic' }}>· {lvl.meaning}</span>
          </div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginBottom: 6 }}>
            {xp} / {lvl.max} XP · {lvl.max - xp} to {next.name}
          </div>
          <div style={{ height: 6, background: ETL.color.neutral10, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: `${pct}%`, height: '100%',
              background: `linear-gradient(90deg, ${ETL.color.primary}, ${ETL.color.secondary})`,
              borderRadius: 3, position: 'relative',
              animation: 'shimmer 2.5s infinite',
            }}/>
          </div>
        </div>
      </div>
      <style>{`@keyframes shimmer {
        0%,100% { box-shadow: 0 0 0 rgba(244,162,97,0); }
        50% { box-shadow: 0 0 12px rgba(244,162,97,0.6); }
      }`}</style>
    </div>
  );
}

// Daily quest ribbon — three quests, each gives XP. Animated checkmark on tap.
export function DailyQuests({ quests, onComplete }) {
  return (
    <div style={{ background: '#fff', borderRadius: ETL.radius.lg, overflow: 'hidden', boxShadow: ETL.shadow.sm }}>
      <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', fontWeight: 700 }}>Imihigo · daily quests</div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginTop: 2 }}>3 small wins · resets at midnight</div>
        </div>
        <div style={{ ...tStyle('h4'), color: ETL.color.secondary, fontSize: 14 }}>+{quests.filter(q => q.done).reduce((a,q) => a+q.xp, 0)}/{quests.reduce((a,q) => a+q.xp, 0)} XP</div>
      </div>
      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {quests.map((q, i) => (
          <button key={i} onClick={() => !q.done && onComplete(i)} disabled={q.done} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 12,
            background: q.done ? ETL.color.tertiary : '#FAFAF7',
            border: `1.5px solid ${q.done ? ETL.color.primary : 'transparent'}`,
            cursor: q.done ? 'default' : 'pointer', textAlign: 'left',
            transition: 'all 0.2s',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              background: q.done ? ETL.color.primary : '#fff',
              border: `2px solid ${q.done ? ETL.color.primary : ETL.color.neutral20}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              animation: q.done ? 'questPop 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
            }}>{q.done && Icon.check(14, '#fff')}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...tStyle('h4'), color: q.done ? ETL.color.neutral60 : ETL.color.neutral, fontSize: 14, textDecoration: q.done ? 'line-through' : 'none' }}>{q.label}</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60, fontSize: 11 }}>{q.sub}</div>
            </div>
            <span style={{ padding: '3px 8px', borderRadius: 6, background: q.done ? ETL.color.primary : '#FFF4E6', color: q.done ? '#fff' : '#B86E20', ...tStyle('small'), fontSize: 11, fontWeight: 700, flexShrink: 0 }}>+{q.xp}</span>
          </button>
        ))}
      </div>
      <style>{`@keyframes questPop {
        0% { transform: scale(0.6); }
        60% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }`}</style>
    </div>
  );
}

// Agaseke reward popper — confetti + opening basket on milestone
export function AgasekePopper({ message, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(14,42,31,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 24,
      animation: 'fadeBg 0.3s' }}>
      <style>{`
        @keyframes fadeBg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes liftLid { 0% { transform: translateY(0); } 50% { transform: translateY(-30px) rotate(-8deg); } 100% { transform: translateY(-50px) rotate(-12deg); opacity: 0.85; } }
        @keyframes risePrize { 0% { transform: translateY(40px) scale(0.5); opacity: 0; } 100% { transform: translateY(-10px) scale(1); opacity: 1; } }
        @keyframes textIn { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{ position: 'relative', width: 200, height: 200 }}>
        {/* basket body */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <Agaseke size={140}/>
        </div>
        {/* lid lifts */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', animation: 'liftLid 1.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards' }}>
          <svg width="100" height="60" viewBox="0 0 100 60">
            <path d="M10 50 L50 6 L90 50 Z" fill="#1F4D3A"/>
            <path d="M22 48 L50 14 L78 48" stroke="#F4E4D2" strokeWidth="1.5" fill="none"/>
            <path d="M32 46 L50 24 L68 46" stroke="#F4A261" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        {/* prize emerges */}
        <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', animation: 'risePrize 0.8s 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) both' }}>
          <RewardBadge size={70} icon="trophy"/>
        </div>
        {/* sparkles */}
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{
            position: 'absolute', top: 60 + Math.sin(i) * 30, left: 100 + Math.cos(i * 1.3) * 80,
            animation: `risePrize 0.6s ${0.8 + i * 0.08}s both`, opacity: 0,
          }}>{Icon.sparkle(14 + i * 2, ['#F4A261', '#FFD27A', '#fff'][i % 3])}</div>
        ))}
      </div>
      <div style={{ marginTop: 24, textAlign: 'center', animation: 'textIn 0.5s 1.1s both' }}>
        <div style={{ ...tStyle('overline'), color: '#F4A261', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Murakoze · well done</div>
        <div style={{ ...tStyle('h2'), color: '#fff', fontSize: 22, marginBottom: 8 }}>{message || 'Phase milestone unlocked'}</div>
        <div style={{ ...tStyle('body'), color: 'rgba(255,255,255,0.75)', maxWidth: 280, margin: '0 auto' }}>
          Your coach has filled your agaseke basket with a reward.
        </div>
      </div>
      <button onClick={onClose} style={{
        marginTop: 24, padding: '14px 32px', borderRadius: 999,
        background: ETL.color.secondary, color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: ETL.font.family, fontSize: 15, fontWeight: 700,
        boxShadow: '0 8px 24px rgba(244,162,97,0.4)',
        animation: 'textIn 0.5s 1.4s both',
      }}>Continue your reset</button>
    </div>
  );
}

// Hills strip — used as a header band on Home (sense of place)
export function HillsStrip({ height = 70 }) {
  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden', borderRadius: 12 }}>
      <HillsBackdrop width={400} height={height}/>
    </div>
  );
}
