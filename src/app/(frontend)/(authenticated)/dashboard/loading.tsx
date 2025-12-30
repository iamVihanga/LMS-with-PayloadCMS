import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function DashboardLoading() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <div className="text-sm text-teal-400">All Courses</div>

      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
