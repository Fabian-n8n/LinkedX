import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

const stats = [
  { value: 10, suffix: '×', label: 'Faster LinkedIn growth', sub: 'vs. manual engagement' },
  { value: 1842, suffix: '+', label: 'Avg comment impressions', sub: 'per targeted comment' },
  { value: 50, suffix: '+', label: 'New connections/month', sub: 'from automated activity' },
  { value: 3, suffix: '×', label: 'More profile views', sub: 'in your first 30 days' },
];

function StatCard({ stat, inView }) {
  const count = useCountUp(stat.value, 1800, inView);

  return (
    <div className="text-center">
      <div className="font-black text-white tracking-[-0.04em] leading-none mb-3" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <span className="text-gradient-accent">{count.toLocaleString()}</span>
        <span className="text-[#1E86D4]">{stat.suffix}</span>
      </div>
      <div className="font-semibold text-white/80 text-base mb-1">{stat.label}</div>
      <div className="text-white/35 text-sm">{stat.sub}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#0A66C2]/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
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

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
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
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-2xl mx-auto text-center"
        >
          <div className="glass-card-accent p-8 rounded-2xl">
            <p className="text-white/70 text-lg leading-[1.7] italic mb-5">
              "The moment I started using LinkedX, recruiters started sliding into my DMs. A $270K job offer came through within weeks. My profile does the work — I just show up."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A66C2] to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                FW
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Fabian Wong</div>
                <div className="text-white/40 text-xs">Product Engineer · AI × Design Systems</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
