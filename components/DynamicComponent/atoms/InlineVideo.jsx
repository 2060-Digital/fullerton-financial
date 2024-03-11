import DynamicVideo from "components/DynamicVideo"

export default function InlineVideo({ blok }) {
  return blok?.video?.length ? (
    <div className="relative z-10 mb-6 mt-4 w-full border-2 border-secondary-1">
      <div className="relative -right-4 -top-4 w-full">
        <DynamicVideo {...blok?.video[0]} />
      </div>
    </div>
  ) : null
}
