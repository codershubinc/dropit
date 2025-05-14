import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import path from 'path'

export const files = pgTable('files',
    {
        id: uuid('id').defaultRandom().primaryKey(),



        name: text('name').notNull(),
        type: text('type').notNull(),
        size: text('size').notNull(),
        path: text('path').notNull(),


        fileUrl: text('fileUrl').notNull(),
        thumbnailUrl: text('thumbnailUrl').notNull(),


        userId: text('userId').notNull(),
        parentId: text('parentId').notNull(),

        isFolder: boolean('isFolder').notNull().default(false),
        isDelete: boolean('isDelete').notNull().default(false),
        isStarred: boolean('isStarred').notNull().default(false),
        isTrash: boolean('isTrash').notNull().default(false),

        createdAt: timestamp('createdAt').notNull().defaultNow(),
        updatedAt: timestamp('updatedAt').notNull().defaultNow()
    }
)

export const filesRelations = relations(files, ({ one, many }) => ({

    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),
    children: many(files),
}))

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert