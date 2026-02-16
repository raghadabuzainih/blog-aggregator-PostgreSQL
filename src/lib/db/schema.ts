import { pgTable, uuid, timestamp, text, uniqueIndex } from "drizzle-orm/pg-core";

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
    userID: uuid('user_id').notNull().references(()=> users.id, {onDelete: 'cascade'}),
    lastFetchedAt: timestamp('last_fetched_at')
})

export const feed_follows = pgTable('feed_follows', {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(()=> new Date()),
        userID: uuid('user_id').references(()=> users.id, {onDelete: 'cascade'}).notNull(),
        feedID: uuid('feed_id').references(()=> feeds.id, {onDelete: 'cascade'}).notNull()
    },
    (table) => ({
        //unique constraint
        userFeedUnique: uniqueIndex("user_feed_unique").on(
            table.userID,
            table.feedID
        )
    })
)