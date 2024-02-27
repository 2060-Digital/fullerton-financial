import { getPlaiceholder } from "plaiceholder"
import { isPlainObject } from "lodash"
import fs from "fs"
import path from "path"
import filenamify from "filenamify"

/**
 * Generate base64 Images for Storyblok image Assets (and cache them to the filesystem)
 *
 * @param {{}} page An Storyblok page object (or part of page object, in theory) to recursively process
 * @returns {Promise<{}>} The processed object
 */
export default async function generateSBPlaiceholders(page) {
  // Prevents Object.entries from processing strings as arrays
  if (!isPlainObject(page)) return page

  return await Object.fromEntries(
    await Promise.all(
      Object.entries(page).map(async ([key, value]) => {
        if (isPlainObject(value)) {
          // Bingo. Found an image. Generate a placeholder and return it inline.
          if (
            (value?.filename && value?.filename?.endsWith(".jpg")) ||
            value?.filename?.endsWith(".jpeg") ||
            value?.filename?.endsWith(".png") ||
            value?.filename?.endsWith(".webp") ||
            value?.filename?.endsWith(".avif")
          ) {
            // Create the base cache dir if it doesn't exist.
            const placeholderCachePath = (filename) =>
              filename
                ? path.join(process.cwd(), `.blurDataURLsCache/${filename}.db`)
                : path.join(process.cwd(), `.blurDataURLsCache`)
            if (!fs.existsSync(placeholderCachePath())) {
              fs.mkdirSync(placeholderCachePath())
            }

            // Check the build cache.
            const cachefileName = filenamify(value.filename, { replacement: "_" })
            const cacheLocation = placeholderCachePath(cachefileName)
            let cachedPlaceholder = false
            if (fs.existsSync(cacheLocation)) {
              cachedPlaceholder = JSON.parse(fs.readFileSync(cacheLocation))
            }

            if (cachedPlaceholder) {
              // Return the cached value.
              return [
                key,
                {
                  ...value,
                  blurDataURL: cachedPlaceholder,
                },
              ]
            }

            // Okay, fine. It's new. Retrieve the image.
            const buffer = await fetch(value.filename).then(async (res) => Buffer.from(await res.arrayBuffer()))

            // Generate a placeholder
            let blurDataURL = ""
            try {
              const { base64 } = await getPlaiceholder(buffer, { size: 16 })
              blurDataURL = base64

              // Write it to the cache
              fs.writeFileSync(cacheLocation, JSON.stringify(blurDataURL))
            } catch (error) {
              console.error(error)
            }

            // Return the image object inline with the new (or cached) placeholder value.
            return [
              key,
              {
                ...value,
                blurDataURL,
              },
            ]
          } else {
            const processedValue = await generateSBPlaiceholders(value)
            return [key, processedValue]
          }
        } else if (Array.isArray(value)) {
          // Recurse found array for possible candidates.
          return [
            key,
            await Promise.all(
              value.map(async (arrEntry) => {
                return await generateSBPlaiceholders(arrEntry)
              }),
            ),
          ]
        } else {
          // No match found. Return and move on.
          return [key, value]
        }
      }),
    ),
  )
}
