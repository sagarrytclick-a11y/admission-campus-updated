'use client'

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdminCities } from '@/hooks/useAdminCities'

// UI restyled to match kollegeapply look
// - Softer section background
// - Compact modern cards
// - Image-first layout
// - Floating arrow controls
// - Same DATA & CONTENT (no logic change)
// - Brand colors preserved

interface AdminCity {
  _id: string
  id: string
  name: string
  slug: string
  country_ref: {
    _id: string
    name: string
    slug: string
  }
  description: string
  cityImage: string
  features: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface CityCardProps {
  city: AdminCity
}

// ===== Card =====
const CityCard = memo<CityCardProps>(({ city }) => {
  return (
    <div className="shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] px-2">
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">

        {/* Image */}
        <div className="relative h-36 sm:h-40 lg:h-44 overflow-hidden">
          {city.cityImage ? (
            <img
              src={city.cityImage}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-200" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* City Name on Image */}
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-sm sm:text-base font-semibold tracking-wide">
              {city.name}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-white/85">
              <MapPin size={12} /> India
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
            Top Colleges Available
          </p>

          <Link href={`/colleges/city/${city.slug}`}>
            <div className="flex items-center justify-between text-sm font-semibold group/link">
              <span className="text-[#5B7DBA] group-hover/link:text-[#4a69a8] transition-colors">
                View Colleges
              </span>
              <ArrowRight
                size={16}
                className="text-[#5B7DBA] group-hover/link:translate-x-1 transition-all"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
})

CityCard.displayName = 'CityCard'

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
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else if (window.innerWidth < 1280) setItemsPerView(3)
      else setItemsPerView(4)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return itemsPerView
}

// ===== Main Component =====
const CitySlider = () => {
  const itemsPerView = useResponsiveItemsPerView()

  const { data: citiesData, isLoading: citiesLoading, error } = useAdminCities({
    page: 1,
    limit: 1000
  })

  const indianCities = useMemo(() => {
    return citiesData?.cities?.filter(city => city.country_ref.slug === 'india') || []
  }, [citiesData?.cities])

  const maxIndex = Math.max(0, indianCities.length - itemsPerView)
  const { currentIndex, handleNext, handlePrev } = useSlider(maxIndex)

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Popular Cities
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Find top colleges across India's educational hubs.
            </p>
          </div>

          {/* Arrows */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={handlePrev}
              disabled={indianCities.length <= itemsPerView}
              className="w-9 h-9 rounded-full bg-white shadow hover:shadow-md border border-slate-200 flex items-center justify-center hover:bg-[#5B7DBA] hover:text-white transition disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={indianCities.length <= itemsPerView}
              className="w-9 h-9 rounded-full bg-white shadow hover:shadow-md border border-slate-200 flex items-center justify-center hover:bg-[#5B7DBA] hover:text-white transition disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {citiesLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B7DBA]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">Failed to load cities</div>
          ) : indianCities.length > 0 ? (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {indianCities.map(city => (
                  <CityCard key={city._id} city={city} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">No cities available</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CitySlider
