'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Stethoscope, Heart, Brain, Bone, Eye, Baby, Activity, Pill } from 'lucide-react'
import { useFormModal } from '@/context/FormModalContext'

const medicalSpecialties = [
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "General Medicine",
    description: "Comprehensive healthcare services for all ages",
    duration: "5.5 Years",
    seats: "5000+"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Cardiology",
    description: "Specialized care for heart conditions",
    duration: "6 Years",
    seats: "500+"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neurology",
    description: "Advanced treatment for neurological disorders",
    duration: "6 Years",
    seats: "300+"
  },
  {
    icon: <Bone className="w-8 h-8" />,
    title: "Orthopedics",
    description: "Bone and joint care specialists",
    duration: "6 Years",
    seats: "400+"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Ophthalmology",
    description: "Eye care and vision treatment",
    duration: "5.5 Years",
    seats: "600+"
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: "Pediatrics",
    description: "Specialized healthcare for children",
    duration: "5.5 Years",
    seats: "800+"
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Surgery",
    description: "Advanced surgical procedures and care",
    duration: "6 Years",
    seats: "700+"
  },
  {
    icon: <Pill className="w-8 h-8" />,
    title: "Pharmacology",
    description: "Medicine and drug research",
    duration: "5.5 Years",
    seats: "1000+"
  }
]

interface College {
  name: string
  ranking: string
  neetScore: string
  image?: string
}

export default function MedicalSection() {
  const [activeTab, setActiveTab] = useState('colleges')
  const { openModal } = useFormModal()

  // Fetch medical colleges using React Query
  const { data: colleges = [], isLoading, error } = useQuery<College[]>({
    queryKey: ['medicalColleges'],
    queryFn: async () => {
      try {
        // Fetch medical colleges from your local API
        const response = await fetch('/api/colleges?category=medical&limit=6&page=1')
        
        if (response.ok) {
          const result = await response.json()
          
          if (result.success && result.data?.colleges && result.data.colleges.length > 0) {
            // Transform the API data to match our format - take exactly 6 colleges
            const transformedData = result.data.colleges.slice(0, 6).map((college: any, index: number) => ({
              name: college.name || `Medical College ${index + 1}`,
              ranking: college.ranking?.country_ranking ? `#${college.ranking.country_ranking}` : college.legacy_ranking ? `#${college.legacy_ranking}` : `#${index + 1}`,
              neetScore: college.fees_structure?.courses?.[0]?.annual_tuition_fee ? `${college.fees_structure.courses[0].annual_tuition_fee}` : `${720 - index * 5}+`,
              image: college.banner_url || `/Hero/hero-${(index % 3) + 1}.jpg`
            }))
            console.log(`Successfully fetched ${transformedData.length} medical colleges`)
            console.log('Sample college data:', transformedData[0])
            return transformedData
          } else {
            console.log('No medical colleges found, using fallback data')
            throw new Error('No medical colleges found in API response')
          }
        } else {
          throw new Error(`API request failed with status: ${response.status}`)
        }
      } catch (error) {
        console.error('Error fetching medical colleges from local API:', error)
        
        // Fallback to hardcoded medical college data
        const fallbackData = [
          { name: "AIIMS Delhi", ranking: "#1", neetScore: "720+", image: "/Hero/hero-1.jpg" },
          { name: "PGIMER Chandigarh", ranking: "#2", neetScore: "715+", image: "/Hero/hero-2.jpg" },
          { name: "CMC Vellore", ranking: "#3", neetScore: "710+", image: "/Hero/hero-3.jpg" },
          { name: "JIPMER Puducherry", ranking: "#4", neetScore: "705+", image: "/Hero/hero-1.jpg" },
          { name: "KMC Manipal", ranking: "#5", neetScore: "700+", image: "/Hero/hero-2.jpg" },
          { name: "GMC Mumbai", ranking: "#6", neetScore: "695+", image: "/Hero/hero-3.jpg" }
        ]
        console.log('Using fallback medical college data')
        return fallbackData
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
  })

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Education in India
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pursue your dream of becoming a doctor with world-class medical education 
            and training at India's top institutions
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab('specialties')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'specialties'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Medical Specialties
            </button>
            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'colleges'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Top Medical Colleges
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'specialties' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalSpecialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">
                  {specialty.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {specialty.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {specialty.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium text-gray-900">{specialty.duration}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Seats:</span>
                  <span className="font-medium text-gray-900">{specialty.seats}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'colleges' && (
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
                    {/* Skeleton Image */}
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute top-3 right-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Skeleton Content */}
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college: College, index: number) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
                    {/* College Image */}
                    <div className="h-48 bg-gray-100 relative">
                      <img 
                        src={college.image} 
                        alt={college.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails
                          e.currentTarget.src = `/Hero/hero-${(index % 3) + 1}.jpg`
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg">
                          {college.ranking}
                        </span>
                      </div>
                    </div>
                    
                    {/* College Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {college.name}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">NEET Score Required:</span>
                          <span className="font-semibold text-green-700 text-sm bg-green-50 px-2 py-1 rounded">
                            {college.neetScore}
                          </span>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-100">
                          <button 
                            onClick={openModal}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center bg-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Start Your Medical Journey Today
          </h3>
          <p className="mb-6 text-blue-100">
            Get expert guidance for NEET preparation and medical college admissions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={openModal}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Medical Colleges
            </button>
            <button 
              onClick={openModal}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              NEET Preparation Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
