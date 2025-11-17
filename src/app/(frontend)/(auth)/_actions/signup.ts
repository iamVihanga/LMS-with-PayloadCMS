'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Student } from '@/payload-types'
import { cookies } from 'next/headers'

interface SignupParams {
  email: string
  password: string
}

interface SignupResponse {
  success: boolean
  error?: string
}

type Result = {
  exp?: number
  token?: string
  user?: Student
}

export async function signup({ email, password }: SignupParams): Promise<SignupResponse> {
  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'students',
      data: {
        email,
        password,
      },
    })

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
