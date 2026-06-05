/**
 * ScrollStory.jsx
 *
 * Light cream section (#F5F1EC) with smooth gradient transitions from/to dark.
 * Desktop: video sticky left, 4 feature copy blocks scroll-driven on right.
 * Mobile:  video fixed at top, auto-cycling text below.
 * Respects prefers-reduced-motion (shows poster, pauses autoPlay).
 */

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

const CREAM = '#F5F1EC';
const INK   = '#0F1419';
const BLUE  = '#0A66C2';
const DARK  = '#07080F';

/* ══════════════════════════════════════════════════════
   Reduced-motion hook
══════════════════════════════════════════════════════ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ══════════════════════════════════════════════════════
   Scene data — copy exactly as specified
══════════════════════════════════════════════════════ */
const scenes = [
  {
    label: 'Network Growth',
    headline: ['Your network grows', 'while you sleep.'],
    accentLine: 1,
    sub: 'LinkedX engages with key voices in your industry every single day — in your tone, without you lifting a finger. Connection requests roll in on autopilot.',
    stat: { value: '50+', label: 'new connections/month' },
  },
  {
    label: 'Impression Engine',
    headline: ['Every comment', 'is a brand impression.'],
    accentLine: 1,
    sub: 'Smart comments drive 10× more profile visits than posts alone. LinkedX places you in every relevant conversation, making your name synonymous with your industry.',
    stat: { value: '1,842', label: 'impressions per comment' },
  },
  {
    label: 'Opportunity Magnet',
    headline: ['Opportunities find you,', 'not the reverse.'],
    accentLine: 0,
    sub: 'A consistent, visible LinkedIn presence attracts recruiters, investors, and clients — without sending a single cold message. Your profile becomes inbound-only.',
    stat: { value: '$270K', label: 'recruiter outreach (SGD)' },
  },
  {
    label: 'Growth Analytics',
    headline: ['See exactly', "what's working."],
    accentLine: 1,
    sub: 'Track which comments earned impressions, which posts grew your following, and how your LinkedIn authority is climbing — all in one dashboard, week over week.',
    stat: { value: '+340%', label: 'profile view increase' },
  },
];

/* ══════════════════════════════════════════════════════
   Video player component
══════════════════════════════════════════════════════ */
function ProductVideo({ reducedMotion, style = {} }) {
  return (
    <video
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      poster="/images/linkedx-poster.jpg"
      aria-label="LinkedX LinkedIn automation product demo: connection requests, recruiter messages, and post analytics flowing in real time"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        ...style,
      }}
    >
      <source src="/videos/linkedx-hero.mp4" type="video/mp4" />
    </video>
  );
}

/* ══════════════════════════════════════════════════════
   Scene text block — cream/light theme
══════════════════════════════════════════════════════ */
function SceneText({ scene, align = 'left' }) {
  const isCenter = align === 'center';
  const isRight  = align === 'right';

  return (
    <div style={{ textAlign: align }}>
      {/* Label */}
      <p style={{
        fontSize: '0.65rem',
        fontWeight: 800,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: BLUE,
        marginBottom: '0.875rem',
        fontFamily: 'Outfit, sans-serif',
      }}>
        {scene.label}
      </p>

      {/* Headline */}
      <h3 style={{
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 900,
        color: INK,
        lineHeight: 0.98,
        letterSpacing: '-0.045em',
        fontSize: 'clamp(2.2rem, 3.2vw, 4rem)',
        marginBottom: '1.25rem',
      }}>
        {scene.headline.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {i === scene.accentLine
              ? <span style={{ color: BLUE }}>{line}</span>
              : line}
          </span>
        ))}
      </h3>

      {/* Body */}
      <p style={{
        color: '#526070',
        fontSize: '1rem',
        lineHeight: 1.75,
        marginBottom: '1.5rem',
        maxWidth: isCenter ? '34ch' : 380,
        marginLeft:  isRight  ? 'auto' : isCenter ? 'auto' : 0,
        marginRight: isCenter ? 'auto' : 0,
      }}>
        {scene.sub}
      </p>

      {/* Stat */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        justifyContent: isRight ? 'flex-end' : isCenter ? 'center' : 'flex-start',
      }}>
        <span style={{
          fontSize: '3rem',
          fontWeight: 900,
          color: BLUE,
          lineHeight: 1,
          letterSpacing: '-0.035em',
          fontFamily: 'Outfit, sans-serif',
        }}>
          {scene.stat.value}
        </span>
        <span style={{ fontSize: '0.875rem', color: '#8A9AAA' }}>
          {scene.stat.label}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOBILE render tree  (lg:hidden)
   Video at top, auto-cycling feature text below. No sticky scroll.
