import { getClient } from "@/config/database.config";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export async function ensureSiteInfoTableExists() {
  const client = await getClient();

  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'site_info'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "site_info" (
       id SERIAL PRIMARY KEY,
      site_name VARCHAR(100) NOT NULL,
      description TEXT,
      address VARCHAR(255),
      contact_email VARCHAR(100),
      phone_number VARCHAR(20),
      opening_hours VARCHAR(100),
      meta_title TEXT,
      meta_description TEXT,
      og_title TEXT,
      og_description TEXT,
      og_url TEXT,
      og_type VARCHAR(50) DEFAULT 'website',
      facebook_url VARCHAR(255),
      instagram_url VARCHAR(255),
      twitter_url VARCHAR(255),
      youtube_url VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT NOW() 
      );`;

    console.log("Created site_info table, seeding initial site information...");
    await seedInitialSiteInfo();
  }

  const siteInfoTable = pgTable("site_info", {
    id: serial("id").primaryKey(),
    site_name: varchar("site_name", { length: 100 }).notNull(),
    description: text("description"),
    address: varchar("address", { length: 255 }),
    contact_email: varchar("contact_email", { length: 100 }),
    phone_number: varchar("phone_number", { length: 20 }),
    opening_hours: varchar("opening_hours", { length: 100 }),
    meta_title: text("meta_title"),
    meta_description: text("meta_description"),
    og_title: text("og_title"),
    og_description: text("og_description"),
    og_url: text("og_url"),
    og_type: varchar("og_type", { length: 50 }).default("website"),
  });

  return siteInfoTable;
}

export async function seedInitialSiteInfo() {
  const initialSiteInfo = {
    site_name: "הגינה בפרדס",
    description: "חווה אורגנית למכירת ירקות טריים.",
    address: "פרדס חנה, רחוב החקלאי 12",
    contact_email: "info@haginabapardes.com",
    phone_number: "052-1234567",
    opening_hours: "א-ה, 9:00-17:00",
    meta_title: "הגינה בפרדס - חווה אורגנית",
    meta_description: "חווה אורגנית למכירת ירקות טריים בפרדס חנה.",
    og_title: "הגינה בפרדס",
    og_description: "חווה אורגנית למכירת ירקות טריים בפרדס חנה.",
    og_url: "https://haginabapardes.com",
    og_type: "website",
    facebook_url: "https://www.facebook.com/haginabapardes",
    instagram_url: "https://www.instagram.com/haginabapardes",
    twitter_url: "https://www.twitter.com/haginabapardes",
    youtube_url: "https://www.youtube.com/haginabapardes",
  };

  const client = await getClient();

  if (client) {
    await client`
      INSERT INTO site_info (site_name, description, address, contact_email, phone_number, opening_hours, meta_title, meta_description, og_title, og_description, og_url, og_type, facebook_url, instagram_url, twitter_url, youtube_url)
      VALUES (${initialSiteInfo.site_name}, ${initialSiteInfo.description}, ${initialSiteInfo.address}, ${initialSiteInfo.contact_email}, ${initialSiteInfo.phone_number}, ${initialSiteInfo.opening_hours}, ${initialSiteInfo.meta_title}, ${initialSiteInfo.meta_description}, ${initialSiteInfo.og_title}, ${initialSiteInfo.og_description}, ${initialSiteInfo.og_url}, ${initialSiteInfo.og_type}, ${initialSiteInfo.facebook_url}, ${initialSiteInfo.instagram_url}, ${initialSiteInfo.twitter_url}, ${initialSiteInfo.youtube_url});
    `;

    console.log("Initial site information added to site_info table.");
  }
}
