import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"
import { getArchiveTeamMembers, getTeamArchive } from "storyblok/teamMembers"

export default function TeamMemberArchive({ story, meta, teamMembers, categories }) {
  return (
    <>
      <Meta info={meta} />
      <main>
        <PageHeader
          blok={{
            heading: story.page_header[0].heading,
            image: story.page_header[0].image,
            content: story.page_header[0].content,
          }}
        />
        <div></div>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  const story = await getTeamArchive("team", preview)
  const { teamMembers, categories } = await getArchiveTeamMembers()

  // console.log(teamMembers)
  // console.log("CATS", categories)

  return {
    props: {
      story: story.content ?? null,
      meta: story?.content?.seo ?? null,
      teamMembers: teamMembers ?? null,
      categories: categories ?? null,
      globals: globals ?? null,
      preview,
    },
  }
}
