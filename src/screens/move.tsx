import React from 'react';
import { ETL, tStyle } from '../constants/tokens';
import { useT } from '../i18n/index';
import { Icon, PhaseBadge, WorkoutThumb, RewardBadge } from '../components/art/index';
import { EXERCISE_DEMOS, ExerciseDemoPlayer, VideoThumb } from '../components/video/index';
import { ScreenHeader, ScrollPage, Btn, Card, ProgressBar, ArcProgress, SectionTitle } from '../components/ui/index';

// Move screen (Fitness) — phases + week selector + workout cards.

export function MoveScreen({ onStartWorkout }) {
  const t = useT();
  const [phase, setPhase] = React.useState(1);
  const [week, setWeek] = React.useState(1);
  const [demo, setDemo] = React.useState(null);

  const phases = [
    { n: 1, key: 'phase.1', locked: false },
    { n: 2, key: 'phase.2', locked: true },
    { n: 3, key: 'phase.3', locked: true },
    { n: 4, key: 'phase.4', locked: true },
  ];

  const workouts = [
    { day: t('move.day1'),  title: t('move.title1'), dur: 35, groups: [t('move.group1a'),t('move.group1b')], status: 'completed', loc: t('move.loc1') },
    { day: t('move.day3'),  title: t('move.title3'), dur: 40, groups: [t('move.group3a'),t('move.group3b')], status: 'completed', loc: t('move.loc3') },
    { day: t('move.day5'),  title: t('move.title5'), dur: 35, groups: [t('move.group5a'),t('move.group5b')], status: 'today', loc: t('move.loc5') },
    { day: t('move.day6'),  title: t('move.title6'), dur: 30, groups: [t('move.group6a'),t('move.group6b')], status: 'upcoming', loc: t('move.loc6') },
  ];

  return (
    <ScrollPage>
      <ScreenHeader sub={t('move.sub')} title={t('move.title')} imigongo={true}/>

      {/* Phase tabs */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {phases.map(p => (
          <button key={p.n} onClick={() => !p.locked && setPhase(p.n)} disabled={p.locked} style={{
            flexShrink: 0,
            padding: '10px 16px', borderRadius: ETL.radius.full,
            border: `1.5px solid ${phase === p.n ? ETL.color.primary : ETL.color.neutral20}`,
            background: phase === p.n ? ETL.color.primary : (p.locked ? ETL.color.neutral10 : '#fff'),
            color: phase === p.n ? '#fff' : (p.locked ? ETL.color.neutral40 : ETL.color.neutral),
            fontFamily: ETL.font.family, fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
            cursor: p.locked ? 'not-allowed' : 'pointer',
          }}>
            <span style={{ opacity: 0.7 }}>P{p.n}</span> {t(p.key)} {p.locked && Icon.lock(12, 'currentColor', false)}
          </button>
        ))}
      </div>

      {/* Active phase card */}
      <div style={{ padding: '0 20px 20px' }}>
        <Card padding={0} elev="md" style={{ overflow: 'hidden' }}>
          <div style={{
            background: `linear-gradient(135deg, ${ETL.color.primary} 0%, ${ETL.color.primaryLight} 100%)`,
            padding: 20, color: '#fff', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.18 }}>
              <PhaseBadge size={140} n={1}/>
            </div>
            <div style={{ ...tStyle('overline'), opacity: 0.85, textTransform: 'uppercase', marginBottom: 8 }}>
              {t('move.phase.in', {n:1})}
            </div>
            <div style={{ ...tStyle('h2'), color: '#fff', marginBottom: 6 }}>{t('phase.1')}</div>
            <div style={{ ...tStyle('body'), opacity: 0.9, marginBottom: 4, maxWidth: 280 }}>
              Build your base. 3 sessions/week. Bodyweight + light resistance.
            </div>
            <div style={{ ...tStyle('small'), opacity: 0.75, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              {t('move.terrain')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <ProgressBar value={12} max={28} color="#fff" bg="rgba(255,255,255,0.25)"/>
              </div>
              <div style={{ ...tStyle('small'), color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>Day 12 / 28</div>
            </div>
          </div>

          <div style={{ padding: 16 }}>
            <div style={{ ...tStyle('label'), color: ETL.color.neutral60, marginBottom: 8, textTransform: 'none' }}>Week</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1,2,3,4].map(w => (
                <button key={w} onClick={() => setWeek(w)} style={{
                  flex: 1, height: 44, borderRadius: ETL.radius.md,
                  background: week === w ? ETL.color.tertiary : '#fff',
                  border: `1.5px solid ${week === w ? ETL.color.primary : ETL.color.neutral20}`,
                  color: week === w ? ETL.color.primary : ETL.color.neutral80,
                  fontFamily: ETL.font.family, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}>Wk {w}</button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Workout list */}
      <div style={{ padding: '0 20px 12px' }}>
        <SectionTitle rw={t('move.section.rw')} style={{ marginBottom: 12 }}>{t('move.section', {n: week})}</SectionTitle>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {workouts.map((w, i) => (
          <WorkoutCard key={i} {...w} loc={w.loc} onStart={onStartWorkout}/>
        ))}
      </div>

      {/* Bridge — nutrition reminder */}
      <div style={{ padding: '0 20px 28px' }}>
        <Card style={{ background: '#FFF4E6', border: `1px solid #F4A26133` }} elev="none">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F4A26122',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {Icon.bowl(20, ETL.color.secondary, false)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14, marginBottom: 2 }}>Refuel after training</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Eating window opens 12:00 · plan today's meal</div>
            </div>
            {Icon.chevR(16, ETL.color.neutral60)}
          </div>
        </Card>
      </div>

      {/* Exercise demo library */}
      <div style={{ padding: '0 20px 12px' }}>
        <SectionTitle style={{ marginBottom: 12 }}>Exercise demos</SectionTitle>
        <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginBottom: 12 }}>Tap any move to watch coach Aline demonstrate the form.</div>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <VideoThumb kind="exercise" label="Squats" sub="Form check" dur="0:24" h={130} onPlay={() => setDemo('Squats')}/>
        <VideoThumb kind="exercise" label="Push-ups" sub="Build chest" dur="0:22" hue="orange" h={130} onPlay={() => setDemo('Push-ups')}/>
        <VideoThumb kind="exercise" label="Bent-over Rows" sub="Pull strength" dur="0:20" h={130} onPlay={() => setDemo('Bent-over Rows')}/>
        <VideoThumb kind="exercise" label="Plank" sub="Core hold" dur="0:18" hue="orange" h={130} onPlay={() => setDemo('Plank')}/>
      </div>

      <div style={{ height: 80 }}/>
      {demo && <ExerciseDemoPlayer name={demo} onClose={() => setDemo(null)}/>}
    </ScrollPage>
  );
}

export function WorkoutCard({ day, title, dur, groups, status, loc, onStart }) {
  const styles = {
    completed: { bg: ETL.color.tertiary, border: 'transparent', muted: true },
    today:     { bg: '#fff', border: ETL.color.primary, muted: false },
    upcoming:  { bg: '#fff', border: ETL.color.neutral10, muted: false, locked: true },
  }[status];
  return (
    <div style={{
      background: styles.bg, borderRadius: ETL.radius.lg,
      border: `1.5px solid ${styles.border}`,
      padding: 14, display: 'flex', alignItems: 'center', gap: 12,
      opacity: styles.locked ? 0.65 : 1,
      boxShadow: status === 'today' ? '0 4px 16px rgba(45,106,79,0.15)' : 'none',
      position: 'relative',
    }}>
      <WorkoutThumb w={56} h={56} hue={status === 'today' ? 'orange' : 'green'}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...tStyle('overline'), color: ETL.color.neutral60, textTransform: 'uppercase', marginBottom: 2 }}>{day}</div>
        <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 15, marginBottom: 4 }}>{title}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{dur} min</span>
          <span style={{ ...tStyle('small'), color: ETL.color.neutral40 }}>·</span>
          {groups.map((g,i) => <span key={i} style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{g}{i < groups.length-1 ? ' ·' : ''}</span>)}
        </div>
        {loc && <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 600, marginTop: 3, fontSize: 11 }}>📍 {loc}</div>}
      </div>
      {status === 'completed' && (
        <div style={{ width: 28, height: 28, borderRadius: 14, background: ETL.color.primary, display:'flex',alignItems:'center',justifyContent:'center', flexShrink: 0 }}>
          {Icon.check(14, '#fff', false)}
        </div>
      )}
      {status === 'today' && (
        <Btn kind="primary" size="sm" onClick={onStart}>Start</Btn>
      )}
      {status === 'upcoming' && (
        <div style={{ width: 28, height: 28, borderRadius: 14, background: ETL.color.neutral10, display:'flex',alignItems:'center',justifyContent:'center', flexShrink: 0 }}>
          {Icon.lock(14, ETL.color.neutral40, false)}
        </div>
      )}
    </div>
  );
}

