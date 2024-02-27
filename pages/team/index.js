import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"

export default function TeamMemberArchive({ meta }) {
  return (
    <>
      <Meta info={meta} />
      <main>
        <div>index</div>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  const story = await getBlogArchive("team")

  return {
    props: {
      story: story ?? null,
      meta: story?.content?.seo ?? null,
      globals: globals ?? null,
      preview,
    },
  }
}
