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
    const fsFriendlyPath = file?.replaceAll("/", "_")

    try {
      const data = fs.readFileSync(path.join(process.cwd(), `storyblok/cache/_db/${fsFriendlyPath}.db`))
      return deserialize(data) ?? null
    } catch (err) {
      console.error("Error reading cache file:", err)
      return null
    }
  },
  /**
   * Cache page data to the disk
   * @param {object} entry The data to serialize and temporarily cache to disk
   * @param {string} file the name for the file used to reference and retrieve it later
   * @returns void
   */
  set: (entry, file) => {
    const dirPath = path.join(process.cwd(), 'storyblok/cache/_db')
    const filePath = path.join(dirPath, `${file.replaceAll("/", "_")}.db`)

    // Ensure that the directory exists
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    // Write data to the file
    try {
      fs.writeFileSync(filePath, serialize(entry))
    } catch (err) {
      console.error("Error writing cache file:", err)
    }
  },
}

export default api
