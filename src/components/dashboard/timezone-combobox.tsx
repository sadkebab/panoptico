"use client"

import { Combobox } from "@/lib/ui/combobox"
import { useContext, useMemo } from "react"
import { TimezoneContext } from "./timezone"
import { tz } from "@/_data/timezones"

export default function TimezoneCombobox({
  className
}: {
  className?: string
}) {
  const { setTimezone, timezone } = useContext(TimezoneContext)

  return (
    <Combobox
      className={className}
      options={tz}
      searchPlaceholder="Select a timezone"
      onValueChange={(value) => setTimezone(value)}
      defaultValue={timezone}
      exactMatch
    />
  )
}

