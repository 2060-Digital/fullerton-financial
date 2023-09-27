import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function StoryblokButton({ blok }) {
  return (
    <CallToAction className="my-4 no-underline" {...blok} href={getStoryblokLink(blok.link)} key={blok.label}>
      {blok.label}
    </CallToAction>
  )
}
