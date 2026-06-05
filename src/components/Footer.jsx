import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = {
  Product: ['How It Works', 'Features', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Brand Kit'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
  Connect: ['X / Twitter', 'LinkedIn', 'Instagram', 'Discord'],
};

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-[#0F1419]/[0.07] bg-[#EDE8E2]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">LX</span>
              </div>
              <span className="font-bold text-base tracking-tight text-[#0F1419]">
                Linked<span className="text-[#0A66C2]">X</span>
              </span>
            </Link>
            <p className="text-xs text-[#0F1419]/40 leading-[1.7] max-w-[180px]">
              Automate your LinkedIn growth. Build the network that builds your career.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category}>
              <div className="text-[10px] font-bold text-[#0F1419]/30 uppercase tracking-widest mb-4">
                {category}
              </div>
              {items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-sm text-[#0F1419]/45 hover:text-[#0F1419]/80 transition-colors duration-150 mb-2"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0F1419]/[0.07] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#0F1419]/30">© 2026 LinkedX. All rights reserved.</p>
          <p className="text-[11px] text-[#0F1419]/22 max-w-md text-center md:text-right leading-[1.6]">
            LinkedX is an independent product. Not affiliated with or endorsed by LinkedIn Corporation.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
