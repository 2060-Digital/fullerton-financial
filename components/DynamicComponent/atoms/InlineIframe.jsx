export default function InlineIframe({ blok }) {
  return (
    <iframe
      className="my-2 w-full"
      src={blok?.link?.url}
      title={blok?.title ?? ""}
      height={blok?.height ?? "500px"}
    ></iframe>
  )
}
