import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'

type Props = {
  children: ReactNode
}

export default async function AuthenticatedLayout({ children }: Props) {
  return (
    <div>
      {children}
      <Toaster position="bottom-right" />
    </div>
  )
}
