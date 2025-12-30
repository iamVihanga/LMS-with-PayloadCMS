import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Course, Participation } from '@/payload-types'
import { PlayCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  participant: Participation
  className?: string
}

export function ResumeCourseButton({ participant, className }: Props) {
  const course: Course = participant.course as Course
  const courseLength = course.curriculum?.length || 0
  const progress = participant.progress ?? 0
  const progressPercentage = Math.round((progress / courseLength) * 100)

  return (
    <div className={cn('relative w-full rounded-md overflow-hidden', className)}>
      <Button
        size="lg"
        icon={<PlayCircleIcon />}
        className={cn(
          'rounded-md bg-teal-600 hover:bg-teal-700 text-white hover:text-white',
          className,
        )}
      >
        <Link href={`/dashboard/participation/${participant.id}`}>Resume Course</Link>
      </Button>
      {progressPercentage > 0 && (
        <div className="absolute z-30 bottom-0 left-0 w-full h-1 overflow-hidden bg-white/30">
          <div className="h-full bg-white" style={{ width: `${progressPercentage}%` }} />
        </div>
      )}
    </div>
  )
}
