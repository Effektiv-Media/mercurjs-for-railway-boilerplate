"use client"

import { Badge } from "@/components/atoms"
import { MessageIcon } from "@/icons"
import LocalizedClientLink from "../LocalizedLink/LocalizedLink"
import { useUnreads } from "@talkjs/react"

export const MessageButton = ({ iconColor = "#090909" }: { iconColor?: string }) => {
  const unreads = useUnreads()

  return (
    <LocalizedClientLink
      href="/user/messages"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <MessageIcon size={20} color={iconColor} />
      {Boolean(unreads?.length) && (
        <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
          {unreads?.length}
        </Badge>
      )}
    </LocalizedClientLink>
  )
}
