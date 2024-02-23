import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"

export default function TeamMemberArchive({ meta }) {
  return (
    <>
      <Meta />
      <main>
        <div>index</div>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  return {
    props: {
      globals: globals ?? null,
      preview,
    },
  }
}
