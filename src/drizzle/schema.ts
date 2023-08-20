import { pgTable, pgEnum, pgSchema, AnyPgColumn, uuid, text, foreignKey, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core"


import { sql } from "drizzle-orm"

export const actor = pgTable("Actor", {
	actorId: uuid("actorId").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	photo: text("photo"),
	summary: text("summary"),
});

export const game = pgTable("Game", {
	gameId: uuid("gameId").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	cover: text("cover").notNull(),
	summary: text("summary").notNull(),
	developerId: uuid("developerId").notNull().references(() => developer.developerId, { onDelete: "restrict", onUpdate: "cascade" } ),
	publisherId: uuid("publisherId").notNull().references(() => publisher.publisherId, { onDelete: "restrict", onUpdate: "cascade" } ),
	releaseDate: timestamp("releaseDate", { precision: 3, mode: 'string' }).notNull(),
	images: text("images").default('{}').array().notNull(),
	banner: text("banner").notNull(),
	trailer: text("trailer").notNull(),
});

export const developer = pgTable("Developer", {
	developerId: uuid("developerId").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	logo: text("logo").notNull(),
	location: text("location").notNull(),
	summary: text("summary").notNull(),
	country: text("country").notNull(),
});

export const publisher = pgTable("Publisher", {
	publisherId: uuid("publisherId").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	logo: text("logo").notNull(),
	headquarters: text("headquarters").notNull(),
	summary: text("summary").notNull(),
	country: text("country").notNull(),
});

export const platform = pgTable("Platform", {
	platformId: uuid("platformId").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	logo: text("logo").notNull(),
	release: timestamp("release", { precision: 3, mode: 'string' }).notNull(),
	summary: text("summary").notNull(),
});

export const actorsInGames = pgTable("ActorsInGames", {
	actorId: uuid("actorId").notNull().references(() => actor.actorId, { onDelete: "cascade", onUpdate: "cascade" } ),
	gameId: uuid("gameId").notNull().references(() => game.gameId, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		actorsInGamesPkey: primaryKey(table.actorId, table.gameId)
	}
});

export const gamesOnPlatforms = pgTable("GamesOnPlatforms", {
	gameId: uuid("gameId").notNull().references(() => game.gameId, { onDelete: "cascade", onUpdate: "cascade" } ),
	platformId: uuid("platformId").notNull().references(() => platform.platformId, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		gamesOnPlatformsPkey: primaryKey(table.gameId, table.platformId)
	}
});

export const genresOfGames = pgTable("GenresOfGames", {
	genre: varchar("genre", { length: 100 }).notNull(),
	gameId: uuid("gameId").notNull().references(() => game.gameId, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		genresOfGamesPkey: primaryKey(table.genre, table.gameId)
	}
});