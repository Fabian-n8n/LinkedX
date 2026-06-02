/**
 * ScrollStory.jsx
 *
 * Two completely separate render trees — one per breakpoint:
 *   • MobileScrollStory  (< lg / < 1024 px) — auto-cycling phone + animated scene text
 *   • DesktopScrollStory (≥ lg / ≥ 1024 px) — 400 vh sticky scroll, unchanged
 *
 * Mobile view has zero sticky-scroll mechanics.
 */

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

/* ══════════════════════════════════════════════════════
   iOS Status-bar icons (iPhone 15 Pro style)
══════════════════════════════════════════════════════ */
function SignalBars() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="#000">
      <rect x="0"    y="8.5" width="3" height="3.5" rx="0.9" />
      <rect x="4.5"  y="5.5" width="3" height="6.5" rx="0.9" />
      <rect x="9"    y="2.5" width="3" height="9.5" rx="0.9" />
      <rect x="13.5" y="0"   width="3" height="12"  rx="0.9" opacity="0.28" />
    </svg>
  );
}

function WiFiWaves() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <circle cx="8" cy="11.2" r="1.5" fill="#000" />
      <path d="M4.4 7.8a5.1 5.1 0 0 1 7.2 0"
        stroke="#000" strokeWidth="1.45" strokeLinecap="round" />
      <path d="M1.2 4.8A9.9 9.9 0 0 1 14.8 4.8"
        stroke="#000" strokeWidth="1.45" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5"
        stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
      <rect x="2" y="2" width="16.5" height="9" rx="2" fill="#000" />
      <path d="M24.5 4.5v4a2.3 1.9 0 0 0 0-4z" fill="#000" fillOpacity="0.42" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   Realistic iPhone 15 Pro frame
