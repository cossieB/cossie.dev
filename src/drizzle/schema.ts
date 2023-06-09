import { pgTable, pgEnum, pgSchema, AnyPgColumn, uuid, text, varchar, timestamp, integer, uniqueIndex, foreignKey, primaryKey } from "drizzle-orm/pg-core"


import { sql } from "drizzle-orm"

export const actor = pgTable("Actor", {
	actorId: uuid("actorId").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	photo: text("photo"),
	summary: text("summary"),
});

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").notNull(),
});

export const verificationToken = pgTable("VerificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").on(table.identifier, table.token),
		tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
	}
});

export const user = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image").default('').notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	status: varchar("status", { length: 255 }).default('').notNull(),
	joinDate: timestamp("joinDate", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	usernameLower: varchar("username_lower", { length: 255 }).notNull(),
	banner: text("banner").default('/logo_long.png').notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
		usernameKey: uniqueIndex("User_username_key").on(table.username),
		usernameLowerKey: uniqueIndex("User_username_lower_key").on(table.usernameLower),
	}
});

export const account = pgTable("Account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
	}
});

export const comment = pgTable("Comment", {
	commentId: text("commentId").primaryKey().notNull(),
	content: varchar("content", { length: 255 }).notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	postId: text("postId").notNull().references(() => meme.postId, { onDelete: "cascade", onUpdate: "cascade" } ),
	creationDate: timestamp("creationDate", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	editDate: timestamp("editDate", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const meme = pgTable("Meme", {
	postId: text("postId").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	creationDate: timestamp("creationDate", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	editDate: timestamp("editDate", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: varchar("title", { length: 100 }).notNull(),
	image: text("image").notNull(),
	description: text("description").default('').notNull(),
	views: integer("views").notNull(),
});

export const game = pgTable("Game", {
	gameId: uuid("gameId").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	cover: text("cover").notNull(),
	summary: text("summary").notNull(),
	developerId: uuid("developerId").notNull().references(() => developer.developerId, { onDelete: "restrict", onUpdate: "cascade" } ),
	publisherId: uuid("publisherId").notNull().references(() => publisher.publisherId, { onDelete: "restrict", onUpdate: "cascade" } ),
	releaseDate: timestamp("releaseDate", { precision: 3, mode: 'string' }).notNull(),
	images: text("images").array(),
	banner: text("banner").notNull(),
	trailer: text("trailer").notNull(),
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

export const memesLikedByUser = pgTable("MemesLikedByUser", {
	postId: text("postId").notNull().references(() => meme.postId, { onDelete: "restrict", onUpdate: "cascade" } ),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		memesLikedByUserPkey: primaryKey(table.postId, table.userId)
	}
});

export const platform = pgTable("Platform", {
	platformId: uuid("platformId").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	logo: text("logo").notNull(),
	summary: text("summary").notNull(),
	release: timestamp("release", { precision: 3, mode: 'string' }).notNull(),
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

export const followerFollowee = pgTable("FollowerFollowee", {
	followerId: text("followerId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	followeeId: text("followeeId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		followerFolloweePkey: primaryKey(table.followerId, table.followeeId)
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

export const session = pgTable("Session", {
	id: text("id").primaryKey().notNull(),
	sessionToken: text("sessionToken").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
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