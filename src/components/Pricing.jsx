import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Star, Target, Hash } from 'lucide-react';

/* ── Feature highlight pill (like PowerIn's target boxes) ───────────────── */
function FeaturePill({ icon: Icon, title, sub, featured }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
      style={{
        background: featured ? 'rgba(10,102,194,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${featured ? 'rgba(10,102,194,0.25)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: featured ? 'rgba(10,102,194,0.2)' : 'rgba(255,255,255,0.07)',
        }}
      >
        <Icon className="w-4 h-4" style={{ color: featured ? '#60b4f8' : 'rgba(255,255,255,0.4)' }} />
      </div>
      <div>
        <div className="text-white font-semibold text-xs">{title}</div>
        <div className="text-white/40 text-[10px] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

/* ── Plan data ──────────────────────────────────────────────────────────── */
const plans = [
  {
    name: 'Starter',
    price: '$39',
    period: '/mo',
    founderPrice: 'First 100 users: $19.50/mo for Starter',
    commentRate: '20 comments / day',
    desc: 'For creators ready to start growing their audience on LinkedIn.',
    cta: 'Get Started',
    featured: false,
    features: [
      '600 comments per month',
      '1 LinkedIn account',
      '15 AI posts per month',
      'Automated comments in your voice',
      'Zero risk for your account',
      'Customizable comment tone',
      'AI — writes more human than human',
      'Weekly analytics report',
    ],
    pills: [
      { icon: Target, title: 'Target Specific Creators', sub: 'Comment on your chosen accounts' },
      { icon: Hash,   title: 'Target Specific Keywords',  sub: 'Engage the most relevant posts' },
    ],
  },
  {
    name: 'Growth',
    price: '$97',
    period: '/mo',
    founderPrice: 'First 100 users: $48.50/mo for Growth',
    commentRate: 'Unlimited comments',
    desc: 'The fastest way to build a qualified audience and attract real opportunities on LinkedIn.',
    cta: 'Get Growth',
    featured: true,
    badge: '🔥 Recommended',
    features: [
      'Unlimited comments per month',
      'Up to 3 LinkedIn accounts',
      '30 AI posts per month (daily)',
      'Automated comments in your voice',
      'Zero risk for your account',
      'Advanced voice calibration',
      'AI — writes more human than human',
      'Multi-keyword & creator targeting',
      'Real-time analytics dashboard',
      'Priority support',
    ],
    pills: [
      { icon: Target, title: 'Target Specific Creators', sub: 'Comment on your chosen accounts' },
      { icon: Hash,   title: 'Target Specific Keywords',  sub: 'Engage the most relevant posts' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Pricing</p>
          <h2 className="section-heading text-center mb-5">
            Simple, transparent{' '}
            <span className="muted">pricing.</span>
          </h2>
          <p className="section-subtext mx-auto text-center mb-6">
            30-day free trial. First 100 users get 50% off, forever.
          </p>

          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 bg-[#0A66C2]/10 border border-[#0A66C2]/25 rounded-full px-4 py-2">
            <Star className="w-3.5 h-3.5 text-[#1E86D4]" />
            <span className="text-[#1E86D4] text-sm font-semibold">
              Beta Access — First 100 users get 50% off forever
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className="pricing-card flex flex-col"
              style={plan.featured ? { borderColor: 'rgba(10,102,194,0.4)' } : {}}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#0A66C2] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name + price */}
              <div className="mb-2">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: plan.featured ? '#60b4f8' : 'rgba(255,255,255,0.4)' }}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-black text-white tracking-[-0.04em]" style={{ fontSize: '3.25rem', lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span className="text-white/40 text-sm mb-2">{plan.period}</span>
                </div>
                <div className="text-[#60b4f8] text-sm font-semibold mb-2">
                  {plan.founderPrice}
                </div>
                <div
                  className="text-xs font-semibold mb-3"
                  style={{ color: plan.featured ? '#60b4f8' : 'rgba(255,255,255,0.35)' }}
                >
                  {plan.commentRate}
                </div>
                <p className="text-white/45 text-sm leading-[1.65]">{plan.desc}</p>
              </div>

              {/* CTA */}
              <Link
                to="/waitlist"
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 my-6"
                style={
                  plan.featured
                    ? { background: '#0A66C2', color: '#fff', boxShadow: '0 4px 20px rgba(10,102,194,0.4)' }
                    : { background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = '';
                }}
              >
                <Zap className="w-4 h-4" />
                {plan.cta}
              </Link>

              {/* Feature list */}
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: plan.featured ? '#60b4f8' : 'rgba(255,255,255,0.35)' }}
                    />
                    <span className="text-sm text-white/60">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Feature pills */}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.06]">
                {plan.pills.map((pill) => (
                  <FeaturePill key={pill.title} {...pill} featured={plan.featured} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          ✓ Cancel anytime &nbsp;·&nbsp; ✓ No contracts &nbsp;·&nbsp; ✓ 30-day free trial · No credit card required
        </motion.p>
      </div>
    </section>
  );
}
