// Onboarding — coach-led tailoring flow with Rwandan identity.
// 6 steps: Welcome (Muraho) → Basics → Goals + lifestyle → Eating context → Coach pairing → Plan ready.

function Onboarding({ onComplete }) {
  const t = useT();
  const [step, setStep] = React.useState(0);
  const TOTAL = 11;
  const [data, setData] = React.useState({
    name: '', age: 32, sex: 'female',
    city: 'Kigali',
    height: 165, weight: 72,
    healthConditions: '', medications: '', allergies: '',
    goals: [],
    activity: 2,
    diet: 'Omnivore',
    foods: [],
    cooking: 'Cook at home',
    fasting: 'Open to it',
    coach: null,
    notes: '',
  });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const next = () => step < TOTAL - 1 ? setStep(step + 1) : onComplete(data);
  const back = () => step > 0 && setStep(step - 1);

  const stepTitleKeys = [
    'onboard.step.lang',      // Step 0: Language
    'onboard.step0',          // Step 1: Welcome
    'onboard.step1.identity', // Step 2: Pillar 1 (BMI - Identity)
    'onboard.step1.body',     // Step 3: Pillar 1 (BMI - Stats)
    'onboard.step.health',    // Step 4: Pillar 2 (Health)
    'onboard.step3.lifestyle',// Step 5: Pillar 3 (Nutrition - Style)
    'onboard.step3.foods',    // Step 6: Pillar 3 (Nutrition - Foods)
    'onboard.step2.focus',    // Step 7: Pillar 4 (Exercises - Focus)
    'onboard.step2.activity', // Step 8: Pillar 4 (Exercises - Activity)
    'onboard.step4',          // Step 9: Coach
    'onboard.step5'           // Step 10: Plan
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: ETL.color.surface, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header — back + step indicator + dots */}
      {step > 0 && (
        <>
          <div style={{ padding: '100px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, zIndex: 5, background: ETL.color.surface }}>
            <button onClick={back} style={{
              width: 40, height: 40, borderRadius: 20,
              background: step <= 1 ? 'transparent' : '#fff',
              border: 'none', cursor: step <= 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: step <= 1 ? 0 : 1, boxShadow: step <= 1 ? 'none' : ETL.shadow.sm,
            }}>{Icon.chevL(18, ETL.color.neutral)}</button>
            <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', fontWeight: 700 }}>
              {t('onboard.step.indicator', {n: step, total: TOTAL - 1, title: t(stepTitleKeys[step])})}
            </div>
            <div style={{ width: 40 }}/>
          </div>
          <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
            <ProgressBar value={step} max={TOTAL - 1} height={4}/>
          </div>
        </>
      )}

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div key={step} style={{ flex: 1, animation: 'fadeSlide 0.4s cubic-bezier(0.2,0.8,0.3,1)' }}>
          {step === 0 && <StepLanguage onNext={next}/>}
          {step === 1 && <StepWelcome data={data} update={update}/>}
          {step === 2 && <StepIdentity data={data} update={update}/>}
          {step === 3 && <StepStats data={data} update={update}/>}
          {step === 4 && <StepHealth data={data} update={update}/>}
          {step === 5 && <StepEatingLifestyle data={data} update={update}/>}
          {step === 6 && <StepEatingFoods data={data} update={update}/>}
          {step === 7 && <StepGoals data={data} update={update}/>}
          {step === 8 && <StepActivity data={data} update={update}/>}
          {step === 9 && <StepCoach data={data} update={update}/>}
          {step === 10 && <StepPlan data={data}/>}
        </div>
      </div>

      {/* CTA */}
      {step > 0 && (
        <div style={{ padding: '12px 20px 36px', flexShrink: 0, background: ETL.color.surface }}>
          <Btn full kind="primary" size="lg" onClick={next} disabled={step === 9 && !data.coach}>
            {step === 1 ? t('onboard.step.start.cta') :
             step === TOTAL - 1 ? t('onboard.plan.cta') :
             step === 9 ? (data.coach ? t('onboard.coach.pair') : t('onboard.coach.choose')) :
             t('onboard.step.next')}
          </Btn>
          {step === TOTAL - 1 && (
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60, textAlign: 'center', marginTop: 10 }}>
              Your coach will check in within 24 hours
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// Step 0 — Language Selection
function StepLanguage({ onNext }) {
  const { lang, setLang } = React.useContext(LangContext);
  const langs = [
    { id: 'en', label: 'English', sub: 'Welcome' },
    { id: 'fr', label: 'Français', sub: 'Bienvenue' },
    { id: 'rw', label: 'Kinyarwanda', sub: 'Murakaza neza' },
  ];
  return (
    <div style={{ padding: '80px 24px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <MuraSeal size={96}/>
        <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginTop: 24 }}>Choose your language</div>
        <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginTop: 8 }}>Hitamo ururimi wifuza gukoresha</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {langs.map(l => (
          <button key={l.id} onClick={() => { setLang(l.id); onNext(); }} style={{
            padding: '20px 24px', textAlign: 'left',
            background: lang === l.id ? ETL.color.tertiary : '#fff',
            border: `1.5px solid ${lang === l.id ? ETL.color.primary : ETL.color.neutral20}`,
            borderRadius: ETL.radius.lg, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'all 0.2s',
          }}>
            <div>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>{l.label}</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{l.sub}</div>
            </div>
            {lang === l.id && Icon.check(20, ETL.color.primary)}
          </button>
        ))}
      </div>
    </div>
  );
}

// Step 0 — Muraho welcome
function StepWelcome() {
  const t = useT();
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <HillsBackdrop width="100%" height={180}/>
        <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)' }}>
          <MuraSeal size={80}/>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, display: 'flex' }}>
          <div style={{ flex: 1, background: '#20603D' }}/>
          <div style={{ flex: 1, background: '#FAD201' }}/>
          <div style={{ flex: 1, background: '#E5BE01' }}/>
          <div style={{ flex: 0.5, background: '#1A96D4' }}/>
        </div>
      </div>
      <div style={{ marginTop: -2 }}><ImigongoBand width="100%" height={18} palette="forest"/></div>
      <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ ...tStyle('h2'), color: ETL.color.neutral, marginBottom: 8, textAlign: 'center' }}>
          Explore the ETL Reset
        </div>
        <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 24, textAlign: 'center', maxWidth: 300 }}>
          Watch this short video to see how we tailor your journey.
        </div>

        {/* Video Player Card */}
        <div 
          onClick={togglePlay}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            background: '#000',
            borderRadius: 20,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: ETL.shadow.lg,
            cursor: 'pointer'
          }}>
          <video 
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-morning-sunlight-shining-through-the-leaves-of-a-tree-4416-large.mp4"
            poster="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {!playing && (
            <div style={{ 
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 32,
                background: 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transform: 'scale(1)',
                transition: 'transform 0.2s'
              }}>
                {Icon.play(24, ETL.color.primary)}
              </div>
            </div>
          )}
          {/* Duration overlay */}
          {!playing && (
            <div style={{
              position: 'absolute', bottom: 12, right: 12,
              background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: 6,
              ...tStyle('small'), color: '#fff', fontSize: 10
            }}>
              1:42
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: ETL.color.primary }}/>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Narrated by Coach Aline</div>
        </div>
      </div>
    </div>
  );
}

