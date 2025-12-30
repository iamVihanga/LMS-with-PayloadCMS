import { GraduationCapIcon } from 'lucide-react'
import React from 'react'
import { LogoutButton } from '../_components/logout-button'
import { getUser } from '../_actions/getUser'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const user = await getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  return (
    <div className="w-full min-h-screen bg-secondary/40">
      <div className="max-w-3xl mx-auto py-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between py-2 border-b border-border mb-6">
          {/* Logo */}
          <Link href={`/dashboard`}>
            <div className="flex items-center justify-center gap-3">
              <div className="rounded-md bg-primary p-2 text-primary-foreground">
                <GraduationCapIcon className="size-4" />
              </div>

              <div>
                <p className="text-sm text-foreground font-semibold font-heading">CodeVille LMS</p>
                <p className="text-xs text-foreground/70">{`Learn. Code and Succeed.`}</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="">
              <p className="text-xs text-foreground font-heading">Welcome Back,</p>
              <p className="text-sm text-foreground">{user.email}</p>
            </div>

            <LogoutButton />
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
