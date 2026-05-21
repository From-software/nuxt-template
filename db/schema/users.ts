import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    createdAt: timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
