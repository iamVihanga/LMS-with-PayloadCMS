'use server'

import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { getUser } from '../../../_actions/getUser'

export async function participate(courseId: string) {
  const payload = await getPayload({ config: configPromise })

  const user = await getUser()

  if (!user) throw new Error('User not found')

  try {
    const createdParticipation = await payload.create({
      collection: 'participation',
      data: {
        course: courseId,
        participant: user.id,
        progress: 0,
      },
      overrideAccess: false,
      user,
    })

    return createdParticipation
  } catch (error) {
    throw new Error('Could not create participation')
  }
}
