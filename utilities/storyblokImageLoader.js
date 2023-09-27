export default function storyblokImageLoader({ src, width, quality = 75 }) {
  if (src.includes(".svg")) {
    return src
  }
  return `${src}/m/${width}x0/smart/filters:quality(${quality})`
}
