import React from 'react';
import ReactDOM from 'react-dom/client';
import { ETL, tStyle } from './constants/tokens';
import { LangProvider, LangSwitcher, useT } from './i18n/index';
import { Icon, LogoMark } from './components/art/index';
import { ImigongoCorner } from './components/art/rw';
import { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakRadio } from './components/tweaks/index';
import {
  IOSDevice, ScreenHeader, BottomNav, ProgressBar,
  ArcProgress, MacroRing, ProgressDots, Btn, Chip, Pill, Card, NotificationDrawer
} from './components/ui/index';

import { Onboarding } from './screens/onboarding';
import { HomeScreen } from './screens/home';
import { MoveScreen, WorkoutDetail } from './screens/move';
import { NourishScreen } from './screens/nourish';
import { CommunityScreen } from './screens/community';
import { MeScreen } from './screens/progress';
import { StepWelcome, StepIdentity, StepStats, StepPlan } from './screens/onboarding';

// Top-level App — manages screens, onboarding, transitions.

const TWEAKS = /*EDITMODE-BEGIN*/{
  "primary": "#2D6A4F",
  "secondary": "#F4A261",
  "accentLime": false,
  "skipOnboarding": false,
  "showDeviceFrame": true,
  "view": "prototype"
}/*EDITMODE-END*/;

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAKS);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply primary/secondary token override at runtime
  React.useEffect(() => {
    ETL.color.primary = tweaks.accentLime ? '#5BA834' : tweaks.primary;
    ETL.color.secondary = tweaks.secondary;
  }, [tweaks.primary, tweaks.secondary, tweaks.accentLime]);

  return (
    <LangProvider>
      <div style={{
        width: '100vw', 
        minHeight: '100vh',
        background: isMobile ? ETL.color.surface : '#1a1a18',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: isMobile ? 0 : '40px 20px',
        fontFamily: ETL.font.family,
        boxSizing: 'border-box',
        flexDirection: 'column',
        gap: 20,
        overflow: isMobile ? 'visible' : 'hidden'
      }}>
        {tweaks.view === 'prototype' && <Prototype tweaks={tweaks} isMobile={isMobile} />}
        {tweaks.view === 'system' && <SystemPanel />}
        {tweaks.view === 'all' && <AllScreens />}

        <TweaksPanel title="Tweaks" defaultOpen={false}>
          <TweakSection title="Language">
            <div style={{ padding: '4px 0' }}><LangSwitcher /></div>
          </TweakSection>
          <TweakSection title="View">
            <TweakRadio label="Mode" k="view" value={tweaks.view} setValue={(k, v) => setTweak(k, v)}
              options={[{ value: 'prototype', label: 'Prototype' }, { value: 'all', label: 'All screens' }, { value: 'system', label: 'Design system' }]} />
            <TweakToggle label="Device frame" k="showDeviceFrame" value={tweaks.showDeviceFrame} setValue={(k, v) => setTweak(k, v)} />
            <TweakToggle label="Skip onboarding" k="skipOnboarding" value={tweaks.skipOnboarding} setValue={(k, v) => setTweak(k, v)} />
          </TweakSection>
          <TweakSection title="Brand">
            <TweakColor label="Primary" k="primary" value={tweaks.primary} setValue={(k, v) => setTweak(k, v)} />
            <TweakColor label="Secondary" k="secondary" value={tweaks.secondary} setValue={(k, v) => setTweak(k, v)} />
            <TweakToggle label="Use logo lime accent" k="accentLime" value={tweaks.accentLime} setValue={(k, v) => setTweak(k, v)} />
          </TweakSection>
          <TweakSection title="System">
            <Btn full kind="secondary" size="sm" icon={Icon.check(14, ETL.color.primary)} onClick={() => window.location.reload()}>
              Refresh App
            </Btn>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginTop: 8, textAlign: 'center', fontSize: 10 }}>
              v1.3.1 · Fetches latest builds
            </div>
          </TweakSection>
        </TweaksPanel>
      </div>
    </LangProvider>
  );
}

