'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import {
  Calendar,
  FileText,
  ArrowLeft,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Timer,
  TrendingUp,
  CalendarDays
} from 'lucide-react'

// --- Interfaces (Same as before) ---
interface Country { _id: string; name: string; slug: string; flag: string }
interface Exam {
  _id: string; name: string; slug: string; short_name: string; exam_type: string;
  conducting_body: string; exam_mode: string; frequency: string; description: string;
  hero_section: { title: string; subtitle?: string; image?: string };
  overview: { title: string; content: string; key_highlights: string[] };
  registration: { title: string; description: string; image?: string; bullet_points: string[] };
  exam_pattern: { title: string; description: string; total_duration_mins: number; score_range: string; table_data: { section: string; questions: number; duration_mins: number }[] };
  exam_dates: { title: string; important_dates: { event: string; date: Date }[] };
  result_statistics: { title: string; description: string; passing_criteria: string; total_marks: number; passing_marks: number };
  applicable_countries: Country[]; is_active: boolean; createdAt: string;
}

const ExamPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const { openModal } = useFormModal()

  // Fetch Data
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/exams/${slug}`)
        const result = await response.json()
        if (result.success) setExam(result.data)
      } catch (error) {
        console.error('Error fetching exam:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchExam()
  }, [slug])

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'registration', 'pattern', 'dates', 'results', 'faq']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation Tabs configuration
  const allTabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen, show: !!exam?.overview },
    { id: 'registration', label: 'Registration', icon: Users, show: !!exam?.registration },
    { id: 'pattern', label: 'Exam Pattern', icon: Timer, show: !!exam?.exam_pattern },
    { id: 'dates', label: 'Exam Date', icon: CalendarDays, show: !!exam?.exam_dates },
    { id: 'results', label: 'Statistics', icon: Award, show: !!exam?.result_statistics },
    { id: 'faq', label: 'FAQs', icon: CheckCircle, show: true }
  ]

  const availableTabs = useMemo(() => allTabs.filter(tab => tab.show), [exam])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-[#6366F1]/20 border-t-[#6366F1] rounded-full animate-spin"></div></div>
  if (!exam) return <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center"> <h2 className="text-2xl font-bold">Exam not found</h2><Link href="/exams"><Button>Back to Exams</Button></Link></div>

  return (
    <div className="min-h-screen bg-linear-to-br  from-slate-50 to-white">
      {/* 1. Hero Section - Minimal & Clean */}
      <header className="bg-linear-to-br from-[#6366F1] to-[#4F46E5] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-[#FACC15]/20 text-[#FACC15] border-none">{exam.exam_type}</Badge>
              <Badge className="bg-white/20 text-white border-none">{exam.exam_mode}</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              {exam.hero_section?.title || exam.name}
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              {exam.hero_section?.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={openModal} className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-slate-900 h-12 px-8 font-bold">Get Free Consultation</Button>
              <Link href="/exams">
                <Button variant="outline" className="border-white/20 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 h-12 px-6">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              </Link>
            </div>
          </div>
          {exam.hero_section?.image && (
            <div className="hidden md:block rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src={exam.hero_section?.image} alt={exam.name} className="w-full h-auto object-cover" />
            </div>
          )}
        </div>
      </header>

      {/* 2. Sticky Navigation - After Hero */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto py-3 no-scrollbar">
            {availableTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-[#6366F1] text-white' : 'text-slate-500 hover:bg-[#6366F1]/10'
                  }`}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 3. Content Sections */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12">
          
          {/* Overview */}
          {exam.overview && (
            <section id="overview" className="scroll-mt-32 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
              <div className="max-w-3xl">
                <h2 className="text-3xl text-[#6366F1] font-bold mb-6">{exam.overview.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{exam.overview.content}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {exam.overview.key_highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <CheckCircle className="text-[#6366F1] shrink-0" size={20} />
                      <span className="font-semibold text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Registration */}
          {exam.registration && (
            <section id="registration" className="scroll-mt-32">
              <h2 className="text-3xl text-[#6366F1] font-bold mb-6 px-4">{exam.registration.title}</h2>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <p className="text-slate-600 mb-8">{exam.registration.description}</p>
                <div className="space-y-4">
                  {exam.registration.bullet_points.map((point, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center font-bold shrink-0">{i+1}</span>
                      <p className="text-slate-700 font-medium pt-1">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Exam Pattern */}
          {exam.exam_pattern && (
            <section id="pattern" className="scroll-mt-32 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-3xl text-[#6366F1] font-bold mb-8">{exam.exam_pattern.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <StatCard icon={<Timer />} label="Duration" value={`${exam.exam_pattern.total_duration_mins}m`} color="[#6366F1]" />
                <StatCard icon={<TrendingUp />} label="Score Range" value={exam.exam_pattern.score_range} color="[#FACC15]" />
              </div>
              <div className="overflow-hidden border border-slate-100 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">Section</th>
                      <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">Questions</th>
                      <th className="p-4 font-bold text-slate-700 text-sm uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {exam.exam_pattern.table_data.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold text-slate-900">{row.section}</td>
                        <td className="p-4 text-slate-600 font-medium">{row.questions}</td>
                        <td className="p-4 text-slate-600 font-medium">{row.duration_mins} mins</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Exam Dates */}
          {exam.exam_dates && (
            <section id="dates" className="scroll-mt-32">
              <h2 className="text-3xl text-[#6366F1] font-bold mb-6 px-4">{exam.exam_dates.title}</h2>
              <div className="grid gap-4">
                {exam.exam_dates.important_dates.map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm hover:border-[#6366F1]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#6366F1]/10 text-[#6366F1] rounded-xl"><CalendarDays size={20} /></div>
                      <span className="font-bold text-slate-800">{item.event}</span>
                    </div>
                    <span className="font-black text-[#6366F1]">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results */}
          {exam.result_statistics && (
            <section id="results" className="scroll-mt-32 bg-linear-to-br from-[#6366F1] to-[#4F46E5] text-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative shadow-xl shadow-[#6366F1]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">{exam.result_statistics.title}</h2>
                <p className="text-slate-400 mb-10 max-w-2xl">{exam.result_statistics.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Marks</p>
                      <p className="text-4xl font-black">{exam.result_statistics.total_marks}</p>
                   </div>
                   <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Passing</p>
                      <p className="text-4xl font-black text-[#FACC15]">{exam.result_statistics.passing_marks}</p>
                   </div>
                   <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Criteria</p>
                      <p className="text-xl font-bold mt-2">{exam.result_statistics.passing_criteria}</p>
                   </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          <section id="faq" className="scroll-mt-32">
            <FAQ />
          </section>

        </div>
      </main>
    </div>
  )
}

// Minimal Helper Component
const StatCard = ({ icon, label, value, color }: any) => (
  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm ${color === '[#6366F1]' ? 'text-[#6366F1]' : 'text-[#FACC15]'}`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-xl font-black text-slate-900">{value}</p>
    </div>
  </div>
)

export default ExamPage