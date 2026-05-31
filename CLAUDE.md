# LinkedX — Claude Code Context

## Project
LinkedIn automation AI SaaS landing page. Auto-comments, auto-posts, industry targeting.

## Stack
- **Framework**: Vite 5 + React 18 (JSX, no TypeScript)
- **Styling**: Tailwind CSS v3 with custom tokens
- **Animation**: Framer Motion 11
- **Routing**: React Router v6
- **UI primitives**: Radix UI (accordion, dialog, slot)
- **Icons**: Lucide React
- **Font**: Outfit (Google Fonts CDN)

## Design Tokens
```
--accent: #0A66C2       (LinkedIn blue)
--accent-light: #1E86D4
--bg: #07080F
--bg-elevated: #0C0E1A
--bg-card: #0F1120
```

## Path Alias
`@/` → `./src/` (configured in vite.config.js)

## Key Components
- `src/pages/Home.jsx` — Landing page (all sections)
- `src/pages/Waitlist.jsx` — Waitlist form page
- `src/components/Hero.jsx` — 3D laptop + LinkedIn mockup
- `src/components/ScrollStory.jsx` — Scroll-linked notification story (400vh sticky section)
- `src/components/Features.jsx` — 6 feature cards with hover
- `src/components/Stats.jsx` — Count-up stats
- `src/components/HowItWorks.jsx` — 3 steps
- `src/components/Pricing.jsx` — 3 pricing tiers
- `src/components/FooterCTA.jsx` — Final CTA
- `src/components/Footer.jsx`
- `src/components/ProofBar.jsx` — Ticker marquee

## Git
- GitHub: https://github.com/Fabian-n8n/LinkedX
- Deploy: Vercel
