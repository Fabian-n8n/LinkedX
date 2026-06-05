import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F5F1EC]/92 backdrop-blur-xl border-b border-[#0F1419]/[0.07]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
              <span className="text-white font-black text-sm tracking-tight">LX</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-[#0F1419]">
              Linked<span className="text-[#0A66C2]">X</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#0F1419]/55 hover:text-[#0F1419] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/waitlist"
              className="btn-primary text-sm py-2 px-5 hidden md:inline-flex"
            >
              <Zap className="w-3.5 h-3.5" />
              Join Waitlist
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#0F1419]/60 hover:text-[#0F1419] p-1"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#F5F1EC]/96 backdrop-blur-xl border-b border-[#0F1419]/[0.07] py-4 px-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#0F1419]/65 hover:text-[#0F1419] text-sm font-medium py-1"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/waitlist"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-sm py-2.5 justify-center mt-2"
            >
              <Zap className="w-3.5 h-3.5" />
              Join the Waitlist
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
