'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import { SITE_CONTACT } from '@/config/site-config'
import { useContactInfo } from "@/hooks/useContactInfo";
import { useCollege } from '@/hooks/useColleges'

import {
  MapPin,
  GraduationCap,
  DollarSign,
  Clock,
  Award,
  Calendar,
  Phone,
  Mail,
  Globe,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowRight,
  Building,
  FileText,
  Shield,
  Target,
  Zap,
  ChevronRight,
  Info,
  University,
  Camera,
  Trophy,
  Globe2,
  Languages,
  Briefcase,
  Heart,
  Lightbulb,
  Compass,
  Flag,
  CreditCard,
  Library,
  Wifi,
  Bus,
  Coffee,
  Dumbbell,
  Utensils,
  Home,
  TreePine,
  Sparkles,
  Medal,
  Bookmark,
  Share2,
  Download,
  ExternalLink,
  ArrowUpRight,
  ChevronUp
} from 'lucide-react'
import RelatedColleges from './RelatedColleges'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

interface CollegeDetailPageProps {
  slug: string
}

const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({ slug }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { openModal } = useFormModal()

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy effect to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'key-highlights',
        'why-choose',
        'ranking',
        'admission-process',
        'entrance-exams',
        'documents-required',
        'fees-structure',
        'campus-highlights',
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { phones, emails } = useContactInfo();

  // Use TanStack Query for college data
  const {
    data: college,
    isLoading,
    error,
    refetch
  } = useCollege(slug);
if (isLoading) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4 animate-pulse">
        <div className="w-20 h-20 bg-slate-200 rounded-lg"></div>
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white border border-slate-100 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-slate-100 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

  if (error || !college) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error instanceof Error && error.message === 'College not found' ? 'College Not Found' : 'Failed to Load College'}
          </h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'The college you are looking for does not exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => refetch()}
              className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white"
            >
              Try Again
            </Button>
            <Link href="/colleges">
              <Button variant="outline" className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF]/10">
                Browse All Colleges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  bg-white">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-[#F8FAFC] to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">

            {/* LEFT SIDE: CONTENT */}
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium">
                  <Flag className="w-3 h-3 mr-2" />
                  {college.country_ref?.name || 'International'}
                </Badge>

                {college.ranking && (
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700]/90 border-none px-3 py-1 rounded-full text-sm font-medium">
                    <Trophy className="w-3 h-3 mr-2" />
                    Ranked #{typeof college.ranking === 'object' ? college.ranking.country_ranking : college.ranking}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4 sm:mb-6">
                {college.name}
                <span className="text-[#007BFF]">.</span>
              </h1>

              {/* Hero Description */}
              <div className="mb-6 sm:mb-8">
                <p className="text-[#64748B] max-w-xl leading-relaxed">
                  {college.overview?.description || college.about_content}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 py-6 border-y border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#007BFF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] uppercase font-medium">Location</p>
                    <p className="text-sm font-semibold text-[#1E293B]">{college.country_ref?.name || 'Global'}</p>
                  </div>
                </div>

                {college.establishment_year && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#007BFF]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B] uppercase font-medium">Founded</p>
                      <p className="text-sm font-semibold text-[#1E293B]">{college.establishment_year}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#007BFF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] uppercase font-medium">Community</p>
                    <p className="text-sm font-semibold text-[#1E293B]">Intl. Students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: IMAGE */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
                  alt={college.name}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="sticky z-50 top-16 sm:top-0 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-6 py-4 overflow-x-auto">
            {[
              { name: 'Overview', id: 'overview' },
              { name: 'Key Highlights', id: 'key-highlights' },
              { name: 'Why Choose ?', id: 'why-choose' },
              { name: 'Ranking', id: 'ranking' },
              { name: 'Admission Process', id: 'admission-process' },
              { name: 'Eligibility', id: 'entrance-exams' },
              { name: 'Documents', id: 'documents-required' },
              { name: 'Fees', id: 'fees-structure' },
              { name: 'Campus', id: 'campus-highlights' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const element = document.getElementById(tab.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap border-2 border-transparent ${
                  activeTab === tab.id
                    ? 'bg-[#007BFF] text-white border-[#007BFF] shadow-md'
                    : 'text-[#64748B] hover:text-[#007BFF] hover:border-[#007BFF] hover:bg-slate-50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div id="overview">
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="mb-6">
                  <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Institution
                  </Badge>
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                    {college.overview?.title || 'About the Institution'}
                  </h2>
                </div>

                <p className="text-[#64748B] leading-relaxed mb-6">
                  {college.overview?.description || college.about_content}
                </p>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#007BFF] font-medium text-sm flex items-center gap-2 hover:text-[#007BFF]/80"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                  <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>

            {/* Key Information */}
            <div id="key-highlights">
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="mb-6">
                  <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Essentials
                  </Badge>
                  <h2 className="text-2xl font-bold text-[#1E293B]">Key Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      show: !!college.fees || (college.fees_structure?.courses && college.fees_structure.courses.length > 0),
                      label: "Annual Fees",
                      value: college.fees ? `$${college.fees.toLocaleString()}` : college.fees_structure?.courses?.[0]?.annual_tuition_fee,
                      sub: "Academic investment",
                      icon: DollarSign
                    },
                    {
                      show: !!(college.duration || college.fees_structure?.courses?.[0]?.duration),
                      label: "Program Duration",
                      value: `${college.duration || college.fees_structure?.courses?.[0]?.duration} Years`,
                      sub: "Full-time study",
                      icon: Clock
                    },
                    {
                      show: !!college.establishment_year,
                      label: "Established",
                      value: college.establishment_year,
                      sub: "Legacy of excellence",
                      icon: Calendar
                    },
                    {
                      show: true,
                      label: "Location",
                      value: college.country_ref?.name || 'International',
                      sub: "Campus residence",
                      icon: MapPin
                    }
                  ].map((item, i) => item.show && (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-[#007BFF]" />
                      </div>
                      <div>
                        <div className="text-xs text-[#64748B] uppercase font-medium mb-1">{item.label}</div>
                        <div className="text-lg font-semibold text-[#1E293B]">{item.value}</div>
                        <div className="text-xs text-[#64748B]">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Entrance Exams */}
            <div id="entrance-exams">
              {college.exams && college.exams.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Eligibility
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">Accepted Entrance Exams</h2>
                  </div>

                  <p className="text-[#64748B] mb-6">
                    The following standardized tests are recognized for admission. Ensure your scores are within the valid timeframe for your intake.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.exams.map((exam, index) => (
                      <div key={exam} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#007BFF]" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1E293B]">{exam}</div>
                          <div className="text-xs text-[#64748B]">Official Score Required</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Highlights */}
            <div id="key-highlights">
              {college.key_highlights?.features && college.key_highlights.features.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      At a Glance
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.key_highlights.title || 'Key Highlights'}
                    </h2>
                  </div>

                  {college.key_highlights.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.key_highlights.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.key_highlights.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#007BFF]/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                          <Star className="w-4 h-4 text-[#007BFF]" />
                        </div>
                        <div className="text-[#64748B]">{feature}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Why Choose Us */}
            <div id="why-choose">
              {college.why_choose_us?.features && college.why_choose_us.features.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Benefits
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.why_choose_us.title || 'Why Choose Us'}
                    </h2>
                  </div>

                  {college.why_choose_us.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.why_choose_us.description}
                    </p>
                  )}

                  <div className="space-y-4">
                    {college.why_choose_us.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#007BFF]/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                          <Lightbulb className="w-4 h-4 text-[#007BFF]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E293B] mb-2">{feature.title}</h4>
                          <p className="text-[#64748B] text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ranking & Recognition */}
            <div id="ranking">
              {college.ranking && typeof college.ranking === 'object' && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Recognition
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.ranking.title || 'Ranking & Recognition'}
                    </h2>
                  </div>

                  {college.ranking.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.ranking.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        val: typeof college.ranking === 'object' ? college.ranking.country_ranking : undefined,
                        label: "Country Ranking",
                        icon: Trophy
                      },
                      {
                        val: typeof college.ranking === 'object' ? college.ranking.world_ranking : undefined,
                        label: "World Ranking",
                        icon: Globe2
                      }
                    ].map((item, i) => item.val && (
                      <div key={i} className="p-6 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-[#007BFF]" />
                          </div>
                          <div className="text-3xl font-bold text-[#007BFF]">#{item.val}</div>
                        </div>
                        <h4 className="text-lg font-semibold text-[#1E293B]">#{item.val}</h4>
                        <p className="text-sm text-[#64748B]">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {college.ranking.accreditation && college.ranking.accreditation.length > 0 && (
                    <div className="bg-slate-900/95 backdrop-blur-md rounded-xl p-6 text-white border border-white/10">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#FFD700]" />
                        Official Accreditations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {college.ranking.accreditation.map((acc, index) => (
                          <div key={index} className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                            <span className="text-sm">{acc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Admission Process */}
            <div id="admission-process">
              {college.admission_process?.steps && college.admission_process.steps.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Step-by-Step
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.admission_process.title || 'Admission Process'}
                    </h2>
                  </div>

                  {college.admission_process.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.admission_process.description}
                    </p>
                  )}

                  <div className="space-y-4">
                    {college.admission_process.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#007BFF] rounded-lg flex items-center justify-center text-white font-semibold shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#1E293B]">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-linear-to-r from-[#007BFF] to-[#007BFF]/90 rounded-xl text-white shadow-xl shadow-[#007BFF]/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold">Confused about the steps?</h5>
                          <p className="text-blue-100 text-sm">Let our experts handle the paperwork for you.</p>
                        </div>
                      </div>
                      <button
                        onClick={openModal}
                        className="bg-white text-[#007BFF] font-semibold px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors"
                      >
                        Get Free Assistance
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Documents Required */}
            <div id="documents-required">
              {college.documents_required?.documents && college.documents_required.documents.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Checklist
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.documents_required.title || 'Documents Required'}
                    </h2>
                  </div>

                  {college.documents_required.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.documents_required.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.documents_required.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <Shield className="w-6 h-6 text-[#007BFF]" />
                        </div>
                        <div className="font-medium text-[#1E293B]">{doc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fees Structure */}
            <div id="fees-structure">
              {college.fees_structure?.courses && college.fees_structure.courses.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Investment
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.fees_structure.title || 'Fees Structure'}
                    </h2>
                  </div>

                  {college.fees_structure.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.fees_structure.description}
                    </p>
                  )}

                  <div className="space-y-4">
                    {college.fees_structure.courses.map((course, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                              <GraduationCap className="w-6 h-6 text-[#007BFF]" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#1E293B]">{course.course_name}</h4>
                              <div className="text-xs text-[#64748B]">{course.duration} Program</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-[#007BFF]">{course.annual_tuition_fee}</div>
                            <div className="text-xs text-[#64748B]">Tuition / Year</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Campus Highlights */}
            <div id="campus-highlights">
              {college.campus_highlights?.highlights && college.campus_highlights.highlights.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="mb-6">
                    <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-none px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Lifestyle & Facilities
                    </Badge>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      {college.campus_highlights.title || 'Campus Highlights'}
                    </h2>
                  </div>

                  {college.campus_highlights.description && (
                    <p className="text-[#64748B] mb-6">
                      {college.campus_highlights.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.campus_highlights.highlights.map((highlight, index) => {
                      const getIcon = (text: string) => {
                        const lowerText = text.toLowerCase();
                        if (lowerText.includes('wifi')) return <Wifi className="w-5 h-5" />;
                        if (lowerText.includes('library')) return <Library className="w-5 h-5" />;
                        if (lowerText.includes('gym') || lowerText.includes('sport')) return <Dumbbell className="w-5 h-5" />;
                        if (lowerText.includes('food') || lowerText.includes('cafe')) return <Utensils className="w-5 h-5" />;
                        if (lowerText.includes('hostel')) return <Home className="w-5 h-5" />;
                        return <Zap className="w-5 h-5" />;
                      };

                      return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            <div className="text-[#007BFF]">
                              {getIcon(highlight)}
                            </div>
                          </div>
                          <div className="font-medium text-[#1E293B]">{highlight}</div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={openModal}
                    className="mt-6 w-full bg-[#007BFF] text-white rounded-lg py-3 px-6 font-medium hover:bg-[#007BFF]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    Request a Virtual Campus Tour
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - CTA and Related */}
          <div className="space-y-8 lg:sticky lg:top-8 lg:h-fit">
            {/* CTA Card */}
            <div className="bg-linear-to-br from-[#007BFF] to-[#007BFF]/90 text-white rounded-xl p-8 shadow-xl shadow-[#007BFF]/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-blue-100 mb-6">Get expert guidance for your admission process</p>
                <div className="space-y-3">
                  <button
                    onClick={openModal}
                    className="w-full bg-white text-[#007BFF] font-semibold rounded-lg  transition-colors py-3 px-6 flex items-center justify-center gap-2"
                  >
                    <Bookmark className="w-4 h-4" />
                    Start Application
                  </button>
                  <button
                    onClick={openModal}
                    className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-[#007BFF]/10 transition-colors py-3 px-6 border border-white/30 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Get Free Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#007BFF]" />
                  <span className="text-[#64748B] font-medium">{phones.primary}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#007BFF]" />
                  <span className="text-[#64748B] font-medium">{emails.info}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#007BFF]" />
                  <span className="text-[#64748B] font-medium">Global Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Colleges */}
        <div className="mt-16">
          <RelatedColleges currentCollegeSlug={college.slug} />
        </div>
      </div>

      <FAQ />
    </div>
  )
}

export default CollegeDetailPage
