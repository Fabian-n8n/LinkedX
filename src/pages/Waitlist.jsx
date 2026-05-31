import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Linkedin,
  LoaderCircle,
  Mail,
  MessageSquare,
  User,
  Zap,
} from 'lucide-react';

const roles = [
  'Founder / CEO',
  'Product Manager',
  'Engineer / Developer',
  'Designer',
  'Sales / BD',
  'Recruiter',
  'Content Creator',
  'Job Seeker',
  'Other',
];

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    linkedin: '',
    role: '',
    useCase: '',
  });
  const roleMenuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target)) {
        setRoleMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setRoleMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleChange = (e) => {
    setErrorMessage('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setErrorMessage('');
    setForm((currentForm) => ({ ...currentForm, role }));
    setRoleMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      setErrorMessage('Please choose the role that best fits you.');
      setRoleMenuOpen(true);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          signupSource: window.location.href,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong while saving your spot.');
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong while saving your spot.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080F] flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-5 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center">
              <span className="text-white font-black text-xs">LX</span>
            </div>
            <span className="font-bold text-white tracking-tight">
              Linked<span className="text-[#1E86D4]">X</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0A66C2]/12 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0A66C2]/08 blur-3xl rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        {!submitted ? (
          <div className="w-full max-w-lg">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-[#0A66C2]/10 border border-[#0A66C2]/25 rounded-full px-4 py-1.5 mb-6">
                <Zap className="w-3.5 h-3.5 text-[#1E86D4]" />
                <span className="text-[#1E86D4] text-xs font-semibold">Beta Access · Limited Spots</span>
              </div>

              <h1 className="font-black text-white leading-[1.05] tracking-[-0.04em] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Join the LinkedX
                <br />
                <span className="text-gradient-accent">Waitlist</span>
              </h1>
              <p className="text-white/50 leading-[1.7]">
                Be first in line when we launch. Founding members get 50% off — forever.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 flex flex-col gap-5"
            >
              {errorMessage ? (
                <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-100">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <p className="leading-6">{errorMessage}</p>
                </div>
              ) : null}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Fabian Wong"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#0A66C2]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#0A66C2]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                  <input
                    type="text"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/yourprofile"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#0A66C2]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">
                  Your Role
                </label>
                <div className="relative" ref={roleMenuRef}>
                  <button
                    type="button"
                    onClick={() => setRoleMenuOpen((open) => !open)}
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all ${
                      roleMenuOpen
                        ? 'border-[#1E86D4]/60 bg-[#0D1221] shadow-[0_0_0_1px_rgba(30,134,212,0.15),0_18px_48px_rgba(10,102,194,0.16)]'
                        : 'border-white/[0.08] bg-white/[0.04] hover:border-white/[0.14] hover:bg-white/[0.06]'
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={roleMenuOpen}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,158,255,0.08),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                      <Briefcase className="h-4 w-4 text-[#73B7FF]" />
                    </div>
                    <div className="relative min-w-0 flex-1">
                      <p className={`truncate text-sm font-medium ${form.role ? 'text-white' : 'text-white/35'}`}>
                        {form.role || 'Select your role'}
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        Pick the role that best matches how you use LinkedIn.
                      </p>
                    </div>
                    <ChevronDown
                      className={`relative h-4 w-4 shrink-0 text-white/40 transition-transform ${roleMenuOpen ? 'rotate-180 text-white/70' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {roleMenuOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0F1A]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                      >
                        <div className="mb-2 px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/30">
                          Choose your role
                        </div>
                        <div className="space-y-1">
                          {roles.map((role) => {
                            const active = form.role === role;

                            return (
                              <button
                                key={role}
                                type="button"
                                onClick={() => handleRoleSelect(role)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                                  active
                                    ? 'bg-[#0A66C2]/18 text-white shadow-[inset_0_0_0_1px_rgba(30,134,212,0.2)]'
                                    : 'text-white/78 hover:bg-white/[0.06] hover:text-white'
                                }`}
                                role="option"
                                aria-selected={active}
                              >
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                    active
                                      ? 'border-[#1E86D4]/30 bg-[#0A66C2]/20 text-[#7DBFFF]'
                                      : 'border-white/[0.08] bg-white/[0.03] text-white/30'
                                  }`}
                                >
                                  {active ? <Check className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                                </div>
                                <span className="flex-1 truncate text-left font-medium">{role}</span>
                                {active ? (
                                  <span className="rounded-full border border-[#1E86D4]/25 bg-[#0A66C2]/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7DBFFF]">
                                    Selected
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Use case */}
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">
                  What do you want to achieve on LinkedIn? <span className="text-white/25 normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/25" />
                  <textarea
                    name="useCase"
                    value={form.useCase}
                    onChange={handleChange}
                    rows={3}
                    placeholder="E.g. grow my network, get more inbound recruiter interest, establish thought leadership..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#0A66C2]/50 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className={`btn-primary mt-2 w-full justify-center py-4 text-base transition-opacity ${
                  submitting ? 'cursor-not-allowed opacity-80' : ''
                }`}
              >
                {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {submitting ? 'Saving Your Spot...' : 'Claim My Spot'}
              </button>

              <p className="text-center text-xs text-white/25">
                No spam. No credit card required. Early access only.
              </p>
            </motion.form>
          </div>
        ) : (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full bg-[#0A66C2]/15 border border-[#0A66C2]/30 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-9 h-9 text-[#1E86D4]" />
            </div>

            <h2 className="font-black text-white text-4xl tracking-[-0.04em] mb-4">
              You're on the list! 🎉
            </h2>
            <p className="text-white/50 leading-[1.7] mb-8">
              We'll email you at <strong className="text-white">{form.email}</strong> when your access is ready. As a founding member, you'll get 50% off — permanently.
            </p>

            <div className="glass-card-accent p-5 rounded-2xl mb-8 text-left">
              <p className="text-white/60 text-sm leading-[1.7]">
                <strong className="text-white">While you wait:</strong> The single best thing you can do right now is post on LinkedIn consistently. Even 2 posts/week signals to the algorithm that you're active. LinkedX will multiply that once you're in.
              </p>
            </div>

            <Link to="/" className="btn-outline inline-flex">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
