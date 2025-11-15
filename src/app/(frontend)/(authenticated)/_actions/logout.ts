'use server'

import { cookies } from 'next/headers'

interface LogoutResponse {
  success: boolean
  error?: string
}

export async function logout(): Promise<LogoutResponse> {
  try {
    const cookieStore = await cookies()

    cookieStore.delete('payload-token')

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'An unknown error occurred during logout.',
    }
  }
}
