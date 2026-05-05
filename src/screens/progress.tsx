import React from 'react';
import { ETL, tStyle } from '../constants/tokens';
import { useT } from '../i18n/index';
import { Icon, RewardBadge } from '../components/art/index';
import { BrandedWaterBottle, SupplementJar, ImigongoCorner, MuraSeal } from '../components/art/rw';
import { ScreenHeader, ScrollPage, SectionTitle, Card, Btn, ProgressBar, Pill } from '../components/ui/index';

// Me screen — progress + profile + metrics + billing + shop.

export function MeScreen({ user, onNav }) {
  const t = useT();
  const [booking, setBooking] = React.useState(null);
  const [booked, setBooked] = React.useState(false);
  const [showBilling, setShowBilling] = React.useState(false);
  const [showShop, setShowShop] = React.useState(false);
  const [shopStep, setShopStep] = React.useState('browse'); // browse, checkout, success
  const [billingStep, setBillingStep] = React.useState('overview'); // overview, pay, success
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [pickupLoc, setPickupLoc] = React.useState('Remera');

  const phases = [
    { n: 1, key: 'phase.1', state: 'active', sub: 'Day 12 / 28', stat: '8 sessions · 4kg lighter mindset' },
    { n: 2, key: 'phase.2', state: 'locked', sub: '4 weeks', stat: 'Strength + moderate cardio' },
    { n: 3, key: 'phase.3', state: 'locked', sub: '4 weeks', stat: 'Splits · interval cardio' },
    { n: 4, key: 'phase.4', state: 'locked', sub: '4 weeks', stat: 'Maintenance + habit lock-in' },
  ];

  const pickupOptions = [
    { id: 'Remera', label: 'Remera Branch' },
    { id: 'Kimihurura', label: 'Kimihurura Branch' },
    { id: 'Gacuriro', label: 'Gacuriro Branch' },
    { id: 'Metz', label: 'Steffi Metz Gourmet Shop' },
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
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={() => onNav('notifications')} style={{
              width: 44, height: 44, borderRadius: 22, background: '#fff', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              position: 'relative', boxShadow: ETL.shadow.sm
            }}>
              {Icon.bell(24, ETL.color.neutral, false)}
              <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, background: ETL.color.secondary, border: '2px solid #fff' }}/>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Actions Grid */}
      <div style={{ padding: '0 20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card padding={16} elev="md" onClick={() => setShowBilling(true)} style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer', background: ETL.color.tertiary }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icon.check(20, ETL.color.primary)}
          </div>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>Billing</div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Manage subscription</div>
        </Card>
        <Card padding={16} elev="md" onClick={() => setShowShop(true)} style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icon.plus(20, ETL.color.primary)}
          </div>
          <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>Shop</div>
          <div style={{ ...tStyle('small'), color: ETL.color.neutral60 }}>Merchandise</div>
        </Card>
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

      <div style={{ height: 120 }} />

      {/* Billing Drawer */}
      {showBilling && (
        <Overlay onClose={() => { setShowBilling(false); setBillingStep('overview'); }}>
          <div style={{ ...tStyle('h2'), marginBottom: 8 }}>ETL Premium</div>
          <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginBottom: 24 }}>Manage your Body Reset subscription.</div>
          
          {billingStep === 'overview' && (
            <>
              <Card padding={16} elev="sm" style={{ marginBottom: 20, border: `1px solid ${ETL.color.tertiaryDeep}` }}>
                <div style={{ ...tStyle('overline'), color: ETL.color.primary, marginBottom: 4 }}>Current Plan</div>
                <div style={{ ...tStyle('h3'), marginBottom: 4 }}>Body Reset · Phase 1</div>
                <div style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>Next billing date: June 12, 2024</div>
                <div style={{ marginTop: 12, ...tStyle('h4'), color: ETL.color.primary }}>45,000 RWF / month</div>
              </Card>
              <Btn full kind="primary" size="lg" onClick={() => setBillingStep('pay')}>Pay Now (Simulated)</Btn>
              <Btn full kind="ghost" style={{ marginTop: 8 }} onClick={() => setShowBilling(false)}>Close</Btn>
            </>
          )}

          {billingStep === 'pay' && (
            <div style={{ animation: 'fadeIn 0.3s' }}>
              <div style={{ ...tStyle('h4'), marginBottom: 16 }}>Select Payment Method</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <PaymentRow icon="📱" label="Mobile Money" />
                <PaymentRow icon="💳" label="Credit / Debit Card" selected />
              </div>
              <Card padding={16} elev="none" bg={ETL.color.surface} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>Plan amount</span>
                  <span style={{ ...tStyle('h4') }}>45,000 RWF</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>Tax</span>
                  <span style={{ ...tStyle('h4') }}>0 RWF</span>
                </div>
              </Card>
              <Btn full kind="primary" size="lg" onClick={() => { 
                setBillingStep('success');
                setTimeout(() => { setShowBilling(false); setBillingStep('overview'); }, 2000);
              }}>Pay 45,000 RWF</Btn>
            </div>
          )}

          {billingStep === 'success' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scaleIn 0.4s' }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                {Icon.check(40, ETL.color.primary)}
              </div>
              <div style={{ ...tStyle('h2') }}>Payment Successful!</div>
              <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginTop: 8 }}>Your Body Reset access is active.</div>
            </div>
          )}
        </Overlay>
      )}

      {/* Shop Drawer */}
      {showShop && (
        <Overlay onClose={() => { setShowShop(false); setShopStep('browse'); }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ ...tStyle('h2') }}>{shopStep === 'browse' ? 'ETL Shop' : 'Checkout'}</div>
            {shopStep !== 'browse' && shopStep !== 'success' && <Btn kind="ghost" size="sm" onClick={() => setShopStep('browse')}>Back</Btn>}
          </div>

          {shopStep === 'browse' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ ...tStyle('body'), color: ETL.color.neutral60 }}>Branded gear for your reset. Pickup at any ETL branch.</div>
              <ShopProduct 
                icon={<BrandedWaterBottle size={100} />} 
                name="ETL Glass Water Bottle" 
                price="15,000 RWF" 
                onAdd={() => { setSelectedProduct('Water Bottle'); setShopStep('checkout'); }}
              />
              <ShopProduct 
                icon={<SupplementJar size={100} />} 
                name="ETL Recovery Supps" 
                price="45,000 RWF" 
                onAdd={() => { setSelectedProduct('Supplements'); setShopStep('checkout'); }}
              />
            </div>
          )}

          {shopStep === 'checkout' && (
            <div style={{ animation: 'fadeIn 0.3s' }}>
              <Card padding={16} elev="sm" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 60, height: 60, background: ETL.color.surface, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedProduct === 'Water Bottle' ? <BrandedWaterBottle size={44} /> : <SupplementJar size={44} />}
                </div>
                <div>
                  <div style={{ ...tStyle('h4') }}>{selectedProduct}</div>
                  <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 700 }}>{selectedProduct === 'Water Bottle' ? '15,000' : '45,000'} RWF</div>
                </div>
              </Card>

              <div style={{ ...tStyle('h4'), marginBottom: 12 }}>Choose Pickup Location</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {pickupOptions.map(loc => (
                  <button 
                    key={loc.id} 
                    onClick={() => setPickupLoc(loc.id)}
                    style={{
                      padding: '14px 18px', textAlign: 'left', borderRadius: 12,
                      background: pickupLoc === loc.id ? ETL.color.tertiary : '#fff',
                      border: `1.5px solid ${pickupLoc === loc.id ? ETL.color.primary : ETL.color.neutral10}`,
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ ...tStyle('body'), fontWeight: pickupLoc === loc.id ? 600 : 400 }}>{loc.label}</span>
                    {pickupLoc === loc.id && Icon.check(16, ETL.color.primary)}
                  </button>
                ))}
              </div>

              <div style={{ ...tStyle('small'), color: ETL.color.neutral60, marginBottom: 24, fontStyle: 'italic' }}>
                Note: We do not deliver. Please show your confirmation code at the pickup location.
              </div>

              <Btn full kind="primary" size="lg" onClick={() => setShopStep('success')}>Confirm Order</Btn>
            </div>
          )}

          {shopStep === 'success' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scaleIn 0.4s' }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, background: ETL.color.tertiary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                {Icon.check(40, ETL.color.primary)}
              </div>
              <div style={{ ...tStyle('h2') }}>Order Ready!</div>
              <div style={{ ...tStyle('body'), color: ETL.color.neutral60, marginTop: 8, marginBottom: 24 }}>
                Pickup your {selectedProduct} at <strong>{pickupOptions.find(o => o.id === pickupLoc)?.label}</strong>.
              </div>
              <Card padding={16} elev="none" bg={ETL.color.tertiary} style={{ marginBottom: 24 }}>
                <div style={{ ...tStyle('overline'), color: ETL.color.primary }}>Pickup Code</div>
                <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 4, color: ETL.color.primary, marginTop: 4 }}>ETL-9942</div>
              </Card>
              <Btn full kind="primary" onClick={() => { setShowShop(false); setShopStep('browse'); }}>Done</Btn>
            </div>
          )}
        </Overlay>
      )}

      {/* Booking Modal (Preserved from original) */}
      {booking && (
        <Overlay onClose={() => setBooking(null)}>
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
                  <Btn key={tm} kind="outlined" size="sm" onClick={() => {}}>{tm}</Btn>
                ))}
              </div>
              <Btn full kind="primary" size="lg" onClick={() => setBooked(true)}>Confirm Booking</Btn>
            </>
          )}
        </Overlay>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </ScrollPage>
  );
}

