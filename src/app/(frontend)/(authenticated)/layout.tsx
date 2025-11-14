import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { getUser } from './_actions/getUser'

type Props = {
  children: ReactNode
}

export default async function AuthenticatedLayout({ children }: Props) {
  const user = await getUser()

  if (!user) redirect('/login')

  return <div>{children}</div>
}
