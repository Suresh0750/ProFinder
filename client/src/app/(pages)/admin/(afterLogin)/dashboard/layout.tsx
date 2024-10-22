"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from 'react'

export default function AdminLayout({
  children,
  overview,
  workers,
  jobs,
  reviews,
}: {
  children: React.ReactNode
  overview: React.ReactNode
  workers: React.ReactNode
  jobs: React.ReactNode
  reviews: React.ReactNode
}) {

  const [render, setRender] = useState<string>("overview")

  const handleRender = (value: string) => {
    setRender(value)
  }

  return (
    <div className='w-full h-full '>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <h2 onClick={() => handleRender('overview')}>Overview</h2>
            </TabsTrigger>
            <TabsTrigger value="workers">
              <h2 onClick={() => handleRender('workers')}>Workers</h2>
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <h2 onClick={() => handleRender('jobs')}>Jobs</h2>
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <h2 onClick={() => handleRender('reviews')}>Reviews</h2>
            </TabsTrigger>
          </TabsList>
          {children} 
          {/* Render content based on the current tab */}
          <div className="mt-4">
            {render === 'overview' && overview}
            {render === 'workers' && workers}
            {render === 'jobs' && jobs}
            {render === 'reviews' && reviews}
          </div>
        </Tabs>
        
        {/* is not necessary unless it's meant for other content */}
      </div>
    </div>
  )
}