// ─────────────────────────────────────────────────────────────
// Prototype — single-device interactive app
// ─────────────────────────────────────────────────────────────
function Prototype({ tweaks, isMobile }) {
  const [stage, setStage] = React.useState(tweaks.skipOnboarding ? 'app' : 'onboarding');
  const [tab, setTab] = React.useState('home');
  const [user, setUser] = React.useState({
    name: 'Steffi',
    city: 'Kigali',
    age: 28,
    weight: 77.0,
    height: 168,
    health: 'Good',
    diet: 'Flexitarian'
  });
  const [workoutOpen, setWorkoutOpen] = React.useState(false);

  // React to skipOnboarding tweak
  React.useEffect(() => {
    if (tweaks.skipOnboarding && stage === 'onboarding') setStage('app');
    if (!tweaks.skipOnboarding && stage === 'app') {/* stay */ }
  }, [tweaks.skipOnboarding]);

  const onComplete = (data) => { setUser({ ...user, name: data.name }); setStage('transition'); setTimeout(() => setStage('app'), 800); };
  const startWorkout = () => setWorkoutOpen(true);
  const closeWorkout = () => setWorkoutOpen(false);

  const screen = (() => {
    if (stage === 'onboarding') return <Onboarding onComplete={onComplete} />;
    if (stage === 'transition') return <TransitionScreen />;
    if (tab === 'home') return <HomeScreen user={user} onNav={setTab} onStartWorkout={startWorkout} />;
    if (tab === 'move') return <MoveScreen onStartWorkout={startWorkout} />;
    if (tab === 'nourish') return <NourishScreen onNav={setTab} />;
    if (tab === 'community') return <CommunityScreen onNav={setTab} />;
    if (tab === 'me') return <MeScreen user={user} onNav={setTab} />;
    if (tab === 'notifications') return <NotificationDrawer onBack={() => setTab('home')} />;
  })();

  const inner = (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: ETL.color.surface,
      paddingBottom: 120,
    }}>
      {screen}
      {stage === 'app' && <BottomNav active={tab} onChange={(newTab) => { setTab(newTab); setWorkoutOpen(false); }} />}
      {workoutOpen && <WorkoutDetail onClose={closeWorkout} onComplete={closeWorkout} />}
    </div>
  );

  return (
    <IOSDevice isMobile={isMobile || !tweaks.showDeviceFrame}>
      {inner}
    </IOSDevice>
  );
}

