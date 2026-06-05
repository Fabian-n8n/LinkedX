import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Do I need LinkedIn Premium for this to work?',
    answer:
      "Nope. This works completely fine on a free LinkedIn account, that's actually how most of our beta users run it. If you do have Premium or Sales Navigator, it works the same way, just gives you a bit more reach for finding people to engage with. Premium is a LinkedIn thing, not a us thing.",
  },
  {
    question: 'How long does setup take?',
    answer:
      "We're in beta, so onboarding is hands-on. Once you sign up, we set everything up for you within 3 business days. That includes tuning the AI to your voice, connecting your LinkedIn safely, and picking the people and topics you want to engage with. After that, it runs on its own.",
  },
  {
    question: 'Will this get my LinkedIn account banned?',
    answer:
      "No. We built this specifically to behave like a real person organically using LinkedIn every day. Comments go out in small batches with natural timing gaps — never in bulk, never spamming. Everything looks like genuine manual engagement, because to LinkedIn, that's exactly what it is. Your account stays completely safe.",
  },
  {
    question: 'Does it actually sound like me, or like a bot?',
    answer:
      "That's the whole point of how we built this. The AI learns your voice from your existing posts and the way you actually write. Most people who read our beta users' comments can't tell they're automated. If you want to see real examples before signing up, just ask.",
  },
  {
    question: 'Can I review comments before they get posted?',
    answer:
      "Yes. By default, every comment goes through an approval queue in your dashboard before it's posted. You can flip on auto-posting once you trust how it sounds, or keep approval on forever. Whatever feels right for you.",
  },
  {
    question: "What if I don't like a comment it writes?",
    answer:
      'Reject it, edit it, or regenerate it. The AI also learns from your edits, so the more you tweak, the closer it gets to your voice. Most users find they barely edit after the first week or two.',
  },
  {
    question: 'How many comments per day is safe?',
    answer:
      "We cap at 20 per day on Starter and unlimited on Growth, but in practice we recommend 10-15 to stay natural. LinkedIn's algorithm rewards consistency more than volume, so quality wins over quantity.",
  },
  {
    question: 'Can I choose who I want to engage with?',
    answer:
      'Yes. You give us a list of people whose audience you want to be in front of, or specific topics and keywords. We track their posts daily and engage with the ones most relevant to you. You can update this list anytime.',
  },
  {
    question: 'What happens during the free trial?',
    answer:
      'Full access to everything in the plan you picked, no credit card needed to start. After 30 days, you decide if you want to keep going. No surprise charges, no auto-billing tricks.',
  },
  {
    question: 'Why is this priced lower than tools like Taplio?',
    answer:
      "Because we're in beta and we're building this carefully with a small group of users. Early supporters get to lock in founding rates that won't change even when we raise prices publicly later. It's a fair trade: you take a chance on us, we treat you like a partner.",
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. No contracts, no hidden fees, no "please don\'t go" emails. Cancel in one click whenever you want.',
  },
  {
    question: "I'm a financial advisor / lawyer / regulated industry. Is this safe for me?",
    answer:
      "Yes, with one caveat: you'll want to make sure your AI is set up to never give advice or recommendations in comments. We handle this during setup by training the voice profile with compliance guardrails. Several of our beta users are in regulated industries.",
  },
  {
    question: 'Do you handle posts too, or just comments?',
    answer:
      'Both. Starter includes 15 AI-drafted posts a month, Growth includes 30 (one a day). They get drafted, you approve, then they get published on the schedule you pick. Same voice as your comments.',
  },
  {
    question: 'What if I have more questions before signing up?',
    answer:
      "Just send us a message. Right now we manually onboard every user, so you'll actually talk to a real person (probably me) before anything gets set up.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="px-6 pb-32">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading mb-4 text-center">
            Questions you probably have.
          </h2>
          <p className="section-subtext mx-auto text-center">
            A quick pass through the questions people usually ask before joining.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-y border-[#0F1419]/[0.08]"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-white/[0.08] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center justify-between gap-6 px-8 py-6 text-left transition-colors duration-200 ease-out hover:bg-[#0F1419]/[0.03] max-sm:px-5 max-sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg font-semibold leading-snug transition-colors duration-200 ease-out ${
                      isOpen ? 'text-[#0F1419]' : 'text-[#0F1419]/70 group-hover:text-[#0F1419]'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`relative h-5 w-5 shrink-0 transition-transform duration-200 ease-out ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[#0F1419]/60" />
                    <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-[#0F1419]/60" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-6 text-[15px] leading-[1.75] text-[#0F1419]/60 max-sm:px-5 max-sm:text-sm">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
