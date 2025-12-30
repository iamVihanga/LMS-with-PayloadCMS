import { getPayload } from 'payload'
import React from 'react'

import configPromise from '@payload-config'
import { getUser } from '../../../_actions/getUser'
import { Course, Participation } from '@/payload-types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, MessageCircleQuestionMarkIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import { RichText } from '@/components/rich-text'
import { Card } from '@/components/ui/card'
import StartCourseButton from '../_components/start-course-button'
import { ResumeCourseButton } from '../_components/resume-course-button'

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
  let participant: Participation | null = null

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

  // Check participation status
  try {
    const participationRes = await payload.find({
      collection: 'participation',
      where: {
        course: {
          equals: courseId,
        },
        participant: {
          equals: user?.id!,
        },
      },
      overrideAccess: false,
      user,
    })

    participant = (participationRes?.docs?.[0] as Participation) || null
  } catch (error) {
    console.error('Error fetching participation:', error)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <Button asChild variant={'link'} className="w-fit">
        <Link href={`/dashboard`}>
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-700">
        <Image
          alt={course.title}
          src={
            typeof course.thumbnail === 'string'
              ? course?.thumbnail
              : course?.thumbnail?.url || '/placeholder.png'
          }
          className="object-cover w-full h-full"
          width={700}
          height={500}
        />
      </div>

      {/* Content area */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{course.title}</h1>

        <RichText data={course.description} />
      </div>

      {/* Curriculum */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Curriculum</h2>

        <div className="flex flex-col gap-4">
          {course.curriculum?.map((block, index) => {
            if (block.blockType === 'video') {
              return (
                <Card key={index} className="p-4 shadow-none border flex flex-col gap-2">
                  <div className="text-teal-700 font-semibold flex items-center gap-2">
                    <div className="p-2 rounded-full bg-teal-700/10">
                      <VideoIcon className="size-4" />
                    </div>
                    {block.title}
                  </div>
                  <div className="text-sm text-gray-400">Duration: {block.duration}min</div>
                </Card>
              )
            } else if (block.blockType === 'quiz') {
              return (
                <Card key={index} className="p-4 shadow-none border flex flex-col gap-2">
                  <div className="text-amber-600 font-semibold flex items-center gap-2">
                    <div className="p-2 rounded-full bg-amber-600/10">
                      <MessageCircleQuestionMarkIcon className="size-4" />
                    </div>
                    {block.title}
                  </div>
                  <div className="text-sm text-gray-400">{block.questions?.length} Questions</div>
                </Card>
              )
            }
          })}
        </div>
      </div>

      {participant ? (
        <ResumeCourseButton participant={participant} className="w-full" />
      ) : (
        <StartCourseButton courseId={course.id} />
      )}
    </div>
  )
}
