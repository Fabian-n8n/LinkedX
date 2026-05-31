import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, MessageCircle, UserPlus, TrendingUp,
  Heart, Eye, Bell, Star, Briefcase, BarChart3, AtSign,
} from 'lucide-react';

/* ── LinkedIn "in" inline badge ─────────────────────────────────────────── */
function InBadge() {
  return (
    <span
      className="inline-flex items-center justify-center align-middle mx-2 rounded-[6px] bg-[#0A66C2]"
      style={{ width: '0.85em', height: '0.85em', verticalAlign: 'middle', position: 'relative', top: '-0.05em' }}
    >
      <span className="text-white font-black leading-none" style={{ fontSize: '0.55em', letterSpacing: '-0.02em' }}>in</span>
    </span>
  );
}

/* ── Interaction card data ──────────────────────────────────────────────── */
const cards = [
  {
    id: 1,
    avatar: 'SC',
    avatarStyle: { background: 'linear-gradient(135deg, #e11d48, #be185d)' },
    name: 'Samantha Carter',
    role: 'Executive Recruiter · Advance Intelligence Group',
    text: 'Hi — I have a confidential Lead AI PM role. $200K–$270K SGD + equity and executive perks.',
    time: '2m ago',
    tag: 'New Message',
    tagBg: 'rgba(30,134,212,0.18)',
    tagColor: '#60b4f8',
    icon: MessageCircle,
    iconColor: '#60b4f8',
    accentLeft: '#0A66C2',
  },
  {
    id: 2,
    avatar: 'AP',
    avatarStyle: { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' },
    name: 'Alexandru Pricopie',
    role: 'Founder @ Elite Flow AI · follows you',
    text: 'Inviting you to connect · Will McTighe and 1 other mutual connection',
    time: '5m ago',
    tag: 'Invitation',
    tagBg: 'rgba(10,102,194,0.18)',
    tagColor: '#60b4f8',
    icon: UserPlus,
    iconColor: '#60b4f8',
    accentLeft: '#4f46e5',
  },
  {
    id: 3,
    avatar: '↑',
    avatarStyle: { background: 'linear-gradient(135deg, #0A66C2, #1d4ed8)' },
    name: 'Comment Performance',
    role: 'LinkedIn Analytics',
    text: '"Appreciate the focus on usability; curious how audio experiments changed interaction patterns..."',
    time: '48m ago',
    tag: '1,842 impressions',
    tagBg: 'rgba(34,197,94,0.15)',
    tagColor: '#4ade80',
    icon: TrendingUp,
    iconColor: '#4ade80',
    accentLeft: '#22c55e',
  },
  {
    id: 4,
    avatar: 'KA',
    avatarStyle: { background: 'linear-gradient(135deg, #b91c1c, #dc2626)' },
    name: 'Kiran Aftab',
    role: 'and 2,896 others',
    text: 'Reacted to your post · 👍 💙 🎉 · "Prompts are becoming the new components..."',
    time: '49m ago',
    tag: '2,897 reactions',
    tagBg: 'rgba(249,115,22,0.15)',
    tagColor: '#fb923c',
    icon: Heart,
    iconColor: '#fb923c',
    accentLeft: '#b91c1c',
  },
  {
    id: 5,
    avatar: 'FL',
    avatarStyle: { background: 'linear-gradient(135deg, #0369a1, #0A66C2)' },
    name: 'Felix Lee',
    role: 'Mentioned you in a comment',
    text: '"Fabian Wong yea, I think the design system is going to change quite dramatically with new models..."',
    time: '2h ago',
    tag: '16 reactions',
    tagBg: 'rgba(10,102,194,0.18)',
    tagColor: '#60b4f8',
    icon: AtSign,
    iconColor: '#60b4f8',
    accentLeft: '#0A66C2',
  },
  {
    id: 6,
    avatar: '👁',
    avatarStyle: { background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid rgba(255,255,255,0.1)' },
    name: 'Profile View Spike',
    role: 'LinkedIn Analytics · This week',
    text: 'Your profile was viewed 48 times — up 340% from last week. 3 from Hiring Managers.',
    time: '3h ago',
    tag: '+340% views',
    tagBg: 'rgba(34,197,94,0.15)',
    tagColor: '#4ade80',
    icon: Eye,
    iconColor: '#4ade80',
    accentLeft: '#22c55e',
  },
  {
    id: 7,
    avatar: 'MP',
    avatarStyle: { background: 'linear-gradient(135deg, #065f46, #059669)' },
    name: 'MAJI PETER',
    role: 'and 1 other liked your comment',
    text: '"Five years, five days a week proving value is a masterclass in building residual impact..."',
    time: '49m ago',
    tag: 'Comment liked',
    tagBg: 'rgba(5,150,105,0.18)',
    tagColor: '#34d399',
    icon: Heart,
    iconColor: '#34d399',
    accentLeft: '#059669',
  },
  {
    id: 8,
    avatar: '📊',
    avatarStyle: { background: 'linear-gradient(135deg, #0A66C2, #1d4ed8)' },
    name: 'Weekly Report',
    role: 'LinkedIn Analytics · Last 7 days',
    text: 'Your posts got 685 impressions. Your post drove 2 profile viewers and 1 reaction.',
    time: '1d ago',
    tag: '685 impressions',
    tagBg: 'rgba(30,134,212,0.18)',
    tagColor: '#60b4f8',
    icon: BarChart3,
    iconColor: '#60b4f8',
    accentLeft: '#0A66C2',
  },
  {
    id: 9,
    avatar: 'VL',
    avatarStyle: { background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' },
    name: 'Varick Lim',
    role: 'Reacted to Sherry Jiang\'s post',
    text: '"300+ builders" — and you were mentioned as a key voice in the AI design space.',
    time: '3h ago',
    tag: 'You were featured',
    tagBg: 'rgba(124,58,237,0.18)',
    tagColor: '#a78bfa',
    icon: Star,
    iconColor: '#a78bfa',
    accentLeft: '#7c3aed',
  },
  {
    id: 10,
    avatar: '💼',
    avatarStyle: { background: 'linear-gradient(135deg, #0A66C2, #0369a1)' },
    name: 'Job Opportunity',
    role: 'LinkedIn Jobs · Matches your profile',
    text: '3 new Head of Product roles matching "AI · Design Systems · Product Engineering" — $180K–$280K',
    time: '4h ago',
    tag: '3 new matches',
    tagBg: 'rgba(34,197,94,0.15)',
    tagColor: '#4ade80',
    icon: Briefcase,
    iconColor: '#4ade80',
    accentLeft: '#0A66C2',
  },
];

/* ── Single card ────────────────────────────────────────────────────────── */
function InteractionCard({ card }) {
  const Icon = card.icon;
  return (
    <div
      className="w-[360px] rounded-2xl p-4 mb-3 flex-shrink-0"
      style={{
        background: 'rgba(11, 13, 24, 0.92)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `3px solid ${card.accentLeft}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-black"
          style={card.avatarStyle}
        >
          {typeof card.avatar === 'string' && card.avatar.length <= 2 ? card.avatar : (
            <span style={{ fontSize: '1.1rem' }}>{card.avatar}</span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <span className="text-white font-semibold text-[13px] leading-tight">{card.name}</span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Icon style={{ color: card.iconColor }} className="w-3.5 h-3.5" />
              <span className="text-white/30 text-[10px]">{card.time}</span>
            </div>
          </div>
          <p className="text-white/35 text-[11px] mb-1.5 leading-tight">{card.role}</p>
          <p className="text-white/55 text-[11px] leading-[1.55] line-clamp-2">{card.text}</p>

          {/* Tag */}
          <div className="mt-2.5">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: card.tagBg, color: card.tagColor }}
            >
              {card.tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scrolling column ───────────────────────────────────────────────────── */
function ScrollingColumn() {
  const doubled = [...cards, ...cards];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: 540,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <motion.div
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', flexDirection: 'column', willChange: 'transform' }}
      >
        {doubled.map((card, i) => (
          <InteractionCard key={i} card={card} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Hero Section ──────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial blue glow top-right */}
        <div className="absolute top-0 right-0 w-[700px] h-[600px] bg-[#0A66C2]/12 blur-3xl rounded-full translate-x-1/4 -translate-y-1/4" />
        {/* Secondary glow center-left */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#0A66C2]/06 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        {/* Top edge line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A66C2]/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT: Copy ──────────────────────────────────────────────── */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
            className="font-black text-white leading-[1.02] tracking-[-0.04em] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)' }}
          >
            Show up on
            <span className="relative inline-flex items-center mx-2">
              <InBadge />
            </span>
            LinkedIn
            <br />
            every day.{' '}
            <span className="text-white/25">Without writing</span>
            <br />
            <span className="text-white/25">every day.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/55 text-lg leading-[1.7] mb-10 max-w-[460px]"
          >
            AI that drafts posts in your voice, comments on the right people, and builds your network in the background.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link
              to="/waitlist"
              className="inline-flex items-center gap-2 bg-white text-[#07080F] font-bold text-sm px-7 py-4 rounded-full hover:bg-white/90 transition-all duration-200"
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
            {/* Avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  { init: 'FW', bg: '#0A66C2' },
                  { init: 'AP', bg: '#7c3aed' },
                  { init: 'JL', bg: '#b91c1c' },
                  { init: 'MC', bg: '#065f46' },
                ].map(({ init, bg }) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full border-2 border-[#07080F] flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ background: bg }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">340+ on waitlist</div>
                <div className="text-white/35 text-xs">Founders · PMs · Creators</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/[0.1] hidden sm:block" />

            {/* Stars */}
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="text-white/35 text-xs">Top tier quality · 5/5</div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Scrolling interaction cards ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Subtle glow behind cards */}
          <div className="absolute inset-0 bg-[#0A66C2]/08 blur-3xl rounded-full pointer-events-none" />

          {/* Card column */}
          <div className="relative">
            <ScrollingColumn />

            {/* Bell icon top-right decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 0 3px rgba(10,102,194,0.2), 0 4px 16px rgba(10,102,194,0.4)' }}
            >
              <Bell className="w-4 h-4 text-white" />
            </motion.div>

            {/* Live indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0C0E1A] border border-white/[0.08] rounded-full px-3 py-1.5 text-xs text-white/40 whitespace-nowrap"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Live activity · updating in real time
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07080F] to-transparent pointer-events-none" />
    </section>
  );
}
