import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import richText from "utilities/richText"

export default function ResourceCard({ blok }) {
  return (
    <div>
      <div>
        <h3>{blok?.heading}</h3>
        <div>{richText(blok?.content)}</div>
        <CallToAction href={getStoryblokLink(blok?.cta_link)}>{blok?.cta_label}</CallToAction>
      </div>
    </div>
  )
}
