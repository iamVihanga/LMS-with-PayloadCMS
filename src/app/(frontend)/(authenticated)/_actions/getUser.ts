'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Payload } from 'payload'
import type { Customer } from '@/payload-types'

export async function getUser(): Promise<Customer | null> {
  try {
    const headers = await getHeaders()

    const payload: Payload = await getPayload({
      config: await configPromise,
    })

    const { user } = await payload.auth({ headers })

    // Check if user belongs to customers collection
    if (user && user.collection === 'customers') {
      return user as Customer
    }

    return null
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}
