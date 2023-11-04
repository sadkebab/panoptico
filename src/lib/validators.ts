import { z } from "zod"

export const TrackerEventValidator = z.object({
  event: z.string(),
  data: z.record(z.union([z.string(), z.number(), z.boolean(), z.array(z.union([z.string(), z.number(), z.boolean()]))]))
})

export type TrackerEvent = z.infer<typeof TrackerEventValidator>
