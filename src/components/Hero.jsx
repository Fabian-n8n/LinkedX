import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Users, MessageSquare } from 'lucide-react';

/* ── LinkedIn Profile Mockup inside laptop ─────────────────────────────── */
function LinkedInProfile() {
  return (
    <div className="h-full bg-[#F3F2EF] overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-[#E8E6E0] border-b border-gray-300 px-3 py-1.5 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded text-[8px] text-gray-400 px-2 py-0.5 flex items-center gap-1">
          <span>🔒</span>
          <span>linkedin.com/in/yourprofile</span>
        </div>
      </div>
      {/* LinkedIn nav bar */}
      <div className="bg-white border-b border-gray-200 px-3 py-1 flex items-center gap-2">
        <span className="font-black text-[#0A66C2] text-base leading-none">in</span>
        <div className="flex-1 bg-gray-100 rounded-sm h-5 max-w-[100px]" />
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200" />
          <div className="w-4 h-4 rounded-sm bg-gray-200" />
          <div className="w-4 h-4 rounded-full bg-[#0A66C2]/20" />
        </div>
      </div>
      {/* Main content */}
      <div className="flex gap-2 p-2">
        {/* Profile card */}
        <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-sm">
          {/* Cover */}
          <div className="h-14 bg-gradient-to-r from-[#0A66C2] via-[#1D77C2] to-[#4DA3FF] relative">
            <div className="absolute -bottom-5 left-3 w-10 h-10 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#0A66C2] to-purple-600 flex items-center justify-center text-white text-[9px] font-black">FW</div>
            </div>
          </div>
          <div className="pt-6 px-3 pb-3">
            <div className="font-bold text-[10px] text-gray-900">Fabian Wong</div>
            <div className="text-[8px] text-gray-500 leading-tight mt-0.5">Product Engineer · AI × Design Systems</div>
            <div className="text-[8px] text-[#0A66C2] mt-1 font-medium">500+ connections</div>
            {/* Stats row */}
            <div className="flex gap-3 mt-2 pt-2 border-t border-gray-100">
              <div>
                <div className="text-[9px] font-bold text-gray-800">2.4K</div>
                <div className="text-[7px] text-gray-400">Post views</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-gray-800">148</div>
                <div className="text-[7px] text-gray-400">Reactions</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-gray-800">36</div>
                <div className="text-[7px] text-gray-400">Follows</div>
              </div>
            </div>
          </div>
        </div>
        {/* Feed column */}
        <div className="flex-1 flex flex-col gap-1.5">
          {/* Post card */}
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0A66C2] to-purple-600 flex items-center justify-center text-white text-[6px] font-black">FW</div>
              <div>
                <div className="text-[7px] font-semibold text-gray-900">Fabian Wong</div>
                <div className="text-[6px] text-gray-400">2h • 🌐</div>
              </div>
            </div>
            <div className="text-[7px] text-gray-600 leading-tight mb-1.5">
              Prompts are becoming the new components. They're no longer just inputs — they're design decisions...
            </div>
            <div className="flex items-center gap-2 text-[6px] text-gray-400 pt-1 border-t border-gray-100">
              <span>👍 251 reactions</span>
              <span>50 comments</span>
            </div>
          </div>
          {/* Notification pill */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="bg-white rounded-lg p-1.5 shadow-sm border border-[#0A66C2]/20"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-[6px] font-bold flex-shrink-0">AP</div>
              <div className="text-[6px] text-gray-600 leading-tight">
                <strong>Alexandru Pricopie</strong> wants to connect — Founder @ Elite Flow AI
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Floating badge component ───────────────────────────────────────────── */
function FloatingBadge({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute glass-card-accent px-3 py-2 flex items-center gap-2 shadow-2xl text-xs ${className}`}
      style={{ borderRadius: 12 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Laptop Mockup ─────────────────────────────────────────────────────── */
function LaptopMockup() {
  return (
    <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ rotateX: 20, rotateY: -15, opacity: 0, y: 40, scale: 0.95 }}
        animate={{ rotateX: 10, rotateY: -8, opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Glow beneath */}
        <div className="absolute inset-0 bg-[#0A66C2]/20 blur-3xl rounded-full scale-90 translate-y-8 -z-10" />

        {/* Screen bezel */}
        <div
          className="w-[440px] rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: '#1A1B2E',
            border: '8px solid #1A1B2E',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          {/* Camera dot */}
          <div className="h-5 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          {/* Screen content */}
          <div className="h-[270px]">
            <LinkedInProfile />
          </div>
        </div>

        {/* Laptop base */}
        <div
          className="h-3 mx-3 rounded-b-2xl"
          style={{ background: '#13141F', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
        />
        <div
          className="h-0.5 mx-auto w-1/3 rounded-full mt-0.5"
          style={{ background: '#1A1B2E' }}
        />
      </motion.div>

      {/* Floating badges */}
      <FloatingBadge
        delay={1.4}
        className="-top-4 -right-8 bg-[#0F1120]"
        style={{ minWidth: 160 }}
      >
        <TrendingUp className="w-4 h-4 text-[#1E86D4]" />
        <div>
          <div className="text-white font-bold text-sm">+1,842</div>
          <div className="text-white/40 text-[10px]">Impressions today</div>
        </div>
      </FloatingBadge>

      <FloatingBadge
        delay={1.7}
        className="-bottom-2 -left-8 bg-[#0F1120]"
      >
        <Users className="w-4 h-4 text-[#1E86D4]" />
        <div>
          <div className="text-white font-bold text-sm">+12</div>
          <div className="text-white/40 text-[10px]">New connections</div>
        </div>
      </FloatingBadge>

      <FloatingBadge
        delay={2.0}
        className="top-1/2 -translate-y-1/2 -right-12 bg-[#0F1120]"
      >
        <MessageSquare className="w-4 h-4 text-[#1E86D4]" />
        <div className="text-white/70 text-[10px] max-w-[120px] leading-tight">
          Recruiter reached out re: <strong className="text-white">$270K</strong> role
        </div>
      </FloatingBadge>
    </div>
  );
}

/* ── Hero Section ──────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-radial-accent pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A66C2]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#0A66C2]/10 border border-[#0A66C2]/25 rounded-full px-4 py-1.5 mb-8"
          >
            <Zap className="w-3 h-3 text-[#1E86D4]" />
            <span className="text-[#1E86D4] text-xs font-semibold tracking-wide">LinkedIn Automation · AI-Powered</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.8rem,6vw,5rem)] font-black leading-[1.0] tracking-[-0.04em] mb-6"
          >
            Your LinkedIn
            <br />
            <span className="text-gradient-accent">profile</span> is your
            <br />
            career.{' '}
            <span className="text-white/25">Automate it.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="section-subtext mb-10 max-w-[480px]"
          >
            LinkedX runs your LinkedIn on autopilot — auto-commenting in your exact voice, posting trending industry content, and building the network that opens every door while you focus on what actually matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link to="/waitlist" className="btn-primary">
              <Zap className="w-4 h-4" />
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how-it-works" className="btn-outline">
              See How It Works
            </a>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-3 mt-8"
          >
            <div className="flex -space-x-2">
              {['FW', 'AP', 'JL', 'MC'].map((init, i) => (
                <div
                  key={init}
                  className="w-7 h-7 rounded-full border-2 border-[#07080F] flex items-center justify-center text-[8px] font-bold text-white"
                  style={{
                    background: `hsl(${210 + i * 25}, 80%, 40%)`,
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/40">
              <span className="text-white/70 font-semibold">340+ founders & creators</span> on the waitlist
            </p>
          </motion.div>
        </div>

        {/* Right: laptop mockup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <LaptopMockup />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07080F] to-transparent pointer-events-none" />
    </section>
  );
}
