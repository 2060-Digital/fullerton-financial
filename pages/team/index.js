import Meta from "components/Meta"
import { getGlobals, getArchive } from "storyblok/api"
import { getArchiveTeamMembers } from "storyblok/teamMembers"

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

  const story = await getArchive("team", preview)
  const { teamMembers, categories } = await getArchiveTeamMembers()

  // console.log(story)
  // console.log(teamMembers)
  // console.log("CATS", categories)

  return {
    props: {
      story: story ?? null,
      meta: story?.content?.seo ?? null,
      teamMembers: teamMembers ?? null,
      categories: categories ?? null,
      globals: globals ?? null,
      preview,
    },
  }
}
