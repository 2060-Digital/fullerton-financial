import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function StoryblokButton({ blok }) {
  return (
    <CallToAction href={getStoryblokLink(blok.link)} style={blok?.style} key={blok.label}>
      {blok.label}
    </CallToAction>
  )
}
