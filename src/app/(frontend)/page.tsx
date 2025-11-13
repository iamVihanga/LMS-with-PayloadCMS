import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="bg-zinc-900 h-screen w-full flex items-center justify-center">
      <div className="space-y-3">
        {!user && (
          <h1 className="font-semibold text-lg text-white">Welcome to your new project.</h1>
        )}
        {user && <h1 className="text-white/80">Welcome back, {user.email}</h1>}
        <div className="flex items-center gap-3 text-white/80">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
