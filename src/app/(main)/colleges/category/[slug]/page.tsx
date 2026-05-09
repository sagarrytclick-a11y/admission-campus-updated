'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useAllColleges } from '@/hooks/useColleges'
import { useCategories } from '@/hooks/useCategories'
import SearchSection from '@/components/colleges/SearchSection'
import CollegeMapping from '@/components/colleges/CollegeMapping'
import CollegeFilters from '@/components/colleges/CollegeFilters'
import { GraduationCap, Award, Users, MapPin, TrendingUp, Star } from 'lucide-react'

export default function CategoryCollegesPage() {
  const params = useParams()
  const categorySlug = params.slug as string
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<string>(categorySlug)
  const [selectedState, setSelectedState] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Get category info
  const { data: categories } = useCategories()
  const currentCategory = categories?.find(cat => cat.slug === categorySlug)

  // Handle search from SearchSection component
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  const { data: collegesResponse = { colleges: [] }, isLoading, error, refetch } = useAllColleges(searchTerm, 'all', 'all')

  const allColleges = collegesResponse.colleges || []

  // Filter colleges by selected course and state
  const colleges = useMemo(() => {
    let filtered = allColleges.filter((college: any) =>
      college.categories?.includes(categorySlug)
    )

    if (selectedState !== 'all') {
      filtered = filtered.filter((college: any) =>
        college.city?.toLowerCase() === selectedState.toLowerCase()
      )
    }

    return filtered
  }, [allColleges, categorySlug, selectedState])

  // Extract unique values for filters
  const { states } = useMemo(() => {
    const stateSet = new Set(colleges.map((college: any) => college.city).filter(Boolean))
    return {
      states: Array.from(stateSet) as string[]
    }
  }, [colleges])

  const totalPages = Math.ceil(colleges.length / itemsPerPage)

  // Stats for the category
  const categoryStats = useMemo(() => {
    const totalColleges = colleges.length
    const avgFees = colleges.reduce((sum: number, college: any) => sum + (college.fees || 0), 0) / totalColleges || 0
    const statesCount = states.length

    return {
      totalColleges,
      avgFees: Math.round(avgFees),
      statesCount
    }
  }, [colleges, states])

  if (!currentCategory && !isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-4">Category Not Found</h1>
          <p className="text-[#64748B] mb-6 sm:mb-8">The category you're looking for doesn't exist.</p>
          <a href="/colleges" className="inline-flex items-center gap-2 bg-[#007BFF] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#0056CC] transition-colors text-sm sm:text-base">
            <GraduationCap size={18} />
            View All Colleges
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#007BFF] to-[#4F46E5] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-size-[20px_20px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-white/90 mb-6">
              <GraduationCap size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Top Colleges</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover <span className="text-yellow-300">{currentCategory?.name || categorySlug}</span> Excellence
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              {currentCategory?.description || `Explore premier ${categorySlug} institutions with world-class education, exceptional faculty, and outstanding placement records.`}
            </p>

            {/* Category Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              {[
                { icon: GraduationCap, label: "Colleges", value: categoryStats.totalColleges },
                { icon: TrendingUp, label: "Avg. Fees", value: categoryStats.avgFees ? `₹${categoryStats.avgFees.toLocaleString()}` : 'N/A' },
                { icon: MapPin, label: "Locations", value: categoryStats.statesCount },
                { icon: Award, label: "Top Ranked", value: "50+" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mb-2 mx-auto" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-2">Find Your Perfect College</h2>
            <p className="text-[#64748B]">Search through {categoryStats.totalColleges} top {currentCategory?.name || categorySlug} institutions</p>
          </div>
          <SearchSection
            onSearch={handleSearch}
            placeholder={`Search ${currentCategory?.name || categorySlug} colleges by name, location, or course...`}
            showFilters={false}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* Filters Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:sticky lg:top-6">
                <CollegeFilters
                  courses={[categorySlug]}
                  states={states}
                  selectedCourse={selectedCourse}
                  selectedState={selectedState}
                  onCourseChange={setSelectedCourse}
                  onStateChange={setSelectedState}
                />

                {/* Quick Stats Card */}
                <div className="mt-4 sm:mt-6 bg-linear-to-br from-[#007BFF]/5 to-[#FACC15]/5 rounded-lg p-3 sm:p-4 border border-[#007BFF]/10">
                  <h4 className="font-semibold text-[#1E293B] mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#007BFF]" />
                    Category Overview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Total Colleges:</span>
                      <span className="font-semibold text-[#007BFF]">{categoryStats.totalColleges}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Locations:</span>
                      <span className="font-semibold text-[#007BFF]">{categoryStats.statesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Avg. Fees:</span>
                      <span className="font-semibold text-[#007BFF]">
                        {categoryStats.avgFees ? `₹${categoryStats.avgFees.toLocaleString()}` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colleges List */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <CollegeMapping
                  colleges={colleges}
                  isLoading={isLoading}
                  error={error}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  onRefetch={refetch}
                  currentCategory={categorySlug}
                  showSearch={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
