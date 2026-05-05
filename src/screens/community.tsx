import React from 'react';
import { ETL, tStyle } from '../constants/tokens';
import { useT } from '../i18n/index';
import { Icon } from '../components/art/index';
import { KinyarwandaProverb, CoachAvatar } from '../components/art/rw';
import { ImigongoDivider } from '../components/gamify/index';
import { ScreenHeader, ScrollPage, Card, Btn, Chip } from '../components/ui/index';

// Community + Coach Feedback screen — Umuryango ("family" in Kinyarwanda)
export function CommunityScreen({ onNav }) {
  const t = useT();
  const [tab, setTab] = React.useState('feed'); // feed | coach
  const [composing, setComposing] = React.useState(false);
  const [posts, setPosts] = React.useState([
    {
      id: 1, who: { name: 'Eric M.', loc: '🇷🇼 Kigali · Kicukiro', kind: 'user' },
      time: '2h', kind: 'milestone',
      text: 'Day 14 of Phase 1 done! The hill runs in Nyamirambo are no joke 🏃🏾‍♂️',
      stat: 'Phase 1 · Week 2 complete', cheers: 23, comments: 4,
      coachReply: { name: 'Coach Patrick', text: 'Imbaraga zawe! Add 1 minute to your tempo next week.' },
    },
    {
      id: 2, who: { name: 'Aline U.', loc: 'Lead coach · Kigali', kind: 'coach' },
      time: '5h', kind: 'tip',
      text: 'Tip for week 2 — protein at every meal. Ibishyimbo, amagi, amata, inshyushyu. Local and easy.',
      cheers: 41, comments: 9,
    },
    {
      id: 3, who: { name: 'Diane K.', loc: '🇷🇼 Musanze 🌿', kind: 'user' },
      time: '1d', kind: 'recipe',
      text: 'Nakozemo recipe y’ibishyimbo n’avoka 🫘 — nashyizeho igisheke (peanut sauce). Iri neza cyane!',
      cheers: 18, comments: 7,
    },
    {
      id: 4, who: { name: 'Mireille N.', loc: '🇷🇼 Rubavu · Gisenyi', kind: 'user' },
      time: '3h', kind: 'milestone',
      text: 'Morning swim in Lake Kivu before training 🌊 then Phase 1 Wk 2 strength session. Feeling unstoppable!',
      stat: 'Phase 1 · Week 2', cheers: 31, comments: 6,
    },
  ]);

  return (
    <ScrollPage>
      <ScreenHeader sub={t('community.sub')} title={t('community.title')} imigongo={true} />
      {/* Community proverb */}
      <div style={{ padding: '0 20px 14px' }}>
        <KinyarwandaProverb
          rw={t('community.proverb.rw')}
          en={t('community.proverb.en')}
        />
      </div>

      {/* Tab switcher */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
        <TabPill active={tab === 'feed'} onClick={() => setTab('feed')}>{t('community.tab.feed')}</TabPill>
        <TabPill active={tab === 'coach'} onClick={() => setTab('coach')}>{t('community.tab.coach')}</TabPill>
      </div>

      {tab === 'feed' && (
        <>
          {/* Compose ribbon */}
          <div style={{ padding: '0 20px 14px' }}>
            <Card padding={0} elev="sm" onClick={() => setComposing(true)} style={{ overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ETL.color.primary, fontWeight: 700 }}>S</div>
                <div style={{ flex: 1, ...tStyle('small'), color: ETL.color.neutral60 }}>{t('community.compose')}</div>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: ETL.color.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {Icon.plus(16, '#fff', false)}
                </div>
              </div>
              <div style={{ display: 'flex', borderTop: `1px solid ${ETL.color.neutral10}` }}>
                <ComposeChip icon={Icon.dumbbell(14, ETL.color.primary, false)} label="Workout" />
                <ComposeChip icon={Icon.bowl(14, ETL.color.secondary, false)} label="Meal" />
                <ComposeChip icon={Icon.trophy(14, '#B86E20', false)} label="Milestone" />
              </div>
            </Card>
          </div>

          <ImigongoDivider palette="light" height={8} />

          {/* Posts */}
          <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {posts.map(p => <PostCard key={p.id} post={p} onCheer={() => setPosts(ps => ps.map(x => x.id === p.id ? { ...x, cheers: x.cheers + 1, cheered: true } : x))} />)}
          </div>
        </>
      )}

      {tab === 'coach' && <CoachInbox />}

      <div style={{ height: 80 }} />
      {composing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <ComposePost 
            onClose={() => setComposing(false)} 
            onPost={(text) => { 
              setPosts(ps => [{ id: Date.now(), who: { name: 'Steffi', loc: 'Kigali', kind: 'user' }, time: 'now', kind: 'milestone', text, cheers: 0, comments: 0 }, ...ps]); 
              setComposing(false); 
            }} 
          />
        </div>
      )}
    </ScrollPage>
  );
}

