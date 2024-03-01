import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"
import { getArchiveTeamMembers, getTeamArchive } from "storyblok/teamMembers"
import CategoryArchiveSection from "components/CategoryArchiveSection"

export default function TeamMemberArchive({ archive, meta, teamMembers, vip, categories }) {
  return (
    <>
      <Meta info={meta} />
      <main>
        <PageHeader
          blok={{
            heading: archive?.content.page_header[0]?.heading,
            image: archive?.content.page_header[0]?.image,
            content: archive?.content.page_header[0]?.content,
          }}
        />

        <CategoryArchiveSection
          {...{
            categories,
            items: teamMembers.filter((member) => !member.vip),
            vip: vip,
            archiveLink: "/team",
            categoryLinkPrefix: "/team/category/",
            currentTab: { name: "All", value: "all" },
          }}
        />
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  const story = await getTeamArchive("team", preview)
  const { teamMembers, categories, vip } = await getArchiveTeamMembers()

  return {
    props: {
      archive: story ?? null,
      meta: story?.content?.seo ?? null,
      teamMembers: teamMembers ?? null,
      vip: vip ?? null,
      categories: categories ?? null,
      globals: globals ?? null,
      preview,
    },
  }
}
