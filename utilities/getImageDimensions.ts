/**
 * Retrieve and return image dimensions from Storyblok CDN URL
 * e.g. https://a.storyblok.com/f/134100/1404x1206/e0dbfd9f45/lady-tablet-2x.png
 * */
export default function getSbImageDimensions(dimension: "width" | "height", url: string): string[] | string {
  // 1404x1206 -> ["1404", "1206"]
  const dimensions = url.match(/\d*x\d*/i)[0].split("x")

  if (dimension === "width") return dimensions[0]
  if (dimension === "height") return dimensions[1]
  return dimensions
}
