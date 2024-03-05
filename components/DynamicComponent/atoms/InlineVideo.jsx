import DynamicVideo from "components/DynamicVideo"

export default function InlineVideo({ blok }) {
  return blok?.video?.length ? (
    <div className="relative z-10 border-2 border-secondary-1 mb-6 mt-4 w-full">
      <div className="w-full relative -top-4 -right-4">
        <DynamicVideo {...blok?.video[0]} />
      </div>
    </div>
  ) : null
}
