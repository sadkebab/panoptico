"use client";

import { Combobox } from "@/lib/ui/combobox";
import { useContext } from "react";
import { TimezoneContext } from "./timezone";
import { Timezone } from "@/_data/timezones";

export default function TimezoneCombobox({
  className,
  zones,
}: {
  className?: string;
  zones: Timezone[];
}) {
  const { setTimezone, timezone } = useContext(TimezoneContext);

  return (
    <Combobox
      className={className}
      options={zones}
      searchPlaceholder="Select a timezone"
      onValueChange={(value) => setTimezone(value)}
      defaultValue={timezone}
      exactMatch
    />
  );
}
