"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Globe2 } from "lucide-react"


import { cn } from "@/lib/utils"
import { Button } from "@/lib/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/lib/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/ui/popover"

export function Combobox({
  defaultLabel,
  defaultValue,
  searchPlaceholder,
  options,
  onValueChange,
  exactMatch,
  className,
}: {
  defaultLabel?: string,
  defaultValue?: string,
  searchPlaceholder: string,
  options: {
    value: string
    label: string
  }[],
  onValueChange: (value: string) => void,
  exactMatch?: boolean,
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  const filterProps = React.useMemo(() => exactMatch ? {
    filter: (value: string, search: string) => value.includes(search) ? 1 : 0
  } : {}, [exactMatch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between flex", className)}
        >
          <div className="flex gap-1 items-center">
            <Globe2 className="h-4 w-4 opacity-50" />
            <p className="flex-1 overflow-hidden">{value
              ? options.find((option) => option.value === value)?.label
              : defaultLabel}</p>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command {...filterProps}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.label}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  onValueChange(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
