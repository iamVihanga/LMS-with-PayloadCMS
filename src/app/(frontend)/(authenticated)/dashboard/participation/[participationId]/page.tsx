import { getPayload } from 'payload'
import React from 'react'

import configPromise from '@payload-config'
import { getUser } from '../../../_actions/getUser'
import { Participation } from '@/payload-types'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    participationId: string
  }>
}

export default async function ParticipationPage({ params }: Props) {
  const { participationId } = await params

  const payload = await getPayload({ config: configPromise })

  const user = await getUser()

  let participation: Participation | null = null

  try {
    const res = await payload.findByID({
      collection: 'participation',
      id: participationId,
      overrideAccess: false,
      user,
    })

    participation = res as Participation
  } catch (error) {
    return notFound()
  }

  if (!participation) notFound()

  return <pre>{JSON.stringify(participation.course, null, 2)}</pre>
}
