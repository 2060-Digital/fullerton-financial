import Meta from "components/Meta"
import WebinarPageHeader from "components/Webinars/WebinarPageHeader"
import { getIndividualWebinarPaths, getWebinarByIDs } from "go-to-webinar/api"
import { getGlobals } from "storyblok/api"

export default function Webinar({ webinar }) {
  return (
    <>
      <Meta info={{}} />
      <main className="page-content" data-pagefind-body>
        <WebinarPageHeader webinar={webinar} />
        {webinar?.description?.length > 0 ? (
          <section className="px-6 py-12 lg:py-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="lg:text-center pb-8 text-primary-1">Webinar Description</h2>
              <p>{webinar?.description}</p>
            </div>
          </section>
        ) : null}
      </main>
    </>
  )
}

export async function getStaticProps({ params: { webinar } }) {
  const globals = await getGlobals()

  const webinarIDs = webinar.split("-")

  const individualWebinar = await getWebinarByIDs(webinarIDs[webinarIDs.length - 2], webinarIDs[webinarIDs.length - 1])

  return {
    props: {
      globals,
      webinar: individualWebinar ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getIndividualWebinarPaths(),
    fallback: false,
  }
}