function TransitionScreen() {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: ETL.color.tertiary,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20,
      animation: 'fadeIn 0.4s',
    }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes pulse2 { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }`}</style>
      <div style={{ animation: 'pulse2 1.2s infinite' }}><LogoMark size={88} /></div>
      <div style={{ ...tStyle('h3'), color: ETL.color.primary, animation: 'fadeIn 0.5s 0.3s both' }}>Setting up your reset…</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// All Screens — grid of all 5 screens for review
// ─────────────────────────────────────────────────────────────
function AllScreens() {
  const screens = [
    { label: '01 · Welcome', el: <StepWelcome /> },
    { label: '02 · Identity', el: <StepIdentity data={{ name: '' }} update={() => { }} /> },
    { label: '03 · Stats', el: <StepStats data={{ age: 28, sex: 'female', height: 168, weight: 77 }} update={() => { }} /> },
    { label: '04 · Plan ready', el: <StepPlan data={{ name: 'Steffi', coach: 'aline' }} /> },
    { label: '05 · Today (Home)', el: <HomeScreen user={{ name: 'Steffi' }} onNav={() => { }} onStartWorkout={() => { }} />, nav: 'home' },
    { label: '06 · Move', el: <MoveScreen onStartWorkout={() => { }} />, nav: 'move' },
    { label: '07 · Nourish', el: <NourishScreen onNav={() => { }} />, nav: 'nourish' },
    { label: '08 · Community', el: <CommunityScreen onNav={() => { }} />, nav: 'community' },
    { label: '09 · Progress', el: <MeScreen user={{ name: 'Steffi', city: 'Kigali', age: 28, weight: 77, height: 168, health: 'Good', diet: 'Plant-based' }} />, nav: 'me' },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', padding: '0 20px' }}>
      {screens.map((s, i) => (
        <div key={i} data-screen-label={s.label}>
          <div style={{ ...tStyle('label'), color: '#fff', opacity: 0.7, marginBottom: 12, textAlign: 'center', textTransform: 'none', letterSpacing: 0 }}>{s.label}</div>
          <div style={{ width: 390, height: 844, position: 'relative', borderRadius: 32, overflow: 'hidden', background: ETL.color.surface, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            {s.el}
            {s.nav && <BottomNav active={s.nav} onChange={() => { }} />}
          </div>
        </div>
      ))}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// Design System panel
// ─────────────────────────────────────────────────────────────
function SystemPanel() {
  return (
    <div style={{
      width: 1100, maxWidth: '100%',
      background: '#fff', borderRadius: 16, padding: 32,
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      fontFamily: ETL.font.family,
    }}>
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="assets/etl-logo.jpeg" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: ETL.color.primary, letterSpacing: 1.2, textTransform: 'uppercase' }}>ETL · Body Reset Program</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: ETL.color.neutral, marginTop: 2 }}>Design System</div>
          <div style={{ fontSize: 13, color: ETL.color.neutral60, marginTop: 2 }}>Eat better. Train smarter. Live lighter.</div>
        </div>
      </div>

      <SysSection title="Colors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          <Swatch hex={ETL.color.primary} name="Primary" sub="Forest green" dark={undefined} />
          <Swatch hex={ETL.color.secondary} name="Secondary" sub="Warm orange" dark={undefined} />
          <Swatch hex={ETL.color.tertiary} name="Tertiary" sub="Soft mint" dark />
          <Swatch hex={ETL.color.neutral} name="Neutral" sub="Text + icons" dark={undefined} />
          <Swatch hex={ETL.color.surface} name="Surface" sub="Page bg" dark />
          <Swatch hex={ETL.color.white} name="White" sub="Cards" dark />
        </div>
      </SysSection>

      <SysSection title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TypeRow size={32} weight={700} label="H1 · Inter Bold 32" upper={undefined} />
          <TypeRow size={24} weight={700} label="H2 · Inter Bold 24" upper={undefined} />
          <TypeRow size={20} weight={600} label="H3 · Inter SemiBold 20" upper={undefined} />
          <TypeRow size={17} weight={600} label="H4 · Inter SemiBold 17" upper={undefined} />
          <TypeRow size={15} weight={400} label="Body · Inter Regular 15" upper={undefined} />
          <TypeRow size={13} weight={500} label="Small · Inter Medium 13" upper={undefined} />
          <TypeRow size={11} weight={600} label="Overline · Inter SemiBold 11" upper />
        </div>
      </SysSection>

      <SysSection title="Buttons">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Btn kind="primary">Primary</Btn>
          <Btn kind="secondary">Secondary</Btn>
          <Btn kind="inverted">Inverted</Btn>
          <Btn kind="outlined">Outlined</Btn>
          <Btn kind="ghost">Ghost</Btn>
          <Btn kind="primary" size="sm">Small</Btn>
          <Btn kind="primary" size="lg">Large</Btn>
        </div>
      </SysSection>

      <SysSection title="Chips & Pills">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip>Default</Chip>
          <Chip active>Active</Chip>
          <Chip locked>Locked</Chip>
          <Pill>Default pill</Pill>
          <Pill color="primary">Primary pill</Pill>
          <Pill color="orange">Orange pill</Pill>
        </div>
      </SysSection>

      <SysSection title="Bottom navigation">
        <div style={{ width: 390, height: 100, position: 'relative', background: ETL.color.surface, borderRadius: 16, border: `1px solid ${ETL.color.neutral10}` }}>
          <BottomNav active="home" onChange={() => { }} />
        </div>
      </SysSection>

      <SysSection title="Progress & data">
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <ArcProgress value={68} size={100} stroke={10}>
            <div style={{ fontSize: 22, fontWeight: 700, color: ETL.color.primary }}>68%</div>
          </ArcProgress>
          <MacroRing size={88} />
          <div style={{ width: 220 }}>
            <ProgressBar value={12} max={28} />
          </div>
          <ProgressDots count={3} current={1} />
        </div>
      </SysSection>
    </div>
  );
}

function SysSection({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: ETL.color.neutral60, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function Swatch({ hex, name, sub, dark }) {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${ETL.color.neutral10}` }}>
      <div style={{ height: 80, background: hex }} />
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: ETL.color.neutral }}>{name}</div>
        <div style={{ fontSize: 11, color: ETL.color.neutral60, marginTop: 2 }}>{sub}</div>
        <div style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace', color: ETL.color.neutral80, marginTop: 4 }}>{hex}</div>
      </div>
    </div>
  );
}

function TypeRow({ size, weight, label, upper }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 12, borderBottom: `1px solid ${ETL.color.neutral10}` }}>
      <div style={{ fontSize: size, fontWeight: weight, color: ETL.color.neutral, fontFamily: ETL.font.family, lineHeight: 1.2, textTransform: upper ? 'uppercase' : 'none', letterSpacing: upper ? 1 : -0.2 }}>
        Eat better. Train smarter.
      </div>
      <div style={{ marginLeft: 'auto', fontSize: 11, color: ETL.color.neutral60, fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  );
}


// End of file
