import { varchar, pgTable, uuid, boolean, smallint, timestamp, integer, date, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'

export const User = pgTable('user', {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email_verified: boolean().default(false),
  grad_year: smallint(),
  major: varchar({ length: 100 }),
  bio: varchar({ length: 512 }),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});


export const statusEnum = pgEnum('status', ['active', 'inactive'])

export const roomTypeEnum = pgEnum('room_type', ['private', 'shared'])

export const Listing = pgTable('listing', {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 512 }),
    address: varchar({ length: 255 }),
    rent_cents: integer().notNull(),
    start_date: date().notNull(),
    end_date: date().notNull(),
    room_type: roomTypeEnum(),
    bedrooms_in_unit: smallint().notNull(),
    bathrooms_in_unit_x2: smallint().notNull(),
    private_bathroom: boolean().notNull(),
    status: statusEnum().notNull().default('active'),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
    furnished: boolean().notNull(),
    user_id: uuid().references(() => User.id).notNull(),
})

export const ListingImage = pgTable('listing_image', {
    id: uuid().defaultRandom().primaryKey(),
    listing_id: uuid().references(() => Listing.id).notNull(),
    url: varchar({ length: 512 }).notNull(),
    created_at: timestamp().defaultNow(),
})


export const userRelations = relations(User, ({ many }) => ({
  listings: many(Listing),
}));

export const listingRelations = relations(Listing, ({ one, many }) => ({
  user: one(User, {
    fields: [Listing.user_id],
    references: [User.id],
  }),
  listingImages: many(ListingImage),
}));

export const listingImageRelations = relations(ListingImage, ({ one }) => ({
  listing: one(Listing, {
    fields: [ListingImage.listing_id],
    references: [Listing.id],
  }),
}))