import React from 'react';
import { ETL, tStyle } from '../constants/tokens';
import { useT } from '../i18n/index';
import { Icon, MealThumb } from '../components/art/index';
import { KinyarwandaProverb } from '../components/art/rw';
import { ScreenHeader, ScrollPage, Card, MacroRing, ProgressBar, SectionTitle, Btn } from '../components/ui/index';
import { RecipeDemoPlayer, VideoThumb, RECIPES, StatPill, FAQItem } from '../components/video/index';

// Nourish screen — IF-aware nutrition timeline.

export function NourishScreen({ onNav }) {
  const t = useT();
  const [expanded, setExpanded] = React.useState(null);
  const [recipe, setRecipe] = React.useState(null);

  const meals = [
    { id: 'first', kind: 'lunch',  time: '12:00', name: t('nourish.meal1.name'), cal: 620, p: 32, c: 78, f: 22, status: 'upcoming', desc: t('nourish.meal1.desc'), recipe: 'beanBowl' },
    { id: 'snack', kind: 'snack',  time: '15:30', name: t('nourish.meal2.name'), cal: 180, p: 18, c: 12, f: 6, status: 'optional', desc: t('nourish.meal2.desc'), recipe: 'beanBowl' },
    { id: 'sec',   kind: 'dinner', time: '19:00', name: t('nourish.meal3.name'), cal: 460, p: 28, c: 32, f: 18, status: 'upcoming', desc: t('nourish.meal3.desc'), recipe: 'lentilSalad' },
  ];

  return (
    <ScrollPage>
      <ScreenHeader sub={t('nourish.sub')} title={t('nourish.title')} imigongo={true}/>

      {/* Macro summary */}
      <div style={{ padding: '0 20px 20px' }}>
        <Card padding={18} elev="md">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <MacroRing size={76} protein={0.32} carbs={0.18} fat={0.15}/>
            <div style={{ flex: 1 }}>
              <div style={{ ...tStyle('overline'), color: ETL.color.neutral60, textTransform: 'uppercase' }}>Today</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                <span style={{ ...tStyle('h2'), color: ETL.color.neutral }}>0</span>
                <span style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>/ 2,100 kcal</span>
              </div>
              <div style={{ ...tStyle('small'), color: ETL.color.secondary, fontWeight: 600, marginTop: 4 }}>
                Fasting · 13h 12m
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <MacroBar label="Protein" cur={0} max={120} color={ETL.color.primary}/>
            <MacroBar label="Carbs"   cur={0} max={220} color={ETL.color.secondary}/>
            <MacroBar label="Fat"     cur={0} max={70}  color={ETL.color.neutral60}/>
          </div>
        </Card>
      </div>

      {/* IF status banner */}
      <div style={{ padding: '0 20px 20px' }}>
        <Card style={{ background: ETL.color.tertiary, border: `1px solid ${ETL.color.tertiaryDeep}` }} elev="none">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: ETL.color.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {Icon.timer(20, '#fff', false)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 15 }}>16:8 fasting · Week 2</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Window opens in 2h 48m · 12:00</div>
            </div>
            <div style={{ ...tStyle('overline'), color: ETL.color.primary, fontWeight: 700, textTransform: 'uppercase' }}>Stable</div>
          </div>
        </Card>
      </div>

      {/* Meal timeline */}
      <div style={{ padding: '0 20px 12px' }}>
        <SectionTitle style={{ marginBottom: 12 }}>Today's plan</SectionTitle>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {meals.map(m => (
          <MealRow key={m.id} meal={m} expanded={expanded === m.id} onToggle={() => setExpanded(expanded === m.id ? null : m.id)} onPlay={(id) => setRecipe(id)}/>
        ))}
      </div>

      {/* Recipe video shelf — Cook with Jeanne */}
      <div style={{ padding: '0 20px 8px' }}>
        <SectionTitle rw={t('nourish.cook.rw')}>{t('nourish.cook')}</SectionTitle>
        <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginTop: 4, marginBottom: 12 }}>{t('nourish.cook.sub')}</div>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10, overflowX: 'auto' }}>
        <div style={{ flexShrink: 0, width: 220 }}><VideoThumb kind="recipe" label="Bean & avocado bowl" sub="15 min · 620 kcal" dur="0:30" h={150} onPlay={() => setRecipe('beanBowl')}/></div>
        <div style={{ flexShrink: 0, width: 220 }}><VideoThumb kind="recipe" label="Lentil & feta salad" sub="15 min · 460 kcal" dur="0:24" h={150} onPlay={() => setRecipe('lentilSalad')}/></div>
        <div style={{ flexShrink: 0, width: 220 }}><VideoThumb kind="recipe" label="Sweet potato breakfast" sub="12 min · 510 kcal" dur="0:22" h={150} onPlay={() => setRecipe('sweetPotato')}/></div>
      </div>

      {/* Weekly insight */}
      <div style={{ padding: '0 20px 20px' }}>
        <Card style={{ background: ETL.color.tertiary }} elev="none">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {Icon.sparkle(18, ETL.color.primary, false)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, marginBottom: 4 }}>{t('nourish.insight')}</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60, lineHeight: 1.5 }}>
                {t('nourish.insight.tip')}
              </div>
              <div style={{ marginTop: 10 }}>
                <KinyarwandaProverb rw={t('nourish.proverb.rw')} en={t('nourish.proverb.en')}/>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bridge to Move */}
      <div style={{ padding: '0 20px 28px' }}>
        <Card onClick={() => onNav('move')} style={{ background: '#fff' }} elev="sm">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon.dumbbell(20, ETL.color.primary, false)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>Today's workout · 35 min</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Upper Body Base · before your eating window</div>
            </div>
            {Icon.chevR(16, ETL.color.neutral60, false)}
          </div>
        </Card>
      </div>

      <div style={{ height: 80 }}/>
      {recipe && <RecipeDetail id={recipe} onClose={() => setRecipe(null)}/>}
    </ScrollPage>
  );
}

