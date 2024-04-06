import { createUploadthing } from "uploadthing/next";
import { UploadThingError, type FileRouter } from "uploadthing/server";
import { z } from "zod";
import MongoConnection from "~/mongo/mongo";
import { getUser } from "~/routes/data";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

const mongo = new MongoConnection;

const f = createUploadthing({
    errorFormatter: (err) => ({
        // @ts-expect-error
        error: err.cause?.error ?? err.message
    }),
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
            const user = await getUser()
            if (!user)
                throw new UploadThingError("Unauthorized")
            return {
                input: {
                    ...opts.input,
                    table: 'game' as const
                },
            }
        })
        .onUploadComplete(async data => {
            const doc = { ...data.metadata.input, ...data.file };
            await mongo.addImages(doc);
        }),
        
    logo: f({
        image: {
            maxFileSize: "4MB"
        }
    })
        .input(z.object({
            reference: z.string().uuid(),
            table: z.enum(['developer', 'publisher', 'platform', 'actor']),
        }))
        .middleware(async opts => {
            const user = await getUser()
            if (!user)
                throw new UploadThingError("Unauthorized")
            return {
                input: {
                    ...opts.input,
                    field: opts.input.table === 'actor' ? 'photo' : 'logo'
                },
            }
        })
        .onUploadComplete(async data => {
            const doc = { ...data.metadata.input, ...data.file };
            await mongo.addImages(doc);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;