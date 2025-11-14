import React from 'react'
import { Toaster } from 'sonner'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full min-h-screen h-screen">
      {children}
      <Toaster position="bottom-right" />
    </div>
  )
}
