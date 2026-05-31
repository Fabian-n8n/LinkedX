import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Star, TrendingUp, UserPlus,
  MessageCircle, Heart, ChevronDown,
} from 'lucide-react';

/* ── LinkedIn "in" inline badge ─────────────────────────────────────────── */
function InBadge() {
  return (
    <span
      className="inline-flex items-center justify-center align-middle rounded-[5px] bg-[#0A66C2]"
      style={{ width: '0.8em', height: '0.8em', verticalAlign: 'middle', position: 'relative', top: '-0.06em', margin: '0 0.1em' }}
    >
      <span className="text-white font-black leading-none" style={{ fontSize: '0.5em' }}>in</span>
    </span>
  );
}

/* ── LinkedIn dark-mode profile (inside MacBook screen) ─────────────────── */
function LinkedInScreen() {
  return (
    <div style={{ background: '#1B1F23', height: '100%', fontFamily: 'Outfit, sans-serif', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* Nav bar */}
      <div style={{ background: '#1B1F23', borderBottom: '1px solid rgba(255,255,255,0.09)', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ color: '#0A66C2', fontWeight: 900, fontSize: 18, lineHeight: 1 }}>in</span>
        <div style={{ flex: 1, background: '#2D3748', borderRadius: 4, height: 22, display: 'flex', alignItems: 'center', paddingLeft: 8, maxWidth: 130 }}>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 8 }}>🔍 Search</span>
        </div>
        <div style={{ display: 'flex', gap: 14, marginLeft: 8 }}>
          {[{ label: 'Home' }, { label: 'Network' }, { label: 'Jobs' }, { label: 'Messaging' }, { label: 'Notifications', dot: true }].map(({ label, dot }) => (
            <div key={label} style={{ textAlign: 'center', opacity: label === 'Home' ? 1 : 0.45, position: 'relative' }}>
              <div style={{ width: 18, height: 14, background: 'rgba(255,255,255,0.18)', borderRadius: 2, margin: '0 auto 2px' }} />
              <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)' }}>{label}</div>
              {dot && <div style={{ position: 'absolute', top: 0, right: 2, width: 5, height: 5, borderRadius: '50%', background: '#CC1016' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Body: two-column layout */}
      <div style={{ display: 'flex', gap: 8, padding: '8px 10px', flex: 1, overflow: 'hidden' }}>

        {/* Left: profile card */}
        <div style={{ width: 170, flexShrink: 0 }}>
          <div style={{ background: '#1E2530', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Cover */}
            <div style={{ height: 42, background: 'linear-gradient(135deg, #083C6A 0%, #1057A1 50%, #2D7DD2 100%)', position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: -14, left: 10,
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0A66C2, #7c3aed)',
                border: '2px solid #1E2530',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 900, fontSize: 7
              }}>FW</div>
            </div>
            <div style={{ padding: '18px 10px 10px' }}>
              <div style={{ fontWeight: 700, fontSize: 9, color: 'white' }}>Fabian Wong</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', marginTop: 1, lineHeight: 1.4 }}>Product Engineer · AI × Design</div>
              <div style={{ fontSize: 7, color: '#60b4f8', marginTop: 2 }}>500+ connections</div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 7, paddingTop: 7 }}>
                <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Analytics</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)' }}>Profile views</span>
                  <span style={{ fontSize: 6.5, color: '#60b4f8', fontWeight: 700 }}>48</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)' }}>Post views</span>
                  <span style={{ fontSize: 6.5, color: '#60b4f8', fontWeight: 700 }}>2.4K</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)' }}>Impressions</span>
                  <span style={{ fontSize: 6.5, color: '#4ade80', fontWeight: 700 }}>1,842</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: feed */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>

          {/* Post card 1 */}
          <div style={{ background: '#1E2530', borderRadius: 8, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg, #0A66C2, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5.5, fontWeight: 900, color: 'white', flexShrink: 0 }}>FW</div>
              <div>
                <div style={{ fontSize: 7.5, fontWeight: 700, color: 'white' }}>Fabian Wong</div>
                <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.3)' }}>3d · 🌐</div>
              </div>
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
              Prompts are becoming the new components. They're no longer just inputs; they're design decisions that shape entire products...
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 5, paddingTop: 5, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 6.5, color: 'rgba(255,255,255,0.3)' }}>
              <span>👍 251 reactions</span>
              <span>50 comments</span>
            </div>
          </div>

          {/* Post card 2 */}
          <div style={{ background: '#1E2530', borderRadius: 8, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg, #065f46, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5.5, fontWeight: 900, color: 'white', flexShrink: 0 }}>FL</div>
              <div>
                <div style={{ fontSize: 7.5, fontWeight: 700, color: 'white' }}>Felix Lee</div>
                <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.3)' }}>2h · 🌐</div>
              </div>
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
              I made a 6-panel comic explaining a design workflow. Zero prompt eng. Zero Figma. Zero touch-ups. One Claude session...
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 5, paddingTop: 5, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 6.5, color: 'rgba(255,255,255,0.3)' }}>
              <span>❤️ 16 reactions</span>
              <span>12 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MacBook front-facing frame ─────────────────────────────────────────── */
