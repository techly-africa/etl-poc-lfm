import React from 'react';
import { ETL, tStyle } from '../constants/tokens';
import { useT } from '../i18n/index';
import { Icon, PhaseBadge, WorkoutThumb } from '../components/art/index';
import { HillsBackdrop, ImigongoBand, CoachAvatar } from '../components/art/rw';
import { Btn, Card, ProgressBar, ArcProgress, ScrollPage, SectionTitle, MacroRing } from '../components/ui/index';
import { LevelMeter, DailyQuests, XPBurst, AgasekePopper, RWStreakFlame, ImigongoDivider, rwGreeting } from '../components/gamify/index';

// Home dashboard ("Today") — Rwandan-inflected with gamification.

export function HomeScreen({ user, onNav, onStartWorkout }) {
  const [habits, setHabits] = React.useState({
    workout: false, breakfast: false, water: 1, walk: false,
  });
  const [xp, setXp] = React.useState(340);
  const [xpBurst, setXpBurst] = React.useState(null);
  const [quests, setQuests] = React.useState([
    { label: 'Morning workout',    sub: 'Phase 1 · 35 min',          xp: 50, done: false },
    { label: 'Hit protein target', sub: '120g · before 20:00',       xp: 30, done: false },
    { label: 'Walk 6,000 steps',    sub: 'Add some hills if you can', xp: 20, done: false },
  ]);
  const [showReward, setShowReward] = React.useState(false);

  const t = useT();
  const greet = rwGreeting();

  const completeQuest = (i) => {
    setQuests(qs => qs.map((q, j) => j === i ? { ...q, done: true } : q));
    const q = quests[i];
    setXp(x => x + q.xp);
    setXpBurst({ amount: q.xp, label: q.label, key: Date.now() });
    // If all done → reward
    if (quests.filter((q, j) => j !== i ? q.done : true).length === quests.length) {
      setTimeout(() => setShowReward(true), 1900);
    }
  };

  const toggle = (k) => {
    setHabits(h => ({ ...h, [k]: !h[k] }));
    if (!habits[k]) {
      setXp(x => x + 10);
      setXpBurst({ amount: 10, label: 'Habit logged', key: Date.now() });
    }
  };
  const completion = ((habits.workout?25:0) + (habits.breakfast?25:0) + (habits.water/2*25) + (habits.walk?25:0));

  return (
    <ScrollPage>
      {/* Header — greeting (Kinyarwanda first) + streak */}
      <div style={{ padding: '12px 20px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase' }}>{t('home.day', {n:12})}</span>
              <span style={{ width: 3, height: 3, borderRadius: 2, background: ETL.color.neutral40 }}/>
              <span style={{ ...tStyle('overline'), color: ETL.color.secondary, textTransform: 'uppercase' }}>{t('home.phase', {n:1})}</span>
            </div>
            <div style={{ ...tStyle('h2'), color: ETL.color.neutral, fontSize: 22, lineHeight: 1.15 }}>
              {greet.rw}, {user?.name || 'Steffi'}
            </div>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginTop: 2 }}>
              {greet.en} · {t('home.context')}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => onNav('notifications')} style={{
              width: 44, height: 44, borderRadius: 22, background: '#fff', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              position: 'relative', boxShadow: ETL.shadow.sm
            }}>
              {Icon.bell(24, ETL.color.neutral, false)}
              <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, background: ETL.color.secondary, border: '2px solid #fff' }}/>
            </button>
            <RWStreakFlame n={4} today={true}/>
          </div>
        </div>
      </div>

      {/* Imigongo divider — instant Rwandan presence */}
      <div style={{ padding: '4px 20px 12px' }}>
        <ImigongoDivider palette="light" height={10}/>
      </div>

      {/* Today's ring + level meter */}
      <div style={{ padding: '0 20px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          background: `linear-gradient(135deg, ${ETL.color.tertiary} 0%, #FCEDDC 100%)`,
          borderRadius: ETL.radius.lg, padding: 16,
          display: 'flex', alignItems: 'center', gap: 16,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* faint hills behind */}
          <div style={{ position: 'absolute', right: -10, bottom: -8, width: 180, opacity: 0.20, pointerEvents: 'none' }}>
            <HillsBackdrop width={180} height={90}/>
          </div>
          <ArcProgress value={completion} size={92} stroke={10}>
            <div style={{ fontSize: 22, fontWeight: 700, color: ETL.color.primary, lineHeight: 1 }}>{Math.round(completion)}%</div>
            <div style={{ fontSize: 10, color: ETL.color.neutral60, marginTop: 2, fontWeight: 500 }}>UMUNSI</div>
          </ArcProgress>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ ...tStyle('h4'), color: ETL.color.neutral, marginBottom: 4 }}>{t('home.into.reset', {n:3})}</div>
            <div style={{ fontStyle: 'italic', ...tStyle('small'), color: ETL.color.primary, fontWeight: 700, marginBottom: 2 }}>{t('home.proverb.rw')}</div>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60, lineHeight: 1.4 }}>{t('home.proverb.en')}</div>
          </div>
        </div>

        <LevelMeter xp={xp}/>
      </div>

      {/* Daily quests — gamification core */}
      <div style={{ padding: '0 20px 14px' }}>
        <DailyQuests quests={quests} onComplete={completeQuest}/>
      </div>

      {/* Side-by-side cards — workout + nutrition */}
      <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card padding={0} elev="md" onClick={onStartWorkout} style={{ overflow: 'hidden' }}>
          <div style={{ padding: 14 }}>
            <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', marginBottom: 6 }}>
              Phase 1 · Wk 1
            </div>
            <div style={{ ...tStyle('h4'), color: ETL.color.neutral, marginBottom: 8, lineHeight: 1.2 }}>
              Full Body Activation
            </div>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginBottom: 12 }}>
              35 min · 4 exercises
            </div>
            <div style={{ marginBottom: 12 }}><WorkoutThumb w="100%" h={70} hue="green"/></div>
            <Btn kind="primary" size="sm" full icon={Icon.play(12, '#fff', true)}>Start workout</Btn>
          </div>
        </Card>

        <Card padding={0} elev="md" onClick={() => onNav('nourish')} style={{ overflow: 'hidden' }}>
          <div style={{ padding: 14 }}>
            <div style={{ ...tStyle('overline'), color: ETL.color.secondary, textTransform: 'uppercase', marginBottom: 6 }}>
              Eating window · 12:00
            </div>
            <div style={{ ...tStyle('h4'), color: ETL.color.neutral, marginBottom: 8, lineHeight: 1.2 }}>First Meal</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <MacroRing size={56} protein={0.65} carbs={0.5} fat={0.4}/>
              <div style={{ fontSize: 11, lineHeight: 1.5, color: ETL.color.neutral60 }}>
                <div><span style={{ display:'inline-block',width:6,height:6,borderRadius:3,background:ETL.color.primary,marginRight:5}}/>P 78g</div>
                <div><span style={{ display:'inline-block',width:6,height:6,borderRadius:3,background:ETL.color.secondary,marginRight:5}}/>C 142g</div>
                <div><span style={{ display:'inline-block',width:6,height:6,borderRadius:3,background:ETL.color.neutral60,marginRight:5}}/>F 48g</div>
              </div>
            </div>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral, fontWeight: 600, marginBottom: 8 }}>
              Bean & avocado bowl
            </div>
            <Btn kind="outlined" size="sm" full>View recipe</Btn>
          </div>
        </Card>
      </div>

      {/* Coach check-in card — surfaces feedback */}
      <div style={{ padding: '0 20px 16px' }}>
        <Card padding={0} elev="md" onClick={() => onNav('community')} style={{ overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <CoachAvatar size={44} kind="fitness"/>
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, background: '#34C759', border: '2px solid #fff' }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>Aline checked your form</span>
                <span style={{ padding: '1px 6px', borderRadius: 4, background: ETL.color.secondary, color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>NEW</span>
              </div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60, lineHeight: 1.4 }}>
                "Great squat depth on Monday — let's drop weight 5%, focus form."
              </div>
            </div>
            {Icon.chevR(16, ETL.color.neutral60)}
          </div>
        </Card>
      </div>

      {/* Phase progress banner */}
      <div style={{ padding: '0 20px 16px' }}>
        <Card padding={0} elev="sm" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <PhaseBadge size={56} n={1}/>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>{t('phase.1')}</div>
                <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>12 / 28 days</div>
              </div>
              <ProgressBar value={12} max={28}/>
              <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 600, marginTop: 6 }}>{t('home.phase.banner', {n:1})}</div>
            </div>
          </div>
          <div style={{
            background: ETL.color.tertiary, padding: '10px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderTop: `1px solid ${ETL.color.tertiaryDeep || ETL.color.tertiary}`,
          }}>
            {Icon.trophy(16, ETL.color.primary)}
            <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 600, lineHeight: 1.4 }}>
              Complete Phase 1 to unlock Build workouts + open your agaseke
            </div>
          </div>
        </Card>
      </div>

      {/* Daily habits */}
      <div style={{ padding: '0 20px 16px' }}>
        <SectionTitle style={{ marginBottom: 12 }}>Today's habits</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <HabitRow icon={Icon.dumbbell(18, ETL.color.primary)} label="Morning workout" sub="35 min · Phase 1" checked={habits.workout} onClick={() => toggle('workout')}/>
          <HabitRow icon={Icon.bowl(18, ETL.color.primary, false)} label="Log first meal" sub="Eating window opens 12:00" checked={habits.breakfast} onClick={() => toggle('breakfast')}/>
          <HabitRow icon={Icon.drop(18, ETL.color.primary, false)} label="2L water" sub={`${habits.water}L of 2L`} checked={habits.water >= 2} progress={habits.water/2} onClick={() => setHabits(h => ({ ...h, water: Math.min(2, h.water + 0.5) }))}/>
          <HabitRow icon={Icon.walk(18, ETL.color.primary, false)} label="Evening walk" sub="20 min · 6,000 steps target" checked={habits.walk} onClick={() => toggle('walk')}/>
        </div>
      </div>

      {/* Community pulse teaser */}
      <div style={{ padding: '0 20px 28px' }}>
        <Card padding={0} elev="sm" onClick={() => onNav('community')} style={{ overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ background: ETL.color.tertiary, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            {Icon.home(16, ETL.color.primary, true)}
            <span style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', fontWeight: 700 }}>{t('home.community.label')}</span>
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <AvatarStack count={4}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14, marginBottom: 2 }}>4 friends moved today</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Eric just logged his Phase 1 W2 · cheer him on</div>
            </div>
            {Icon.chevR(16, ETL.color.neutral60)}
          </div>
        </Card>
      </div>

      <div style={{ height: 80 }}/>
      {xpBurst && <XPBurst key={xpBurst.key} amount={xpBurst.amount} label={xpBurst.label} onDone={() => setXpBurst(null)}/>}
      {showReward && <AgasekePopper message="Imihigo complete · +100 bonus XP" onClose={() => setShowReward(false)}/>}
    </ScrollPage>
  );
}

