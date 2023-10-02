import type { InferModel } from "drizzle-orm";
import { actor, actorsInGames, developer, game, gamesOnPlatforms, genresOfGames, platform, publisher } from "./schema";

export type Game = InferModel<typeof game>
export type GenresOfGames = InferModel<typeof genresOfGames>
export type Developer = InferModel<typeof developer>
export type Publisher = InferModel<typeof publisher>
export type Platform = InferModel<typeof platform>
export type GamesOnPlatforms = InferModel<typeof gamesOnPlatforms>
export type ActorsInGames = InferModel<typeof actorsInGames>
export type Actor = InferModel<typeof actor>