/**
 * ScrollStory.jsx — Full-bleed video background with floating glass text cards
 *
 * Desktop:
 *   Video is position:sticky, fills 100 vh, object-fit:cover → bleeds edge-to-edge.
 *   Dark-gradient overlays at top + bottom blend it into the surrounding dark sections.
 *   4 glass frosted-card text blocks scroll over the video in a zigzag (L, R, L, R).
 *   Each card uses whileInView + staggered children (label → headline → body → stat).
 *
 * Mobile:
 *   Cream bg, video at top (natural flow), blocks stacked + centered below.
 */

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── tokens ──────────────────────────────────────────────────────────── */
const DARK  = '#07080F';
const CREAM = '#F5F1EC';
const INK   = '#0F1419';
const BLUE  = '#0A66C2';
const EASE  = [0.25, 0.1, 0.25, 1];

/* ─── scene data ─────────────────────────────────────────────────────── */
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

/* ─── glass card text block ───────────────────────────────────────────── */
/*
 * Framer whileInView triggers the container variant; children stagger in order:
 *   1. eyebrow label  (slides from top, 0ms)
 *   2. headline       (slides from its side, 100ms delay)
 *   3. body copy      (softer slide, 200ms delay)
 *   4. stat number    (rises from below, 300ms delay)
 *
 * The card itself fades + slides from its side as the container entrance.
 */
