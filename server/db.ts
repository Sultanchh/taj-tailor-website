import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, gallery, customers, orders, businessInfo, InsertGallery, InsertCustomer, InsertOrder, InsertBusinessInfo } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Gallery queries
export async function getGalleryImages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(gallery).orderBy(desc(gallery.createdAt));
}

export async function addGalleryImage(data: InsertGallery) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(gallery).values(data);
  return result;
}

export async function updateGalleryImage(id: number, data: Partial<InsertGallery>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(gallery).set(data).where(eq(gallery.id, id));
}

export async function deleteGalleryImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(gallery).where(eq(gallery.id, id));
}

// Customer queries
export async function getAllCustomers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(customers).orderBy(desc(customers.createdAt));
}

export async function getCustomerByCardNumber(cardNumber: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(customers).where(eq(customers.cardNumber, cardNumber)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function addCustomer(data: InsertCustomer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(customers).values(data);
  return result;
}

export async function updateCustomer(id: number, data: Partial<InsertCustomer>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(customers).set(data).where(eq(customers.id, id));
}

// Order queries
export async function getOrderByCardNumber(cardNumber: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(orders).where(eq(orders.cardNumber, cardNumber)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function addOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(data);
  return result;
}

export async function updateOrderStatus(cardNumber: string, status: "Pending" | "In Progress" | "Ready") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.cardNumber, cardNumber));
}

// Business info queries
export async function getBusinessInfo() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(businessInfo).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateBusinessInfo(id: number, data: Partial<InsertBusinessInfo>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(businessInfo).set(data).where(eq(businessInfo.id, id));
}

export async function initializeBusinessInfo() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getBusinessInfo();
  if (!existing) {
    await db.insert(businessInfo).values({
      shopName: "Taj Tailor",
      shopPhone: "+92-XXX-XXXXXXX",
      shopEmail: "info@tajtailor.com",
      shopAddress: "Karachi, Pakistan",
      shopCity: "Karachi",
      shopCountry: "Pakistan",
      latitude: "24.8607",
      longitude: "67.0011",
      openingHours: JSON.stringify({ monday: "10:00 AM - 6:00 PM", tuesday: "10:00 AM - 6:00 PM", wednesday: "10:00 AM - 6:00 PM", thursday: "10:00 AM - 6:00 PM", friday: "10:00 AM - 6:00 PM", saturday: "10:00 AM - 4:00 PM", sunday: "Closed" }),
      socialLinks: JSON.stringify({ facebook: "", instagram: "", whatsapp: "" }),
    });
  }
}