// Step 1 — Identity
function StepIdentity({ data, update }) {
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>What should we call you?</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 32 }}>
        Your coach will greet you by name on day one.
      </div>

      <div style={{ marginBottom: 28 }}>
        <Label>Preferred name</Label>
        <Input value={data.name} onChange={v => update('name', v)} placeholder="e.g. Steffi, Eric, Aline"/>
      </div>

      <div style={{ marginBottom: 18 }}>
        <Label>Where are you based?</Label>
        <select value={data.city} onChange={e => update('city', e.target.value)} style={{
          width: '100%', height: 56, padding: '0 18px',
          background: '#fff', border: `1.5px solid ${ETL.color.neutral20}`,
          borderRadius: ETL.radius.md, fontFamily: ETL.font.family, fontSize: 16, fontWeight: 500,
          color: ETL.color.neutral, outline: 'none', boxSizing: 'border-box',
        }}>
          <option>Kigali</option><option>Musanze</option><option>Huye</option><option>Rubavu</option><option>Other</option>
        </select>
      </div>
    </div>
  );
}

// Step 2 — Stats
function StepStats({ data, update }) {
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>Your body right now</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 32 }}>
        No judgment — this helps us calculate your targets.
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <Label>Age</Label>
          <Input value={data.age} onChange={v => update('age', v)} type="number"/>
        </div>
        <div style={{ flex: 1.5 }}>
          <Label>Sex (assigned at birth)</Label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['female', 'male'].map(s => (
              <Chip key={s} active={data.sex === s} onClick={() => update('sex', s)} style={{ flex: 1, justifyContent: 'center', height: 48 }}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <Label>Height (cm)</Label>
          <Input value={data.height} onChange={v => update('height', v)} type="number"/>
        </div>
        <div style={{ flex: 1 }}>
          <Label>Weight (kg)</Label>
          <Input value={data.weight} onChange={v => update('weight', v)} type="number"/>
        </div>
      </div>

      <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(45,106,79,0.05)', padding: 12, borderRadius: 12 }}>
        <span style={{ fontSize: 16 }}>🔒</span> Only your assigned coach sees this.
      </div>
    </div>
  );
}

