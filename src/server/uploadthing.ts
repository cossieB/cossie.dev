import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

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
        .middleware(opts => {
            return {
                input: opts.input
            }
        })
        .onUploadComplete(data => {
            console.log(data)
        }),
    dev: f({
        image: {
            maxFileSize: "4MB"
        }
    })
        .input(z.object({
            title: z.string(),
            field: z.enum(['logo'])
        }))
        .middleware(opts => {
            return {
                name: opts.input
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