function SceneBlock({ scene, side, reducedMotion }) {
  const isLeft   = side === 'left';
  const isRight  = side === 'right';
  const isCenter = side === 'center';
  const dx       = isLeft ? -40 : isRight ? 40 : 0;
  const textAlign = isCenter ? 'center' : side;

  const container = {
    hidden: { opacity: 0, x: isCenter ? 0 : dx * 0.6, y: isCenter ? 16 : 0 },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: { duration: 0.65, ease: EASE, staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const fromTop = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };
  const fromSide = {
    hidden: { opacity: 0, x: isCenter ? 0 : dx * 0.8, y: isCenter ? 12 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const fromSideBody = {
    hidden: { opacity: 0, x: isCenter ? 0 : dx * 0.45, y: isCenter ? 8 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  const fromBelow = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  /* ── glass card styles (desktop) / plain text (mobile center) ── */
  const cardStyle = isCenter
    ? { maxWidth: 360, margin: '0 auto' }
    : {
        maxWidth: 460,
        marginLeft: isRight ? 'auto' : 0,
        background: 'rgba(245, 241, 236, 0.86)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderRadius: 20,
        padding: '36px 44px',
        border: '1px solid rgba(255,255,255,0.68)',
        boxShadow: [
          '0 8px 48px rgba(15,20,25,0.13)',
          '0 2px 8px rgba(15,20,25,0.06)',
          'inset 0 1px 0 rgba(255,255,255,0.85)',
        ].join(', '),
      };

  return (
    <motion.div
      variants={reducedMotion ? undefined : container}
      initial={reducedMotion ? undefined : 'hidden'}
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      style={cardStyle}
    >
      {/* eyebrow */}
      <motion.p
        variants={reducedMotion ? undefined : fromTop}
        style={{
          fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: BLUE, marginBottom: '0.75rem',
          fontFamily: 'Outfit, sans-serif', textAlign,
        }}
      >
        {scene.label}
      </motion.p>

      {/* headline */}
      <motion.h3
        variants={reducedMotion ? undefined : fromSide}
        style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: INK,
          lineHeight: 0.97, letterSpacing: '-0.045em',
          fontSize: 'clamp(1.75rem, 2.2vw, 3rem)',
          marginBottom: '1rem', textAlign,
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

      {/* body */}
      <motion.p
        variants={reducedMotion ? undefined : fromSideBody}
        style={{
          color: '#4D5A68', fontSize: '0.875rem', lineHeight: 1.78,
          marginBottom: '1.25rem', textAlign,
          marginLeft: isCenter ? 'auto' : 0,
          marginRight: isCenter ? 'auto' : 0,
        }}
      >
        {scene.sub}
      </motion.p>

      {/* stat */}
      <motion.div
        variants={reducedMotion ? undefined : fromBelow}
        style={{
          display: 'flex', alignItems: 'baseline', gap: '0.4rem',
          justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
        }}
      >
        <span style={{
          fontSize: '2.75rem', fontWeight: 900, color: BLUE,
          lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'Outfit, sans-serif',
        }}>
          {scene.stat.value}
        </span>
        <span style={{ fontSize: '0.8rem', color: '#8A9AAA' }}>
          {scene.stat.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MOBILE  (lg:hidden)
   Cream section: video at top (natural flow, full-width), blocks stacked.
════════════════════════════════════════════════════════════════════════ */
function MobileScrollStory({ reducedMotion }) {
  return (
    <section
      className="lg:hidden"
      style={{ position: 'relative', backgroundColor: CREAM, overflow: 'hidden' }}
    >
      {/* top: DARK → CREAM */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '13vh',
        background: `linear-gradient(to bottom, ${DARK}, ${CREAM})`,
        zIndex: 4, pointerEvents: 'none',
      }} />

      {/* full-width video */}
      <div style={{ padding: '14vh 0 0', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            width: '100%', aspectRatio: '16/9',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(15,20,25,0.18)',
          }}
        >
          <video
            autoPlay={!reducedMotion}
            muted loop playsInline preload="metadata"
            poster="/images/linkedx-poster.jpg"
            aria-label="LinkedX LinkedIn automation demo"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src="/videos/linkedx-hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* feature blocks */}
      <div style={{ padding: '48px 28px 0', position: 'relative', zIndex: 1 }}>
        {scenes.map((scene, i) => (
          <div key={i} style={{ paddingBottom: i < scenes.length - 1 ? '12vw' : '16vh' }}>
            <SceneBlock scene={scene} side="center" reducedMotion={reducedMotion} />
          </div>
        ))}
      </div>

      {/* bottom: CREAM → DARK */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '13vh',
        background: `linear-gradient(to bottom, ${CREAM}, ${DARK})`,
        zIndex: 4, pointerEvents: 'none',
      }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DESKTOP  (hidden lg:block)

   Section is 740 vh tall.
   ┌─ sticky video layer (100 vh, z-index 0) ─────────────────────────┐
   │  video: width 100%, height 100%, object-fit: cover               │
   │  gradient overlay top:   DARK → transparent  (blends with hero)  │
   │  gradient overlay bottom:transparent → DARK  (blends with next)  │
   │  radial vignette: softens edges for cinematic feel               │
   └──────────────────────────────────────────────────────────────────┘
   ┌─ content layer (740 vh, margin-top: -100vh, z-index 2) ──────────┐
   │  80 vh  top spacer       (dark-gradient area, no text)           │
   │  120 vh  Block 0 LEFT   ← glass card slides in from left         │
   │  120 vh  Block 1 RIGHT  → glass card slides in from right        │
   │  120 vh  Block 2 LEFT   ← glass card slides in from left         │
   │  120 vh  Block 3 RIGHT  → glass card slides in from right        │
   │  180 vh  bottom spacer   (dark-gradient area, no text)           │
   └──────────────────────────────────────────────────────────────────┘
════════════════════════════════════════════════════════════════════════ */
function DesktopScrollStory({ reducedMotion }) {
  return (
    <div className="hidden lg:block">
      <section style={{ position: 'relative', height: '740vh', backgroundColor: DARK }}>

        {/* ── LAYER 0: sticky full-bleed video ── */}
        <div
          aria-hidden
          style={{
            position: 'sticky', top: 0, height: '100vh',
            zIndex: 0, overflow: 'hidden',
          }}
        >
          <video
            autoPlay={!reducedMotion}
            muted loop playsInline preload="metadata"
            poster="/images/linkedx-poster.jpg"
            aria-label="LinkedX LinkedIn automation demo: connections, recruiter messages, and analytics in real time"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/videos/linkedx-hero.mp4" type="video/mp4" />
          </video>

          {/* top gradient — blends from hero dark into the video */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: `linear-gradient(to bottom,
              ${DARK} 0%,
              rgba(7,8,15,0.6) 12%,
              rgba(7,8,15,0.0) 30%,
              rgba(7,8,15,0.0) 70%,
              rgba(7,8,15,0.6) 88%,
              ${DARK} 100%
            )`,
          }} />

          {/* radial edge vignette — softens sides for cinematic depth */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: `radial-gradient(ellipse 80% 90% at 50% 50%,
              transparent 50%,
              rgba(7,8,15,0.35) 100%
            )`,
          }} />
        </div>

        {/* ── LAYER 2: scrollable glass text cards ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: '-100vh',   /* pulls content up over the sticky video */
            height: '740vh',
          }}
        >
          {/* 80 vh top buffer — transitions from hero, no text */}
          <div style={{ height: '80vh' }} />

          {/* feature zones — padding keeps cards away from extreme edges */}
          <div style={{ padding: '0 72px' }}>

            {/* Block 0 — Network Growth — LEFT */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[0]} side="left" reducedMotion={reducedMotion} />
            </div>

            {/* Block 1 — Impression Engine — RIGHT */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[1]} side="right" reducedMotion={reducedMotion} />
            </div>

            {/* Block 2 — Opportunity Magnet — LEFT */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[2]} side="left" reducedMotion={reducedMotion} />
            </div>

            {/* Block 3 — Growth Analytics — RIGHT */}
            <div style={{ height: '120vh', display: 'flex', alignItems: 'center' }}>
              <SceneBlock scene={scenes[3]} side="right" reducedMotion={reducedMotion} />
            </div>

          </div>

          {/* 180 vh bottom buffer — transitions back to dark, no text */}
          <div style={{ height: '180vh' }} />
        </div>

      </section>
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
