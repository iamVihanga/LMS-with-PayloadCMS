import { Loader } from 'lucide-react'
import React from 'react'

type Props = {}

export default function CoursePageLoading({}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Loader className="animate-spin size-4" />
      Loading...
    </div>
  )
}
