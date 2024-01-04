import SbEditable from "storyblok-react"

export default function StoryblokVisualEditor({ story, children }) {
  if (!story?._editable) {
    return children
  }

  return <SbEditable content={story}>{children}</SbEditable>
}
