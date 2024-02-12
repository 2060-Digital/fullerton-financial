import { getPlainText } from "utilities/getPlainText"

export const getExcerpt = (richtext, maxLength = 320) => {
  const text = getPlainText(richtext, { addNewlines: false })

  if (!text || !maxLength || text?.length < maxLength) {
    return text
  }

  return `${text?.substring(0, maxLength)}…`
}
