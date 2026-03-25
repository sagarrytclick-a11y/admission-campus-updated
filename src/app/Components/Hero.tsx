import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Star, GraduationCap, Building2, BookOpen, Search, ChevronLeft, ChevronRight, Phone, MapPin } from "lucide-react";
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
  [key: string]: any; // Allow additional properties
}

interface SearchResponse {
  results: SearchResult[];
}

// UI matched to reference (glass panel centered, horizontal stat pills, wide search)
// Content kept SAME
// Brand colors used for buttons/headings: Blue #5B7DBA, Red #E94133, Yellow #F6C21C

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { openModal } = useFormModal();

  // Search functionality - search colleges, courses, and exams
  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ["hero-search", searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 2) return { results: [] };
      
      // Search colleges
      const collegeRes = await fetch(`/api/colleges?search=${searchQuery}`);
      const colleges = await collegeRes.json();
      
      // Search courses (you may need to create this API endpoint)
      const courseRes = await fetch(`/api/courses?search=${searchQuery}`);
      const courses = courseRes.ok ? await courseRes.json() : { data: [] };
      
      // Search exams (you may need to create this API endpoint)
      const examRes = await fetch(`/api/exams?search=${searchQuery}`);
      const exams = examRes.ok ? await examRes.json() : { data: [] };
      
      // Combine all results
      const allResults = [
        ...(colleges.data?.colleges || []).map((item: any) => ({ ...item, type: 'college' })),
        ...(courses.data || []).map((item: any) => ({ ...item, type: 'course' })),
        ...(exams.data || []).map((item: any) => ({ ...item, type: 'exam' }))
      ];
      
      return { results: allResults };
    },
    enabled: searchQuery.length >= 2,
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
    { number: "200+", label: "Online Courses", icon: GraduationCap },
    { number: "200+", label: "Courses", icon: Star }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Arrows */}
      <button
        onClick={handlePreviousImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full text-white hover:bg-white/30 z-20"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-3 rounded-full text-white hover:bg-white/30 z-20"
      >
        <ChevronRight size={22} />
      </button>

      {/* Center Glass Panel */}
      <div className="relative z-10 w-full px-4">
        <div className="max-w-4xl mx-auto bg-white/8 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-7 shadow-2xl">

          {/* Heading */}
          <h1 className="text-xl md:text-3xl font-bold text-white text-center mb-2">
            Explore Top Colleges, Exams, Results & More
          </h1>

          <p className="text-white/85 text-center mb-5 text-xs md:text-sm">
            Explore 200+ Complete admission guidance for Engineering, Management, and Medical across India
          </p>

          {/* Horizontal Stat Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-5">
            {statistics.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur px-4 py-2 rounded-full text-white"
              >
                <stat.icon size={16} />
                <span className="font-semibold">{stat.number}</span>
                <span className="text-white/80 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Wide Search Bar */}
          <div className="max-w-2xl mx-auto mb-5 relative">
            <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="pl-4 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length >= 2);
                }}
                onFocus={() => setShowSearchResults(searchQuery.length >= 2)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                placeholder="Search Colleges, Courses, Exams, Questions and Article"
                className="flex-1 px-3 py-3 outline-none text-gray-700 text-sm"
              />
              <button className="px-8 py-3 font-semibold text-white text-sm" style={{ backgroundColor: '#007BFF' }}>
                Search
              </button>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchLoading ? (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    Searching...
                  </div>
                ) : searchResultsData.length > 0 ? (
                  searchResultsData.map((item: SearchResult) => (
                    <Link
                      key={`${item.type}-${item.id || item._id}`}
                      href={
                        item.type === 'college' ? `/colleges/${item.slug}` :
                        item.type === 'course' ? `/courses/${item.slug}` :
                        `/exams/${item.slug}`
                      }
                      className="block p-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* College Image */}
                          {item.type === 'college' && item.banner_url && (
                            <img
                              src={item.banner_url}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                item.type === 'college' ? 'bg-blue-100 text-blue-700' :
                                item.type === 'course' ? 'bg-green-100 text-green-700' :
                                'bg-orange-100 text-orange-700'
                              }`}>
                                {item.type === 'college' ? 'College' : 
                                 item.type === 'course' ? 'Course' : 'Exam'}
                              </span>
                              <h4 className="text-sm font-semibold text-slate-800 truncate">
                                {item.name}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                              {item.city || item.location || 'Various locations'}
                            </p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-slate-400 flex-shrink-0" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-5">
            <Link href="/colleges">
              <button
                className="text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg"
                style={{ backgroundColor: '#007BFF' }}
              >
                Find Top Colleges
                <ArrowRight size={16} />
              </button>
            </Link>

            <button
              onClick={() => openModal()}
              className="px-6 py-3 rounded-lg font-semibold border text-white"
              style={{ borderColor: '#F6C21C' }}
            >
              Counseling 2026
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-white/20">
            {["Entrance Support", "Rank Prediction", "Direct Admissions", "Placement Stats"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-xs md:text-sm text-white/90">
                <CheckCircle2 size={14} style={{ color: '#F6C21C' }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Call */}
  

      {/* Bottom Location */}
      <div className="absolute bottom-6 left-6 text-white/90 text-sm flex items-center gap-2 z-20">
        <MapPin size={16} />
        IIT Delhi - Indian Institute of Technology
      </div>
    </section>
  );
}