function MacBook({ children }) {
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 520 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[#0A66C2]/20 blur-3xl rounded-full scale-75 translate-y-8 pointer-events-none -z-10" />

      {/* Screen lid */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#1A1B20',
          padding: '10px 10px 0',
          boxShadow:
            '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Webcam */}
        <div className="flex justify-center mb-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#2A2B30', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }} />
        </div>
        {/* Screen */}
        <div className="rounded-t-md overflow-hidden" style={{ height: 300 }}>
          {children}
        </div>
      </div>

      {/* Hinge / base top */}
      <div style={{ height: 16, background: 'linear-gradient(to bottom, #2A2B30, #1C1D22)', borderRadius: '0 0 2px 2px', margin: '0 -4px' }} />

      {/* Keyboard body */}
      <div
        className="rounded-b-2xl"
        style={{
          height: 28,
          background: 'linear-gradient(to bottom, #1C1D22, #141519)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Trackpad notch */}
        <div style={{ width: 80, height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 4 }} />
      </div>

      {/* Bottom foot shadow */}
      <div className="mx-8 mt-0.5 h-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.4)' }} />
    </div>
  );
}

/* ── Floating notification card ─────────────────────────────────────────── */
function NotifCard({ icon: Icon, iconBg, children, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${className}`}
      style={{
        background: 'rgba(11,13,24,0.92)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
      </div>
      <div className="text-sm font-medium text-white leading-snug">{children}</div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Individual card animations tied to scroll */
  const c1Opacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const c1X      = useTransform(scrollYProgress, [0.05, 0.22], [-36, 0]);

  const c2Opacity = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const c2X      = useTransform(scrollYProgress, [0.22, 0.42], [40, 0]);

  const c3Opacity = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);
  const c3X      = useTransform(scrollYProgress, [0.42, 0.62], [40, 0]);

  const c4Opacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
  const c4X      = useTransform(scrollYProgress, [0.62, 0.82], [40, 0]);

  /* Laptop subtle float animation */
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    /* Section is 190vh — sticky inner stays pinned while user scrolls through it */
    <section ref={sectionRef} style={{ height: '190vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A66C2]/30 to-transparent" />
          <div className="absolute top-0 right-0 w-[800px] h-[700px] bg-[#0A66C2]/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#0A66C2]/06 blur-3xl rounded-full -translate-x-1/3 translate-y-1/4" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: copy ───────────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#1E86D4] animate-pulse" />
              <span className="text-[#1E86D4] text-xs font-bold tracking-[0.14em] uppercase">
                AI-Powered · LinkedIn Automation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white leading-[1.03] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)' }}
            >
              Show up on<InBadge />LinkedIn
              <br />
              every day.
              <br />
              <span className="text-white/22">Without writing</span>
              <br />
              <span className="text-white/22">every day.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/55 text-lg leading-[1.7] mb-10 max-w-[450px]"
            >
              AI that drafts posts in your voice, comments on the right people, and builds your network in the background.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 bg-white text-[#07080F] font-bold text-sm px-7 py-4 rounded-full hover:bg-white/88 transition-all duration-200"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
              >
                <Zap className="w-4 h-4" />
                Claim Early Access
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.12] text-white font-medium text-sm px-7 py-4 rounded-full hover:bg-white/[0.09] hover:border-white/[0.2] transition-all duration-200"
              >
                <ArrowRight className="w-4 h-4" />
                See How It Works
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[{ init: 'FW', bg: '#0A66C2' }, { init: 'AP', bg: '#7c3aed' }, { init: 'JL', bg: '#b91c1c' }, { init: 'IT', bg: '#065f46' }].map(({ init, bg }) => (
                    <div key={init} className="w-8 h-8 rounded-full border-2 border-[#07080F] flex items-center justify-center text-white text-[9px] font-bold" style={{ background: bg }}>{init}</div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">340+ on waitlist</div>
                  <div className="text-white/35 text-xs">Founders · PMs · Creators</div>
                </div>
              </div>
              <div className="h-8 w-px bg-white/[0.1] hidden sm:block" />
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <div className="text-white/35 text-xs">Top tier quality · 5/5</div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: MacBook + floating notification cards ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
            style={{ padding: '60px 120px 60px 60px' }}
          >
            {/* MacBook with subtle parallax */}
            <motion.div style={{ y: laptopY }} className="w-full">
              <MacBook>
                <LinkedInScreen />
              </MacBook>
            </motion.div>

            {/* ── Notification card 1: Impressions — LEFT ──────────── */}
            <motion.div
              style={{ opacity: c1Opacity, x: c1X }}
              className="absolute left-0 top-1/2 -translate-y-1/2"
            >
              <NotifCard icon={TrendingUp} iconBg="rgba(10,102,194,0.9)">
                <span>Your post got{' '}
                  <strong className="text-[#60b4f8]">1,842 impressions</strong>
                </span>
              </NotifCard>
            </motion.div>

            {/* ── Notification card 2: Connection — TOP RIGHT ───────── */}
            <motion.div
              style={{ opacity: c2Opacity, x: c2X }}
              className="absolute -right-4 top-8"
            >
              <NotifCard icon={UserPlus} iconBg="rgba(79,70,229,0.9)">
                <span>
                  <strong>Alexandru Pricopie</strong>
                  <br />
                  <span className="text-white/50 text-xs">wants to connect</span>
                </span>
              </NotifCard>
            </motion.div>

            {/* ── Notification card 3: Recruiter — RIGHT MIDDLE ────── */}
            <motion.div
              style={{ opacity: c3Opacity, x: c3X }}
              className="absolute -right-4 top-1/2 -translate-y-1/2"
            >
              <NotifCard icon={MessageCircle} iconBg="rgba(190,24,93,0.9)">
                <span>
                  <strong>Samantha Carter</strong>{' '}
                  <span className="text-white/60 text-xs">sent you a message about</span>
                  <br />
                  <span className="text-white/60 text-xs">a Lead AI Product Manager role</span>
                </span>
              </NotifCard>
            </motion.div>

            {/* ── Notification card 4: Reactions — BOTTOM RIGHT ─────── */}
            <motion.div
              style={{ opacity: c4Opacity, x: c4X }}
              className="absolute -right-4 bottom-8"
            >
              <NotifCard icon={Heart} iconBg="rgba(185,28,28,0.9)">
                <span>
                  <strong>Kiran Aftab</strong>
                  {' '}<span className="text-white/50 text-xs">and</span>{' '}
                  <strong className="text-[#fb923c]">2,896 others</strong>
                  <br />
                  <span className="text-white/50 text-xs">reacted to your post</span>
                </span>
              </NotifCard>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll hint — visible only at top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ opacity: 0.35 }}
        >
          <span className="text-white text-[10px] tracking-widest uppercase font-semibold">Scroll to see it work</span>
          <ChevronDown className="w-4 h-4 text-white animate-bounce" />
        </motion.div>

        {/* Bottom page fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#07080F] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
