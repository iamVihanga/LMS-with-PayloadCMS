'use server'

import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import config from '@payload-config'

import { Student } from '@/payload-types'

interface LoginParams {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  error?: string
}

interface Result {
  exp?: number
  token?: string
  user?: Student
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  try {
    const payload = await getPayload({ config })

    const result: Result = await payload.login({
      collection: 'students',
      data: { email, password },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      })
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'An unknown error occurred',
    }
  }
}
