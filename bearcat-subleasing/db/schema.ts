import { varchar, pgTable, uuid, boolean, smallint, timestamp, integer, date, pgEnum, text, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

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
    user_id: text().references(() => user.id).notNull(),
})

export const ListingImage = pgTable('listing_image', {
    id: uuid().defaultRandom().primaryKey(),
    listing_id: uuid().references(() => Listing.id).notNull(),
    url: varchar({ length: 512 }).notNull(),
    created_at: timestamp().defaultNow(),
})


export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  listings: many(Listing),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const listingRelations = relations(Listing, ({ one, many }) => ({
  user: one(user, {
    fields: [Listing.user_id],
    references: [user.id],
  }),
  listingImages: many(ListingImage),
}));

export const listingImageRelations = relations(ListingImage, ({ one }) => ({
  listing: one(Listing, {
    fields: [ListingImage.listing_id],
    references: [Listing.id],
  }),
}))
