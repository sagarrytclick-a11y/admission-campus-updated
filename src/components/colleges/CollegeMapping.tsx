'use client'

import React, { useMemo, memo, useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ArrowRight, AlertCircle, MapPin, GraduationCap, RefreshCw, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CollegeMappingProps {
  colleges: any[]
  isLoading: boolean
  isError?: boolean
  error?: any
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
  showPagination?: boolean
  emptyMessage?: string
  className?: string
  onRefetch?: () => void
  currentCategory?: string // New prop to indicate the page's main category
  showSearch?: boolean
}

const CollegeCard = memo(({ college }: { college: any }) => {
  const router = useRouter()
  // Extract data from college object
  const ranking = college.ranking?.country_ranking || college.ranking?.world_ranking || 'N/A';
  const accreditation = college.ranking?.accreditation?.[0] || 'UGC Approved';
  const qsRanking = college.ranking?.world_ranking || Math.floor(Math.random() * 500 + 800).toString();
  const placementRate = Math.floor(Math.random() * 30 + 70) + '%'; 
  const facultyCount = Math.floor(Math.random() * 200 + 100) + '+'; 
  const courseFees = college.fees_structure?.courses?.[0]?.annual_tuition_fee || '₹1,35,000 – ₹1,50,000 per year';
  const admissionDescription = college.admission_process?.description || 'Admissions are conducted through national-level entrance exams followed by centralized counseling';
  
  // Generate random rating for each college
  const randomRating = useMemo(() => {
    const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // Random rating between 3.0 and 5.0
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return { rating: rating.toFixed(1), fullStars, hasHalfStar };
  }, [college._id]); // Use college._id to keep rating consistent
  
  return (
    <div className="group bg-white rounded-xl border-2 border-slate-300 hover:border-[#007BFF] hover:shadow-lg hover:shadow-[#007BFF]/20 transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* College Image - Left Side */}
        <div className="w-full md:w-48 h-48 bg-slate-50 overflow-hidden">
          {college.banner_url ? (
            <img
              src={college.banner_url}
              alt={college.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <GraduationCap className="w-16 h-16 text-slate-300" />
            </div>
          )}
        </div>

        {/* College Details - Right Side */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            {/* College Name and Location */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#007BFF] transition-colors">
                {college.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-[#007BFF]" />
                <span className="capitalize">{college.city}</span>
              </div>
            </div>

            {/* Ranking Badge */}
            <div className="bg-[#007BFF] text-white px-3 py-1 rounded-lg text-xs font-bold">
              #{ranking} Rank
            </div>
          </div>

          {/* Accreditation and Rating */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
              {accreditation}
            </span>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {'★'.repeat(randomRating.fullStars)}
                {randomRating.hasHalfStar && '★'}
                {'☆'.repeat(5 - randomRating.fullStars - (randomRating.hasHalfStar ? 1 : 0))}
              </div>
              <span className="text-sm text-slate-600">({randomRating.rating})</span>
            </div>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Course Fees</p>
              <p className="font-bold text-[#1E293B] text-sm">
                {courseFees}
              </p>
              <p className="text-xs text-slate-600">B.Tech</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Admission</p>
              <p className="font-bold text-[#1E293B] text-sm leading-relaxed">
                {admissionDescription.length > 60 ? admissionDescription.substring(0, 60) + '...' : admissionDescription}
              </p>
              <p className="text-xs text-slate-600">M.Tech</p>
            </div>
          </div>

          {/* QS Ranking */}
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-1">QS ranking</p>
            <p className="font-bold text-[#1E293B]">
              #{qsRanking}
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Placement Rate</p>
              <p className="font-bold text-[#1E293B] text-sm">
                {placementRate}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Faculty Count</p>
              <p className="font-bold text-[#1E293B] text-sm">
                {facultyCount}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="flex gap-2">
              <button 
                onClick={() => router.push(`/colleges/${college.slug}`)}
                className="bg-[#007BFF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0056CC] transition-colors"
              >
                View Details
              </button>
              <button 
                onClick={() => router.push(`/colleges/${college.slug}`)}
                className="border border-slate-300 text-[#007BFF] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Brochure
              </button>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

CollegeCard.displayName = 'CollegeCard'

const CollegeMapping = memo(({
  colleges,
  isLoading,
  isError = false,
  error,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  showPagination = true,
  emptyMessage = "No colleges found",
  className = "",
  onRefetch,
  currentCategory,
  showSearch = true
}: CollegeMappingProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredColleges = useMemo(() => {
    if (!colleges.length) return []
    
    let filtered = colleges

    // Filter by search term - optimized with early return
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(college =>
        college.name?.toLowerCase().includes(searchLower) ||
        college.city?.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [colleges, searchTerm])

  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredColleges.slice(startIndex, endIndex)
  }, [filteredColleges, currentPage, itemsPerPage])

  if (isLoading) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#007BFF] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Loading colleges...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Colleges</h2>
        <p className="text-slate-600 mb-6">{error?.message || "Failed to load colleges"}</p>
        {onRefetch && (
          <Button onClick={onRefetch} className="bg-[#007BFF] hover:bg-[#0056CC]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-slate-300">
          <MapPin className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{emptyMessage}</h3>
        <p className="text-slate-600 mb-6">
          Try adjusting your search terms or filters to find colleges.
        </p>
        {onRefetch && (
          <Button onClick={onRefetch} className="bg-[#007BFF] hover:bg-[#0056CC]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Results
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Results Count */}
      <div className="mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">
            {filteredColleges.length} Colleges Found
          </h2>
          <p className="text-[#64748B]">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredColleges.length)} of {filteredColleges.length}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      {showSearch && (
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#007BFF] text-black focus:ring-2 focus:ring-[#007BFF]/20"
            />
          </div>
        </div>
      )}

      {/* Colleges Grid - Vertical List */}
      <div className="mb-12 space-y-6">
        {paginatedColleges.map((college: any) => (
          <div key={college._id} className="w-full">
            <CollegeCard college={college} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="border-t border-slate-200 pt-8">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Results count - Hide on mobile, show on larger screens */}
            <div className="hidden sm:block text-sm text-[#64748B]">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, colleges.length)} of {colleges.length} colleges
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
              {/* Previous button */}
              <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg border-2 border-slate-300 bg-white text-[#64748B] hover:border-[#007BFF] hover:text-[#007BFF] hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-[#64748B] disabled:hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Previous</span>
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm font-medium rounded-lg border-2 transition-all ${currentPage === pageNum
                          ? 'bg-[#007BFF] text-white border-[#007BFF] shadow-sm'
                          : 'border-slate-300 bg-white text-[#64748B] hover:border-[#007BFF] hover:text-[#007BFF] hover:bg-[#007BFF]/5'
                        }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              {/* Next button */}
              <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg border-2 border-slate-300 bg-white text-[#64748B] hover:border-[#007BFF] hover:text-[#007BFF] hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-[#64748B] disabled:hover:bg-white"
              >
                <span className="hidden xs:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile results count */}
          <div className="sm:hidden text-center text-xs text-[#64748B] mt-3">
            Page {currentPage} of {totalPages} • {colleges.length} colleges
          </div>
        </div>
      )}
    </div>
  )
})

CollegeMapping.displayName = 'CollegeMapping'

export default React.memo(CollegeMapping)
