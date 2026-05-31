import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bell, MessageCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

/* ── Notification card components (LinkedIn-style) ──────────────────────── */

function ConnectionNotif() {
  return (
    <div className="notif-card w-[300px]">
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
            AP
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0A66C2] flex items-center justify-center">
            <span className="text-white text-[8px] font-black">in</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-900 text-xs leading-snug">
            <strong>Alexandru Pricopie</strong> follows you and is inviting you to connect
          </p>
          <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">
            Founder @ Elite Flow AI · Will McTighe and 1 other mutual
          </p>
          <div className="flex gap-2 mt-2.5">
            <button className="text-[11px] text-[#0A66C2] border border-[#0A66C2] rounded-full px-3 py-0.5 font-semibold hover:bg-[#0A66C2]/5 transition-colors">
              Accept
            </button>
            <button className="text-[11px] text-gray-500 border border-gray-300 rounded-full px-3 py-0.5 hover:bg-gray-50 transition-colors">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpressionNotif() {
  return (
    <div className="notif-card w-[300px]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-[#0A66C2]" />
        </div>
        <div className="flex-1">
          <p className="text-gray-900 text-xs leading-snug">
            Your comment has gained{' '}
            <strong className="text-[#0A66C2]">1,842 impressions</strong>.
          </p>
          <div className="mt-1.5 border-l-2 border-gray-200 pl-2">
            <p className="text-[10px] text-gray-400 leading-tight italic">
              "Appreciate the focus on usability for everyday folks; curious how your audio experiments changed interaction patterns..."
            </p>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">56 minutes ago</p>
        </div>
      </div>
    </div>
  );
}

function RecruiterNotif() {
  return (
    <div className="notif-card w-[300px]">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
            SC
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
        </div>
        <div>
          <p className="text-gray-900 text-[11px] font-semibold">Samantha Carter</p>
          <p className="text-gray-400 text-[9px]">Executive Recruiter · Today 7:16 PM</p>
        </div>
        <div className="ml-auto">
          <MessageCircle className="w-4 h-4 text-[#0A66C2]" />
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-2.5">
        <p className="text-gray-700 text-[11px] leading-relaxed">
          Hi Fabian, I'm managing a confidential search for a{' '}
          <strong>Lead AI Product Manager</strong> for Advance Intelligence Group...{' '}
          <strong className="text-[#0A66C2]">$200K–$270K SGD</strong> package + equity and executive perks.
        </p>
      </div>
    </div>
  );
}

function ReactionsNotif() {
  return (
    <div className="notif-card w-[300px]">
      <div className="flex items-start gap-3">
        <div className="flex -space-x-2 flex-shrink-0">
          {['FW', 'KA', 'MC', 'VL'].map((init, i) => (
            <div
              key={init}
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: `hsl(${200 + i * 30}, 70%, 45%)` }}
            >
              {init}
            </div>
          ))}
        </div>
        <div>
          <p className="text-gray-900 text-xs leading-snug">
            <strong>Kiran Aftab</strong> and <strong>2,896 others</strong> reacted to your post
          </p>
          <p className="text-gray-400 text-[10px] mt-0.5">
            👍 💙 🎉 · 2,897 total reactions
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Phone frame wrapper ────────────────────────────────────────────────── */
function PhoneFrame({ children, className = '' }) {
  return (
    <div
      className={`w-[220px] h-[440px] rounded-[36px] overflow-hidden shadow-2xl relative flex-shrink-0 ${className}`}
      style={{
        background: '#1A1B2E',
        border: '7px solid #1A1B2E',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
      }}
    >
      {/* Dynamic island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0D0E1A] rounded-full z-10" />
      {/* Screen */}
      <div className="h-full bg-[#F3F2EF] flex flex-col overflow-hidden">
        {/* LinkedIn notification header */}
        <div className="bg-white pt-6 pb-2 px-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-gray-800" />
              <span className="font-bold text-[11px] text-gray-900">Notifications</span>
            </div>
            <div className="text-[9px] text-[#0A66C2] font-semibold">See all</div>
          </div>
        </div>
        {/* Notification list */}
        <div className="flex-1 overflow-hidden p-2 flex flex-col gap-1.5">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Mini notification item for phone ───────────────────────────────────── */
function MiniNotif({ avatar, name, text, time, highlighted = false }) {
  return (
    <div
      className={`rounded-lg p-1.5 flex items-start gap-1.5 ${highlighted ? 'bg-[#EEF3FB]' : 'bg-white'}`}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[7px] font-bold flex-shrink-0"
        style={{ background: avatar.bg }}
      >
        {avatar.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[7px] text-gray-700 leading-tight line-clamp-2">
          <strong>{name}</strong> {text}
        </p>
        <p className="text-[6px] text-gray-400 mt-0.5">{time}</p>
      </div>
      {highlighted && (
        <div className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] flex-shrink-0 mt-1" />
      )}
    </div>
  );
}

/* ── Story scenes ────────────────────────────────────────────────────────── */
const scenes = [
  {
    label: 'Network Growth',
    headline: 'Your network grows\nwhile you sleep.',
    sub: 'LinkedX engages with the right voices in your industry — every single day, in your tone, without you lifting a finger. Your profile stays active 24/7.',
    notifs: [
      { avatar: { initials: 'AP', bg: '#4558A9' }, name: 'Alexandru Pricopie', text: 'follows you and is inviting you to connect', time: '2m ago', highlighted: true },
      { avatar: { initials: 'FL', bg: '#0A66C2' }, name: 'Felix Lee', text: 'mentioned you in a comment: "yea, I think the design system will change..."', time: '48m ago', highlighted: false },
      { avatar: { initials: 'MP', bg: '#5E8B3E' }, name: 'MAJI PETER', text: 'and 1 other liked your comment', time: '49m ago', highlighted: false },
      { avatar: { initials: 'VL', bg: '#8B3E5E' }, name: 'Varick Lim', text: 'reacted to Sherry Jiang\'s post: 300+ builders...', time: '3h ago', highlighted: false },
    ],
  },
  {
    label: 'Impression Engine',
    headline: 'Every comment is\na brand impression.',
    sub: 'Smart comments drive 10× more profile visits than posts alone. LinkedX places you in every relevant conversation, making your name synonymous with your industry.',
    notifs: [
      { avatar: { initials: '📊', bg: '#0A66C2' }, name: 'LinkedIn', text: 'Your comment has gained 1,842 impressions.', time: '56m ago', highlighted: true },
      { avatar: { initials: '📊', bg: '#0A66C2' }, name: 'LinkedIn', text: 'Your posts got 685 impressions last week.', time: '1d ago', highlighted: false },
      { avatar: { initials: 'KA', bg: '#C24444' }, name: 'Kiran Aftab', text: 'and 1 other liked your comment: "it\'s never too late..."', time: '49m ago', highlighted: false },
      { avatar: { initials: '📊', bg: '#0A66C2' }, name: 'LinkedIn', text: 'Your comment gained 751 impressions.', time: '48m ago', highlighted: false },
    ],
  },
  {
    label: 'Opportunity Magnet',
    headline: 'Opportunities find\nyou, not the reverse.',
    sub: 'A consistent, visible presence attracts recruiters, investors, and collaborators — without any cold outreach. Your LinkedIn becomes your most powerful career asset.',
    notifs: [
      { avatar: { initials: 'SC', bg: '#8B3E3E' }, name: 'Samantha Carter', text: 'Lead AI PM role · $200K–$270K SGD + equity...', time: '7:16 PM', highlighted: true },
      { avatar: { initials: 'AP', bg: '#4558A9' }, name: 'Alexandru Pricopie', text: 'follows you and is inviting you to connect', time: '2m ago', highlighted: false },
      { avatar: { initials: 'FL', bg: '#0A66C2' }, name: 'Felix Lee', text: 'mentioned you in a comment with 16 reactions', time: '2h ago', highlighted: false },
      { avatar: { initials: '🎉', bg: '#5E8B3E' }, name: 'LinkedIn', text: 'Your post got 276 impressions and drove 2 profile viewers.', time: '1d ago', highlighted: false },
    ],
  },
];

/* ── Main section ───────────────────────────────────────────────────────── */
export default function ScrollStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Map scroll to scene index (3 scenes over 100% scroll)
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.28, 0.38], [1, 1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.33, 0.43, 0.58, 0.68], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1, 1], [0, 1, 1, 1]);

  const scene1Y = useTransform(scrollYProgress, [0, 0.38], [0, -30]);
  const scene2Y = useTransform(scrollYProgress, [0.33, 0.43, 0.68], [30, 0, -30]);
  const scene3Y = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);

  // Phone scale & notif card entrance
  const phone1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.33, 0.43], [0, 1, 1, 0]);
  const phone2Opacity = useTransform(scrollYProgress, [0.33, 0.43, 0.66, 0.75], [0, 1, 1, 0]);
  const phone3Opacity = useTransform(scrollYProgress, [0.66, 0.75, 1], [0, 1, 1]);

  const notifOpacity = useTransform(scrollYProgress, [0.1, 0.22], [0, 1]);
  const notif2Opacity = useTransform(scrollYProgress, [0.43, 0.55], [0, 1]);
  const notif3Opacity = useTransform(scrollYProgress, [0.75, 0.87], [0, 1]);

  const sceneOpacities = [scene1Opacity, scene2Opacity, scene3Opacity];
  const sceneYs = [scene1Y, scene2Y, scene3Y];
  const phoneOpacities = [phone1Opacity, phone2Opacity, phone3Opacity];
  const notifOpacities = [notifOpacity, notif2Opacity, notif3Opacity];

  return (
    <section ref={ref} style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[#07080F]">
        {/* Background subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0A66C2]/8 blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: changing copy */}
            <div className="relative h-[300px] flex items-center">
              {scenes.map((scene, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: sceneOpacities[i], y: sceneYs[i] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="section-label mb-4">{scene.label}</p>
                  <h2
                    className="font-black text-white tracking-[-0.04em] leading-[1.05] mb-6"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
                  >
                    {scene.headline.split('\n').map((line, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {j === 1 ? (
                          <span className="text-gradient-accent">{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </h2>
                  <p className="text-white/50 text-base leading-[1.75] max-w-[440px]">{scene.sub}</p>

                  {/* Progress dots */}
                  <div className="flex gap-2 mt-8">
                    {scenes.map((_, j) => (
                      <div
                        key={j}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          j === i ? 'w-8 bg-[#0A66C2]' : 'w-4 bg-white/15'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: phone + floating notif */}
            <div className="relative flex items-center justify-center" style={{ height: 480 }}>
              {scenes.map((scene, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: phoneOpacities[i] }}
                  className="absolute"
                >
                  <PhoneFrame>
                    {scene.notifs.map((n, j) => (
                      <MiniNotif
                        key={j}
                        avatar={n.avatar}
                        name={n.name}
                        text={n.text}
                        time={n.time}
                        highlighted={n.highlighted}
                      />
                    ))}
                  </PhoneFrame>

                  {/* Floating notification card outside phone */}
                  <motion.div
                    style={{ opacity: notifOpacities[i] }}
                    className="absolute -right-[120px] top-1/4"
                  >
                    {i === 0 && <ConnectionNotif />}
                    {i === 1 && <ImpressionNotif />}
                    {i === 2 && <RecruiterNotif />}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
