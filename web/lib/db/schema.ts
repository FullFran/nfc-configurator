import { pgTable, text, timestamp, varchar, uuid, pgEnum, integer } from "drizzle-orm/pg-core";

export const assetStatusEnum = pgEnum("asset_status", ["ACTIVE", "NO_CLAIMED", "DISABLED"]);
export const userRoleEnum = pgEnum("user_role", ["ADMIN", "USER"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").default("USER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assets = pgTable("assets", {
    publicId: varchar("public_id", { length: 20 }).primaryKey(),
    name: text("name"),
    destinationUrl: text("destination_url"),
    status: assetStatusEnum("status").default("NO_CLAIMED").notNull(),
    claimCode: varchar("claim_code", { length: 12 }).notNull().unique(),
    claimedAt: timestamp("claimed_at"),
    userId: uuid("user_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const redirectEvents = pgTable("redirect_events", {
    id: uuid("id").primaryKey().defaultRandom(),
    assetPublicId: varchar("asset_public_id", { length: 20 }).references(() => assets.publicId),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    referer: text("referer"),
});
