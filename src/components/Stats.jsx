import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

/* ── Count-up hook ──────────────────────────────────────────────────────── */
function useCountUp(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

/* ── Stats data ─────────────────────────────────────────────────────────── */
const stats = [
  { value: 10,   suffix: '×', label: 'Faster LinkedIn growth',    sub: 'vs. manual engagement' },
  { value: 1842, suffix: '+', label: 'Avg comment impressions',   sub: 'per targeted comment' },
  { value: 50,   suffix: '+', label: 'New connections/month',     sub: 'from automated activity' },
  { value: 3,    suffix: '×', label: 'More profile views',        sub: 'in your first 30 days' },
];

/* ── Testimonials data ───────────────────────────────────────────────────── */
const testimonials = [
  {
    quote: "The moment I started using LinkedX, recruiters started sliding into my DMs. A $270K job offer came through within weeks. My profile does the work — I just show up.",
    name: 'Fabian Wong',
    role: 'Product Engineer · AI × Design Systems',
    initials: 'FW',
    avatarBg: 'linear-gradient(135deg, #0A66C2, #7c3aed)',
    stars: 5,
  },
  {
    quote: "I was completely shocked. As a financial consultant, I thought LinkedIn was just for job seekers. Three weeks into LinkedX and I had 5 inbound calls from CFOs and investment directors. My calendar is fuller than it's ever been — and I haven't sent a single cold message.",
    name: 'Ivan Thiang',
    role: 'Financial Consultant · Wealth & Investment Advisory',
    initials: 'IT',
    avatarBg: 'linear-gradient(135deg, #065f46, #0A66C2)',
    stars: 5,
  },
];

/* ── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({ stat, inView }) {
  const count = useCountUp(stat.value, 1800, inView);
  return (
    <div className="text-center">
      <div
        className="font-black text-[#0F1419] tracking-[-0.04em] leading-none mb-3"
        style={{ fontSize: 'clamp(2.1rem, 7vw, 4.5rem)' }}
      >
        <span className="text-gradient-accent">{count.toLocaleString()}</span>
        <span className="text-[#1E86D4]">{stat.suffix}</span>
      </div>
      <div className="font-semibold text-[#0F1419]/80 text-base mb-1">{stat.label}</div>
      <div className="text-[#0F1419]/45 text-sm">{stat.sub}</div>
    </div>
  );
}

/* ── Testimonial carousel ────────────────────────────────────────────────── */
const SLIDE_DURATION = 5500; // ms per slide

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = (idx, dir) => {
    setDirection(dir);
    setActive((idx + testimonials.length) % testimonials.length);
  };

  const next = () => go(active + 1, 1);
  const prev = () => go(active - 1, -1);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setActive((a) => (a + 1) % testimonials.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [active, paused]);

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.97 }),
  };

  const t = testimonials[active];

  return (
    <div
      className="mt-20 max-w-2xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-accent p-5 sm:p-8 rounded-2xl text-center relative"
          >
            {/* Large decorative quote mark */}
            <Quote
              className="absolute top-5 left-6 w-8 h-8 opacity-[0.12]"
              style={{ color: '#1E86D4' }}
            />
            <Quote
              className="absolute bottom-5 right-6 w-8 h-8 opacity-[0.12] rotate-180"
              style={{ color: '#1E86D4' }}
            />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array(t.stars).fill(0).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-amber-400">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-[#0F1419]/75 text-lg leading-[1.75] italic mb-7 relative z-10">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: t.avatarBg }}
              >
                {t.initials}
              </div>
              <div className="text-left">
                <div className="text-[#0F1419] font-semibold text-sm">{t.name}</div>
                <div className="text-[#0F1419]/45 text-xs">{t.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-center gap-5 mt-6">
        {/* Prev */}
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border border-[#0F1419]/10 flex items-center justify-center text-[#0F1419]/40 hover:text-[#0F1419] hover:border-[#0F1419]/25 transition-all duration-150"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === active ? 28 : 12, background: 'rgba(15,20,25,0.15)' }}
            >
              {i === active && (
                <motion.div
                  key={active}
                  className="absolute inset-0 rounded-full bg-[#1E86D4]"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="w-8 h-8 rounded-full border border-[#0F1419]/10 flex items-center justify-center text-[#0F1419]/40 hover:text-[#0F1419] hover:border-[#0F1419]/25 transition-all duration-150"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */
export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#0A66C2]/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">Results</p>
          <h2 className="section-heading text-center mb-5">
            Numbers don't lie.{' '}
            <span className="muted">Yours won't either.</span>
          </h2>
          <p className="section-subtext mx-auto text-center">
            These are real metrics from running the LinkedX system on one LinkedIn profile — no paid promotion, no boosting.
          </p>
        </motion.div>

        {/* Stat numbers */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatCard stat={stat} inView={inView} />
            </motion.div>
          ))}
        </div>

        {/* Testimonials carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TestimonialCarousel />
        </motion.div>
      </div>
    </section>
  );
}
