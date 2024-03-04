import retrieveAll from "storyblok/retrieveAll"
import query from "storyblok/fetch"
import TeamMemberPaths from "storyblok/gql/team-members/TeamMemberPaths.gql"
import IndividualTeamMember from "storyblok/gql/team-members/IndividualTeamMember.gql"
import ArchiveTeamMembers from "storyblok/gql/team-members/ArchiveTeamMembers.gql"
import TeamCategories from "storyblok/gql/team-members/TeamCategories.gql"
import ArchiveBySlug from "storyblok/gql/team-members/ArchiveBySlug.gql"
import CategoryArchiveTeamMembers from "storyblok/gql/team-members/CategoryArchiveTeamMembers.gql"
import processPageData from "storyblok/processPageData"
import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"

async function processTeamMembersForArchive(rawTeamMembers) {
  const categories = await getTeamMemberCategories()

  return {
    vip: await generateSBPlaiceholders(
      rawTeamMembers
        .map((member) => ({ ...member.content, slug: `/${member.full_slug}` }))
        .filter((member) => member.vip),
    ),
    teamMembers: await generateSBPlaiceholders(
      rawTeamMembers
        .map((member) => ({ ...member.content, slug: `/${member.full_slug}` }))
        .sort((a, b) => {
          if (a.last_name > b.last_name) return 1
          if (b.last_name > a.last_name) return -1
          return 0
        })
        .sort((a, b) => {
          if (a.vip && !b.vip) return -1
          if (!a.vip && b.vip) return 1
          return 0
        }),
    ),
    categories,
  }
}

export async function getTeamMemberPaths() {
  const data = await retrieveAll({ query: TeamMemberPaths, type: "TeammemberItems", preview: false })

  return data?.map(({ slug }) => ({ params: { member: slug } }))
}

export async function getTeamMember(slug, preview) {
  const data = await query(IndividualTeamMember, { variables: { slug }, preview })

  return await processPageData(
    {
      content: {
        ...data?.TeammemberItem.content,
        slug: `/${data?.TeammemberItem?.full_slug}`,
        name: data?.TeammemberItem?.name,
      },
    },
    data?.TeammemberItem?.full_slug,
  )
}

// Categories
export async function getTeamMemberCategories() {
  const data = await query(TeamCategories)
  return data?.DatasourceEntries.items
}

export async function getCategoryArchiveTeamMembers(category) {
  const data = await retrieveAll({
    query: CategoryArchiveTeamMembers,
    type: "TeammemberItems",
    preview: false,
    variables: { category },
  })

  return await processTeamMembersForArchive(data)
}

// Archive

export async function getArchiveTeamMembers() {
  const data = await retrieveAll({ query: ArchiveTeamMembers, type: "TeammemberItems", preview: false })

  return await processTeamMembersForArchive(data)
}

export async function getAllTeamMemberCategoriesPaths() {
  const categories = await getTeamMemberCategories()

  return categories?.map(({ value }) => ({ params: { category: value } }))
}

export async function getTeamArchive(slug, preview) {
  const data = await query(ArchiveBySlug, { variables: { slug }, preview })

  return await processPageData(data?.TeamarchiveItem, slug)
}
