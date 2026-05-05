import React from 'react';
import { ETL, tStyle } from '../constants/tokens';
import { useT } from '../i18n/index';
import { Icon, RewardBadge } from '../components/art/index';
import { BrandedWaterBottle, SupplementJar, ImigongoCorner } from '../components/art/rw';
import { ScreenHeader, ScrollPage, SectionTitle, Card, Btn, ProgressBar, Pill } from '../components/ui/index';

// Me screen — progress + profile + metrics.

export function MeScreen({ user }) {
  const t = useT();
  const [booking, setBooking] = React.useState(null);
  const [booked, setBooked] = React.useState(false);

  const phases = [
    { n: 1, key: 'phase.1', state: 'active', sub: 'Day 12 / 28', stat: '8 sessions · 4kg lighter mindset' },
    { n: 2, key: 'phase.2', state: 'locked', sub: '4 weeks', stat: 'Strength + moderate cardio' },
    { n: 3, key: 'phase.3', state: 'locked', sub: '4 weeks', stat: 'Splits · interval cardio' },
    { n: 4, key: 'phase.4', state: 'locked', sub: '4 weeks', stat: 'Maintenance + habit lock-in' },
  ];

  return (
    <ScrollPage>
      {/* Custom Me Header */}
      <div style={{ padding: '80px 20px 24px', background: ETL.color.surface }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 84, height: 84, borderRadius: 42, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${ETL.color.primary}` }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: ETL.color.primary }}>{user.name[0]}</div>
          </div>
          <div>
            <div style={{ ...tStyle('h2'), color: ETL.color.neutral }}>{user.name}</div>
            <div style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>{user.city} · {user.age} yrs</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <Pill color="primary" size="sm">Phase 1</Pill>
              <Pill color="orange" size="sm">Premium</Pill>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <SectionTitle>The 4 Pillars</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <PillarCard label="BMI" value={((user.weight / (user.height / 100) ** 2)).toFixed(1)} sub={`${user.weight}kg / ${user.height}cm`} icon={Icon.scale} />
          <PillarCard label="Health" value={user.health} sub="Medically cleared" icon={Icon.check} />
          <PillarCard label="Nutrition" value={user.diet} sub="Plant-forward" icon={Icon.leaf} />
          <PillarCard label="Exercise" value="Moderate" sub="3 sessions / wk" icon={Icon.walk} />
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <SectionTitle>My Goals</SectionTitle>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <GoalRow label="Build sustainable morning habits" active />
          <GoalRow label="Hit 10k steps daily" active />
          <GoalRow label="Master the sourdough recipe" />
          <Btn kind="ghost" size="sm" icon={Icon.plus(14, ETL.color.primary)}>Add new goal</Btn>
        </div>
      </div>

      {/* Top stats */}
      <div style={{ padding: '0 20px 20px' }}>
        <Card padding={18} elev="md" style={{ background: `linear-gradient(135deg, ${ETL.color.primary} 0%, ${ETL.color.primaryLight} 100%)`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.15, pointerEvents: 'none' }}>
            <ImigongoCorner size={80} palette="gold" flip />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ ...tStyle('overline'), opacity: 0.85, textTransform: 'uppercase' }}>{t('progress.level')}</div>
              <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.1, marginTop: 4, fontFamily: ETL.font.family }}>340</div>
              <div style={{ ...tStyle('small'), opacity: 0.75, marginTop: 2, fontStyle: 'italic' }}>{t('progress.proverb.rw')}</div>
              <div style={{ ...tStyle('small'), opacity: 0.6, marginTop: 1 }}>{t('progress.proverb.en')}</div>
            </div>
            <div style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon.trophy(36, '#fff')}
            </div>
          </div>
        </Card>
      </div>

      {/* Phase timeline */}
      <div style={{ padding: '0 20px 12px' }}>
        <SectionTitle rw={t('progress.phases.rw')} style={{ marginBottom: 12 }}>{t('progress.phases')}</SectionTitle>
      </div>
      <div style={{ padding: '0 20px 20px', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 48, top: 28, bottom: 28, width: 2, background: ETL.color.neutral10 }} />
        <div style={{ position: 'absolute', left: 48, top: 28, height: 60, width: 2, background: ETL.color.primary }} />
        {phases.map((p, i) => <PhaseRow key={i} {...p} />)}
      </div>

      {/* Rewards shelf */}
      <div style={{ padding: '0 20px 12px' }}>
        <SectionTitle sub={t('progress.rewards.sub')} style={{ marginBottom: 12 }}>{t('progress.rewards')}</SectionTitle>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10, overflowX: 'auto' }}>
        <BadgeChip icon="leaf" label="Intangiriro · First" earned />
        <BadgeChip icon="drop" label="Hydration Week" earned />
        <BadgeChip icon="bowl" label="Clean Eating ×3" earned />
        <BadgeChip icon="flame" label="Akarasisi · 7 Days" earned={false} progress="3 days to go" />
        <BadgeChip icon="trophy" label="Phase 1 Complete" earned={false} />
      </div>

      {/* Stats grid */}
      <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <StatTile big="12" unit="" label="Workouts" sub="completed" />
        <StatTile big="34" unit="min" label="Avg session" sub="" />
        <StatTile big="9" unit="/ 12" label="Nutrition" sub="days on track" />
        <StatTile big="6" unit="days" label="Longest streak" sub="" />
      </div>

      {/* Body progress */}
      <div style={{ padding: '0 20px 24px' }}>
        <Card padding={18} elev="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>Weight trend</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Last 12 days · −1.4kg</div>
            </div>
            <Pill color="primary">↓ 1.6%</Pill>
          </div>
          <WeightChart />
          <Btn kind="secondary" size="md" full icon={Icon.scale(16, ETL.color.primary, false)} style={{ marginTop: 14 }}>
            Log today's check-in
          </Btn>
        </Card>
      </div>

      {/* Appointments Section */}
      <div style={{ padding: '0 20px 24px' }}>
        <SectionTitle sub={t('apt.sub')}>{t('apt.title')}</SectionTitle>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Card padding={14} elev="sm" style={{ borderLeft: `4px solid ${ETL.color.primary}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon.user(20, ETL.color.primary)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>Coach Aline · Fitness</div>
                <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Thursday, 14:00 · Gacuriro</div>
              </div>
              <Btn kind="ghost" size="sm">Modify</Btn>
            </div>
          </Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 4 }}>
            <Btn kind="outlined" size="sm" onClick={() => setBooking('coach')}>{t('apt.coach')}</Btn>
            <Btn kind="outlined" size="sm" onClick={() => setBooking('nutritionist')}>{t('apt.nutritionist')}</Btn>
            <Btn kind="outlined" size="sm" onClick={() => setBooking('physician')}>{t('apt.physician')}</Btn>
          </div>
        </div>
      </div>

      {/* ETL Shop Section */}
      <div style={{ padding: '0 20px 24px' }}>
        <SectionTitle sub={t('shop.sub')}>{t('shop.title')}</SectionTitle>
        <div style={{ marginTop: 12, display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 10 }}>
          <ShopItem icon={<BrandedWaterBottle size={80} />} name={t('shop.bottle.name')} desc={t('shop.bottle.desc')} price="15,000 RWF" />
          <ShopItem icon={<SupplementJar size={80} />} name={t('shop.supps.name')} desc={t('shop.supps.desc')} price="45,000 RWF" />
          <ShopItem icon={<div style={{ width: 80, height: 80, background: ETL.color.neutral10, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👕</div>} name={t('shop.shirt.name')} desc={t('shop.shirt.desc')} price="22,000 RWF" />
        </div>
      </div>

      <div style={{ height: 80 }} />

      {/* Booking Modal */}
      {booking && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ width: '100%', background: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 20px 40px', animation: 'slideUp 0.3s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ ...tStyle('h3') }}>{t('apt.book')} · {t(`apt.${booking}`)}</div>
              <button onClick={() => setBooking(null)} style={{ background: 'none', border: 'none', fontSize: 24, color: ETL.color.neutral40 }}>×</button>
            </div>
            {booked ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: 32, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  {Icon.check(32, ETL.color.primary)}
                </div>
                <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>Appointment confirmed!</div>
                <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginTop: 8 }}>We'll notify you 1 hour before the session.</div>
                <Btn full kind="primary" style={{ marginTop: 24 }} onClick={() => { setBooking(null); setBooked(false); }}>Close</Btn>
              </div>
            ) : (
              <>
                <div style={{ ...tStyle('label'), color: ETL.color.neutral60, marginBottom: 12 }}>Select Date</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
                  {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'].map(d => (
                    <button key={d} style={{ flexShrink: 0, padding: '10px 14px', borderRadius: 12, border: `1.5px solid ${d === 'Thu 15' ? ETL.color.primary : ETL.color.neutral10}`, background: d === 'Thu 15' ? ETL.color.tertiary : '#fff', color: d === 'Thu 15' ? ETL.color.primary : ETL.color.neutral }}>
                      <div style={{ fontSize: 11, fontWeight: 700 }}>{d.split(' ')[0]}</div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{d.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
                <div style={{ ...tStyle('label'), color: ETL.color.neutral60, marginBottom: 12 }}>Select Time</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
                  {['09:00', '10:30', '14:00', '15:30', '17:00'].map(tm => (
                    <Btn key={tm} kind="outlined" size="sm">{tm}</Btn>
                  ))}
                </div>
                <Btn full kind="primary" size="lg" onClick={() => setBooked(true)}>Confirm Booking</Btn>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </ScrollPage>
  );
}

export function PhaseRow({ n, key, state, sub, stat }) {
  const t = useT();
  const active = state === 'active';
  const locked = state === 'locked';
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 14, alignItems: 'flex-start', position: 'relative' }}>
      <div style={{ width: 60, display: 'flex', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 20,
          background: active ? ETL.color.primary : (locked ? '#fff' : ETL.color.primary),
          border: `3px solid ${active ? ETL.color.tertiary : (locked ? ETL.color.neutral20 : ETL.color.tertiary)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: active ? '#fff' : (locked ? ETL.color.neutral40 : '#fff'),
          fontWeight: 700, fontSize: 14, fontFamily: ETL.font.family,
          boxShadow: active ? '0 0 0 4px rgba(45,106,79,0.15)' : 'none',
        }}>{locked ? Icon.lock(14, 'currentColor', false) : n}</div>
      </div>
      <div style={{
        flex: 1,
        padding: 14,
        background: active ? ETL.color.tertiary : '#fff',
        borderRadius: ETL.radius.md,
        border: locked ? `1.5px dashed ${ETL.color.neutral20}` : 'none',
        opacity: locked ? 0.7 : 1,
        boxShadow: active ? '0 1px 3px rgba(45,106,79,0.1)' : (locked ? 'none' : ETL.shadow.sm),
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ ...tStyle('h4'), color: active ? ETL.color.neutral : ETL.color.neutral40 }}>{t(key)}</div>
          {active && <span style={{ ...tStyle('overline'), color: ETL.color.primary, fontWeight: 700, textTransform: 'uppercase' }}>{t('phase.progress')}</span>}
        </div>
        <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginBottom: active ? 8 : 0 }}>{sub}</div>
        {active && (
          <>
            <ProgressBar value={12} max={28} height={6} />
            <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 600, marginTop: 8 }}>{stat}</div>
          </>
        )}
        {locked && <div style={{ ...tStyle('small'), color: ETL.color.neutral40, marginTop: 4 }}>{stat}</div>}
      </div>
    </div>
  );
}

export function BadgeChip({ icon, label, earned, progress }) {
  return (
    <div style={{
      flexShrink: 0, width: 116,
      padding: 12, background: '#fff', borderRadius: ETL.radius.lg,
      boxShadow: ETL.shadow.sm,
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8,
      opacity: earned ? 1 : 0.85,
    }}>
      <RewardBadge icon={icon} earned={earned} size={48} />
      <div style={{ ...tStyle('small'), color: earned ? ETL.color.neutral : ETL.color.neutral60, fontWeight: 600, lineHeight: 1.3 }}>{label}</div>
      {progress && <div style={{ ...tStyle('small'), color: ETL.color.secondary, fontSize: 10, fontWeight: 600 }}>{progress}</div>}
    </div>
  );
}

export function StatTile({ big, unit, label, sub }) {
  return (
    <Card padding={14} elev="sm">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: ETL.color.neutral, fontFamily: ETL.font.family, lineHeight: 1 }}>{big}</span>
        <span style={{ ...tStyle('small'), color: ETL.color.neutral60, fontWeight: 600 }}>{unit}</span>
      </div>
      <div style={{ ...tStyle('small'), color: ETL.color.neutral, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ ...tStyle('small'), color: ETL.color.neutral60, fontSize: 11 }}>{sub}</div>}
    </Card>
  );
}

export function WeightChart() {
  const data = [78.4, 78.2, 78.3, 77.9, 77.7, 77.8, 77.5, 77.4, 77.2, 77.3, 77.1, 77.0];
  const min = Math.min(...data) - 0.2, max = Math.max(...data) + 0.2;
  const W = 320, H = 100, P = 8;
  const points = data.map((v, i) => {
    const x = P + (i / (data.length - 1)) * (W - P * 2);
    const y = P + ((max - v) / (max - min)) * (H - P * 2);
    return [x, y];
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const fillD = pathD + ` L${points[points.length - 1][0]},${H} L${points[0][0]},${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={100} preserveAspectRatio="none">
      <defs>
        <linearGradient id="wt-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ETL.color.primary} stopOpacity="0.25" />
          <stop offset="1" stopColor={ETL.color.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#wt-fill)" />
      <path d={pathD} fill="none" stroke={ETL.color.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => i === points.length - 1 && (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="6" fill="#fff" />
          <circle cx={p[0]} cy={p[1]} r="4" fill={ETL.color.primary} />
        </g>
      ))}
    </svg>
  );
}

export function PillarCard({ label, value, sub, icon }) {
  return (
    <Card padding={14} elev="sm">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {icon(18, ETL.color.primary, false)}
        <div style={{ ...tStyle('label'), color: ETL.color.neutral60, fontSize: 10, textTransform: 'uppercase' }}>{label}</div>
      </div>
      <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>{value}</div>
      <div style={{ ...tStyle('small'), color: ETL.color.neutral60, fontSize: 11 }}>{sub}</div>
    </Card>
  );
}

export function GoalRow({ label, active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: ETL.radius.md, border: `1px solid ${active ? ETL.color.tertiary : ETL.color.neutral10}` }}>
      <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${active ? ETL.color.primary : ETL.color.neutral20}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {active && Icon.check(14, ETL.color.primary, false)}
      </div>
      <div style={{ ...tStyle('body'), color: active ? ETL.color.neutral : ETL.color.neutral40, fontSize: 14 }}>{label}</div>
    </div>
  );
}

export function ShopItem({ icon, name, desc, price }) {
  return (
    <Card padding={14} elev="sm" style={{ flexShrink: 0, width: 160 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>{icon}</div>
      <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 13, marginBottom: 2 }}>{name}</div>
      <div style={{ ...tStyle('small'), color: ETL.color.neutral60, fontSize: 11, marginBottom: 8, height: 32, overflow: 'hidden' }}>{desc}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 700 }}>{price}</div>
        <Btn kind="primary" size="sm" style={{ padding: '4px 8px', borderRadius: 8 }}>+</Btn>
      </div>
    </Card>
  );
}
