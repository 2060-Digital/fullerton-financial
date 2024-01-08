import fs from "fs"
import path from "path"
import { serialize, deserialize } from "v8"

const api = {
  /**
   * Get cached page data
   * @param {string} file The file name to retrieve from the cache
   * @returns The page data
   */
  get: (file) => {
    const fsFriendlyPath = path.join(process.cwd(), `storyblok/cache/_db/${file?.replaceAll("/", "_")}.db`)

    if (!fs.existsSync(fsFriendlyPath)) {
      return null
    }

    const data = fs.readFileSync(fsFriendlyPath)
    return deserialize(data) ?? null
  },
  /**
   * Cache page data to the disk
   * @param {object} entry The data to serialize and temporarily cache to disk
   * @param {string} file the name for the file used to reference and retrieve it later
   * @returns void
   */
  set: (entry, file) => {
    const result = fs.writeFileSync(
      path.join(process.cwd(), `storyblok/cache/_db/${file.replaceAll("/", "_")}.db`),
      serialize(entry),
      (err) => {
        if (err) console.error(err)
      },
    )
    return result
  },
}

export default api