// Step 4 — Pillar 2: Health
function StepHealth({ data, update }) {
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>Health & Wellness</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 32 }}>
        This pillar ensures your reset is safe and medically sound.
      </div>

      <div style={{ marginBottom: 28 }}>
        <Label>Medical conditions</Label>
        <textarea value={data.healthConditions} onChange={e => update('healthConditions', e.target.value)}
          placeholder="e.g. Hypertension, back pain, none..."
          style={textAreaStyle}/>
      </div>

      <div style={{ marginBottom: 28 }}>
        <Label>Current medications</Label>
        <textarea value={data.medications} onChange={e => update('medications', e.target.value)}
          placeholder="e.g. Metformin, none..."
          style={textAreaStyle}/>
      </div>

      <div style={{ marginBottom: 18 }}>
        <Label>Food allergies</Label>
        <textarea value={data.allergies} onChange={e => update('allergies', e.target.value)}
          placeholder="e.g. Shellfish, dairy, none..."
          style={textAreaStyle}/>
      </div>
    </div>
  );
}

const textAreaStyle = {
  width: '100%', minHeight: 80, padding: 14,
  background: '#fff', border: `1.5px solid ${ETL.color.neutral20}`,
  borderRadius: ETL.radius.md, fontFamily: ETL.font.family, fontSize: 15,
  color: ETL.color.neutral, outline: 'none', boxSizing: 'border-box',
  resize: 'none', lineHeight: 1.5,
};

