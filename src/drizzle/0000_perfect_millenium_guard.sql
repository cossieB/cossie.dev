-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "Actor" (
	"actorId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"photo" text,
	"summary" text
);

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp(3),
	"image" text DEFAULT '' NOT NULL,
	"username" varchar(255) NOT NULL,
	"status" varchar(255) DEFAULT ''::character varying NOT NULL,
	"joinDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"username_lower" varchar(255) NOT NULL,
	"banner" text DEFAULT '/logo_long.png' NOT NULL
);

CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);

CREATE TABLE IF NOT EXISTS "Comment" (
	"commentId" text PRIMARY KEY NOT NULL,
	"content" varchar(255) NOT NULL,
	"userId" text NOT NULL,
	"postId" text NOT NULL,
	"creationDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"editDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Meme" (
	"postId" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"creationDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"editDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"title" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"views" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "Game" (
	"gameId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"cover" text NOT NULL,
	"summary" text NOT NULL,
	"developerId" uuid NOT NULL,
	"publisherId" uuid NOT NULL,
	"releaseDate" timestamp(3) NOT NULL,
	"images" text[],
	"banner" text NOT NULL,
	"trailer" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "ActorsInGames" (
	"actorId" uuid NOT NULL,
	"gameId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ActorsInGames" ADD CONSTRAINT "ActorsInGames_pkey" PRIMARY KEY("actorId","gameId");

CREATE TABLE IF NOT EXISTS "MemesLikedByUser" (
	"postId" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "MemesLikedByUser" ADD CONSTRAINT "MemesLikedByUser_pkey" PRIMARY KEY("postId","userId");

CREATE TABLE IF NOT EXISTS "Platform" (
	"platformId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" text NOT NULL,
	"summary" text NOT NULL,
	"release" timestamp(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Developer" (
	"developerId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" text NOT NULL,
	"location" text NOT NULL,
	"summary" text NOT NULL,
	"country" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "Publisher" (
	"publisherId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" text NOT NULL,
	"headquarters" text NOT NULL,
	"summary" text NOT NULL,
	"country" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "FollowerFollowee" (
	"followerId" text NOT NULL,
	"followeeId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "FollowerFollowee" ADD CONSTRAINT "FollowerFollowee_pkey" PRIMARY KEY("followerId","followeeId");

CREATE TABLE IF NOT EXISTS "GamesOnPlatforms" (
	"gameId" uuid NOT NULL,
	"platformId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_pkey" PRIMARY KEY("gameId","platformId");

CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "GenresOfGames" (
	"genre" varchar(100) NOT NULL,
	"gameId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "GenresOfGames" ADD CONSTRAINT "GenresOfGames_pkey" PRIMARY KEY("genre","gameId");

CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken" ("identifier","token");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken" ("token");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_lower_key" ON "User" ("username_lower");
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account" ("provider","providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session" ("sessionToken");
DO $$ BEGIN
 ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Meme"("postId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Meme" ADD CONSTRAINT "Meme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Game" ADD CONSTRAINT "Game_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("developerId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Game" ADD CONSTRAINT "Game_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("publisherId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "ActorsInGames" ADD CONSTRAINT "ActorsInGames_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("actorId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "ActorsInGames" ADD CONSTRAINT "ActorsInGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "MemesLikedByUser" ADD CONSTRAINT "MemesLikedByUser_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Meme"("postId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "MemesLikedByUser" ADD CONSTRAINT "MemesLikedByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "FollowerFollowee" ADD CONSTRAINT "FollowerFollowee_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "FollowerFollowee" ADD CONSTRAINT "FollowerFollowee_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("platformId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "GenresOfGames" ADD CONSTRAINT "GenresOfGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/