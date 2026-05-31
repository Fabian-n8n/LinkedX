import { motion } from 'framer-motion';
import { Link2, Settings2, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Link2,
    title: 'Connect your LinkedIn',
    desc: 'Securely link your LinkedIn account with a few clicks. No passwords shared — we use OAuth. Your credentials stay private, always.',
    detail: 'Takes less than 60 seconds.',
  },
  {
    num: '02',
    icon: Settings2,
    title: 'Set your targets & voice',
    desc: 'Tell LinkedX your niche, target industry, keywords, and how you write. Feed it a few of your past posts to calibrate your voice signature.',
    detail: 'Most users set up in under 5 minutes.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Watch your network grow',
    desc: 'LinkedX runs 24/7 — commenting, posting, and engaging on your behalf. Check your dashboard for weekly growth metrics and adjust anytime.',
    detail: 'Results visible within 7 days.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-[#0A0B12]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">How It Works</p>
          <h2 className="section-heading mb-5">
            Three steps.{' '}
            <span className="muted">Then LinkedIn runs itself.</span>
          </h2>
          <p className="section-subtext">
            No complex setup. No ongoing management. Just connect, configure, and let LinkedX do the rest.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num} variants={cardVariants} className="relative">
                {/* Connector line between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-2.5 w-5 h-px bg-gradient-to-r from-white/15 to-white/5 z-10" />
                )}

                <div className="glass-card h-full p-6 flex flex-col transition-all duration-300 hover:border-[rgba(10,102,194,0.2)]">
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="step-number">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1E86D4]" />
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-lg mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-[1.75] flex-1">{step.desc}</p>

                  {/* Detail pill */}
                  <div className="mt-5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A66C2]" />
                    <span className="text-xs text-[#1E86D4] font-medium">{step.detail}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
