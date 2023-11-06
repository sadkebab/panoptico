import { db } from "@/lib/db"
import { json } from "@/lib/responses"
import { events } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest, { params }: { params: { name: string } }) => {
  const count_sql = await db.select({ count: sql<number>`count(*)` }).from(events).where(eq(events.type, params.name))
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')

  const count = count_sql[0].count
  const rows = await db.query.events.findMany({
    limit: pageSize || 10,
    offset: pageSize * (page - 1),
    where: eq(events.type, params.name),
    orderBy: [desc(events.timestamp)]
  })
  return json({ rows, count, page: page, pages: Math.ceil(count / (pageSize || 10)) })
}