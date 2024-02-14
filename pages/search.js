import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"

export default function Search({ meta }) {
  return (
    <>
      <Meta info={meta} />
      <main>
        <PageHeader blok={{ heading: "Search Our Site" }} />
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  return {
    props: {
      preview,
      globals,
    },
  }
}