// Step 3 — Focus
function StepGoals({ data, update }) {
  const goals = [
    { id: 'lose',     label: 'Feel lighter',         rw: 'Gutungana',     sub: 'Sustainable fat loss' },
    { id: 'strong',   label: 'Build strength',       rw: 'Gukomera',      sub: 'Lift, push, carry' },
    { id: 'energy',   label: 'More daily energy',    rw: 'Kongera imbaraga', sub: 'Beat the afternoon slump' },
    { id: 'nutrition',label: 'Eat better',           rw: 'Indyo nziza',   sub: 'Habits that stick' },
    { id: 'reset',    label: 'Reset after a break',  rw: 'Tangira Kongera', sub: 'Get back to a rhythm' },
    { id: 'event',    label: 'Train for an event',   rw: 'Kwimenyereza',  sub: 'Kigali Peace Marathon, umusozi hike…' },
  ];

  const toggle = (g) => {
    const has = data.goals.includes(g);
    update('goals', has ? data.goals.filter(x => x !== g) : [...data.goals, g]);
  };
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>What's your reset for?</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 24 }}>
        Pick all that feel true. Your coach will weigh them.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {goals.map(g => {
          const active = data.goals.includes(g.id);
          return (
            <button key={g.id} onClick={() => toggle(g.id)} style={{
              padding: '16px 18px', textAlign: 'left',
              background: active ? ETL.color.tertiary : '#fff',
              border: `1.5px solid ${active ? ETL.color.primary : ETL.color.neutral20}`,
              borderRadius: ETL.radius.md, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 16,
              transition: 'all 0.15s',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: active ? ETL.color.primary : '#fff',
                border: `1.5px solid ${active ? ETL.color.primary : ETL.color.neutral20}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{active && Icon.check(16, '#fff')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 16 }}>{g.label}</div>
                  <div style={{ ...tStyle('overline'), color: active ? ETL.color.primary : ETL.color.neutral40, fontSize: 11, fontStyle: 'italic' }}>{g.rw}</div>
                </div>
                <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginTop: 4 }}>{g.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Step 4 — Activity
function StepActivity({ data, update }) {
  const activities = ['Mostly seated', 'Light walking', 'On my feet daily', 'Active job', 'Athlete'];
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>How active are you?</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 48 }}>
        This excludes your planned ETL workouts.
      </div>

      <div style={{ background: '#fff', padding: '32px 24px', borderRadius: 20, border: `1px solid ${ETL.color.neutral10}` }}>
        <Label>Daily activity outside training</Label>
        <div style={{ height: 20 }}/>
        <Slider value={data.activity} max={4} onChange={v => update('activity', v)}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...tStyle('small'), color: ETL.color.neutral60, marginTop: 12 }}>
          <span>Seated</span>
          <span style={{ color: ETL.color.primary, fontWeight: 700, fontSize: 16 }}>{activities[data.activity]}</span>
          <span>Athlete</span>
        </div>
      </div>
    </div>
  );
}

// Step 5 — Eating Lifestyle
function StepEatingLifestyle({ data, update }) {
  const diets = ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian'];
  const cooking = ['Cook at home', 'Mix of both', 'Eat out'];
  const fasting = ['Open to it', 'Already do', 'Not for me'];
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>How you eat</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 32 }}>
        We build meals around your existing rhythms.
      </div>

      <div style={{ marginBottom: 32 }}>
        <Label>Dietary preference</Label>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {diets.map(d => <Chip key={d} active={data.diet === d} onClick={() => update('diet', d)} style={{ padding: '10px 18px' }}>{d}</Chip>)}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <Label>Cooking style</Label>
        <div style={{ display: 'flex', gap: 10 }}>
          {cooking.map(c => <Chip key={c} active={data.cooking === c} onClick={() => update('cooking', c)} style={{ flex: 1, justifyContent: 'center', height: 48 }}>{c}</Chip>)}
        </div>
      </div>

      <Label>Intermittent fasting?</Label>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {fasting.map(f => <Chip key={f} active={data.fasting === f} onClick={() => update('fasting', f)} style={{ flex: 1, justifyContent: 'center', height: 48 }}>{f}</Chip>)}
      </div>
      <div style={{ ...tStyle('small'), color: ETL.color.neutral60, background: ETL.color.tertiary, padding: 16, borderRadius: 16, border: `1px solid ${ETL.color.primary}15`, lineHeight: 1.5 }}>
        💡 <strong>Coach Tip:</strong> Jeanne recommends a 16:8 window for your profile — easy to maintain with local meal rhythms.
      </div>
    </div>
  );
}

// Step 6 — Eating Foods
function StepEatingFoods({ data, update }) {
  const rwandanFoods = ['Ibishyimbo','Ubugali','Ibirayi','Igitoke','Isombe','Amata','Amagi'];
  const otherFoods = ['Rice','Meat','Fish','Tofu','Avocado','Vegetables','Fruit','Nuts'];
  const toggle = (f) => {
    const has = data.foods.includes(f);
    update('foods', has ? data.foods.filter(x => x !== f) : [...data.foods, f]);
  };
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>Foods you enjoy</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 32 }}>
        Select your staples so we can suggest real, local meals.
      </div>

      <div style={{ marginBottom: 32 }}>
        <Label>🇷🇼 Rwandan staples</Label>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {rwandanFoods.map(f => <Chip key={f} active={data.foods.includes(f)} onClick={() => toggle(f)} style={{ padding: '10px 18px' }}>{f}</Chip>)}
        </div>
      </div>

      <Label>Other favorites</Label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {otherFoods.map(f => <Chip key={f} active={data.foods.includes(f)} onClick={() => toggle(f)} style={{ padding: '10px 18px' }}>{f}</Chip>)}
      </div>
    </div>
  );
}

// Step 7 — Coach
function StepCoach({ data, update }) {
  const coaches = [
    { id: 'aline',    name: 'Aline U.',   role: 'Lead coach',    spec: 'Beginner-friendly · Strength', tag: 'Recommended', kind: 'fitness',   loc: 'Kigali · Kicukiro' },
    { id: 'patrick',  name: 'Patrick M.', role: 'Fitness coach', spec: 'Hybrid · Hill running',        tag: '',            kind: 'fitness',   loc: 'Kigali · Nyamirambo' },
    { id: 'jeanne',   name: 'Jeanne d.',  role: 'Nutritionist',  spec: 'Plant-forward · Local foods',  tag: 'Pairs with Aline', kind: 'nutrition', loc: 'Kigali · Kimihurura' },
  ];
  return (
    <div style={{ padding: '24px 24px 20px' }}>
      <div style={{ ...tStyle('h1'), color: ETL.color.neutral, marginBottom: 10, fontSize: 32, lineHeight: 1.1 }}>Meet your coaches</div>
      <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 32 }}>
        Pick who you'd like to build your plan.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {coaches.map(c => {
          const active = data.coach === c.id;
          return (
            <button key={c.id} onClick={() => update('coach', c.id)} style={{
              padding: 16, textAlign: 'left',
              background: active ? ETL.color.tertiary : '#fff',
              border: `1.5px solid ${active ? ETL.color.primary : ETL.color.neutral20}`,
              borderRadius: ETL.radius.lg, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 16, position: 'relative',
              transition: 'all 0.2s',
            }}>
              <CoachAvatar size={60} kind={c.kind}/>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 16 }}>{c.name}</span>
                  {c.tag && <span style={{ padding: '2px 8px', borderRadius: 999, background: ETL.color.secondary, color: '#fff', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{c.tag}</span>}
                </div>
                <div style={{ ...tStyle('small'), color: ETL.color.neutral80, marginBottom: 2 }}>{c.spec}</div>
                <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{c.loc}</div>
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: 14,
                background: active ? ETL.color.primary : '#fff',
                border: `1.5px solid ${active ? ETL.color.primary : ETL.color.neutral20}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{active && Icon.check(14, '#fff')}</div>
            </button>
          );
        })}
      </div>

      <Label>Anything to tell them? (Optional)</Label>
      <textarea value={data.notes} onChange={e => update('notes', e.target.value)}
        placeholder="e.g. mostly home workouts, prefer mornings…"
        style={{
          width: '100%', minHeight: 100, padding: 18,
          background: '#fff', border: `1.5px solid ${ETL.color.neutral20}`,
          borderRadius: ETL.radius.md, fontFamily: ETL.font.family, fontSize: 16,
          color: ETL.color.neutral, outline: 'none', boxSizing: 'border-box',
          resize: 'none', lineHeight: 1.5,
        }}/>
    </div>
  );
}

// Step 5 — Plan ready (the warm handoff)
function StepPlan({ data }) {
  const t = useT();
  const coachName = { aline: 'Aline', patrick: 'Patrick', jeanne: 'Jeanne' }[data.coach] || 'your coach';
  return (
    <div style={{ padding: '0 0 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', textAlign: 'center', padding: '20px 24px 0' }}>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <Agaseke size={120}/>
          <div style={{ position: 'absolute', top: -8, right: -10 }}>{Icon.sparkle(24, ETL.color.secondary)}</div>
        </div>
      </div>

      <div style={{ padding: '12px 24px 0', textAlign: 'center' }}>
        <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
          {t('onboard.plan.overline')}
        </div>
        <div style={{ ...tStyle('h1'), color: ETL.color.neutral, fontSize: 26, lineHeight: 1.2, marginBottom: 10 }}>
          {t('onboard.plan.title', {name: data.name})}
        </div>
        <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 16, maxWidth: 320, margin: '0 auto 16px' }}>
          {t('onboard.plan.sub', {coach: coachName})}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <Card padding={0} elev="md" style={{ overflow: 'hidden' }}>
          <div style={{ background: ETL.color.tertiary, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {Icon.sparkle(14, ETL.color.primary)}
            <div style={{ ...tStyle('label'), color: ETL.color.primary, textTransform: 'uppercase' }}>Starting plan · Phase 1</div>
          </div>
          <div style={{ padding: 18 }}>
            <SummaryRow icon={Icon.dumbbell(20, ETL.color.primary)} label="Weekly workouts" value="3 sessions · 45 min"/>
            <SummaryRow icon={Icon.bowl(20, ETL.color.primary)}     label="Daily target"     value={`${data.sex === 'male' ? '2,400' : '2,100'} kcal · 120g protein`}/>
            <SummaryRow icon={Icon.timer(20, ETL.color.primary)}    label="Fasting"          value={data.fasting === 'Already do' ? '16:8 from day one' : '14:10 → 16:8 over 2 weeks'}/>
            <SummaryRow icon={Icon.leaf(20, ETL.color.primary)}     label="First phase"      value="Foundation · 4 weeks" last/>
          </div>
        </Card>

        <div style={{ marginTop: 14, padding: 14, background: '#fff', borderRadius: ETL.radius.md, border: `1px solid ${ETL.color.neutral10}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <CoachAvatar size={44} kind="fitness"/>
          <div style={{ flex: 1 }}>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{coachName} will message you on</div>
            <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>WhatsApp + in-app · today</div>
            <div style={{ ...tStyle('overline'), color: ETL.color.secondary, marginTop: 4, fontStyle: 'italic' }}>{t('onboard.plan.signoff')}</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#34C759', boxShadow: '0 0 0 4px rgba(52,199,89,0.2)' }}/>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '12px 0',
      borderBottom: last ? 'none' : `1px solid ${ETL.color.neutral10}`,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: ETL.color.tertiary,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{label}</div>
        <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 15 }}>{value}</div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ ...tStyle('label'), color: ETL.color.neutral80, marginBottom: 8, textTransform: 'none', letterSpacing: 0 }}>{children}</div>;
}

function Input({ value, onChange, placeholder, type = 'text' }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} type={type}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: '100%', height: 48, padding: '0 16px',
        background: '#fff',
        border: `1.5px solid ${focused ? ETL.color.primary : ETL.color.neutral20}`,
        borderRadius: ETL.radius.md,
        fontFamily: ETL.font.family, fontSize: 16, fontWeight: 500,
        color: ETL.color.neutral, outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s',
      }}/>
  );
}

function Slider({ value, max, onChange }) {
  const ref = React.useRef();
  const handleDown = (e) => {
    const upd = (cx) => {
      const r = ref.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (cx - r.left) / r.width));
      onChange(Math.round(pct * max));
    };
    upd(e.clientX);
    const move = (ev) => upd(ev.clientX);
    const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  };
  const pct = (value / max) * 100;
  return (
    <div ref={ref} onPointerDown={handleDown} style={{ position: 'relative', height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', height: 6, background: ETL.color.neutral10, borderRadius: 3 }}/>
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: `${pct}%`, height: 6, background: ETL.color.primary, borderRadius: 3 }}/>
      <div style={{ position: 'absolute', left: `calc(${pct}% - 14px)`, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: 14, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.15), 0 0 0 4px rgba(45,106,79,0.18)', border: `2px solid ${ETL.color.primary}` }}/>
    </div>
  );
}

Object.assign(window, { Onboarding });
