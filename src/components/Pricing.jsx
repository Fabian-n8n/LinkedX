import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Star } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    desc: 'Perfect for solopreneurs and job seekers building their presence.',
    features: [
      '1 LinkedIn account',
      '20 auto-comments / day',
      '1 auto-post / day',
      'Voice calibration (basic)',
      'Industry targeting',
      'Weekly analytics report',
    ],
    cta: 'Join Waitlist',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$97',
    period: '/mo',
    desc: 'For founders and professionals who want serious LinkedIn authority.',
    features: [
      '3 LinkedIn accounts',
      'Unlimited auto-comments',
      '5 auto-posts / day',
      'Advanced voice calibration',
      'Multi-keyword targeting',
      'Real-time analytics dashboard',
      'Priority support',
      'Trending topic alerts',
    ],
    cta: 'Join Waitlist',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Agency',
    price: '$247',
    period: '/mo',
    desc: 'For agencies and teams managing multiple LinkedIn profiles at scale.',
    features: [
      '10 LinkedIn accounts',
      'Unlimited everything',
      '10 auto-posts / day',
      'White-label reports',
      'Client management dashboard',
      'Dedicated account manager',
      'Custom integrations (API)',
      'SLA + priority queue',
    ],
    cta: 'Contact Us',
    featured: false,
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

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Pricing</p>
          <h2 className="section-heading text-center mb-5">
            Simple, transparent{' '}
            <span className="muted">pricing.</span>
          </h2>
          <p className="section-subtext mx-auto text-center">
            Start free during beta. Lock in your founding rate before we launch publicly.
          </p>

          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 bg-[#0A66C2]/10 border border-[#0A66C2]/25 rounded-full px-4 py-2 mt-6">
            <Star className="w-3.5 h-3.5 text-[#1E86D4]" />
            <span className="text-[#1E86D4] text-sm font-semibold">Beta Access — First 100 users get 50% off forever</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`pricing-card ${plan.featured ? 'featured' : ''} ${plan.featured ? 'md:scale-[1.03]' : ''}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 bg-[#0A66C2] text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="text-white/60 text-sm font-medium mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-3">
                  <span className="font-black text-white text-5xl tracking-[-0.04em]">{plan.price}</span>
                  <span className="text-white/40 text-sm mb-2">{plan.period}</span>
                </div>
                <p className="text-white/45 text-sm leading-[1.6]">{plan.desc}</p>
              </div>

              <div className="border-t border-white/[0.07] pt-6 mb-8">
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: plan.featured ? '#1E86D4' : 'rgba(255,255,255,0.4)' }}
                      />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/waitlist"
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 ${
                  plan.featured
                    ? 'bg-[#0A66C2] text-white hover:bg-[#1E86D4] shadow-lg shadow-[#0A66C2]/25'
                    : 'bg-white/[0.06] text-white hover:bg-white/10 border border-white/[0.1]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          ✓ Cancel anytime &nbsp;·&nbsp; ✓ No contracts &nbsp;·&nbsp; ✓ 14-day free trial at launch
        </motion.p>
      </div>
    </section>
  );
}
