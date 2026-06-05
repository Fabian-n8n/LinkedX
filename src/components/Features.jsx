import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, Target, BarChart3, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Smart Auto-Comments',
    desc: 'LinkedX reads trending posts in your industry and leaves thoughtful, on-brand comments that drive profile visits and connection requests — all written in your exact voice.',
    highlight: '10× more profile visits from comments vs posts',
    color: '#0A66C2',
  },
  {
    icon: TrendingUp,
    title: 'Trend-Aware Auto-Posts',
    desc: 'Stay ahead of the conversation. LinkedX identifies what\'s gaining traction in your niche and publishes well-timed posts that position you as a thought leader.',
    highlight: '3× more reach with trend-timed content',
    color: '#1E86D4',
  },
  {
    icon: Target,
    title: 'Precision Industry Targeting',
    desc: 'Tell LinkedX your niche, keywords, and target audience. It laser-focuses every activity on the ecosystem that matters most to your career or business.',
    highlight: 'Reach only relevant industry insiders',
    color: '#0A66C2',
  },
  {
    icon: BarChart3,
    title: 'Growth Analytics',
    desc: 'See exactly which comments drove impressions, which posts earned followers, and how your overall LinkedIn authority is growing — week over week.',
    highlight: 'Full visibility into what\'s working',
    color: '#1E86D4',
  },
  {
    icon: Zap,
    title: 'Voice Calibration',
    desc: 'LinkedX learns how you write. Feed it your past posts and comments, and it mimics your cadence, vocabulary, and tone so every action feels authentic.',
    highlight: 'Indistinguishable from your own writing',
    color: '#0A66C2',
  },
  {
    icon: Shield,
    title: 'Safe & Compliant',
    desc: 'Built with LinkedIn\'s rate limits and guidelines in mind. Human-like pacing, randomized timing, and activity caps keep your account safe and in good standing.',
    highlight: 'No account risks or bans',
    color: '#1E86D4',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card p-6 h-full flex flex-col transition-all duration-300"
      style={{ borderColor: hovered ? 'rgba(10,102,194,0.25)' : undefined }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          background: hovered ? `rgba(${feature.color === '#0A66C2' ? '10,102,194' : '30,134,212'},0.12)` : 'rgba(15,20,25,0.05)',
          border: `1px solid ${hovered ? `${feature.color}35` : 'rgba(15,20,25,0.09)'}`,
        }}
      >
        <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: hovered ? feature.color : 'rgba(15,20,25,0.38)' }} />
      </div>

      <h3 className="font-bold text-[#0F1419] text-base mb-3 tracking-tight">{feature.title}</h3>
      <p className="text-sm text-[#0F1419]/55 leading-[1.75] flex-1">{feature.desc}</p>

      {/* Highlight pill */}
      <div
        className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
        style={{
          background: hovered ? 'rgba(10,102,194,0.1)' : 'rgba(15,20,25,0.04)',
          color: hovered ? '#1E86D4' : 'rgba(15,20,25,0.38)',
          border: `1px solid ${hovered ? 'rgba(10,102,194,0.25)' : 'rgba(15,20,25,0.07)'}`,
        }}
      >
        <Zap className="w-3 h-3" />
        {feature.highlight}
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-[#F5F1EC]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">Features</p>
          <h2 className="section-heading mb-5">
            Everything LinkedIn.{' '}
            <span className="muted">Nothing manual.</span>
          </h2>
          <p className="section-subtext">
            LinkedX handles every touchpoint on LinkedIn that drives growth — so your profile works like a full-time content and networking team.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
