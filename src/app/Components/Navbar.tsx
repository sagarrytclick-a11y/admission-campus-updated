"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFormModal } from "@/context/FormModalContext";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import { useContactInfo, createMailtoLink, createTelLink } from "@/hooks/useContactInfo";

// Color Theme Definition
const theme = {
  primary: '#FFC107',      // Yellow from logo
  secondary: '#007BFF',    // Blue from logo
  accent: '#FF6B35',       // Orange accent
  dark: '#12141D',         // Dark background
  light: '#F8FAFC',        // Light text
  muted: '#94A3B8',        // Muted text
  cardBg: '#1E212B',       // Card background
};

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [collegeTypeOpen, setCollegeTypeOpen] = useState(false);
  const [allCollegesOpen, setAllCollegesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileCollegesOpen, setMobileCollegesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useFormModal();

  // Get contact info dynamically
  const { emails, phones, address } = useContactInfo();

  // Fetch categories from API
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Ref to store timeout IDs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCollegeTypeMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a small delay before opening
    timeoutRef.current = setTimeout(() => {
      setCollegeTypeOpen(true);
    }, 100);
  };

  const handleCollegeTypeMouseLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a small delay before closing
    timeoutRef.current = setTimeout(() => {
      setCollegeTypeOpen(false);
    }, 100);
  };

  const handleToolsMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a small delay before opening
    timeoutRef.current = setTimeout(() => {
      setToolsOpen(true);
    }, 100);
  };

  const handleToolsMouseLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a small delay before closing
    timeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 100);
  };

  const collegeTypes = [
    ...(categories?.map(category => ({
      name: `${category.name} Colleges`,
      href: `/colleges/category/${category.slug}`
    })) || []),
    { name: "All Colleges", href: "/colleges" },
  ];

  const collegeLocations = [
    { name: "Mumbai Colleges", href: "/colleges/city/mumbai" },
    { name: "Delhi Colleges", href: "/colleges/city/delhi" },
    { name: "Bangalore Colleges", href: "/colleges/city/bangalore" },
    { name: "Hyderabad Colleges", href: "/colleges/city/hyderabad" },
    { name: "Chennai Colleges", href: "/colleges/city/chennai" },
    { name: "Pune Colleges", href: "/colleges/city/pune" },
  ];

  const toolsOptions = [
    { name: "Compare Colleges", href: "/compare" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      {/* Top Strip with Contact Info */}
      <div className="hidden sm:block bg-[#007BFF] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href={createTelLink(phones.primary)} className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                <span>{phones.primary}</span>
              </a>
              <span className="text-yellow-300">|</span>
              <span className="flex items-center gap-2">
                <span>{address.office}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href={createMailtoLink(emails.info)} className="hover:text-yellow-300 transition-colors">
                {emails.info}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100  shadow-sm"
          : "bg-white "
          }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-1 group">
          <Image src="/logo.jpg" alt="Logo" width={70} height={70} />
          
        </Link>

        {/* DESKTOP NAV - DROPDOWNS */}
        <div className="hidden lg:flex items-center gap-1">

          {/* Home Link */}
          <Link
            href="/"
            className={`px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
              pathname === "/" ? "text-[#007BFF] bg-[#E3F2FD]" : "text-slate-700 hover:text-white hover:bg-[#007BFF]"
            }`}
          >
            Home
          </Link>

          {/* Colleges Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCollegeTypeMouseEnter}
            onMouseLeave={handleCollegeTypeMouseLeave}
          >
            <button
              className={`px-5 py-3 flex gap-2 items-center rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${pathname?.includes("/colleges/")
                ? "text-[#007BFF] bg-[#E3F2FD]"
                : "text-slate-700 hover:text-white hover:bg-[#007BFF]"
                }`}
            >
              College
              <ChevronDown size={14} className={`transition-transform ${collegeTypeOpen ? 'rotate-180' : ''}`} />
            </button>

            {collegeTypeOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-300 rounded-xl shadow-xl z-50">
                {collegeTypes.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-5 py-4 text-sm text-slate-700 hover:bg-[#007BFF] hover:text-white hover:rounded-lg transition-colors ${index === 0 ? 'rounded-t-xl' : index === collegeTypes.length - 1 ? 'rounded-b-xl' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Courses */}
          {/* Exams */}
          <Link
            href="/exams"
            className={`px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${pathname?.includes("/exams")
              ? "text-[#007BFF] bg-[#E3F2FD]"
              : "text-slate-700 hover:text-white hover:bg-[#007BFF]"
              }`}
          >
            Exam
          </Link>

          <Link
            href="/blogs"
            className={`px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${pathname?.includes("/blogs")
              ? "text-[#007BFF] bg-[#E3F2FD]"
              : "text-slate-700 hover:text-white hover:bg-[#007BFF]"
              }`}
          >
            Blogs
          </Link>

          {/* Contact Us */}
          <Link
            href="/contact"
            className={`px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
              pathname?.includes("/contact") ? "text-[#007BFF] bg-[#E3F2FD]" : "text-slate-700 hover:text-white hover:bg-[#007BFF]"
            }`}
          >
            Contact Us
          </Link>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleToolsMouseEnter}
            onMouseLeave={handleToolsMouseLeave}
          >
            <button
              className={`px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all flex items-center gap-2 ${pathname?.includes("/tools")
                ? "text-[#007BFF] bg-[#E3F2FD]"
                : "text-slate-700 hover:text-[#007BFF] hover:bg-slate-50"
                }`}
            >
              Tools
              <ChevronDown size={14} className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-slate-300 rounded-xl shadow-xl z-50">
                {toolsOptions.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-5 py-4 text-sm text-slate-700 hover:bg-[#007BFF] hover:text-white hover:rounded-lg transition-colors ${index === 0 ? 'rounded-t-xl' : index === toolsOptions.length - 1 ? 'rounded-b-xl' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={openModal}
            className="hidden md:flex items-center gap-2 bg-[#007BFF] text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-[#0056CC] transition-all active:scale-95 shadow-lg"
          >
            <span className="hidden sm:inline">Apply Now</span>
            <span className="sm:hidden">Apply</span>
            <ArrowRight size={14} className="hidden sm:block" />
          </button>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 sm:p-3 text-[#1E293B] hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu size={24} className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - ENHANCED */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden shadow-xl ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 max-h-[70vh] overflow-y-auto">
          {/* Quick Links */}
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`text-base sm:text-lg font-bold tracking-tight py-3 px-4 rounded-lg transition-colors ${pathname === "/" ? "text-[#007BFF] bg-[#E3F2FD]" : "text-slate-700 hover:bg-[#007BFF] hover:text-white"
                }`}
            >
              Home
            </Link>

            <Link
              href="/exams"
              onClick={() => setIsOpen(false)}
              className={`text-base sm:text-lg font-bold tracking-tight py-3 px-4 rounded-lg transition-colors ${pathname?.includes("/exams") ? "text-[#007BFF] bg-[#E3F2FD]" : "text-slate-700 hover:bg-[#007BFF] hover:text-white"
                }`}
            >
              Exams
            </Link>

            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className={`text-base sm:text-lg font-bold tracking-tight py-3 px-4 rounded-lg transition-colors ${pathname?.includes("/blogs") ? "text-[#007BFF] bg-[#E3F2FD]" : "text-slate-700 hover:bg-[#007BFF] hover:text-white"
                }`}
            >
              Updates
            </Link>
          </div>

          {/* Colleges Section */}
          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => setMobileCollegesOpen(!mobileCollegesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Colleges</h3>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${mobileCollegesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileCollegesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col gap-1 pt-2">
                {collegeTypes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => { setIsOpen(false); setMobileCollegesOpen(false); }}
                    className={`text-sm sm:text-base font-medium tracking-tight py-2.5 px-4 pl-8 rounded-lg transition-colors ${pathname === item.href ? "text-[#007BFF] bg-[#F8FAFC]" : "text-[#64748B] hover:bg-blue-500 hover:text-white hover:rounded-lg"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Section */}
          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Cities</h3>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${mobileCitiesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileCitiesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-2 gap-2 px-4 pt-2">
                {collegeLocations.slice(0, 6).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => { setIsOpen(false); setMobileCitiesOpen(false); }}
                    className={`text-xs sm:text-sm font-medium tracking-tight py-2 px-3 rounded-lg text-center transition-colors ${pathname === item.href ? "text-[#007BFF] bg-[#E3F2FD]" : "text-slate-500 hover:bg-[#007BFF] hover:text-white hover:rounded-lg"
                      }`}
                  >
                    {item.name.replace(' Colleges', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA Button */}
          <div className="border-t border-slate-100 pt-4 mt-2">
            <button
              onClick={() => { openModal(); setIsOpen(false); }}
              className="w-full bg-[#007BFF] text-white py-3 sm:py-3.5 rounded-lg font-bold uppercase text-xs sm:text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-[#0056CC] transition-all active:scale-95"
            >
              Start Application <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};