══════════════════════════════════════════════════════ */
function PhoneFrame({ children, scale = 1 }) {
  const phoneWidth = 300;
  const phoneHeight = 612;

  return (
    <div
      className="relative"
      style={{ width: phoneWidth * scale, height: phoneHeight * scale }}
    >
      <div style={{ width: phoneWidth, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      {/* Ambient blue glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-40px',
          background: 'radial-gradient(ellipse at 50% 55%, rgba(10,102,194,0.28) 0%, transparent 65%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Outer titanium chassis */}
      <div
        style={{
          width: 300,
          height: 612,
          borderRadius: 54,
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(158deg, #4A4744 0%, #302D2B 30%, #1A1816 60%, #272422 100%)',
          boxShadow: [
            '0 60px 120px rgba(0,0,0,0.92)',
            '0 0 0 0.6px rgba(255,255,255,0.22)',
            'inset 0 0 0 0.6px rgba(255,255,255,0.07)',
          ].join(', '),
        }}
      >
        {/* Titanium sheen overlay */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: 54,
            pointerEvents: 'none', zIndex: 2,
            background: 'linear-gradient(155deg, rgba(255,255,255,0.11) 0%, transparent 38%, transparent 62%, rgba(255,255,255,0.06) 100%)',
          }}
        />

        {/* Screen glass inset (9 px all around) */}
        <div
          style={{
            position: 'absolute',
            top: 9, left: 9, right: 9, bottom: 9,
            borderRadius: 46,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.14)',
            zIndex: 3,
          }}
        >
          {/* iOS Status bar */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 44,
              zIndex: 20,
              display: 'flex',
              alignItems: 'flex-end',
              paddingBottom: 7,
              paddingLeft: 20,
              paddingRight: 15,
              background: '#fff',
              pointerEvents: 'none',
            }}
          >
            <span style={{
              fontSize: 12, fontWeight: 760, letterSpacing: '-0.025em',
              color: '#000', lineHeight: 1, flex: 1,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              9:41
            </span>
            {/* Dynamic Island */}
            <div style={{
              position: 'absolute', top: 9, left: '50%',
              transform: 'translateX(-50%)',
              width: 90, height: 26, background: '#000', borderRadius: 20, zIndex: 5,
              boxShadow: '0 0 0 1.5px rgba(0,0,0,0.5)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <SignalBars />
              <WiFiWaves />
              <BatteryIcon />
            </div>
          </div>

          {/* Screen content */}
          <div style={{ position: 'absolute', top: 44, left: 0, right: 0, bottom: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={children?.key ?? 0}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ height: '100%' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 6, left: '50%',
            transform: 'translateX(-50%)',
            width: 100, height: 4,
            background: 'rgba(0,0,0,0.18)', borderRadius: 2,
            zIndex: 10, pointerEvents: 'none',
          }} />
        </div>

        {/* Physical buttons — left */}
        {[
          { top: 74, h: 22 },   /* Action   */
          { top: 114, h: 36 },  /* Vol up   */
          { top: 160, h: 36 },  /* Vol down */
        ].map(({ top, h }, i) => (
          <div key={i} style={{
            position: 'absolute', left: -4.5, top, width: 4, height: h,
            background: 'linear-gradient(90deg, #181614, #3E3B38)',
            borderRadius: '3px 0 0 3px',
            boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.08)',
            zIndex: 4,
          }} />
        ))}

        {/* Physical button — right (power) */}
        <div style={{
          position: 'absolute', right: -4.5, top: 128, width: 4, height: 56,
          background: 'linear-gradient(270deg, #181614, #3E3B38)',
          borderRadius: '0 3px 3px 0',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.08)',
          zIndex: 4,
        }} />
      </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LinkedIn phone screens  (light mode, 282 × 559 px)
══════════════════════════════════════════════════════ */

function ScreenNotifications() {
  const items = [
    { avatar: 'AP', bg: '#4f46e5', name: 'Alexandru Pricopie', text: 'wants to connect with you', time: '2m', dot: true },
    { avatar: 'FL', bg: '#0A66C2', name: 'Felix Lee', text: 'mentioned you in a comment with 16 reactions', time: '2h', dot: false },
    { avatar: 'MP', bg: '#065f46', name: 'MAJI PETER', text: 'and 1 other liked your comment', time: '49m', dot: false },
    { avatar: 'KA', bg: '#b91c1c', name: 'Kiran Aftab', text: 'and 2,896 others reacted to your post', time: '49m', dot: false },
    { avatar: 'VL', bg: '#6d28d9', name: 'Varick Lim', text: "reacted to Sherry Jiang's post: 300+ builders", time: '3h', dot: false },
  ];
  return (
    <div style={{ background: '#F3F2EF', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: '#000' }}>Notifications</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 16, height: 16, background: '#e2e2e2', borderRadius: 2 }} />
            <div style={{ width: 16, height: 16, background: '#e2e2e2', borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['All', 'My posts', 'Mentions'].map((t, i) => (
            <span key={t} style={{ fontSize: 9.5, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: i === 0 ? '#000' : 'transparent', color: i === 0 ? '#fff' : '#555', border: i === 0 ? 'none' : '1px solid #ccc' }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {items.map((n, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '9px 14px', borderBottom: '1px solid rgba(0,0,0,0.05)', background: n.dot ? 'rgba(10,102,194,0.05)' : '#fff' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>{n.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9.5, color: '#333', lineHeight: 1.45, margin: '0 0 2px' }}>
                <span style={{ fontWeight: 700, color: '#000' }}>{n.name}</span>
                {' '}{n.text}
              </p>
              <div style={{ fontSize: 8.5, color: '#0A66C2' }}>{n.time} ago</div>
            </div>
            {n.dot && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0A66C2', flexShrink: 0, marginTop: 5 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenImpression() {
  return (
    <div style={{ background: '#F3F2EF', height: '100%', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ background: '#fff', padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 16, height: 16, background: '#e2e2e2', borderRadius: 100 }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: '#000' }}>Notifications</span>
      </div>
      <div style={{ margin: '10px', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EEF3FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 5-6 4 4" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>Comment Performance</div>
            <div style={{ fontSize: 8.5, color: '#666' }}>LinkedIn Analytics</div>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, color: '#333', lineHeight: 1.5, margin: 0 }}>Your comment has gained</p>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#0A66C2', margin: '2px 0', lineHeight: 1 }}>1,842 <span style={{ fontSize: 13, fontWeight: 600 }}>impressions</span></p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40, marginBottom: 10 }}>
          {[30, 45, 38, 55, 60, 72, 68, 85, 90, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 9 ? '#0A66C2' : `rgba(10,102,194,${0.15 + i * 0.08})`, borderRadius: '2px 2px 0 0' }} />
          ))}
        </div>
        <div style={{ background: '#F3F2EF', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
          <p style={{ fontSize: 8.5, color: '#555', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
            "Appreciate the focus on usability for everyday folks; curious how your audio experiments changed interaction patterns..."
          </p>
        </div>
        <div style={{ fontSize: 8.5, color: '#666' }}>56 minutes ago</div>
      </div>
      <div style={{ margin: '0 10px', background: '#fff', borderRadius: 10, padding: '10px 14px', opacity: 0.5, border: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff' }}>AP</div>
          <p style={{ fontSize: 9, color: '#333', margin: 0 }}>Alexandru Pricopie wants to connect</p>
        </div>
      </div>
    </div>
  );
}

function ScreenRecruiter() {
  return (
    <div style={{ background: '#F3F2EF', height: '100%', fontFamily: 'Outfit, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#fff', padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 800, fontSize: 13, color: '#000' }}>Messaging</span>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '10px 14px', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #e11d48, #be185d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>SC</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', background: '#22c55e', border: '1.5px solid #fff' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#000' }}>Samantha Carter</span>
                <span style={{ fontSize: 7, background: '#E8A01B', color: '#000', borderRadius: 3, padding: '1px 4px', fontWeight: 700 }}>IN RECRUITER</span>
              </div>
              <span style={{ fontSize: 8.5, color: '#666' }}>7:16 PM</span>
            </div>
            <p style={{ fontSize: 9, color: '#555', margin: 0, lineHeight: 1.4 }}>Hi — I'm managing a confidential search for a <strong>Lead AI PM</strong> role...</p>
          </div>
        </div>
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            "Hi Fabian, I'm managing a confidential search for a <strong>Lead AI Product Manager</strong> for Advance Intelligence Group.",
            'The role offers a <strong style="color:#0A66C2">$200K–$270K SGD</strong> package + equity. Your profile stood out — interested?',
          ].map((msg, i) => (
            <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ background: '#fff', borderRadius: '0 12px 12px 12px', padding: '8px 10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: 9, color: '#000', margin: 0, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: msg }} />
              </div>
            </div>
          ))}
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '8px 12px', background: '#fff', borderRadius: '0 12px 12px 12px', border: '1px solid rgba(0,0,0,0.06)' }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#999' }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, background: '#F3F2EF', borderRadius: 100, padding: '6px 12px', fontSize: 9, color: '#999' }}>Write a message...</div>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
        </div>
      </div>
    </div>
  );
}

function ScreenAnalytics() {
  const weeks = [12, 19, 15, 28, 22, 35, 31, 42, 48];
  return (
    <div style={{ background: '#F3F2EF', height: '100%', fontFamily: 'Outfit, sans-serif', overflow: 'hidden' }}>
      <div style={{ background: '#fff', padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <span style={{ fontWeight: 800, fontSize: 13, color: '#000' }}>Analytics</span>
        <span style={{ fontSize: 9, color: '#555', display: 'block', marginTop: 1 }}>Private to you</span>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <p style={{ fontSize: 9, color: '#555', margin: 0 }}>Profile views</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#000', margin: '2px 0', lineHeight: 1 }}>48</p>
              <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 700 }}>↑ +340% this week</span>
            </div>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#EEF3FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#0A66C2" strokeWidth="2"/></svg>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
            {weeks.map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${(v / 48) * 100}%`, background: i === weeks.length - 1 ? '#0A66C2' : `rgba(10,102,194,${0.1 + i * 0.1})`, borderRadius: '2px 2px 0 0' }} />
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 9, color: '#555', margin: 0 }}>Post impressions</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#000', margin: '2px 0', lineHeight: 1 }}>1,842</p>
            </div>
            <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 700 }}>↑ +127%</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { label: 'Search appearances', value: '12', color: '#0A66C2' },
            { label: 'New followers', value: '+24', color: '#22c55e' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: 8, color: '#555', margin: 0 }}>{label}</p>
              <p style={{ fontSize: 16, fontWeight: 900, color, margin: '3px 0 0', lineHeight: 1 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <span style={{ fontSize: 9, color: '#0A66C2', fontWeight: 600 }}>View all analytics →</span>
        </div>
      </div>
    </div>
  );
}

/* ── Static arrays (shared between both render trees) ───────────────────── */
const phoneScreens = [
  <ScreenNotifications key="notif" />,
  <ScreenImpression   key="impression" />,
  <ScreenRecruiter    key="recruiter" />,
  <ScreenAnalytics    key="analytics" />,
];

const scenes = [
  {
    side: 'left',
    label: 'Network Growth',
    headline: ['Your network grows', 'while you sleep.'],
    accentLine: 1,
    sub: 'LinkedX engages with key voices in your industry every single day — in your tone, without you lifting a finger. Connection requests roll in on autopilot.',
    stat: { value: '50+', label: 'new connections/month' },
  },
  {
    side: 'right',
    label: 'Impression Engine',
    headline: ['Every comment is', 'a brand impression.'],
    accentLine: 1,
    sub: 'Smart comments drive 10× more profile visits than posts alone. LinkedX places you in every relevant conversation, making your name synonymous with your industry.',
    stat: { value: '1,842', label: 'impressions per comment' },
  },
  {
    side: 'left',
    label: 'Opportunity Magnet',
    headline: ['Opportunities find you,', 'not the reverse.'],
    accentLine: 0,
    sub: 'A consistent, visible LinkedIn presence attracts recruiters, investors, and clients — without sending a single cold message. Your profile becomes inbound-only.',
    stat: { value: '$270K', label: 'recruiter outreach (SGD)' },
  },
  {
    side: 'right',
    label: 'Growth Analytics',
    headline: ['See exactly', "what's working."],
    accentLine: 1,
    sub: 'Track which comments earned impressions, which posts grew your following, and how your LinkedIn authority is climbing — all in one dashboard, week over week.',
    stat: { value: '+340%', label: 'profile view increase' },
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   MOBILE render tree  (lg:hidden)
   — Simple auto-cycling phone + animated scene text.
   — No sticky, no 400 vh, no scroll-driven hooks.
══════════════════════════════════════════════════════════════════════════ */
function MobileScrollStory() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Auto-advance every 3.8 s, pause when user manually picks a scene */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % scenes.length), 3800);
    return () => clearInterval(t);
  }, [paused]);

  const scene = scenes[active];

  return (
    <section className="lg:hidden py-20 px-5 bg-[#07080F] relative overflow-hidden">
      {/* Multi-layer mobile glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '36%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 420, height: 300,
          borderRadius: '50%',
          background: 'rgba(10,102,194,0.28)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', top: '34%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 240, height: 180,
          borderRadius: '50%',
          background: 'rgba(14,118,210,0.36)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '32%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 110, height: 80,
          borderRadius: '50%',
          background: 'rgba(96,180,248,0.42)',
          filter: 'blur(18px)',
        }} />
      </div>

      {/* Phone — centered and intentionally oversized for the outcome story. */}
      <div className="flex justify-center mb-8 relative z-10">
        <PhoneFrame scale={1.05}>{phoneScreens[active]}</PhoneFrame>
      </div>

      {/* Scene indicator dots */}
      <div className="flex justify-center gap-2.5 mb-8 relative z-10">
        {scenes.map((_, i) => (
          <button
            key={i}
            aria-label={`Scene ${i + 1}`}
            onClick={() => { setActive(i); setPaused(true); }}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 24 : 8,
              background: i === active ? '#1E86D4' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Animated scene text */}
      <div className="relative z-10 max-w-sm mx-auto text-center" style={{ minHeight: 270 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <p className="section-label mb-3">{scene.label}</p>

            <h3
              className="font-black text-white leading-[0.98] tracking-[-0.04em] mb-5"
              style={{ fontSize: 'clamp(2.25rem, 10vw, 3.25rem)' }}
            >
              {scene.headline.map((line, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  {i === scene.accentLine
                    ? <span className="text-gradient-accent">{line}</span>
                    : line}
                </span>
              ))}
            </h3>

            <p className="text-white/50 text-base leading-[1.75] mb-6 px-1">
              {scene.sub}
            </p>

            <div className="flex items-baseline justify-center gap-2">
              <span
                className="font-black text-[#1E86D4] tracking-[-0.03em]"
                style={{ fontSize: '2.8rem' }}
              >
                {scene.stat.value}
              </span>
              <span className="text-white/40 text-base">{scene.stat.label}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DESKTOP render tree  (hidden lg:block)
   — 400 vh sticky scroll with oversized outcome text and phone visuals.
══════════════════════════════════════════════════════════════════════════ */

/* Scene text block — desktop only */
function SceneText({ scene, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="section-label mb-4">{scene.label}</p>
      <h3
        className="font-black text-white leading-[0.98] tracking-[-0.045em] mb-5"
        style={{ fontSize: 'clamp(2.2rem, 3.2vw, 4rem)' }}
      >
        {scene.headline.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {i === scene.accentLine
              ? <span className="text-gradient-accent">{line}</span>
              : line}
          </span>
        ))}
      </h3>
      <p
        className="text-white/55 text-base leading-[1.75] mb-6 max-w-[380px]"
        style={{ marginLeft: align === 'right' ? 'auto' : 0 }}
      >
        {scene.sub}
      </p>
      <div
        className="inline-flex items-baseline gap-2"
        style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}
      >
        <span className="font-black text-[#1E86D4] tracking-[-0.035em]" style={{ fontSize: '3rem', lineHeight: 1 }}>
          {scene.stat.value}
        </span>
        <span className="text-white/40 text-sm">{scene.stat.label}</span>
      </div>
    </div>
  );
}

function DesktopScrollStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const [activeScene, setActiveScene] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveScene(Math.min(3, Math.floor(v * 4)));
  });

  /* Per-scene opacity + translate */
  const s0Op = useTransform(scrollYProgress, [0, 0.04, 0.21, 0.25], [0, 1, 1, 0]);
  const s0X  = useTransform(scrollYProgress, [0, 0.04], [-28, 0]);
  const s1Op = useTransform(scrollYProgress, [0.25, 0.29, 0.46, 0.5], [0, 1, 1, 0]);
  const s1X  = useTransform(scrollYProgress, [0.25, 0.29], [28, 0]);
  const s2Op = useTransform(scrollYProgress, [0.5, 0.54, 0.71, 0.75], [0, 1, 1, 0]);
  const s2X  = useTransform(scrollYProgress, [0.5, 0.54], [-28, 0]);
  const s3Op = useTransform(scrollYProgress, [0.75, 0.79, 0.96, 1], [0, 1, 1, 0]);
  const s3X  = useTransform(scrollYProgress, [0.75, 0.79], [28, 0]);

  /* Progress-dot fill values */
  const dot0 = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const dot1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const dot2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const dot3 = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const dotProgresses = [dot0, dot1, dot2, dot3];

  return (
    /* hidden on mobile — only enters layout on lg (1024 px +) */
    <div className="hidden lg:block">
      <section ref={ref} style={{ height: '400vh' }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#07080F]">

          {/* Multi-layer blue glow — centered on phone visual position */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Layer 1: Wide ambient — large, heavily blurred, sets the room tone */}
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 60px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 860,
              height: 560,
              borderRadius: '50%',
              background: 'rgba(10,102,194,0.28)',
              filter: 'blur(110px)',
            }} />
            {/* Layer 2: Mid bloom — tighter, brighter core cloud */}
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 50px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 480,
              height: 320,
              borderRadius: '50%',
              background: 'rgba(14,118,210,0.38)',
              filter: 'blur(60px)',
            }} />
            {/* Layer 3: Specular core — tight bright center */}
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 38px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 200,
              height: 140,
              borderRadius: '50%',
              background: 'rgba(96,180,248,0.45)',
              filter: 'blur(28px)',
            }} />
          </div>

          <div className="w-full max-w-[1500px] mx-auto px-10">
            {/* 3-column grid: left text | phone | right text */}
            <div
              className="grid items-center"
              style={{ gridTemplateColumns: 'minmax(0, 1fr) 440px minmax(0, 1fr)', gap: '40px' }}
            >
              {/* LEFT column */}
              <div className="relative" style={{ height: 560 }}>
                <motion.div style={{ opacity: s0Op, x: s0X, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                  <SceneText scene={scenes[0]} align="left" />
                </motion.div>
                <motion.div style={{ opacity: s2Op, x: s2X, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                  <SceneText scene={scenes[2]} align="left" />
                </motion.div>
              </div>

              {/* CENTER: Phone — shifted down so top chassis is visible, bottom clips */}
              <div className="flex flex-col items-center gap-4" style={{ transform: 'translateY(60px)' }}>
                <PhoneFrame scale={1.45}>
                  {phoneScreens[activeScene]}
                </PhoneFrame>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {scenes.map((_, i) => (
                    <div
                      key={i}
                      className="relative h-1 rounded-full overflow-hidden"
                      style={{
                        width: i === activeScene ? 28 : 12,
                        background: 'rgba(255,255,255,0.12)',
                        transition: 'width 0.3s ease',
                      }}
                    >
                      {i === activeScene && (
                        <motion.div
                          key={activeScene}
                          className="absolute inset-0 rounded-full bg-[#1E86D4]"
                          style={{ scaleX: dotProgresses[i], originX: 0 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT column */}
              <div className="relative" style={{ height: 560 }}>
                <motion.div style={{ opacity: s1Op, x: s1X, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                  <SceneText scene={scenes[1]} align="right" />
                </motion.div>
                <motion.div style={{ opacity: s3Op, x: s3X, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                  <SceneText scene={scenes[3]} align="right" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Default export — renders mobile section then desktop section.
   CSS visibility classes ensure only one is in the layout at any breakpoint.
══════════════════════════════════════════════════════════════════════════ */
export default function ScrollStory() {
  return (
    <>
      <MobileScrollStory />
      <DesktopScrollStory />
    </>
  );
}
