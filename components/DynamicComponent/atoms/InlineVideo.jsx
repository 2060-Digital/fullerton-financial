import DynamicVideo from "components/DynamicVideo"

export default function InlineVideo({ blok }) {
  return blok?.video?.length ? (
    <div className="w-full mb-6 first:mt-0">
      <DynamicVideo {...blok?.video[0]} />
    </div>
  ) : null
}
