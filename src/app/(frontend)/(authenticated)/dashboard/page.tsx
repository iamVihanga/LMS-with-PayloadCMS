import React from 'react'
import { headers as getHeaders } from 'next/headers.js'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getUser } from '../_actions/getUser'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Calendar1Icon } from 'lucide-react'
import Link from 'next/link'

type Props = {}

export default async function DashboardPage({}: Props) {
  // Get courses
  const payload = await getPayload({ config: configPromise })

  // Get the user
  const headers = await getHeaders()

  const { user } = await payload.auth({ headers })

  // Get the courses
  const coursesRes = await payload.find({
    collection: 'courses',
    limit: 10,
    overrideAccess: false,
    user: user || undefined,
  })

  let courses = coursesRes.docs

  return (
    <div className="flex flex-col mx-auto w-full max-w-4xl p-4 gap-4">
      <div className="text-sm text-teal-400">All Courses</div>

      <div className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/dashboard/course/${course.id}`}>
            <Card className="p-0 overflow-hidden flex flex-col gap-2 group cursor-pointer hover:shadow-lg transition-shadow">
              <Image
                alt={course.title}
                src={
                  typeof course.thumbnail === 'string'
                    ? course?.thumbnail
                    : course?.thumbnail?.url || '/placeholder.png'
                }
                width={300}
                height={200}
                className="w-full h-48 object-cover aspect-video group-hover:scale-105 transition-transform"
              />

              <div className="px-4 pt-2 pb-4 space-3">
                <p className="font-heading font-semibold group-hover:underline">{course.title}</p>

                <p className="text-sm text-secondary-foreground flex items-center gap-2">
                  <Calendar1Icon className="size-3" />
                  {new Date(course.createdAt).toDateString()}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
