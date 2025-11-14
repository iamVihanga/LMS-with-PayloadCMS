import React from 'react'
import { DM_Sans as FontSans } from 'next/font/google'

import './styles.css'
import { cn } from '@/lib/utils'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="h-full">
      <body className={cn('h-full m-0 font-sans antialiased', fontSans.variable)}>{children}</body>
    </html>
  )
}
