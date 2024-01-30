export const onPreBuild = async ({ utils }) => {
  return await utils.cache.restore(".blurDataURLsCache")
}

export const onPostBuild = async ({ utils }) => {
  const ttl = 31_556_952 // 1 year
  return await utils.cache.save(".blurDataURLsCache", { ttl })
}