// Workout detail / in-session screen — overlay
export function WorkoutDetail({ onClose, onComplete }) {
  const [exIdx, setExIdx] = React.useState(0);
  const [resting, setResting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const exercises = [
    { name: 'Squats',         sets: 3, reps: 12, rest: 60 },
    { name: 'Push-ups',       sets: 3, reps: 10, rest: 60 },
    { name: 'Bent-over Rows', sets: 3, reps: 12, rest: 60 },
    { name: 'Plank',          sets: 3, reps: 30, rest: 60, secs: true },
  ];
  const ex = exercises[exIdx];

  const advance = () => {
    if (exIdx < exercises.length - 1) {
      setResting(true);
      setTimeout(() => { setResting(false); setExIdx(i => i + 1); }, 1500);
    } else {
      setDone(true);
    }
  };

  if (done) return <CompletionScreen onClose={onComplete}/>;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: ETL.color.surface, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      animation: 'slideUp 0.35s cubic-bezier(0.2, 0.8, 0.3, 1)',
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

      {/* Header */}
      <div style={{ padding: '60px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{
          width: 40, height: 40, borderRadius: 20, background: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: ETL.shadow.sm,
        }}>{Icon.chevL(18, ETL.color.neutral, false)}</button>
        <div style={{ flex: 1 }}>
          <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase' }}>Phase 1 · Wk 1</div>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>Upper Body Base</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Exercise {exIdx + 1} of {exercises.length}</div>
          <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 600 }}>{Math.round((exIdx / exercises.length) * 100)}%</div>
        </div>
        <ProgressBar value={exIdx} max={exercises.length}/>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        {resting ? (
          <RestTimer/>
        ) : (
          <ExerciseCard ex={ex} idx={exIdx} onLog={advance}/>
        )}
      </div>

      {/* Up next */}
      {!resting && exIdx < exercises.length - 1 && (
        <div style={{ padding: '0 20px 28px' }}>
          <div style={{ ...tStyle('overline'), color: ETL.color.neutral60, textTransform: 'uppercase', marginBottom: 8 }}>Up next</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: ETL.radius.md }}>
            <WorkoutThumb w={40} h={40} hue="green"/>
            <div style={{ flex: 1 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>{exercises[exIdx + 1].name}</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{exercises[exIdx + 1].sets} × {exercises[exIdx + 1].reps}{exercises[exIdx + 1].secs ? 's' : ''}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ExerciseCard({ ex, idx, onLog }) {
  const [reps, setReps] = React.useState(ex.reps);
  const [demo, setDemo] = React.useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: '#fff', borderRadius: ETL.radius.xl, padding: 20,
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
        boxShadow: ETL.shadow.md,
      }}>
        <div style={{ width: '100%' }}>
          <VideoThumb kind="exercise" label="" dur={`0:${EXERCISE_DEMOS[ex.name]?.duration || 24}`} h={170}
            hue={idx % 2 === 0 ? 'green' : 'orange'} onPlay={() => setDemo(true)}/>
        </div>
        {demo && <ExerciseDemoPlayer name={ex.name} onClose={() => setDemo(false)}/>}
        <div style={{ ...tStyle('h1'), color: ETL.color.neutral, textAlign: 'center' }}>{ex.name}</div>
        <div style={{ ...tStyle('h2'), color: ETL.color.primary, fontSize: 28 }}>{ex.sets} × {ex.reps}{ex.secs ? 's' : ''}</div>

        <div style={{ width: '100%', borderTop: `1px solid ${ETL.color.neutral10}`, paddingTop: 16, marginTop: 8 }}>
          <div style={{ ...tStyle('label'), color: ETL.color.neutral60, marginBottom: 8, textAlign: 'center', textTransform: 'none' }}>Reps completed (set 1)</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <button onClick={() => setReps(Math.max(0, reps - 1))} style={{ width: 40, height: 40, borderRadius: 20, background: ETL.color.tertiary, border: 'none', cursor: 'pointer', display:'flex',alignItems:'center',justifyContent:'center' }}>
              <span style={{ fontSize: 22, color: ETL.color.primary, fontWeight: 600 }}>−</span>
            </button>
            <div style={{ ...tStyle('h1'), fontSize: 40, color: ETL.color.neutral, minWidth: 60, textAlign: 'center' }}>{reps}</div>
            <button onClick={() => setReps(reps + 1)} style={{ width: 40, height: 40, borderRadius: 20, background: ETL.color.tertiary, border: 'none', cursor: 'pointer', display:'flex',alignItems:'center',justifyContent:'center' }}>
              {Icon.plus(18, ETL.color.primary, false)}
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: 16 }}/>
      <Btn kind="primary" size="lg" full onClick={onLog}>Log set & rest</Btn>
    </div>
  );
}