export function TabPill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '10px 14px', borderRadius: 999,
      background: active ? ETL.color.primary : '#fff',
      color: active ? '#fff' : ETL.color.neutral80,
      border: `1.5px solid ${active ? ETL.color.primary : ETL.color.neutral20}`,
      fontFamily: ETL.font.family, fontSize: 13, fontWeight: 600, cursor: 'pointer',
    }}>{children}</button>
  );
}

export function ComposeChip({ icon, label }) {
  return (
    <div style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      {icon}
      <span style={{ ...tStyle('small'), color: ETL.color.neutral80, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

export function PostCard({ post, onCheer }) {
  const isCoach = post.who.kind === 'coach';
  return (
    <Card padding={0} elev="sm" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px 10px', display: 'flex', gap: 12 }}>
        <CoachAvatar size={40} kind={isCoach ? 'fitness' : 'nutrition'} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>{post.who.name}</span>
            {isCoach && <span style={{ padding: '2px 6px', borderRadius: 4, background: ETL.color.primary, color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Coach</span>}
            <span style={{ ...tStyle('small'), color: ETL.color.neutral40 }}>· {post.time}</span>
          </div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>{post.who.loc}</div>
        </div>
      </div>
      <div style={{ padding: '0 16px 12px', ...tStyle('body'), color: ETL.color.neutral, lineHeight: 1.5, fontSize: 14 }}>
        {post.text}
      </div>
      {post.stat && (
        <div style={{ margin: '0 16px 12px', padding: 12, background: ETL.color.tertiary, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          {Icon.trophy(16, ETL.color.primary, false)}
          <span style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 600 }}>{post.stat}</span>
        </div>
      )}
      {post.coachReply && (
        <div style={{ margin: '0 16px 12px', padding: 12, background: '#FFF4E6', borderRadius: 10, borderLeft: `3px solid ${ETL.color.secondary}`, display: 'flex', gap: 10 }}>
          <CoachAvatar size={28} kind="fitness" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...tStyle('overline'), color: '#B86E20', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>{post.coachReply.name} · replied</div>
            <div style={{ ...tStyle('small'), color: ETL.color.neutral80, lineHeight: 1.45 }}>{post.coachReply.text}</div>
          </div>
        </div>
      )}
      <div style={{ padding: '8px 8px 8px', display: 'flex', borderTop: `1px solid ${ETL.color.neutral10}` }}>
        <PostAction onClick={onCheer} active={post.cheered} icon="🎉" label={`${post.cheers} cheers`} />
        <PostAction icon="💬" label={`${post.comments} replies`} active={false} onClick={() => {}} />
        <PostAction icon="↗" label="Share" active={false} onClick={() => {}} />
      </div>
    </Card>
  );
}

export function PostAction({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      background: 'transparent', border: 'none', cursor: 'pointer',
      color: active ? ETL.color.primary : ETL.color.neutral60,
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ ...tStyle('small'), color: active ? ETL.color.primary : ETL.color.neutral60, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

export function CoachInbox() {
  const [thread, setThread] = React.useState(null);
  const messages = [
    { id: 1, from: 'Aline U.', role: 'Lead coach', preview: 'Great squat depth on Monday — let\'s drop weight 5%, focus form for week 2.', time: '2h', unread: true, kind: 'fitness' },
    { id: 2, from: 'Jeanne d.', role: 'Nutritionist', preview: 'Your protein is averaging 95g — try adding eggs at breakfast.', time: '1d', unread: true, kind: 'nutrition' },
    { id: 3, from: 'Aline U.', role: 'Lead coach', preview: 'Welcome! I\'ve loaded your Phase 1 plan. Ping me if anything pinches.', time: '4d', unread: false, kind: 'fitness' },
  ];
  if (thread) return <CoachThread coach={thread} onBack={() => setThread(null)} />;
  return (
    <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {messages.map(m => (
        <button key={m.id} onClick={() => setThread(m)} style={{
          padding: 14, background: '#fff', borderRadius: ETL.radius.lg, boxShadow: ETL.shadow.sm,
          border: 'none', cursor: 'pointer', textAlign: 'left',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <CoachAvatar size={44} kind={m.kind} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 2 }}>
              <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>{m.from}</div>
              <div style={{ ...tStyle('small'), color: ETL.color.neutral40 }}>{m.time}</div>
            </div>
            <div style={{ ...tStyle('overline'), color: ETL.color.primary, textTransform: 'uppercase', marginBottom: 4 }}>{m.role}</div>
            <div style={{ ...tStyle('small'), color: m.unread ? ETL.color.neutral : ETL.color.neutral60, lineHeight: 1.4, fontWeight: m.unread ? 600 : 400 }}>
              {m.preview}
            </div>
          </div>
          {m.unread && <div style={{ width: 8, height: 8, borderRadius: 4, background: ETL.color.secondary, flexShrink: 0, marginTop: 6 }} />}
        </button>
      ))}
    </div>
  );
}

export function CoachThread({ coach, onBack }) {
  const [msgs, setMsgs] = React.useState([
    { from: 'coach', text: 'Mwiriwe Steffi 👋 Saw you finished Day 12 — well done.', time: '2h' },
    { from: 'coach', text: 'Great squat depth on Monday. Let\'s drop weight 5% and focus form for week 2 — quality over quantity.', time: '2h' },
    { from: 'me', text: 'Murakoze! My knees felt good today. Should I add the hill walk?', time: '1h' },
    { from: 'coach', text: 'Yes — 20 min easy pace, breathe through the nose. I\'ll add it to your plan.', time: '12m', tagged: 'Plan updated' },
  ]);
  const [text, setText] = React.useState('');
  const send = () => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { from: 'me', text, time: 'now' }]);
    setText('');
  };
  return (
    <div style={{ padding: '0 0 20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 18, background: '#fff', border: 'none', boxShadow: ETL.shadow.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Icon.chevL(16, ETL.color.neutral, false)}</button>
        <CoachAvatar size={36} kind={coach.kind} />
        <div style={{ flex: 1 }}>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral, fontSize: 14 }}>{coach.from}</div>
          <div style={{ ...tStyle('small'), color: '#34C759', fontWeight: 600 }}>● Online</div>
        </div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%',
              padding: '10px 14px', borderRadius: 16,
              background: m.from === 'me' ? ETL.color.primary : '#fff',
              color: m.from === 'me' ? '#fff' : ETL.color.neutral,
              borderTopRightRadius: m.from === 'me' ? 4 : 16,
              borderTopLeftRadius: m.from === 'me' ? 16 : 4,
              boxShadow: m.from === 'me' ? 'none' : ETL.shadow.sm,
              ...tStyle('body'), fontSize: 14, lineHeight: 1.4,
            }}>
              {m.text}
              {m.tagged && <div style={{ marginTop: 6, padding: '4px 8px', background: ETL.color.tertiary, color: ETL.color.primary, borderRadius: 6, ...tStyle('small'), fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>✓ {m.tagged}</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message…" style={{
            flex: 1, height: 44, padding: '0 16px', borderRadius: 22,
            background: '#fff', border: `1.5px solid ${ETL.color.neutral20}`,
            fontFamily: ETL.font.family, fontSize: 14, outline: 'none',
          }} />
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: 22, background: ETL.color.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M2 21 L23 12 L2 3 V10 L17 12 L2 14 Z" /></svg>
        </button>
      </div>
    </div>
  );
}

export function ComposePost({ onClose, onPost }) {
  const [text, setText] = React.useState('');
  const [tag, setTag] = React.useState('milestone');
  const [media, setMedia] = React.useState<string | null>(null);
  const [mediaType, setMediaType] = React.useState<'image' | 'video' | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cameraInputRef = React.useRef<HTMLInputElement>(null);

  const handleMedia = (e: React.ChangeEvent<HTMLInputElement>, isCamera = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', animation: 'fadeIn 0.2s', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUpC{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      <div style={{ width: '100%', background: ETL.color.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '20px 20px 36px', animation: 'slideUpC 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ ...tStyle('h3'), color: ETL.color.neutral }}>Share with Umuryango</div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 16, background: '#fff', border: 'none', cursor: 'pointer', boxShadow: ETL.shadow.sm }}>×</button>
        </div>
        
        {/* Tag selection */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {[{ id: 'milestone', l: '🏅 Milestone' }, { id: 'workout', l: '💪 Workout' }, { id: 'meal', l: '🍲 Meal' }, { id: 'question', l: '❓ Question' }].map(t => (
            <Chip key={t.id} active={tag === t.id} onClick={() => setTag(t.id)} size="sm">{t.l}</Chip>
          ))}
        </div>

        {/* Text area */}
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Sangira umuryango · share your win, meal, or lesson with the family…"
          style={{ width: '100%', minHeight: 100, padding: 14, background: '#fff', borderRadius: 12, border: `1.5px solid ${ETL.color.neutral20}`, fontFamily: ETL.font.family, fontSize: 14, color: ETL.color.neutral, outline: 'none', boxSizing: 'border-box', resize: 'none', lineHeight: 1.5 }} />
        
        {/* Media Preview */}
        {media && (
          <div style={{ position: 'relative', marginTop: 12, borderRadius: 12, overflow: 'hidden', background: '#000', height: 200 }}>
            {mediaType === 'video' ? (
              <video src={media} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <img src={media} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <button onClick={() => setMedia(null)} style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', fontSize: 18 }}>×</button>
          </div>
        )}

        {/* Media Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14, marginBottom: 14 }}>
          <Btn kind="outlined" size="sm" icon={Icon.walk(16, ETL.color.primary)} onClick={() => cameraInputRef.current?.click()}>
            Take Photo
          </Btn>
          <Btn kind="outlined" size="sm" icon={Icon.plus(16, ETL.color.primary)} onClick={() => fileInputRef.current?.click()}>
            Upload Media
          </Btn>
        </div>

        {/* Hidden inputs */}
        <input type="file" ref={cameraInputRef} accept="image/*,video/*" capture="environment" style={{ display: 'none' }} onChange={handleMedia} />
        <input type="file" ref={fileInputRef} accept="image/*,video/*" style={{ display: 'none' }} onChange={handleMedia} />

        <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginBottom: 14 }}>
          🌿 Visible to your coaches and your ETL community.
        </div>
        <Btn full kind="primary" size="lg" onClick={() => onPost(text || 'Just finished today\'s session — feeling good 💪')}>Post to Umuryango</Btn>
      </div>
    </div>
  );
}
