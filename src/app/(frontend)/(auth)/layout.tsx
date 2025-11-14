import { GraduationCapIcon } from 'lucide-react'
import React from 'react'
import { Toaster } from 'sonner'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full min-h-screen h-screen">
      <div className="bg-secondary/40 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="rounded-md bg-primary p-2 text-primary-foreground">
              <GraduationCapIcon className="size-4" />
            </div>

            <div>
              <p className="text-sm text-foreground font-semibold font-heading">CodeVille LMS</p>
              <p className="text-xs text-foreground/70">{`Learn. Code and Succeed.`}</p>
            </div>
          </div>

          {children}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}