export function RestTimer() {
  const [remaining, setRemaining] = React.useState(60);
  React.useEffect(() => {
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 100);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <ArcProgress value={remaining} max={60} size={200} stroke={14} color={ETL.color.secondary} bg="#FCEDDC">
        <div style={{ ...tStyle('h1'), fontSize: 48, color: ETL.color.secondary }}>{remaining}</div>
        <div style={{ ...tStyle('label'), color: ETL.color.neutral60, textTransform: 'uppercase' }}>Rest</div>
      </ArcProgress>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>Breathe. Reset. Then go again.</div>
    </div>
  );
}

export function CompletionScreen({ onClose }) {
  const [confetti] = React.useState(() => Array.from({ length: 28 }, (_, i) => ({
    x: Math.random() * 100, delay: Math.random() * 0.6, color: [ETL.color.primary, ETL.color.secondary, ETL.color.primaryLight, '#7DD957'][i % 4],
    size: 6 + Math.random() * 8, dur: 1.5 + Math.random() * 1.5, rot: Math.random() * 360,
  })));
  return (
    <div style={{
      position: 'absolute', inset: 0, background: ETL.color.surface, zIndex: 110,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, overflow: 'hidden',
    }}>
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: -20, left: `${c.x}%`,
          width: c.size, height: c.size * 0.4, background: c.color, borderRadius: 2,
          animation: `fall ${c.dur}s ${c.delay}s ease-in forwards`,
          transform: `rotate(${c.rot}deg)`,
        }}/>
      ))}
      <style>{`
        @keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0.4; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>

      <div style={{ animation: 'pulse 2s infinite' }}>
        <RewardBadge size={120} icon="trophy"/>
      </div>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginTop: 24, textAlign: 'center' }}>
        <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', marginBottom: 6 }}>Wabikoze neza!</div>
        Nice work!
      </div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginTop: 8, textAlign: 'center', maxWidth: 280 }}>
        You moved with intention today. That's the reset.
      </div>

      <div style={{
        marginTop: 24, padding: '14px 24px', borderRadius: ETL.radius.full,
        background: ETL.color.tertiary, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {Icon.sparkle(16, ETL.color.primary, false)}
        <span style={{ ...tStyle('h4'), color: ETL.color.primary, fontSize: 15 }}>+50 reset points</span>
      </div>

      <Card style={{ marginTop: 24, width: '100%', background: '#FFF4E6', border: `1px solid #F4A26133` }} elev="none">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F4A26122', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icon.bowl(18, ETL.color.secondary, false)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>Refuel within 90 minutes</div>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Eating window: 12:00 — protein + carbs.</div>
          </div>
        </div>
      </Card>

      <div style={{ width: '100%', marginTop: 'auto', paddingTop: 24 }}>
        <Btn kind="primary" size="lg" full onClick={onClose}>Back to plan</Btn>
      </div>
    </div>
  );
}
