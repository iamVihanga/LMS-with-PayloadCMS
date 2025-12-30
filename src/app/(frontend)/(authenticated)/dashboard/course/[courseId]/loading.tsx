import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function CoursePageLoading() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
      {/* Back button skeleton */}
      <Skeleton className="h-10 w-40" />

      {/* Thumbnail skeleton */}
      <Skeleton className="w-full aspect-video" />

      {/* Content area */}
      <div className="space-y-4">
        {/* Title skeleton */}
        <Skeleton className="h-10 w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Curriculum section */}
      <div className="space-y-4">
        {/* Curriculum heading skeleton */}
        <Skeleton className="h-8 w-32" />

        {/* Curriculum cards skeleton */}
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
