'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AlertCircleIcon, LogInIcon } from 'lucide-react'
import React, { MouseEvent, useId, useState } from 'react'
import { toast } from 'sonner'
import { participate } from '../_actions/participate'
import { Course } from '@/payload-types'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
  courseId: Course['id']
}

export default function StartCourseButton({ className, courseId }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const toastId = useId()
  const router = useRouter()

  async function handleStartCourse(e: MouseEvent<HTMLButtonElement>) {
    try {
      setStatus('loading')
      toast.loading('Getting into the course...', { id: toastId })

      // Execute action
      const { id } = await participate(courseId)

      setStatus('idle')
      toast.success("You're now enrolled in the course!", { id: toastId })
      router.push(`/dashboard/participation/${id}`)
    } catch (error) {
      setStatus('error')
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
      )
      toast.error('Failed to start the course. Please try again.', { id: toastId })
    }
  }

  return (
    <Button
      onClick={handleStartCourse}
      loading={status === 'loading'}
      icon={
        status === 'error' ? <AlertCircleIcon /> : status === 'idle' ? <LogInIcon /> : undefined
      }
      variant={status === 'error' ? 'destructive' : 'default'}
      className={cn('', className)}
    >
      {status === 'error' ? error || 'Error Starting Course' : 'Start Course'}
    </Button>
  )
}