export function MacroBar({ label, cur, max, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{label}</span>
        <span style={{ ...tStyle('small'), color: ETL.color.neutral, fontWeight: 600 }}>{cur}/{max}g</span>
      </div>
      <ProgressBar value={cur} max={max} color={color} height={6}/>
    </div>
  );
}

export function MealRow({ meal, expanded, onToggle, onPlay }) {
  const isOptional = meal.status === 'optional';
  return (
    <div style={{ background: '#fff', borderRadius: ETL.radius.lg, overflow: 'hidden',
      border: isOptional ? `1.5px dashed ${ETL.color.neutral20}` : 'none',
      boxShadow: isOptional ? 'none' : ETL.shadow.sm }}>
      <div onClick={onToggle} style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <div onClick={(e) => { if (meal.recipe) { e.stopPropagation(); onPlay && onPlay(meal.recipe); } }} style={{ position: 'relative', flexShrink: 0, cursor: meal.recipe ? 'pointer' : 'default' }}>
          <MealThumb w={56} h={56} kind={meal.kind}/>
          {meal.recipe && (
            <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 2 }}><path d="M5 3 L21 12 L5 21 Z"/></svg>
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase' }}>{meal.time}</span>
            {isOptional && <span style={{ ...tStyle('overline'), color: ETL.color.neutral40, textTransform: 'uppercase' }}>· Optional</span>}
          </div>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14, marginBottom: 2 }}>{meal.name}</div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{meal.cal} kcal · {meal.p}g protein</div>
        </div>
        <Btn kind="secondary" size="sm">Log</Btn>
      </div>
      {expanded && (
        <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${ETL.color.neutral10}`, paddingTop: 12, marginTop: 0 }}>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral80, marginBottom: 10 }}>{meal.desc}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <NourishPill color="primary">P {meal.p}g</NourishPill>
            <NourishPill color="orange">C {meal.c}g</NourishPill>
            <NourishPill>F {meal.f}g</NourishPill>
          </div>
        </div>
      )}
    </div>
  );
}

export function NourishPill({ children, color = 'neutral' }) {
  const palettes = {
    neutral: { bg: ETL.color.neutral10, fg: ETL.color.neutral80 },
    primary: { bg: ETL.color.tertiary, fg: ETL.color.primary },
    orange:  { bg: '#FCEDDC', fg: '#B86E20' },
  }[color];
  return (
    <span style={{
      ...tStyle('small'), padding: '4px 10px', borderRadius: 999,
      background: palettes.bg, color: palettes.fg, fontWeight: 600,
    }}>{children}</span>
  );
}

export function RecipeDetail({ id, onClose }) {
  const [demo, setDemo] = React.useState(false);
  const r = RECIPES[id] || RECIPES.beanBowl;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: ETL.color.surface, zIndex: 100,
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
          <div style={{ ...tStyle('overline'), color: ETL.color.secondary, textTransform: 'uppercase' }}>Recipe Detail</div>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>{r.name}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {/* Video & Title */}
        <div style={{
          background: '#fff', borderRadius: ETL.radius.xl, padding: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
          boxShadow: ETL.shadow.md, flexShrink: 0
        }}>
          <div style={{ width: '100%' }}>
            <VideoThumb kind="recipe" label="" dur={`0:${r.duration || 30}`} h={170} onPlay={() => setDemo(true)}/>
          </div>
          <div style={{ ...tStyle('h1'), color: ETL.color.neutral, textAlign: 'center' }}>{r.name}</div>
          <div style={{ ...tStyle('h4'), color: ETL.color.secondary, textAlign: 'center' }}>{r.cuisine}</div>
        </div>

        {/* Details & Coaching */}
        <div style={{ background: '#fff', borderRadius: ETL.radius.xl, padding: 20, boxShadow: ETL.shadow.md, flexShrink: 0 }}>
          <SectionTitle sub="Why this matters">Benefits & Info</SectionTitle>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, marginBottom: 24 }}>
            <StatPill label="Calories" value="620 kcal" color="orange" />
            <StatPill label="Protein" value="38g" color="primary" />
            <StatPill label="Fiber" value="High" color="primary" />
          </div>

          <SectionTitle sub="What you need">Ingredients & Prep</SectionTitle>
          <div style={{ marginTop: 12, marginBottom: 24 }}>
            {r.timeline && r.timeline.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: ETL.color.secondary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <div style={{ ...tStyle('body'), fontSize: 14, color: ETL.color.neutral }}>{s.text}</div>
              </div>
            ))}
            <div style={{ ...tStyle('body'), fontSize: 14, color: ETL.color.neutral60, lineHeight: 1.6, marginTop: 12 }}>
              Ensure your beans are soaked overnight if using dry ones. The secret to the Rwandan finish is the avocado richness combined with a splash of fresh lime. Always serve warm.
            </div>
          </div>

          <SectionTitle sub="Common questions">FAQ</SectionTitle>
          <div style={{ marginTop: 12, marginBottom: 24 }}>
            <FAQItem q="Can I substitute ingredients?" a="Yes! You can swap beans for lentils or avocado for a drizzle of olive oil depending on your phase goals." />
          </div>

          <Btn kind="secondary" full onClick={() => alert('Message sent to Coach Jeanne!')}>Ask Coach Jeanne</Btn>
        </div>
      </div>
      
      {demo && <RecipeDemoPlayer id={id} onClose={() => setDemo(false)}/>}
    </div>
  );
}
