'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useFormModal } from "@/context/FormModalContext";
import { useCategories } from "@/hooks/useCategories";
import Image from 'next/image';

const ExploreTopCourses = () => {
  const { openModal } = useFormModal();
  const { data: categories, isLoading, error } = useCategories();

  // Fallback categories while loading or if API fails
  const fallbackCategories = [
    {
      title: "Engineering",
      description: "Explore B.Tech and M.Tech programs in top technical institutes.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/engineering",
      count: "5000+ Colleges"
    },
    {
      title: "Medical",
      description: "Find medical colleges for MBBS and healthcare specializations.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/medical",
      count: "850+ Colleges"
    },
    {
      title: "Management",
      description: "Discover business schools for MBA and leadership programs.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=60&w=500",
      href: "/colleges/management",
      count: "3200+ Colleges"
    }
  ];

  // Transform API data to match component structure
  const transformedCategories = categories?.map(category => ({
    title: category.name,
    description: category.description,
    image: category.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=60&w=500",
    href: `/colleges/category/${category.slug}`,
    count: "Popular Choice"
  })) || fallbackCategories;

  return (
    <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto font-sans text-[#1E293B]">

      {/* Header - Same as College Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[#007BFF] mb-3">
          <Sparkles size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Course Categories</span>
        </div>
        <h2 className="text-3xl text-[#1E293B] font-bold tracking-tight mb-3">Top Courses in India 2026</h2>
        <p className="text-[#64748B] text-sm max-w-2xl font-medium leading-relaxed">
          Select a category to find the best institutions and entrance exam guides for your academic journey.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border-2 border-slate-300 rounded-xl overflow-hidden bg-white">
              <div className="aspect-video w-full overflow-hidden bg-slate-50 border-b-2 border-slate-300">
                <div className="w-full h-full bg-slate-200 animate-pulse"></div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-24"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-16"></div>
                </div>
                <div className="h-12 bg-slate-200 rounded animate-pulse mb-6"></div>
                <div className="h-4 bg-slate-200 rounded animate-pulse w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load categories. Showing default categories.</p>
        </div>
      )}

      {/* Simple Card Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {transformedCategories.map((item: any, index: number) => (
            <Link key={index} href={item.href} className="group">
              <div className="border-2 border-slate-300 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/20 bg-white">

                {/* Image Section */}
                <div className="aspect-video w-full overflow-hidden bg-slate-50 border-b-2 border-slate-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Content Section */}
                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#1E293B]">{item.title}</h3>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-slate-100 border border-slate-300 px-2 py-1 rounded">
                      {item.count}
                    </span>
                  </div>

                  {/* FIXED: Line clamp limits to 3 lines and keeps height consistent */}
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                    {item.description}
                  </p>

                  <div className="flex items-center text-[#007BFF] text-sm font-bold gap-2 transition-colors">
                    View Colleges <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Simple Bottom Banner */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1">Need career guidance?</h3>
          <p className="text-[#64748B] text-sm font-medium">Talk to our experts for a personalized admission roadmap.</p>
        </div>
        <button onClick={() => openModal()} className="bg-[#1E293B] text-white px-6 sm:px-8 py-3 rounded-md text-sm font-bold hover:bg-[#007BFF] transition-colors active:scale-95 w-full sm:w-auto">
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default ExploreTopCourses