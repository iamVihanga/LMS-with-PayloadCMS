import React from 'react'
import { LoginForm } from '../_components/login-form'

type Props = {}

export default function LoginPage({}: Props) {
  return (
    <div className="bg-secondary/40 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
