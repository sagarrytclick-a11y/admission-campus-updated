import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, CheckCircle2, Star, GraduationCap, Building2, BookOpen, Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useFormModal } from "@/context/FormModalContext";
import { useQuery } from "@tanstack/react-query";

// Search result interfaces
interface SearchResult {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  type: 'college' | 'course' | 'exam';
  city?: string;
  location?: string;
  banner_url?: string;
  short_name?: string;
  exam_type?: string;
  next_date?: string;
  [key: string]: any;
}

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { openModal } = useFormModal();

  // Debounced search query
  const debouncedSearchQuery = useMemo(() => {
    const timer = setTimeout(() => searchQuery, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ["hero-search", searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 2) return { results: [] };
      
      // Use Promise.allSettled for parallel API calls
      const [collegeRes, courseRes, examRes] = await Promise.allSettled([
        fetch(`/api/colleges?search=${searchQuery}`),
        fetch(`/api/courses?search=${searchQuery}`),
        fetch(`/api/exams?search=${searchQuery}`)
      ]);
      
      const colleges = collegeRes.status === 'fulfilled' ? await collegeRes.value.json() : { data: [] };
      const courses = courseRes.status === 'fulfilled' ? await courseRes.value.json() : { data: [] };
      const exams = examRes.status === 'fulfilled' ? await examRes.value.json() : { data: [] };
      
      const allResults = [
        ...(colleges.data?.colleges || []).map((item: any) => ({ ...item, type: 'college' })),
        ...(courses.data || []).map((item: any) => ({ ...item, type: 'course' })),
        ...(exams.data || []).map((item: any) => ({ ...item, type: 'exam' }))
      ];
      return { results: allResults };
    },
    enabled: searchQuery.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes cache
  });

  const searchResultsData = searchResults?.results || [];

  const backgroundImages = [
    "https://i.pinimg.com/1200x/da/8f/47/da8f47cf9c6db275c88cca998391f085.jpg",
    "https://images.unsplash.com/20/cambridge.JPG?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8dW5pdmVyc2l0eXxlbnwwfHx8fDE3NzQzMjE3NjJ8MA&ixlib=rb-4.1.0",
    "https://i.pinimg.com/1200x/87/0a/9f/870a9fd2c38d42373301bd563c4c055b.jpg",
    "https://i.pinimg.com/1200x/65/6e/87/656e8757b34f7099081d51dbc94d71a1.jpg",
    "https://i.pinimg.com/1200x/ed/21/1a/ed211af9cf3ac35dbf625c7042a36b4b.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  const statistics = [
    { number: "6000+", label: "Institutions", icon: Building2 },
    { number: "200+", label: "Exams", icon: BookOpen },
    { number: "200+", label: "Online", icon: GraduationCap },
    { number: "200+", label: "Courses", icon: Star }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-0">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`College Campus ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Arrows - Hidden on mobile for better UX */}
      <button
        onClick={handlePreviousImage}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full text-white hover:bg-white/30 z-20"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNextImage}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full text-white hover:bg-white/30 z-20"
      >
        <ChevronRight size={22} />
      </button>

      {/* Center Glass Panel */}
      <div className="relative z-10 w-full px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-white text-center mb-3 leading-tight">
            Explore Top Colleges, Exams, Results & More
          </h1>

          <p className="text-white/80 text-center mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Explore 200+ Complete admission guidance for Engineering, Management, and Medical across India
          </p>

          {/* Stat Pills - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
            {statistics.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-white justify-center md:justify-start"
              >
                <stat.icon size={16} className="text-yellow-400" />
                <div className="flex flex-col md:flex-row md:gap-1 items-center">
                  <span className="font-bold text-sm md:text-base">{stat.number}</span>
                  <span className="text-white/60 text-[10px] md:text-xs md:mt-0.5">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Wide Search Bar - Stacks on mobile */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1 md:p-0">
              <div className="flex items-center flex-1 px-4 py-3 md:py-0">
                <Search size={20} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length >= 2);
                  }}
                  onFocus={() => setShowSearchResults(searchQuery.length >= 2)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  placeholder="Search Colleges, Courses, Exams..."
                  className="flex-1 px-3 py-2 outline-none text-gray-700 text-sm md:text-base"
                />
              </div>
              <button className="px-8 py-3.5 font-bold text-white transition-colors rounded-xl md:rounded-none" style={{ backgroundColor: '#007BFF' }}>
                Search
              </button>
            </div>

            {/* Dropdown - Mobile Responsive */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 max-h-[60vh] overflow-y-auto">
                {searchLoading ? (
                  <div className="p-6 text-center text-slate-500 text-sm italic">Searching...</div>
                ) : searchResultsData.length > 0 ? (
                  searchResultsData.map((item: SearchResult) => (
                    <Link
                      key={`${item.type}-${item.id || item._id}`}
                      href={item.type === 'college' ? `/colleges/${item.slug}` : item.type === 'course' ? `/courses/${item.slug}` : `/exams/${item.slug}`}
                      className="block p-4 hover:bg-slate-50 border-b border-slate-100 last:border-none"
                    >
                      <div className="flex items-center gap-4">
                        {item.type === 'college' && item.banner_url && (
                          <img src={item.banner_url} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.type === 'college' ? 'bg-blue-100 text-blue-700' : item.type === 'course' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {item.type}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-800 truncate mt-1">{item.name}</h4>
                        </div>
                        <ArrowRight size={16} className="text-slate-300" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-500 text-sm">No results found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons - Full width on mobile */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/colleges" className="w-full sm:w-auto">
              <button
                className="w-full text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: '#007BFF' }}
              >
                Find Top Colleges
                <ArrowRight size={18} />
              </button>
            </Link>

            <button
              onClick={() => openModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border-2 text-white transition-all hover:bg-white/10 active:scale-95"
              style={{ borderColor: '#F6C21C' }}
            >
              Counseling 2026
            </button>
          </div>

          {/* Value Props - Grid adjust */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/20">
            {["Entrance Support", "Rank Prediction", "Direct Admissions", "Placement Stats"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-[11px] md:text-xs text-white/90">
                <CheckCircle2 size={14} className="shrink-0" style={{ color: '#F6C21C' }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Location - Hidden on small mobile to avoid clutter */}
      <div className="hidden sm:flex absolute bottom-6 left-6 text-white/70 text-xs items-center gap-2 z-20 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
        <MapPin size={14} />
        IIT Delhi - Indian Institute of Technology
      </div>
    </section>
  );
}

export default React.memo(Hero);