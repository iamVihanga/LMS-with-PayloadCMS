import { getPayload } from 'payload'
import React from 'react'

import configPromise from '@payload-config'
import { getUser } from '../../../_actions/getUser'
import { Course } from '@/payload-types'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    courseId: string
  }>
}

export default async function CoursePage({ params }: Props) {
  const { courseId } = await params

  const payload = await getPayload({
    config: configPromise,
  })

  const user = await getUser()

  let course: Course | null = null

  try {
    const res = await payload.findByID({
      collection: 'courses',
      id: courseId,
      overrideAccess: false,
      user,
    })

    course = res as Course
  } catch (error) {
    console.error('Error fetching course:', error)

    return notFound()
  }

  if (!course) notFound()

  return (
    <div>
      CoursePage
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  )
}
