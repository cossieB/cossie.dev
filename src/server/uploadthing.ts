import { ServerError } from "solid-start";
import { createUploadthing } from "uploadthing/next";
import { FileRouter } from "uploadthing/server";
import { z } from "zod";
import MongoConnection from "~/mongo/mongo";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

const mongo = new MongoConnection;

const f = createUploadthing({
    errorFormatter: (err) => {
      return {
        message: err.cause instanceof ServerError ? err.cause.message : err.message,
        zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null,
      };
    },
  });

export const uploadRouter = {
    game: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 10
        }
    })
        .input(z.object({
            reference: z.string().uuid(),
            field: z.enum(['cover', 'banner', 'images'])
        }))
        .middleware(async opts => {
            await authenticateOrThrowUnauthorized(opts.req);
            return {
                input: {
                    ...opts.input,
                    table: 'game' as const
                },
            }
        })
        .onUploadComplete(async data => {
            const doc = {...data.metadata.input, ... data.file}
            await mongo.addImages(doc)
        }),
    logo: f({
        image: {
            maxFileSize: "4MB"
        }
    })
        .input(z.object({
            reference: z.string().uuid(),
            table: z.enum(['developer', 'publisher', 'platform']),
        }))
        .middleware(async opts => {
            await authenticateOrThrowUnauthorized(opts.req);
            return {
                input: {
                    ...opts.input,
                    field: 'logo'
                },
            }
        })
        .onUploadComplete(async data => {
            const doc = {...data.metadata.input, ... data.file}
            await mongo.addImages(doc)
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;