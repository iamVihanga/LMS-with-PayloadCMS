import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default async function AuthenticatedLayout({ children }: Props) {
  return <div>{children}</div>
}
