import { db } from "@/lib/db"
import { events } from "@/schema"
import { and, desc, eq, sql, gt } from "drizzle-orm"

const DAY = 24 * 60 * 60 * 1000
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY
const HOUR = 60 * 60 * 1000


type Timestamp = string
export type DataRange = "hour" | "day" | "week" | "month"


const rangeMap: Record<DataRange, {
  unit: number
  group: number
  groupCount: number
}> = {
  hour: { unit: HOUR, group: HOUR / 20, groupCount: 20 },
  day: { unit: DAY, group: HOUR, groupCount: 24 },
  week: { unit: WEEK, group: DAY, groupCount: 7 },
  month: { unit: MONTH, group: DAY, groupCount: 30 },
}


export async function getByRange(event: string, range: DataRange) {
  const now = Date.now()

  const limit = now - rangeMap[range].unit
  const diff = limit % rangeMap[range].group
  const rounded = diff == 0 ? limit : limit + rangeMap[range].group - diff

  const condition = and(eq(events.type, event), gt(events.timestamp, rounded))
  const count_sql = await db.select({ count: sql<number>`count(*)` }).from(events).where(condition)
  const count = count_sql[0].count

  const rows = await db.query.events.findMany({
    where: condition,
    orderBy: [desc(events.timestamp)]
  })
  return {
    count,
    rows
  }
}

export function group({ count, rows }: Awaited<ReturnType<typeof getByRange>>, range: DataRange) {
  const start = Date.now() //rows.length > 0 ? rows[0].timestamp : Date.now()
  const startTime = start - (start % rangeMap[range].group)
  let currentTime = startTime

  const groups: Record<Timestamp, typeof rows> = {}

  groups[currentTime] = []
  let empty = rangeMap[range].groupCount - 1

  for (const row of rows) {
    while (row.timestamp < currentTime) {
      currentTime -= rangeMap[range].group
      groups[currentTime] = []
      empty--
    }

    groups[currentTime].push(row)
  }

  for (empty; empty > 0; empty--) {
    currentTime -= rangeMap[range].group
    groups[currentTime] = []
  }

  return { count, groups }
}

export type GroupedData = ReturnType<typeof group>


export const parseRange = (range: string | undefined): DataRange | undefined => {
  switch (range) {
    case "hour":
      return range;
    case "day":
      return range;
    case "week":
      return range;
    case "month":
      return range;
    default:
      return undefined
  }
}