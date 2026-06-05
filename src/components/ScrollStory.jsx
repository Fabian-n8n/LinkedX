/**
 * ScrollStory.jsx  —  Cinematic dark → cream → dark scroll narrative
 *
 * Desktop layout:
 *   ┌──────────────┬──────────────┬──────────────┐
 *   │ Block 0 (L)  │  PHONE VIDEO │              │  80–200 vh
 *   │              │   (sticky)   │              │
 *   │              │              │ Block 1 (R)  │  200–320 vh
 *   │ Block 2 (L)  │              │              │  320–440 vh
 *   │              │              │ Block 3 (R)  │  440–560 vh
 *   └──────────────┴──────────────┴──────────────┘
 *
 * Background: useSpring(scrollYProgress) → useTransform → DARK↔CREAM↔DARK
 * Each block: whileInView with staggered label → headline → body → stat
 * Mobile: cream bg, video at top, blocks stacked centered, whileInView entrance
 */

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

/* ─── tokens ──────────────────────────────────────────────────────────── */
const DARK  = '#07080F';
const CREAM = '#F5F1EC';
const INK   = '#0F1419';
const BLUE  = '#0A66C2';
const EASE  = [0.25, 0.1, 0.25, 1]; // easeOutCubic

/* ─── scenes ──────────────────────────────────────────────────────────── */
const scenes = [
  {
    label: 'Network Growth',
    headline: ['Your network grows', 'while you sleep.'],
    accentLine: 1,
    sub: 'LinkedX engages with key voices in your industry every single day — in your tone, without you lifting a finger. Connection requests roll in on autopilot.',
    stat: { value: '50+', label: 'new connections / month' },
    side: 'left',
  },
  {
    label: 'Impression Engine',
    headline: ['Every comment', 'is a brand impression.'],
    accentLine: 1,
    sub: 'Smart comments drive 10× more profile visits than posts alone. LinkedX places you in every relevant conversation, making your name synonymous with your industry.',
    stat: { value: '1,842', label: 'impressions per comment' },
    side: 'right',
  },
  {
    label: 'Opportunity Magnet',
    headline: ['Opportunities find you,', 'not the reverse.'],
    accentLine: 0,
    sub: 'A consistent, visible LinkedIn presence attracts recruiters, investors, and clients — without sending a single cold message. Your profile becomes inbound-only.',
    stat: { value: '$270K', label: 'recruiter outreach (SGD)' },
    side: 'left',
  },
  {
    label: 'Growth Analytics',
    headline: ['See exactly', "what's working."],
    accentLine: 1,
    sub: 'Track which comments earned impressions, which posts grew your following, and how your LinkedIn authority is climbing — all in one dashboard, week over week.',
    stat: { value: '+340%', label: 'profile view increase' },
    side: 'right',
  },
];

/* ─── reduced-motion hook ─────────────────────────────────────────────── */
function usePrefersReducedMotion() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setV(mq.matches);
    const h = (e) => setV(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return v;
}

/* ─── video ───────────────────────────────────────────────────────────── */
function ProductVideo({ reducedMotion }) {
  return (
    <video
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/linkedx-poster.jpg"
      aria-label="LinkedX LinkedIn automation demo: connections, recruiter messages, and analytics in real time"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    >
      <source src="/videos/linkedx-hero.mp4" type="video/mp4" />
    </video>
  );
}

/* ─── feature copy block ──────────────────────────────────────────────── */
/*
 * whileInView with staggered children: label → headline → body → stat
 * Slides in from its designated side (left blocks from -30px, right from +30px)
 * re-animates on scroll up/down (once: false)
 */
