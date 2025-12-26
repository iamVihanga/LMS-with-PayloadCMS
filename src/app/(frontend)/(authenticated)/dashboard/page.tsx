import React from 'react'
import { headers as getHeaders } from 'next/headers.js'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getUser } from '../_actions/getUser'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

type Props = {}

export default async function DashboardPage({}: Props) {
  // Get courses
  const payload = await getPayload({ config: configPromise })

  const coursesRes = await payload.find({
    collection: 'courses',
    limit: 10,
  })

  let courses = coursesRes.docs

  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <div className="text-sm text-teal-400">All Courses</div>

      <div className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-2">
            <Image
              alt={course.title}
              src={
                typeof course.thumbnail === 'string'
                  ? course?.thumbnail
                  : course?.thumbnail?.url || '/placeholder.png'
              }
              width={500}
              height={300}
              className="w-full h-48 object-cover aspect-video"
            />
            {course.title}
          </Card>
        ))}
      </div>
    </div>
  )
}
