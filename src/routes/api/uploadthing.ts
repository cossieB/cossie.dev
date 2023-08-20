import { createServerHandler } from "uploadthing/server";
 
import { uploadRouter } from "~/server/uploadthing";
 
export const { GET, POST } = createServerHandler({
  router: uploadRouter,
  config: {
    callbackUrl: `http://localhost:${process.env.PORT ?? 3000}/api/uploadthing`,
  },
});