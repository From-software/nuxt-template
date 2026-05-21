import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { notes } from './'

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    createdAt: timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
})

export const userRelations = relations(users, ({ many }) => ({
    notes: many(notes)
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
