import StoryblokButton from "components/DynamicComponent/atoms/StoryblokButton"

export default function MultiButton({ blok }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      {blok.buttons.map((button, idx) => (
        <StoryblokButton blok={button} key={idx} />
      ))}
    </div>
  )
}