// Sub-components

function Overlay({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0 }} />
      <div style={{ width: '100%', background: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: '28px 24px 48px', position: 'relative', animation: 'slideUp 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)' }}>
        <div style={{ width: 40, height: 4, background: ETL.color.neutral10, borderRadius: 2, margin: '-12px auto 20px' }} />
        {children}
      </div>
    </div>
  );
}

function PaymentRow({ icon, label, selected = false }) {
  return (
    <div style={{
      padding: 16, borderRadius: 16, border: `1.5px solid ${selected ? ETL.color.primary : ETL.color.neutral10}`,
      background: selected ? ETL.color.tertiary : '#fff',
      display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer'
    }}>
      <div style={{ fontSize: 24 }}>{icon}</div>
      <div style={{ flex: 1, ...tStyle('h4'), color: ETL.color.neutral }}>{label}</div>
      <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${selected ? ETL.color.primary : ETL.color.neutral20}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selected && <div style={{ width: 10, height: 10, borderRadius: 5, background: ETL.color.primary }} />}
      </div>
    </div>
  );
}

function ShopProduct({ icon, name, price, onAdd }) {
  return (
    <Card padding={16} elev="sm" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 80, height: 80, background: ETL.color.surface, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ ...tStyle('h4'), color: ETL.color.neutral }}>{name}</div>
        <div style={{ ...tStyle('small'), color: ETL.color.primary, fontWeight: 700, marginTop: 4 }}>{price}</div>
      </div>
      <Btn kind="primary" size="sm" onClick={onAdd}>Buy</Btn>
    </Card>
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
