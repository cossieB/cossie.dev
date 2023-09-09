import { ServerError } from "solid-start";
import { createUploadthing } from "uploadthing/next";
import { FileRouter } from "uploadthing/server";
import { z } from "zod";
import { authenticate } from "~/utils/authenticate";

const f = createUploadthing({
    errorFormatter: (err) => {
      return {
        message: err.cause instanceof ServerError ? err.cause.message : "Something Went Wrong",
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
            title: z.string(),
            field: z.enum(['cover', 'banner', 'images'])
        }))
        .middleware(async opts => {
            const user = await authenticate(opts.req)
            if (!user || user != process.env.ADMIN_USERNAME)
                throw new ServerError('Unauthorized', {status: 401})
            return {
                input: opts.input
            }
        })
        .onUploadComplete(data => {
            console.log(data)
        }),
    logo: f({
        image: {
            maxFileSize: "4MB"
        }
    })
        .input(z.object({
            name: z.string(),
            field: z.enum(['developer', 'publisher', 'platform'])
        }))
        .middleware(async opts => {
            const user = await authenticate(opts.req)
            if (!user || user != process.env.ADMIN_USERNAME)
                throw new ServerError('Unauthorized', {status: 401})
            return {
                input: opts.input
            }
        })
        .onUploadComplete(data => {
            console.log(data)
        }),
    // videoAndImage: f({
    //     image: {
    //         maxFileSize: "4MB",
    //         maxFileCount: 10,
    //     },
    // }).onUploadComplete((data) => {
    //     console.log("upload completed", data);
    // }),
    // withMdwr: f({
    //     image: {
    //         maxFileCount: 2,
    //         maxFileSize: "1MB",
    //     },
    // })
    //     .middleware((opts) => {
    //         const h = opts.req.headers.get("someProperty");

    //         if (!h) throw new Error("someProperty is required");

    //         return {
    //             someProperty: h,
    //             otherProperty: "hello" as const,
    //         };
    //     })
    //     .onUploadComplete(({ metadata, file }) => {
    //         console.log("uploaded with the following metadata:", metadata);
    //         console.log("files successfully uploaded:", file);
    //     }),

    // withoutMdwr: f({
    //     image: {
    //         maxFileCount: 2,
    //         maxFileSize: "16MB",
    //     },
    // })
    //     .middleware(() => {
    //         return { testMetadata: "lol" };
    //     })
    //     .onUploadComplete(({ metadata, file }) => {
    //         console.log("uploaded with the following metadata:", metadata);
    //         console.log("files successfully uploaded:", file);
    //     }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;