function SceneBlock({ scene, side, reducedMotion }) {
  const isLeft   = side === 'left';
  const isRight  = side === 'right';
  const isCenter = side === 'center';
  const dx       = isLeft ? -30 : isRight ? 30 : 0;
  const align    = isCenter ? 'center' : side;

  const sharedTextStyle = {
    fontFamily: 'Outfit, sans-serif',
    textAlign: align,
  };

  if (reducedMotion) {
    return (
      <div style={{ ...sharedTextStyle, maxWidth: isCenter ? 360 : 440, marginLeft: isRight ? 'auto' : undefined }}>
        <StaticBlock scene={scene} align={align} />
      </div>
    );
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const fromTop = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };
  const fromSide = {
    hidden: { opacity: 0, x: dx, y: isCenter ? 14 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, ease: EASE } },
  };
  const fromSideLight = {
    hidden: { opacity: 0, x: dx * 0.6, y: isCenter ? 10 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const fromBelow = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.45 }}
      style={{
        ...sharedTextStyle,
        maxWidth: isCenter ? 360 : 440,
        marginLeft: isRight ? 'auto' : isCenter ? 'auto' : undefined,
        marginRight: isCenter ? 'auto' : undefined,
      }}
    >
      {/* Eyebrow label */}
      <motion.p
        variants={fromTop}
        style={{
          fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: BLUE, marginBottom: '0.875rem',
        }}
      >
        {scene.label}
      </motion.p>

      {/* Headline */}
      <motion.h3
        variants={fromSide}
        style={{
          fontWeight: 900, color: INK, lineHeight: 0.97,
          letterSpacing: '-0.045em',
          fontSize: 'clamp(2rem, 2.7vw, 3.6rem)',
          marginBottom: '1.25rem',
        }}
      >
        {scene.headline.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {i === scene.accentLine
              ? <span style={{ color: BLUE }}>{line}</span>
              : line}
          </span>
        ))}
      </motion.h3>

      {/* Body */}
      <motion.p
        variants={fromSideLight}
        style={{
          color: '#526070', fontSize: '1rem', lineHeight: 1.78,
          marginBottom: '1.5rem',
          maxWidth: isCenter ? 340 : 380,
          marginLeft:  isCenter ? 'auto' : 0,
          marginRight: isCenter ? 'auto' : 0,
        }}
      >
        {scene.sub}
      </motion.p>

      {/* Stat */}
      <motion.div
        variants={fromBelow}
        style={{
          display: 'flex', alignItems: 'baseline', gap: '0.5rem',
          justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
        }}
      >
        <span style={{
          fontSize: '3rem', fontWeight: 900, color: BLUE,
          lineHeight: 1, letterSpacing: '-0.04em',
        }}>
          {scene.stat.value}
        </span>
        <span style={{ fontSize: '0.875rem', color: '#8A9AAA' }}>
          {scene.stat.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* plain fallback used when reducedMotion = true */
function StaticBlock({ scene, align }) {
  const isCenter = align === 'center';
  const isRight  = align === 'right';
  return (
    <>
      <p style={{ fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '0.875rem' }}>
        {scene.label}
      </p>
      <h3 style={{ fontWeight: 900, color: INK, lineHeight: 0.97, letterSpacing: '-0.045em', fontSize: 'clamp(2rem, 2.7vw, 3.6rem)', marginBottom: '1.25rem' }}>
        {scene.headline.map((line, i) => (
          <span key={i}>{i > 0 && <br />}{i === scene.accentLine ? <span style={{ color: BLUE }}>{line}</span> : line}</span>
        ))}
      </h3>
      <p style={{ color: '#526070', fontSize: '1rem', lineHeight: 1.78, marginBottom: '1.5rem', maxWidth: isCenter ? 340 : 380, marginLeft: isCenter ? 'auto' : 0, marginRight: isCenter ? 'auto' : 0 }}>
        {scene.sub}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start' }}>
        <span style={{ fontSize: '3rem', fontWeight: 900, color: BLUE, lineHeight: 1, letterSpacing: '-0.04em' }}>{scene.stat.value}</span>
        <span style={{ fontSize: '0.875rem', color: '#8A9AAA' }}>{scene.stat.label}</span>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MOBILE  (lg:hidden)
   Cream bg with static gradient edges. Video at top. Blocks stacked,
   each with its own whileInView entrance.
════════════════════════════════════════════════════════════════════════ */
function MobileScrollStory({ reducedMotion }) {
  return (
    <section
      className="lg:hidden"
      style={{ position: 'relative', backgroundColor: CREAM, overflow: 'hidden' }}
    >
      {/* ── top fade: DARK → CREAM ── */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '14vh',
        background: `linear-gradient(to bottom, ${DARK} 0%, ${CREAM} 100%)`,
        zIndex: 4, pointerEvents: 'none',
      }} />

      {/* ── video ── */}
      <div style={{ padding: '16vh 24px 32px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            maxWidth: 280, margin: '0 auto',
            borderRadius: 20, overflow: 'hidden',
            aspectRatio: '9 / 16',
            boxShadow: '0 24px 64px rgba(15,20,25,0.22), 0 0 0 1px rgba(15,20,25,0.07)',
          }}
        >
          <ProductVideo reducedMotion={reducedMotion} />
        </motion.div>
      </div>

      {/* ── feature blocks ── */}
      <div style={{ padding: '0 28px', position: 'relative', zIndex: 1 }}>
        {scenes.map((scene, i) => (
          <div
            key={i}
            style={{ paddingBottom: i < scenes.length - 1 ? '14vw' : '18vh' }}
          >
            <SceneBlock scene={scene} side="center" reducedMotion={reducedMotion} />
          </div>
        ))}
      </div>

      {/* ── bottom fade: CREAM → DARK ── */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '14vh',
        background: `linear-gradient(to bottom, ${CREAM} 0%, ${DARK} 100%)`,
        zIndex: 4, pointerEvents: 'none',
      }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DESKTOP  (hidden lg:block)

   Section height: 740 vh
   Scroll distance: 740 - 100 (viewport) = 640 vh  →  progress 0 → 1

   Background keyframes (smoothP):
     0.000 → 0.125  :  DARK  → CREAM   (80 vh scroll)
     0.125 → 0.875  :  CREAM
     0.875 → 1.000  :  CREAM → DARK    (80 vh scroll)

   3-column grid  |  minmax(0,1fr)  |  290 px  |  minmax(0,1fr)  |
   Each side column sums to 740 vh exactly.
   Center column: phone div with  position:sticky  top:50%  translateY(-50%)

   Feature block centers (progress):
     Block 0  140 vh / 640 = 0.219
     Block 1  260 vh / 640 = 0.406
     Block 2  380 vh / 640 = 0.594
     Block 3  500 vh / 640 = 0.781   (all comfortably inside cream zone)
════════════════════════════════════════════════════════════════════════ */
function DesktopScrollStory({ reducedMotion }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  /* Spring-smoothed progress drives background morphing */
  const smoothP = useSpring(scrollYProgress, {
    stiffness: 80,
    damping:   20,
    restDelta: 0.001,
  });

  /* Background color: DARK → CREAM → DARK */
  const bgColor = useTransform(
    smoothP,
    [0, 0.125, 0.875, 1.0],
    [DARK, CREAM, CREAM, DARK],
  );

  return (
    <div className="hidden lg:block">
      <motion.section
        ref={ref}
        style={{
          position: 'relative',
          height: '740vh',
          backgroundColor: bgColor,
          willChange: 'background-color',
        }}
      >
        {/* ── 3-column grid ── */}
        <div
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            padding: '0 72px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 290px minmax(0, 1fr)',
            columnGap: 56,
          }}
        >

          {/* ══ LEFT column: blocks 0, 2 ══ */}
          <div>
            {/* top buffer — dark-to-cream transition lives here */}
            <div style={{ height: '80vh' }} />

            {/* Block 0 — Network Growth */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[0]} side="left" reducedMotion={reducedMotion} />
            </div>

            {/* Spacer aligns with Block 1 zone */}
            <div style={{ height: '120vh' }} />

            {/* Block 2 — Opportunity Magnet */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[2]} side="left" reducedMotion={reducedMotion} />
            </div>

            {/* Spacer aligns with Block 3 zone + cream-to-dark transition */}
            <div style={{ height: '120vh' }} />

            {/* bottom buffer */}
            <div style={{ height: '180vh' }} />
          </div>

          {/* ══ CENTER column: sticky phone video ══ */}
          <div>
            <div
              style={{
                position: 'sticky',
                top: '50%',
                transform: 'translateY(-50%)',
                /* height is set by aspect-ratio + width of this 290px column */
                height: 'clamp(360px, 43vh, 500px)',
                aspectRatio: '9 / 16',
                borderRadius: 24,
                overflow: 'hidden',
                zIndex: 10,
                boxShadow: [
                  '0 32px 80px rgba(15,20,25,0.22)',
                  '0 0 0 1px rgba(15,20,25,0.08)',
                ].join(', '),
                willChange: 'transform',
              }}
            >
              <ProductVideo reducedMotion={reducedMotion} />
            </div>
          </div>

          {/* ══ RIGHT column: blocks 1, 3 ══ */}
          <div>
            {/* top buffer */}
            <div style={{ height: '80vh' }} />

            {/* Spacer aligns with Block 0 zone */}
            <div style={{ height: '120vh' }} />

            {/* Block 1 — Impression Engine */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[1]} side="right" reducedMotion={reducedMotion} />
            </div>

            {/* Spacer aligns with Block 2 zone */}
            <div style={{ height: '120vh' }} />

            {/* Block 3 — Growth Analytics */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[3]} side="right" reducedMotion={reducedMotion} />
            </div>

            {/* bottom buffer */}
            <div style={{ height: '180vh' }} />
          </div>

        </div>
      </motion.section>
    </div>
  );
}

/* ─── export ──────────────────────────────────────────────────────────── */
export default function ScrollStory() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <>
      <MobileScrollStory  reducedMotion={reducedMotion} />
      <DesktopScrollStory reducedMotion={reducedMotion} />
    </>
  );
}
