import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, User, Mail, Linkedin, Briefcase, MessageSquare } from 'lucide-react';

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
  const [form, setForm] = useState({
    name: '',
    email: '',
    linkedin: '',
    role: '',
    useCase: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: send to your backend / Airtable / Resend etc.
    setSubmitted(true);
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
                    type="url"
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
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#0A66C2]/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer"
                    style={{ color: form.role ? '#ffffff' : 'rgba(255,255,255,0.25)' }}
                  >
                    <option value="" disabled style={{ background: '#0F1120' }}>Select your role</option>
                    {roles.map((r) => (
                      <option key={r} value={r} style={{ background: '#0F1120', color: '#ffffff' }}>{r}</option>
                    ))}
                  </select>
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
                className="btn-primary w-full justify-center py-4 text-base mt-2"
              >
                <Zap className="w-4 h-4" />
                Claim My Spot
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
