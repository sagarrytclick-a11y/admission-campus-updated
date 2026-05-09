"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Instagram, Linkedin, Twitter, ChevronUp, Sparkles } from 'lucide-react';
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from '@/context/FormModalContext';
import Image from 'next/image';

const Footer = () => {
  const { emails, phones, address } = useContactInfo();
  const { openModal } = useFormModal();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-[#12141D] text-[#94A3B8] pt-16 pb-8 px-6 font-sans relative overflow-hidden">
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-[#007BFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-1 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#007BFF]/50 transition-colors">
                <Image src="/logo.png" alt={SITE_IDENTITY.name} width={42} height={42} className="brightness-110" />
              </div>
              <span className="text-xl font-bold text-[#F8FAFC] tracking-tight">{SITE_IDENTITY.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              {SITE_IDENTITY.description} Leading the way in strategic education consulting for global leaders.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: MessageCircle, href: createWhatsAppLink(phones.primary) }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-9 h-9 rounded-md bg-[#1E212B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#007BFF] hover:border-[#007BFF] transition-all">
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF]" /> Explore
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { name: "Top Colleges", href: "/colleges" },
                { name: "Entrance Exams", href: "/exams" },
                { name: "Success Stories", href: "/testimonials" },
                { name: "Resource Hub", href: "/blogs" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#007BFF] transition-colors flex items-center group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2 text-[#007BFF]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Details */}
          <div>
            <h4 className="text-[#F8FAFC] font-semibold text-sm mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007BFF]" /> Contact
            </h4>
            <div className="space-y-4 text-sm">
              <a href={createTelLink(phones.primary)} className="flex items-center gap-3 hover:text-[#F8FAFC] transition-colors group">
                <Phone size={16} className="text-[#007BFF]" />
                <span>{phones.primary}</span>
              </a>
              <a href={createMailtoLink(emails.info)} className="flex items-center gap-3 hover:text-[#F8FAFC] transition-colors group">
                <Mail size={16} className="text-[#007BFF]" />
                <span className="lowercase">{emails.info}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#007BFF] shrink-0 mt-1" />
                <span className="leading-snug">{address.full}</span>
              </div>
            </div>
          </div>

          {/* 4. CTA Card */}
          <div className="bg-[#1E212B] p-6 rounded-xl border border-white/5 shadow-2xl relative group">
            <Sparkles className="absolute top-4 right-4 text-[#007BFF]/20 group-hover:text-[#007BFF] transition-colors" size={20} />
            <h4 className="text-[#F8FAFC] font-bold text-sm mb-2">Ready to Start?</h4>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">Book a 1-on-1 session with our expert academic advisors today.</p>
            <button 
              onClick={openModal}
              className="w-full bg-[#007BFF] hover:bg-[#007BFF] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#007BFF]/10 active:scale-95"
            >
              Consult Now <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Single Line Style */}
        <div className="pt-8 border-t border-white/5 space-y-6">
          {/* Main Footer Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-[11px] font-medium tracking-wide">
                © {new Date().getFullYear()} <span className="text-[#F8FAFC]">{SITE_IDENTITY.name}</span>
              </p>
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold">
                <Link href="/privacy" className="hover:text-[#007BFF]">Privacy</Link>
                <Link href="/term" className="hover:text-[#007BFF]">Terms and Condition</Link>
                <Link href="/contact" className="hover:text-[#007BFF]">Sitemap</Link>
              </div>
            </div>
          </div>
          
          {/* Enhanced Disclaimer Section */}
          <div className="bg-[#1E212B]/50 rounded-lg p-4 border border-white/5">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-[#007BFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#007BFF]"></div>
              </div>
              <h5 className="text-[#F8FAFC] font-bold text-xs uppercase tracking-wider">Important Disclaimer</h5>
            </div>
            <div className="space-y-2 text-[10px] leading-relaxed text-[#94A3B8]">
              <p>
                <span className="text-[#F8FAFC] font-semibold">Educational Guidance Only:</span> Admission Campus provides educational consulting and guidance services. We do not guarantee admissions, placements, or visa approvals.
              </p>
              <p>
                <span className="text-[#F8FAFC] font-semibold">Third-Party Institutions:</span> Information about colleges, courses, and fees is sourced from institutional websites and official publications. Users must verify all details directly with respective institutions.
              </p>
              <p>
                <span className="text-[#F8FAFC] font-semibold">No Authority Claims:</span> We are not authorized by any government body, university, or educational board. Our role is limited to advisory and application assistance.
              </p>
              <p className="pt-2 border-t border-white/10">
                <span className="text-[#00D4FF] font-semibold">Decision Responsibility:</span> All academic and financial decisions remain solely the user's responsibility. We recommend thorough research before commitments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-13 left-8 w-11 h-11 bg-[#007BFF] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#007BFF] hover:-translate-y-1 transition-all z-50 active:scale-90"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
