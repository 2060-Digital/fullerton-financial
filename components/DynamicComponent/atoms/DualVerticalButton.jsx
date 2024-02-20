import StoryblokButton from "components/DynamicComponent/atoms/StoryblokButton"

export default function DualButton({ blok }) {
  return (
    <div className="flex flex-col gap-4">
      {blok.buttons.map((button, idx) => (
        <StoryblokButton blok={button} key={idx} />
      ))}
    </div>
  )
}