export function HabitRow({ icon, label, sub, checked, progress, onClick }) {
  return (
    <Card padding={0} elev="sm" onClick={onClick} style={{ overflow: 'hidden' }}>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: ETL.color.tertiary,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 15, marginBottom: 2 }}>{label}</div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{sub}</div>
        </div>
        <Checkbox checked={checked} progress={progress}/>
      </div>
    </Card>
  );
}

export function Checkbox({ checked, progress }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 14,
      border: `2px solid ${checked ? ETL.color.primary : ETL.color.neutral20}`,
      background: checked ? ETL.color.primary : '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      position: 'relative', overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
    }}>
      {progress != null && progress > 0 && progress < 1 && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: `${progress * 100}%`,
          background: ETL.color.primary, opacity: 0.25,
        }}/>
      )}
      {checked && <div style={{ animation: 'pop 0.3s' }}>{Icon.check(14, '#fff')}</div>}
      <style>{`@keyframes pop { 0% { transform: scale(0); } 60% { transform: scale(1.2); } 100% { transform: scale(1); } }`}</style>
    </div>
  );
}

export function AvatarStack({ count = 3 }) {
  const colors = ['#2D6A4F', '#F4A261', '#7A3F1F', '#3F8A68'];
  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 32, height: 32, borderRadius: 16,
          background: colors[i % colors.length],
          border: '2px solid #fff',
          marginLeft: i === 0 ? 0 : -10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: ETL.font.family, fontSize: 11, fontWeight: 700,
        }}>{['A','E','J','P','M'][i]}</div>
      ))}
    </div>
  );
}
