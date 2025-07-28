'use client'

import { getPendingInvites } from '@http/get-pending-invites'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, rejectInviteAction } from './actions'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  const queryKey = ['pending-invites']

  const { data } = useQuery({
    queryKey,
    queryFn: getPendingInvites,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="relative size-4" />
          <span className="sr-only">Pending invites</span>
          {data?.invites && data.invites.length > 0 && (
            <span className="absolute flex size-2 translate-x-2.5 -translate-y-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-muted-foreground text-sm">No invites found.</p>
        )}

        {data?.invites.map((invite) => (
          <div className="space-y-2" key={invite.id}>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <span className="text-foreground font-medium">
                {invite.author?.name ?? 'Someone'}
              </span>{' '}
              invites you to join{' '}
              <span className="text-foreground font-medium">
                {invite.organization.name}
              </span>{' '}
              <span className="text-xs">
                {dayjs(invite.createdAt).fromNow()}
              </span>
              .
            </p>

            <div className="flex gap-1">
              <Button
                onClick={() => handleAcceptInvite(invite.id)}
                size="xs"
                variant="outline"
              >
                <Check className="mr-1.5 size-3" />
                Accept
              </Button>

              <Button
                onClick={() => handleRejectInvite(invite.id)}
                size="xs"
                variant="ghost"
                className="text-muted-foreground"
              >
                <X className="mr-1.5 size-3" />
                Reject
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
