import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { users } from "./auth-schema";

export const urlLinks = sqliteTable("url_links", {
    linkId: integer("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    shortCode: text("short_code", { length: 16 }).notNull().unique(),
    longUrl: text("long_url").notNull(),
    isCustomAlias: integer("is_custom_alias", { mode: "boolean" }).notNull().default(false),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    category: text("category", {enum: ["general", "marketing", "social-media", "work", "personal"]}).notNull().default("general"),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
},
    (table) => [
        index("idx_links_user_created").on(table.userId, table.createdAt,),
        index("idx_links_is_active").on(table.isActive)
    ],
);

export const clickAnalytics = sqliteTable("click_analytics", {
    id: integer("id").primaryKey(),
    linkId: integer("link_id").notNull().references(() => urlLinks.linkId, { onDelete: "cascade", }),
    clickedAt: integer("clicked_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    city: text("city"),
    region: text("region"),
    countryCode: text("country_code", { length: 2 }),
    referrer: text("referrer", { length: 512 }),
    userAgent: text("user_agent"),
    continent: text("continent")
},
    (table) => [
        index("idx_analytics_link_time").on(table.linkId, table.clickedAt),
    ],
);
