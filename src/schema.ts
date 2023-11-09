import { createInsertSchema } from "drizzle-zod";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: text("id").notNull().primaryKey(),
  type: text("type").notNull().default("unknown"),
  data: text("data"),
  timestamp: integer("timestamp").notNull(),
});

export const EventsValidator = createInsertSchema(events).strict();
