import { pgTable, integer, varchar, timestamp, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const notes = pgTable('notes', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar().notNull(),
    body: text(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ mode: 'date', withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
})

export const noteRelations = relations(notes, ({ one }) => ({
    user: one(users, {
        fields: [notes.userId],
        references: [users.id]
    })
}))

export type Note = typeof notes.$inferSelect
export type NewNote = typeof notes.$inferInsert
