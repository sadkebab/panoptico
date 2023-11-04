"use client"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"


export default function MobileMenu({
  children,
  icon
}: {
  children: React.ReactNode,
  icon: React.ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {icon}
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1 flex flex-col gap-1 border-muted">
        {children}
      </PopoverContent>
    </Popover>

  )
}