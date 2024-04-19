import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"
import { getCategoryArchiveTeamMembers, getTeamArchive, getAllTeamMemberCategoriesPaths } from "storyblok/teamMembers"
import CategoryArchiveSection from "components/TeamMemberArchive"

export default function Category({ archive, meta, category, teamMembers, vip, categories }) {
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
            currentTab: category,
          }}
        />
        <div></div>
      </main>
    </>
  )
}

export async function getStaticProps({ params: { category }, preview = null }) {
  const globals = await getGlobals()

  const story = await getTeamArchive("team", preview)
  const { teamMembers, categories, vip } = await getCategoryArchiveTeamMembers(category)

  return {
    props: {
      archive: story ?? null,
      meta: story?.content?.twentysixty_seo ?? null,
      teamMembers: teamMembers ?? null,
      vip: vip ?? null,
      category: { name: category.replaceAll("-", " "), value: category },
      categories: categories ?? null,
      globals: globals ?? null,
      preview,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getAllTeamMemberCategoriesPaths(),
    fallback: false,
  }
}
