import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Gallery table for storing design images
 */
export const gallery = mysqlTable("gallery", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  imageKey: text("imageKey").notNull(), // S3 file key for reference
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = typeof gallery.$inferInsert;

/**
 * Customers table for storing booking information
 */
export const customers = mysqlTable("customers", {
  id: int("id").autoincrement().primaryKey(),
  cardNumber: varchar("cardNumber", { length: 20 }).notNull().unique(), // Unique visit card number
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  preferredVisitDate: timestamp("preferredVisitDate"),
  preferredVisitTime: varchar("preferredVisitTime", { length: 50 }), // e.g., "10:00 AM - 12:00 PM"
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Orders table for tracking stitching status
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  cardNumber: varchar("cardNumber", { length: 20 }).notNull().unique(), // Links to customer card number
  customerId: int("customerId").notNull(), // Foreign key to customers table
  description: text("description"), // Description of the shalwar kameez order
  status: mysqlEnum("status", ["Pending", "In Progress", "Ready"]).default("Pending").notNull(),
  estimatedDeliveryDate: timestamp("estimatedDeliveryDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Business info table for storing shop details
 */
export const businessInfo = mysqlTable("businessInfo", {
  id: int("id").autoincrement().primaryKey(),
  shopName: varchar("shopName", { length: 255 }).notNull().default("Taj Tailor"),
  shopPhone: varchar("shopPhone", { length: 20 }).notNull(),
  shopEmail: varchar("shopEmail", { length: 320 }).notNull(),
  shopAddress: text("shopAddress").notNull(),
  shopCity: varchar("shopCity", { length: 100 }).notNull().default("Karachi"),
  shopCountry: varchar("shopCountry", { length: 100 }).notNull().default("Pakistan"),
  latitude: varchar("latitude", { length: 50 }), // For map integration
  longitude: varchar("longitude", { length: 50 }), // For map integration
  openingHours: text("openingHours"), // JSON string with opening hours
  socialLinks: text("socialLinks"), // JSON string with social media links
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BusinessInfo = typeof businessInfo.$inferSelect;
export type InsertBusinessInfo = typeof businessInfo.$inferInsert;
