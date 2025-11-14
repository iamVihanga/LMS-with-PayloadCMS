import React from 'react'
import { LoginForm } from '../_components/login-form'
import Link from 'next/link'

type Props = {}

export default function LoginPage({}: Props) {
  return (
    <>
      <LoginForm />

      <p className="text-sm text-foreground/70 text-center">
        Don't have an account?{' '}
        <Link href={`/signup`} className="font-heading hover:underline text-foreground">
          Create an Account
        </Link>
      </p>
    </>
  )
}
