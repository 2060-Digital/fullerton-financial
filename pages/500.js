import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"

export default function Page({ meta }) {
  return (
    <>
      <Meta info={meta} />
      <div className="container mx-auto text-center pt-8">
        <h1 className="text-2xl font-bold">500 Error</h1>
        <p>Sorry, an unknown error occurred. Please try again later.</p>
      </div>
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
