export default function extractId(inputString) {
  // Split the string by hyphens
  const parts = inputString.split("-")

  // Get the last part
  const lastPart = parts[parts.length - 1]

  // Check if the last part is numeric
  if (/^\d+$/.test(lastPart)) {
    return lastPart
  } else {
    throw new Error("The last segment of the string is not numeric.")
  }
}
