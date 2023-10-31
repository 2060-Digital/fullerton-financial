import { getPlaiceholder } from "plaiceholder"
import { isPlainObject } from "lodash"

/**
 * Generate base64 Images for Storyblok image Assets
 *
 * @param {{}} page An Storyblok page object (or part of page object, in theory) to recursively process
 * @param {{verbose?: boolean}?} options Optional configuration
 * @returns {Promise<{}>} The processed object
 */
export default async function generateSBPlaiceholders(page, { verbose = false } = {}) {
  // Prevents Object.entries from processing strings as arrays
  if (!isPlainObject(page)) return page

  return await Object.fromEntries(
    await Promise.all(
      Object.entries(page).map(async ([key, value]) => {
        if (isPlainObject(value)) {
          if (verbose) console.info(`Found Object. Processing fields..., Key: ${key}, Value: ${value.filename}`)
          if (
            (Object.hasOwn(value, "fieldtype") &&
              value.fieldtype === "asset" &&
              value?.filename &&
              value?.filename?.endsWith(".jpg")) ||
            value?.filename?.endsWith(".jpeg") ||
            value?.filename?.endsWith(".png") ||
            value?.filename?.endsWith(".webp") ||
            value?.filename?.endsWith(".avif")
          ) {
            console.info(`Found Image. Generating placeholder for: ${value.filename}`)
            const buffer = await fetch(value.filename).then(async (res) =>
              Buffer.from(await res.arrayBuffer())
            )
            const { base64 } = await getPlaiceholder(buffer, { size: 16 })
            return [
              key,
              {
                ...value,
                blurDataURL: base64,
              },
            ]
          } else {
            const processedValue = await generateSBPlaiceholders(value, { verbose })
            return [key, processedValue]
          }
        } else if (Array.isArray(value)) {
          if (verbose) console.info(`Found Array. Recursing." Key: ${key}, Value: ${JSON.stringify(value)}`)
          return [
            key,
            await Promise.all(
              value.map(async (arrEntry) => {
                return await generateSBPlaiceholders(arrEntry, { verbose: false })
              })
            ),
          ]
        } else {
          if (verbose) console.info(`No Match Found. Key: ${key}, Value: ${value ? value : `(empty)`}`)
          return [key, value]
        }
      })
    )
  )
}
