export default function slugify(string) {
  return string.replaceAll(/\ |"/g, "-").toLowerCase()
}
