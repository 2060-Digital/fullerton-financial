import {
  NODE_PARAGRAPH,
  NODE_HEADING,
  NODE_CODEBLOCK,
  NODE_QUOTE,
  NODE_OL,
  NODE_UL,
  NODE_LI,
  NODE_HR,
  NODE_BR,
} from "storyblok-rich-text-react-renderer"

const renderNode = (node, addNewlines) => {
  if (node.type === "text") {
    return node.text
  } else if (
    [NODE_PARAGRAPH, NODE_HEADING, NODE_CODEBLOCK, NODE_QUOTE, NODE_OL, NODE_UL, NODE_LI, NODE_HR, NODE_BR].includes(
      node.type,
    )
  ) {
    return node.content?.length ? `${renderNodes(node.content, addNewlines)}${addNewlines ? "\n\n" : " "}` : ""
  }

  return null
}

const renderNodes = (nodes, addNewlines) =>
  nodes
    .map((node) => renderNode(node, addNewlines))
    .filter((node) => node !== null)
    .join("")
    // Replace multiple spaces with one
    .replace(/[^\S\r\n]{2,}/g, " ")

export const getPlainText = (richtext, options = { addNewlines: false }) => {
  if (!richtext?.content?.length) {
    return ""
  }

  const text = renderNodes(richtext.content, options.addNewlines !== undefined ? options.addNewlines : true)

  return text
}