══════════════════════════════════════════════════════════════════════════ */
function MobileScrollStory({ reducedMotion }) {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % scenes.length), 3800);
    return () => clearInterval(t);
  }, [paused]);

  const scene = scenes[active];

  return (
    <section
      className="lg:hidden"
      style={{ backgroundColor: CREAM, position: 'relative', overflow: 'hidden' }}
    >
      {/* Top gradient: dark → cream */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to bottom, ${DARK} 0%, ${CREAM} 100%)`,
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Video */}
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 20px 28px' }}>
        <div style={{
          maxWidth: 320,
          margin: '0 auto',
          borderRadius: 20,
          overflow: 'hidden',
          aspectRatio: '9 / 16',
          boxShadow: '0 24px 64px rgba(15,20,25,0.22), 0 0 0 1px rgba(15,20,25,0.07)',
        }}>
          <ProductVideo reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* Scene dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24, position: 'relative', zIndex: 1 }}>
        {scenes.map((s, i) => (
          <button
            key={i}
            aria-label={`Feature ${i + 1}: ${s.label}`}
            onClick={() => { setActive(i); setPaused(true); }}
            style={{
              height: 4, width: i === active ? 24 : 8, borderRadius: 100,
              background: i === active ? BLUE : 'rgba(15,20,25,0.18)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Animated scene text */}
      <div style={{ padding: '0 24px 96px', position: 'relative', zIndex: 1, minHeight: 260 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <SceneText scene={scene} align="center" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom gradient: cream → dark */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to bottom, ${CREAM} 0%, ${DARK} 100%)`,
        zIndex: 2, pointerEvents: 'none',
      }} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DESKTOP render tree  (hidden lg:block)
   400 vh sticky scroll — video pinned left, 4 feature blocks right.
══════════════════════════════════════════════════════════════════════════ */
function DesktopScrollStory({ reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const [activeScene, setActiveScene] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveScene(Math.min(3, Math.floor(v * 4)));
  });

  /* Per-scene opacity + upward entrance */
  const s0Op = useTransform(scrollYProgress, [0,    0.04, 0.21, 0.25], [0, 1, 1, 0]);
  const s0Y  = useTransform(scrollYProgress, [0,    0.04],              [20, 0]);
  const s1Op = useTransform(scrollYProgress, [0.25, 0.29, 0.46, 0.5],  [0, 1, 1, 0]);
  const s1Y  = useTransform(scrollYProgress, [0.25, 0.29],              [20, 0]);
  const s2Op = useTransform(scrollYProgress, [0.5,  0.54, 0.71, 0.75], [0, 1, 1, 0]);
  const s2Y  = useTransform(scrollYProgress, [0.5,  0.54],              [20, 0]);
  const s3Op = useTransform(scrollYProgress, [0.75, 0.79, 0.96, 1],    [0, 1, 1, 0]);
  const s3Y  = useTransform(scrollYProgress, [0.75, 0.79],              [20, 0]);

  const sceneAnims = [
    { op: s0Op, y: s0Y },
    { op: s1Op, y: s1Y },
    { op: s2Op, y: s2Y },
    { op: s3Op, y: s3Y },
  ];

  return (
    <div className="hidden lg:block">
      <section
        ref={ref}
        style={{ height: '400vh', position: 'relative', backgroundColor: CREAM }}
      >
        {/* Top gradient transition: dark → cream */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 100, zIndex: 4,
          background: `linear-gradient(to bottom, ${DARK} 0%, ${CREAM} 100%)`,
          pointerEvents: 'none',
        }} />

        {/* Sticky viewport */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: '100vh', backgroundColor: CREAM }}
        >
          <div
            className="h-full flex items-center mx-auto px-12"
            style={{ maxWidth: 1400, position: 'relative', zIndex: 1 }}
          >
            <div
              className="grid w-full items-center"
              style={{ gridTemplateColumns: '1fr 1fr', gap: '5vw' }}
            >
              {/* LEFT: Sticky video */}
              <div className="flex justify-center items-center">
                <div style={{
                  height: 'clamp(400px, 70vh, 680px)',
                  aspectRatio: '9 / 16',
                  borderRadius: 28,
                  overflow: 'hidden',
                  boxShadow: [
                    '0 40px 96px rgba(15,20,25,0.20)',
                    '0 0 0 1px rgba(15,20,25,0.07)',
                  ].join(', '),
                }}>
                  <ProductVideo reducedMotion={reducedMotion} />
                </div>
              </div>

              {/* RIGHT: Scroll-driven text blocks */}
              <div style={{ position: 'relative', height: 480 }}>
                {scenes.map((scene, i) => (
                  <motion.div
                    key={i}
                    style={{
                      opacity: sceneAnims[i].op,
                      y: sceneAnims[i].y,
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <SceneText scene={scene} align="left" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{
            position: 'absolute', bottom: 32, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 8, zIndex: 2,
          }}>
            {scenes.map((_, i) => (
              <div
                key={i}
                style={{
                  height: 4, borderRadius: 100,
                  width: i === activeScene ? 28 : 12,
                  background: i === activeScene ? BLUE : 'rgba(15,20,25,0.18)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom gradient transition: cream → dark */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, zIndex: 4,
          background: `linear-gradient(to bottom, ${CREAM} 0%, ${DARK} 100%)`,
          pointerEvents: 'none',
        }} />
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Export
══════════════════════════════════════════════════════════════════════════ */
export default function ScrollStory() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <>
      <MobileScrollStory  reducedMotion={reducedMotion} />
      <DesktopScrollStory reducedMotion={reducedMotion} />
    </>
  );
}
