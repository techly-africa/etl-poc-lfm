// Video player + animated demos.
// We don't have real video files — we render keyframed SVG animations driven by a play head,
// so they feel like real demo videos: scrubber, play/pause, speed, fullscreen, step markers.

// ─── Player shell ─────────────────────────────────────────────
function DemoPlayer({ duration, steps, render, title, sub, onClose, accent = ETL.color.primary, autoplay = true }) {
  const [t, setT] = React.useState(0); // seconds
  const [playing, setPlaying] = React.useState(autoplay);
  const [speed, setSpeed] = React.useState(1);
  const last = React.useRef(performance.now());
  const raf = React.useRef();

  React.useEffect(() => {
    if (!playing) return;
    last.current = performance.now();
    const tick = (now) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT(prev => {
        const next = prev + dt * speed;
        if (next >= duration) { setPlaying(false); return duration; }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, speed, duration]);

  const togglePlay = () => {
    if (t >= duration) { setT(0); setPlaying(true); }
    else setPlaying(p => !p);
  };
  const seek = (v) => { setT(Math.max(0, Math.min(duration, v))); };

  // Find current step
  const currentStepIdx = steps ? Math.max(0, steps.findIndex((s, i) => {
    const next = steps[i + 1];
    return t >= s.at && (!next || t < next.at);
  })) : 0;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0E2A1F', zIndex: 200,
      display: 'flex', flexDirection: 'column',
      animation: 'demoIn 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
    }}>
      <style>{`@keyframes demoIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>

      {/* Top bar */}
      <div style={{ padding: '54px 20px 14px', display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)', position: 'relative', zIndex: 2 }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          {Icon.chevD ? Icon.chevD(16, '#fff') : <span style={{ color: '#fff', fontSize: 20 }}>×</span>}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...tStyle('overline'), color: '#F4A261', textTransform: 'uppercase' }}>{sub}</div>
          <div style={{ ...tStyle('h4'), color: '#fff', fontSize: 16 }}>{title}</div>
        </div>
        <button onClick={() => setSpeed(s => s === 1 ? 0.5 : s === 0.5 ? 1.5 : 1)} style={{
          padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
          fontFamily: ETL.font.family, fontSize: 12, fontWeight: 700, cursor: 'pointer',
        }}>{speed}×</button>
      </div>

      {/* Stage */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {render({ t, duration, stepIdx: currentStepIdx, accent })}
        {/* tap-to-toggle */}
        <button onClick={togglePlay} style={{ position: 'absolute', inset: 0, background: 'transparent', border: 'none', cursor: 'pointer' }} aria-label="play/pause"/>
        {!playing && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ width: 72, height: 72, borderRadius: 36, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 4 }}><path d="M5 3 L21 12 L5 21 Z"/></svg>
            </div>
          </div>
        )}
      </div>

      {/* Step ticker */}
      {steps && (
        <div style={{ padding: '0 20px 12px', position: 'relative', zIndex: 2 }}>
          <div style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ETL.font.family, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{currentStepIdx + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...tStyle('overline'), color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Step {currentStepIdx + 1} of {steps.length}</div>
              <div style={{ ...tStyle('h4'), color: '#fff', fontSize: 14, lineHeight: 1.3 }}>{steps[currentStepIdx].text}</div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ padding: '8px 20px 36px', position: 'relative', zIndex: 2 }}>
        <Scrubber t={t} duration={duration} steps={steps} onSeek={seek} accent={accent}/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ ...tStyle('small'), color: 'rgba(255,255,255,0.7)', fontVariantNumeric: 'tabular-nums' }}>{fmtTime(t)}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button onClick={() => seek(t - 5)} style={ctrlBtn}>{ctrlBack(20)}</button>
            <button onClick={togglePlay} style={{ ...ctrlBtn, width: 52, height: 52, background: '#fff' }}>
              {playing ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill={accent}><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill={accent} style={{ marginLeft: 3 }}><path d="M5 3 L21 12 L5 21 Z"/></svg>
              )}
            </button>
            <button onClick={() => seek(t + 5)} style={ctrlBtn}>{ctrlFwd(20)}</button>
          </div>
          <span style={{ ...tStyle('small'), color: 'rgba(255,255,255,0.7)', fontVariantNumeric: 'tabular-nums' }}>{fmtTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

const ctrlBtn = {
  width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.15)',
  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const ctrlBack = (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M11 4 L3 12 L11 20 V14 H21 V10 H11 Z"/></svg>;
const ctrlFwd  = (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M13 4 L21 12 L13 20 V14 H3 V10 H13 Z"/></svg>;
const fmtTime = (s) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

function Scrubber({ t, duration, steps, onSeek, accent }) {
  const ref = React.useRef();
  const drag = (e) => {
    const upd = (cx) => {
      const r = ref.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (cx - r.left) / r.width));
      onSeek(pct * duration);
    };
    upd(e.clientX);
    const move = (ev) => upd(ev.clientX);
    const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  };
  const pct = (t / duration) * 100;
  return (
    <div ref={ref} onPointerDown={drag} style={{ position: 'relative', height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: accent, borderRadius: 2 }}/>
        {steps && steps.map((s, i) => i === 0 ? null : (
          <div key={i} style={{ position: 'absolute', left: `${(s.at / duration) * 100}%`, top: -2, width: 2, height: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 1 }}/>
        ))}
      </div>
      <div style={{ position: 'absolute', left: `calc(${pct}% - 8px)`, width: 16, height: 16, borderRadius: 8, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}/>
    </div>
  );
}

// ─── Animated stick figure ────────────────────────────────────
// Joint coordinates over time produce real exercise motion.
// All exercises use a bobbing 2-second cycle modulated by t.

const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * 2 * x); // smooth 0→1→0

function StickFigure({ pose, t, accent }) {
  // Build skeleton from pose function: returns {head, torso, arms, legs}
  const p = pose(t);
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: 360, maxHeight: 360 }}>
      <defs>
        <radialGradient id="sf-floor" cx="0.5" cy="0.5">
          <stop offset="0" stopColor="rgba(244,162,97,0.25)"/>
          <stop offset="1" stopColor="rgba(244,162,97,0)"/>
        </radialGradient>
      </defs>
      {/* floor shadow */}
      <ellipse cx="100" cy={p.floorY ?? 180} rx="60" ry="6" fill="url(#sf-floor)"/>

      {/* limbs */}
      <Limb a={p.shoulder} b={p.lElbow} c={p.lHand} color="#F4E4D2"/>
      <Limb a={p.shoulder} b={p.rElbow} c={p.rHand} color="#F4E4D2"/>
      <Limb a={p.hip} b={p.lKnee} c={p.lFoot} color="#F4E4D2"/>
      <Limb a={p.hip} b={p.rKnee} c={p.rFoot} color="#F4E4D2"/>

      {/* torso */}
      <line x1={p.shoulder[0]} y1={p.shoulder[1]} x2={p.hip[0]} y2={p.hip[1]} stroke={accent} strokeWidth="10" strokeLinecap="round"/>

      {/* head */}
      <circle cx={p.head[0]} cy={p.head[1]} r="11" fill="#F4E4D2" stroke={accent} strokeWidth="2"/>

      {/* hair tuft */}
      <path d={`M${p.head[0]-9} ${p.head[1]-6} Q${p.head[0]} ${p.head[1]-14} ${p.head[0]+9} ${p.head[1]-6}`} stroke="#1B1B1B" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function Limb({ a, b, c, color }) {
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth="9" strokeLinecap="round"/>
      <line x1={b[0]} y1={b[1]} x2={c[0]} y2={c[1]} stroke={color} strokeWidth="9" strokeLinecap="round"/>
      <circle cx={b[0]} cy={b[1]} r="3.5" fill={color}/>
    </g>
  );
}

// Exercise pose functions
const POSES = {
  squat: (t) => {
    const phase = ease((t % 2.4) / 2.4);
    const dip = phase * 28;
    const hipY = 105 + dip;
    return {
      head: [100, 50 + dip],
      shoulder: [100, 70 + dip],
      hip: [100, hipY],
      lKnee: [82, 130 + dip * 0.3], rKnee: [118, 130 + dip * 0.3],
      lFoot: [78, 175], rFoot: [122, 175],
      lElbow: [78, 90 + dip], rElbow: [122, 90 + dip],
      lHand: [70, 70 + dip * 0.5], rHand: [130, 70 + dip * 0.5],
      floorY: 180,
    };
  },
  pushup: (t) => {
    const phase = ease((t % 2.4) / 2.4);
    const dip = phase * 14;
    return {
      head: [60, 110 + dip],
      shoulder: [78, 115 + dip],
      hip: [128, 122],
      lKnee: [148, 132], rKnee: [148, 138],
      lFoot: [170, 140], rFoot: [170, 146],
      lElbow: [82, 130 - dip * 0.3], rElbow: [82, 138 - dip * 0.3],
      lHand: [82, 158], rHand: [82, 158],
      floorY: 165,
    };
  },
  plank: (t) => {
    const wob = Math.sin(t * 2) * 1.5;
    return {
      head: [54, 108 + wob],
      shoulder: [74, 114 + wob],
      hip: [128, 118 + wob * 0.5],
      lKnee: [150, 126], rKnee: [150, 132],
      lFoot: [172, 134], rFoot: [172, 140],
      lElbow: [78, 138], rElbow: [78, 144],
      lHand: [78, 158], rHand: [78, 158],
      floorY: 165,
    };
  },
  row: (t) => {
    const phase = ease((t % 2) / 2);
    const pull = phase * 18;
    return {
      head: [80, 70],
      shoulder: [92, 90],
      hip: [108, 120],
      lKnee: [92, 145], rKnee: [124, 145],
      lFoot: [88, 175], rFoot: [128, 175],
      lElbow: [120 - pull, 100], rElbow: [120 - pull, 108],
      lHand: [140 - pull * 1.5, 110], rHand: [140 - pull * 1.5, 118],
      floorY: 180,
    };
  },
  jumpingJack: (t) => {
    const phase = ease((t % 1.0) / 1.0);
    const arm = phase;
    const leg = phase;
    const lift = phase * 6;
    return {
      head: [100, 50 - lift],
      shoulder: [100, 72 - lift],
      hip: [100, 110 - lift],
      lKnee: [92 - leg * 14, 138 - lift], rKnee: [108 + leg * 14, 138 - lift],
      lFoot: [88 - leg * 22, 172 - lift * 2], rFoot: [112 + leg * 22, 172 - lift * 2],
      lElbow: [80 - arm * 18, 78 - arm * 14], rElbow: [120 + arm * 18, 78 - arm * 14],
      lHand: [70 - arm * 32, 60 - arm * 30], rHand: [130 + arm * 32, 60 - arm * 30],
      floorY: 178,
    };
  },
};

function ExerciseDemo({ pose, t, accent }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* backdrop bands */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1F4D3A 0%, #0E2A1F 70%)' }}/>
      <div style={{ position: 'absolute', top: '15%', left: 0, right: 0, height: 14 }}>
        <ImigongoBand width={400} height={14} palette="forest"/>
      </div>
      {/* coach badge bottom-left */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 6px', background: 'rgba(255,255,255,0.12)', borderRadius: 999, backdropFilter: 'blur(10px)' }}>
        <CoachAvatar size={28} kind="fitness"/>
        <span style={{ ...tStyle('small'), color: '#fff', fontWeight: 600 }}>Coach Aline</span>
      </div>
      {/* rep counter top-right */}
      <div style={{ position: 'absolute', top: 16, right: 16, padding: '6px 12px', background: 'rgba(244,162,97,0.95)', borderRadius: 999 }}>
        <span style={{ ...tStyle('small'), color: '#fff', fontWeight: 700 }}>Rep {Math.floor(t / 2.4) + 1}</span>
      </div>
      <div style={{ position: 'relative', width: 320, height: 320 }}>
        <StickFigure pose={POSES[pose]} t={t} accent={accent}/>
      </div>
    </div>
  );
}

// ─── Recipe demo ──────────────────────────────────────────────
// A counter-top with ingredients that get added/cooked over time.
function RecipeDemo({ recipe, t, stepIdx, accent }) {
  const step = recipe.timeline[stepIdx] || recipe.timeline[0];
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* warm kitchen backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3D2818 0%, #1B1B1B 100%)' }}/>
      <div style={{ position: 'absolute', top: '12%', left: 0, right: 0 }}>
        <ImigongoBand width={400} height={14} palette="warm"/>
      </div>

      {/* counter */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '52%', background: '#F4E4D2', borderTop: '4px solid #7A3F1F' }}/>

      {/* The bowl that fills */}
      <div style={{ position: 'absolute', bottom: '14%', left: '50%', transform: 'translateX(-50%)' }}>
        <Bowl filledIngredients={step.bowl || []} t={t} sizzling={step.sizzle}/>
      </div>

      {/* hands / utensils */}
      {step.action && (
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: `translate(-50%, ${Math.sin(t * 4) * 4}px)` }}>
          <Utensil kind={step.action}/>
        </div>
      )}

      {/* incoming ingredient */}
      {step.add && (
        <div key={stepIdx} style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', animation: 'dropIn 1.2s ease-in forwards' }}>
          <IngredientChip ing={step.add}/>
        </div>
      )}
      <style>{`
        @keyframes dropIn { 0% { transform: translate(-50%, -120px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translate(-50%, 80px); opacity: 0; } }
        @keyframes steam { 0% { opacity: 0; transform: translateY(0) scale(1); } 50% { opacity: 0.6; } 100% { opacity: 0; transform: translateY(-30px) scale(1.3); } }
        @keyframes sizzle { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
      `}</style>

      {/* Recipe title */}
      <div style={{ position: 'absolute', top: 80, left: 20, right: 20, textAlign: 'center' }}>
        <div style={{ ...tStyle('overline'), color: '#F4A261', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>{recipe.cuisine || 'East African'}</div>
        <div style={{ ...tStyle('h2'), color: '#fff', fontSize: 22 }}>{recipe.name}</div>
      </div>

      {/* nutritionist badge */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 6px', background: 'rgba(255,255,255,0.15)', borderRadius: 999, backdropFilter: 'blur(10px)' }}>
        <CoachAvatar size={28} kind="nutrition"/>
        <span style={{ ...tStyle('small'), color: '#fff', fontWeight: 600 }}>Jeanne, RD</span>
      </div>
    </div>
  );
}

function Bowl({ filledIngredients, t, sizzling }) {
  return (
    <div style={{ position: 'relative', width: 200, height: 130 }}>
      {/* steam */}
      {(filledIngredients.length > 1 || sizzling) && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', bottom: 60, left: 50 + i * 40,
          width: 12, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.5)',
          animation: `steam 1.6s ${i * 0.5}s infinite ease-out`,
        }}/>
      ))}
      <svg viewBox="0 0 200 130" width="200" height="130" style={{ position: 'absolute', inset: 0, animation: sizzling ? 'sizzle 0.4s infinite' : 'none' }}>
        {/* bowl body */}
        <ellipse cx="100" cy="65" rx="92" ry="14" fill="#7A3F1F"/>
        <path d="M8 65 Q8 120 100 122 Q192 120 192 65 Z" fill="#A85A2C"/>
        <ellipse cx="100" cy="65" rx="86" ry="11" fill="#3D2818"/>
        {/* contents */}
        {filledIngredients.map((ing, i) => {
          const lvl = Math.min(1, (filledIngredients.length - i) / 3);
          const rx = 80 - i * 4; const ry = 9 - i * 1.2;
          return (
            <ellipse key={i} cx="100" cy={66 - i * 5} rx={rx} ry={ry}
              fill={ING_COLORS[ing] || '#5BA834'}
              opacity={0.85 + i * 0.05}/>
          );
        })}
        {/* surface texture */}
        {filledIngredients.length > 0 && Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={100 + Math.cos(a) * 50 + Math.sin(t * 2 + i) * 3} cy={62 + Math.sin(a) * 5} r="3" fill={ING_DOTS[filledIngredients[filledIngredients.length-1]] || '#F4A261'} opacity="0.7"/>;
        })}
      </svg>
    </div>
  );
}

const ING_COLORS = {
  beans: '#5C2E1F', plantain: '#F4D17A', avocado: '#7DB85B', greens: '#3F8A68',
  rice: '#F4E4D2', tofu: '#FCEDDC', lentils: '#A85A2C', tomato: '#D14F3A',
  egg: '#F4D17A', oil: '#F4A261', sweetpotato: '#D97539', spinach: '#2D6A4F',
};
const ING_DOTS = {
  beans: '#3D2818', plantain: '#B86E20', avocado: '#3F8A68', greens: '#1F4D3A',
  rice: '#E8B57A', tofu: '#F4A261', lentils: '#7A3F1F', tomato: '#7A1F1F',
  egg: '#F4A261', oil: '#B86E20', sweetpotato: '#7A3F1F', spinach: '#0E2A1F',
};

function IngredientChip({ ing }) {
  const labels = {
    beans: '🫘 Red beans', plantain: '🍌 Plantain', avocado: '🥑 Avocado',
    greens: '🥬 Sukuma', rice: '🍚 Brown rice', tofu: 'Tofu cubes',
    lentils: 'Lentils', tomato: '🍅 Tomato', egg: '🥚 Egg', oil: '🫒 Olive oil',
    sweetpotato: '🍠 Sweet potato', spinach: '🌿 Spinach',
  };
  return (
    <div style={{ padding: '10px 16px', background: '#fff', borderRadius: 999, boxShadow: '0 4px 16px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 14, height: 14, borderRadius: 7, background: ING_COLORS[ing] || '#5BA834' }}/>
      <span style={{ ...tStyle('small'), color: ETL.color.neutral, fontWeight: 700 }}>{labels[ing] || ing}</span>
    </div>
  );
}

function Utensil({ kind }) {
  if (kind === 'stir') {
    return (
      <svg width="60" height="80" viewBox="0 0 60 80">
        <rect x="26" y="0" width="8" height="50" rx="4" fill="#7A3F1F"/>
        <ellipse cx="30" cy="55" rx="14" ry="6" fill="#A85A2C"/>
      </svg>
    );
  }
  if (kind === 'chop') {
    return (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <rect x="0" y="20" width="40" height="6" rx="2" fill="#C0C0C8"/>
        <rect x="36" y="14" width="20" height="18" rx="3" fill="#7A3F1F"/>
      </svg>
    );
  }
  return null;
}

// ─── Recipe library ───────────────────────────────────────────
const RECIPES = {
  beanBowl: {
    name: 'Rwandan bean & avocado bowl',
    cuisine: 'East African · 15 min',
    duration: 30,
    timeline: [
      { at: 0,  text: 'Warm 1 tbsp olive oil in a pan', bowl: ['oil'], action: 'stir' },
      { at: 4,  text: 'Add cooked red beans, simmer 2 min', bowl: ['oil','beans'], add: 'beans', sizzle: true },
      { at: 10, text: 'Stir in steamed sukuma greens',     bowl: ['oil','beans','greens'], add: 'greens', action: 'stir' },
      { at: 16, text: 'Plate over warm brown rice',         bowl: ['rice','beans','greens'], add: 'rice' },
      { at: 22, text: 'Top with sliced avocado & tomato',   bowl: ['rice','beans','greens','avocado'], add: 'avocado' },
      { at: 27, text: 'Serve warm — 620 kcal · 38g protein', bowl: ['rice','beans','greens','avocado'] },
    ],
  },
  lentilSalad: {
    name: 'Lentil & feta salad',
    cuisine: 'Phase 1 pick · 15 min',
    duration: 24,
    timeline: [
      { at: 0,  text: 'Rinse 1 cup cooked lentils',         bowl: ['lentils'], add: 'lentils' },
      { at: 5,  text: 'Add diced tomato & cucumber',        bowl: ['lentils','tomato'], add: 'tomato' },
      { at: 11, text: 'Toss in baby spinach',               bowl: ['lentils','tomato','spinach'], add: 'spinach', action: 'stir' },
      { at: 17, text: 'Crumble feta · drizzle olive oil',    bowl: ['lentils','tomato','spinach','oil'], add: 'oil' },
      { at: 22, text: 'Done — 460 kcal · 28g protein',       bowl: ['lentils','tomato','spinach','oil'] },
    ],
  },
  sweetPotato: {
    name: 'Sweet potato & egg breakfast',
    cuisine: 'Pre-workout fuel · 12 min',
    duration: 22,
    timeline: [
      { at: 0,  text: 'Roast cubed sweet potato 10 min',    bowl: ['sweetpotato'], add: 'sweetpotato', sizzle: true },
      { at: 6,  text: 'Fry one egg, sunny side up',         bowl: ['sweetpotato','egg'], add: 'egg', sizzle: true },
      { at: 12, text: 'Plate with sliced avocado',          bowl: ['sweetpotato','egg','avocado'], add: 'avocado' },
      { at: 18, text: 'Sprinkle salt — 510 kcal · 22g protein', bowl: ['sweetpotato','egg','avocado'] },
    ],
  },
};

// ─── Exercise library ─────────────────────────────────────────
const EXERCISE_DEMOS = {
  Squats: {
    pose: 'squat',
    sub: 'Phase 1 · Lower body',
    duration: 24,
    steps: [
      { at: 0,  text: 'Stand tall, feet shoulder-width' },
      { at: 4,  text: 'Lower hips back, chest proud' },
      { at: 10, text: 'Knees track over your toes' },
      { at: 16, text: 'Drive through heels, stand tall' },
    ],
  },
  'Push-ups': {
    pose: 'pushup',
    sub: 'Phase 1 · Upper body',
    duration: 22,
    steps: [
      { at: 0,  text: 'Start in plank, hands under shoulders' },
      { at: 5,  text: 'Lower chest with control' },
      { at: 12, text: 'Push the floor away' },
      { at: 18, text: 'Squeeze glutes, breathe' },
    ],
  },
  'Bent-over Rows': {
    pose: 'row',
    sub: 'Phase 1 · Pull',
    duration: 20,
    steps: [
      { at: 0,  text: 'Hinge at hips, flat back' },
      { at: 5,  text: 'Pull elbows back, not up' },
      { at: 12, text: 'Squeeze shoulder blades' },
      { at: 16, text: 'Lower under control' },
    ],
  },
  Plank: {
    pose: 'plank',
    sub: 'Phase 1 · Core',
    duration: 18,
    steps: [
      { at: 0,  text: 'Forearms under shoulders' },
      { at: 5,  text: 'Hips level, glutes engaged' },
      { at: 11, text: 'Breathe steady · don\'t sag' },
    ],
  },
  'Jumping jacks': {
    pose: 'jumpingJack',
    sub: 'Phase 1 · Warm-up',
    duration: 16,
    steps: [
      { at: 0,  text: 'Light bounce, arms out' },
      { at: 6,  text: 'Find a steady rhythm' },
      { at: 12, text: 'Land soft on midfoot' },
    ],
  },
};

// ─── Public openers ───────────────────────────────────────────
function ExerciseDemoPlayer({ name, onClose }) {
  const def = EXERCISE_DEMOS[name] || EXERCISE_DEMOS.Squats;
  return (
    <DemoPlayer
      title={name}
      sub={def.sub}
      duration={def.duration}
      steps={def.steps}
      accent={ETL.color.primary}
      onClose={onClose}
      render={({ t, accent, stepIdx }) => <ExerciseDemo pose={def.pose} t={t} accent={accent}/>}
    />
  );
}

function RecipeDemoPlayer({ id, onClose }) {
  const r = RECIPES[id] || RECIPES.beanBowl;
  return (
    <DemoPlayer
      title={r.name}
      sub={r.cuisine}
      duration={r.duration}
      steps={r.timeline.map(s => ({ at: s.at, text: s.text }))}
      accent={ETL.color.secondary}
      onClose={onClose}
      render={({ t, stepIdx, accent }) => <RecipeDemo recipe={r} t={t} stepIdx={stepIdx} accent={accent}/>}
    />
  );
}

// Compact thumbnail-with-play overlay for use in cards
function VideoThumb({ kind = 'exercise', label, sub, dur, onPlay, w = '100%', h = 110, hue = 'green' }) {
  const bg = kind === 'recipe'
    ? 'linear-gradient(135deg, #3D2818 0%, #7A3F1F 100%)'
    : (hue === 'orange'
        ? 'linear-gradient(135deg, #B86E20 0%, #F4A261 100%)'
        : 'linear-gradient(135deg, #1F4D3A 0%, #3F8A68 100%)');
  return (
    <button onClick={onPlay} style={{
      width: w, height: h, borderRadius: ETL.radius.lg, border: 'none', cursor: 'pointer', padding: 0,
      background: bg, position: 'relative', overflow: 'hidden', display: 'block',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8 }}>
        <ImigongoBand width={400} height={8} palette={kind === 'recipe' ? 'warm' : 'forest'}/>
      </div>
      {/* subtle pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.10,
        background: `radial-gradient(circle at 20% 80%, #fff 1px, transparent 1.5px) 0 0/24px 24px`,
      }}/>
      {/* play button */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 52, height: 52, borderRadius: 26, background: 'rgba(255,255,255,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={kind === 'recipe' ? '#B86E20' : ETL.color.primary} style={{ marginLeft: 3 }}>
          <path d="M5 3 L21 12 L5 21 Z"/>
        </svg>
      </div>
      {/* duration chip */}
      {dur && (
        <div style={{ position: 'absolute', top: 14, right: 12, padding: '3px 8px', background: 'rgba(0,0,0,0.5)', borderRadius: 6, color: '#fff', ...tStyle('small'), fontWeight: 700, fontSize: 11, backdropFilter: 'blur(4px)' }}>
          ▶ {dur}
        </div>
      )}
      {/* label */}
      {label && (
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, textAlign: 'left' }}>
          <div style={{ ...tStyle('h4'), color: '#fff', fontSize: 14, lineHeight: 1.2 }}>{label}</div>
          {sub && <div style={{ ...tStyle('small'), color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>{sub}</div>}
        </div>
      )}
    </button>
  );
}

Object.assign(window, {
  DemoPlayer, ExerciseDemoPlayer, RecipeDemoPlayer, VideoThumb,
  EXERCISE_DEMOS, RECIPES,
});
