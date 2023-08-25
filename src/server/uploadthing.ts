import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

function upsert(data: {_middleware: {name: string}}) {
    
}

export const uploadRouter = {
    upload: f({
        image: {
            maxFileSize: "1024B"
        }
    })
    .input(z.object({
        title: z.string(),
        field: z.enum(['cover', 'banner', 'screenshots'])
    }))
    .middleware(opts => {
        return {
            name: opts.input
        }
    })
    .onUploadComplete(data => {
        
    }),
    banner: f({
        image: {
            maxFileSize: "1024B"
        }
    })
    .input(z.string())
    .middleware(opts => {
        return {
            name: opts.input
        }
    })
    .onUploadComplete(data => {
        
    }),
    screenshots: f({
        image: {
            maxFileSize: "1024B",
            maxFileCount: 8
        }
    })
    .input(z.string())
    .middleware(opts => {
        return {
            name: opts.input
        }
    })
    .onUploadComplete(data => {
        console.log(data)
    }),
    test: f({
        image: {
            maxFileCount: 10,
            maxFileSize: "4MB"
        }
    })
    .input(z.string())
    .middleware(({input}) => {
        return {input, num: Math.random()}
    })
    .onUploadComplete(data => {
        console.log("test done", data);
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