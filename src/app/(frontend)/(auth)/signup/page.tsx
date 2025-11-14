import React from 'react'
import { LoginForm } from '../_components/login-form'
import Link from 'next/link'
import { SignupForm } from '../_components/signup-form'

type Props = {}

export default function SignupPage({}: Props) {
  return (
    <>
      <SignupForm />

      <p className="text-sm text-foreground/70 text-center">
        Already have an account?{' '}
        <Link href={`/login`} className="font-heading hover:underline text-foreground">
          Login
        </Link>
      </p>
    </>
  )
}
