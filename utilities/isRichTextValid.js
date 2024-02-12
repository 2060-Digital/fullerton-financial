export default function isRichTextValid(richText) {
  // Is valid Storyblok rich text object
  if (!typeof richText === "object" && richText?.type === "doc" && Array.isArray(richText?.content)) return false

  const validElements = richText?.content?.filter((content) => {
    // blok elements placed in rich text fields do not have a content key
    if (content?.type === "blok") return true

    // Does content key exist
    return Boolean(content?.content)
  })

  return Boolean(validElements?.length)
}
