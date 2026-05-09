'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  MessageCircle, 
  ArrowLeft, 
  Share2,
  Tag,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'

interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image?: string
  author?: string
  published_at?: string
  read_time?: number
  views?: number
  comments?: number
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

const BlogDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  
  // Use TanStack Query for blog data
  const { 
    data: blog, 
    isLoading, 
    error, 
    refetch 
  } = useBlog(slug)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-slate-200 border-t-[#007BFF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Article not found
          </h2>
          <p className="text-slate-500 mb-6">
            The article you are looking for does not exist.
          </p>
          <Link href="/blogs">
            <Button className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white">
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Back Button */}
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[#007BFF] hover:text-[#007BFF] font-medium mb-8 transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Articles</span>
          </Link>
          
          {/* Category & Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-[#007BFF] hover:bg-[#007BFF] text-white px-4 py-1.5 text-xs font-semibold">
              {blog.category}
            </Badge>
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-1 text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#007BFF]/10 flex items-center justify-center">
                <User size={14} className="text-[#007BFF]" />
              </div>
              <span className="font-medium">{blog.author || 'Academic Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <span>
                {blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
            {blog.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <span>{blog.read_time} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="relative h-80 md:h-96 w-full overflow-hidden bg-slate-100 border-y border-slate-200">
          <img
            src={blog.image.startsWith('http') ? blog.image : `/images/${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#007BFF] prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700">
            <div 
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: blog.content.replace(/\n/g, '<br />') 
              }}
            />
          </div>

          {/* Related Exams */}
          {blog.related_exams.length > 0 && (
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <FileText size={18} className="text-[#007BFF]" />
                Related Exams
              </h3>
              <div className="flex flex-wrap gap-3">
                {blog.related_exams.map((exam) => (
                  <Badge key={exam} className="bg-white text-[#007BFF] border border-[#007BFF]/20 hover:bg-[#007BFF] hover:text-white px-4 py-2 text-sm font-medium transition-colors">
                    {exam}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-8">
            <Link href="/blogs">
              <Button className="bg-[#007BFF] hover:bg-[#007BFF] text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage