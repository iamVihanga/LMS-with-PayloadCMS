import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function CourseNotFound({}: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center py-12">
      <div className="text-center space-y-4 flex flex-col items-center justify-center">
        <SearchIcon className="text-foreground/30 size-36" />

        <h2 className="text-2xl font-semibold text-foreground/80">Course Not Found</h2>

        <Link href={`/dashboard`} className="text-sm cursor-pointer hover:underline">
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
