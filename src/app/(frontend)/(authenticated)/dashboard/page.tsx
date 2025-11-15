import React from 'react'
import { LogoutButton } from '../_components/logout-button'

type Props = {}

export default function DashboardPage({}: Props) {
  return (
    <div>
      <p className="text-xl font-semibold">Dashboard Page</p>

      <p>You are authenticated</p>
    </div>
  )
}
