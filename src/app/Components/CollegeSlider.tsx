'use client'

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Download, Star } from 'lucide-react'
import { useAdminColleges } from '@/hooks/useAdminColleges'

interface AdminCollege {
  _id: string
  id: string
  name: string
  slug: string
  country_ref: {
    _id: string
    name: string
    slug: string
  }
  city_ref: {
    _id: string
    name: string
    slug: string
  }
  collegeImage: string
  totalFees: string
  ranking: {
    nirf: number
    year: number
  }
  totalCourses: number
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface CollegeCardProps {
  college: AdminCollege
}

// ===== Card =====
const CollegeCard = memo<CollegeCardProps>(({ college }) => {
  return (
    <div className="shrink-0 w-[280px] sm:w-[300px] lg:w-[320px] px-2">
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">

        {/* Image */}
        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
          {college.collegeImage ? (
            <img
              src={college.collegeImage}
              alt={college.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-200" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* College Logo Placeholder */}
          <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
            <div className="w-6 h-6 bg-slate-300 rounded" />
          </div>

          {/* College Name & Location on Image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-base sm:text-lg font-bold mb-1 line-clamp-2">
              {college.name}
            </h3>
            <div className="flex items-center gap-1 text-[12px] text-white/90">
              <MapPin size={12} />
              <span>{college.city_ref.name}, {college.country_ref.name}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Fees */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Total Fees</span>
            <span className="text-sm font-bold text-slate-800">₹{college.totalFees || '2.5L'}</span>
          </div>

          {/* Ranking */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Ranking</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-blue-600">nirf</span>
              <span className="text-sm font-bold text-slate-800">#{college.ranking?.nirf || '45'}</span>
              <span className="text-xs text-slate-500">in {college.ranking?.year || '2024'}</span>
            </div>
          </div>

          {/* Courses */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Total Courses</span>
            <span className="text-sm font-bold text-slate-800">{college.totalCourses || '25'}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < (college.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
              />
            ))}
            <span className="text-xs text-slate-600 ml-1">{college.rating || '4.0'}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <Link 
              href={`/colleges/${college.slug}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
            >
              View Details
            </Link>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={16} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

CollegeCard.displayName = 'CollegeCard'

// ===== Slider Hooks =====
const useSlider = (maxIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  return { currentIndex, handleNext, handlePrev }
}

const useResponsiveItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else setItemsPerView(3)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return itemsPerView
}

// ===== Main Component =====
const CollegeSlider = () => {
  const itemsPerView = useResponsiveItemsPerView()

  const { data: collegesData, isLoading: collegesLoading, error } = useAdminColleges({
    page: 1,
    limit: 1000
  })

  const indianColleges = useMemo(() => {
    return collegesData?.colleges?.filter(college => college.country_ref.slug === 'india') || []
  }, [collegesData?.colleges])

  const maxIndex = Math.max(0, indianColleges.length - itemsPerView)
  const { currentIndex, handleNext, handlePrev } = useSlider(maxIndex)

  const categories = [
    'All', 'B.E./B.Tech', 'MBA/PGDM', 'MBBS', 'BCA', 'B.Com', 'B.Sc.', 'B.A.', 'BBA', 'M.E./M.Tech', 'MCA'
  ]

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
              Top Colleges in India 2026
            </h2>
            <p className="text-slate-500 text-sm">
              Find top colleges across India's educational hubs.
            </p>
          </div>

          {/* List View Button */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <span className="text-sm font-medium text-slate-700">List View</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative">
          {collegesLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">Failed to load colleges</div>
          ) : indianColleges.length > 0 ? (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-4"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {indianColleges.map(college => (
                  <CollegeCard key={college._id} college={college} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">No colleges available</div>
          )}

          {/* Arrows */}
          {indianColleges.length > itemsPerView && (
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all pointer-events-auto"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all pointer-events-auto"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CollegeSlider
