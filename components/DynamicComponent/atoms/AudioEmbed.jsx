export default function AudioEmbed({ blok }) {
  return (
    <figure className="py-4">
      <figcaption className="mb-2">{blok.caption}</figcaption>
      <audio controls src={blok?.src?.filename}>
        <a href={blok.src}>Download audio</a>
      </audio>
    </figure>
  )
}
