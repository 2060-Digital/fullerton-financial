import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"

export default function Page({ meta }) {
  return (
    <>
      <Meta info={meta} />
      <main className="bg-secondary-2 px-6 py-12 lg:py-28">
        <h1 className="text-center text-primary-1">
          <span className="eyebrow block pb-2.5">500</span>
          <span className="block pb-5">Internal Server Error</span>
        </h1>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals("exclude-global-sections")

  return {
    props: {
      preview,
      globals,
    },
  }
}
