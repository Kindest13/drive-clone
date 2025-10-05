import { auth } from "@clerk/nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import z from "zod"
import { MUTATIONS, QUERIES } from "~/server/db/queries"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  driveUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "1GB",
      maxFileCount: 9999,
    },
  })
    .input(
      z.object({
        folderId: z.number(),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const user = await auth()
      const folder = await QUERIES.getFolderById(input.folderId)

      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!folder) throw new UploadThingError("folder not found")
      if (folder.ownerId !== user.userId)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError("Unauthorized")
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user.userId) throw new UploadThingError("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, parentId: input.folderId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      await MUTATIONS.createFile({
        file: {
          name: file.name,
          ownerId: metadata.userId,
          size: file.size,
          url: file.url,
          parent: metadata.parentId as unknown as bigint,
        },
        userId: metadata.userId,
      })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
