'use client'

import { LogOutIcon } from 'lucide-react'
import React, { startTransition, useActionState, useEffect, useId } from 'react'

import { Button } from '@/components/ui/button'
import { logout } from '../_actions/logout'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
}

export function LogoutButton({ className }: Props) {
  const id = useId()
  const router = useRouter()
  const [state, action, pending] = useActionState(logout, { success: false })

  useEffect(() => {
    if (pending) {
      toast.loading('Logging out...', { id })
      return
    }

    if (!pending && state.success) {
      toast.success('Successfully logged out.', { id })
      router.refresh()
      return
    }

    if (!pending && !state.success && state.error) {
      toast.error(state.error, { id })
      return
    }
  }, [state, pending])

  const handleClickButton = () => {
    startTransition(action)
  }

  return (
    <Button
      icon={<LogOutIcon />}
      disabled={pending}
      loading={pending}
      className={className}
      onClick={handleClickButton}
    >
      Logout
    </Button>
  )
}
