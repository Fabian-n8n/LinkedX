import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function FooterCTA() {
  return (
    <section className="py-32 px-6 bg-[#0A0B12] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0A66C2]/15 blur-3xl rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A66C2]/30 to-transparent" />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#0A66C2]/10 border border-[#0A66C2]/25 rounded-full px-4 py-1.5 mb-10"
        >
          <Zap className="w-3 h-3 text-[#1E86D4]" />
          <span className="text-[#1E86D4] text-xs font-semibold tracking-wide">Limited Beta Access · 340+ on waitlist</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-black leading-[1.03] tracking-[-0.04em] mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          Your competitors are
          <br />
          <span className="text-gradient-accent">already growing.</span>
          <br />
          <span className="text-white/25">Are you?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/50 text-lg leading-[1.7] mb-12 max-w-xl mx-auto"
        >
          Join the LinkedX waitlist today. Be among the first to automate your LinkedIn growth — and lock in your founding rate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/waitlist" className="btn-primary text-base px-8 py-4">
            <Zap className="w-4 h-4" />
            Claim Your Spot
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#pricing" className="btn-outline text-base px-8 py-4">
            View Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}
