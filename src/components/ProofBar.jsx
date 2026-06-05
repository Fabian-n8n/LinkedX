import { TrendingUp, Users, MessageSquare, Star, BarChart3, Award } from 'lucide-react';

const items = [
  { icon: TrendingUp, text: '1,842 impressions on one comment' },
  { icon: Users, text: '12 new connections in a month' },
  { icon: MessageSquare, text: 'Executive recruiter outreach · $270K SGD' },
  { icon: BarChart3, text: '2,897 post reactions' },
  { icon: Star, text: '751+ comment impressions' },
  { icon: Award, text: 'Featured in industry conversations' },
  { icon: TrendingUp, text: '10× faster LinkedIn growth' },
  { icon: Users, text: '500+ connection milestone' },
];

const repeated = [...items, ...items, ...items, ...items];

export default function ProofBar() {
  return (
    <div className="border-y border-[#0F1419]/[0.07] bg-[#EDE8E2] py-4 overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#EDE8E2] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#EDE8E2] to-transparent pointer-events-none" />

      <div className="ticker-track">
        {repeated.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-8 whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5 text-[#1E86D4] flex-shrink-0" />
              <span className="text-sm text-[#0F1419]/55 font-medium">{item.text}</span>
              <span className="w-1 h-1 rounded-full bg-[#0F1419]/20 flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
