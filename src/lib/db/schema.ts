import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
export const users = pgTable('users', {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').notNull()
        .defaultNow().$onUpdate(()=> new Date()),
    name: text('name').notNull().unique()
})
export const feeds = pgTable('feeds', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=> new Date()).notNull(),
    name: text('name').notNull(),
    url: text('url').unique().notNull(),
    userID: uuid('user_id').notNull().references(()=> users.id, {onDelete: 'cascade'})
})