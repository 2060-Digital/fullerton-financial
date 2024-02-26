import retrieveAll from "storyblok/retrieveAll"
import query from "storyblok/fetch"
import TeamMemberPaths from "storyblok/gql/team-members/TeamMemberPaths.gql"
import IndividualTeamMember from "storyblok/gql/team-members/IndividualTeamMember.gql"
import processPageData from "storyblok/processPageData"

export async function getTeamMemberPaths() {
  const data = await retrieveAll({ query: TeamMemberPaths, type: "TeammemberItems", preview: false })

  return data?.map(({ slug }) => ({ params: { member: slug } }))
}

export async function getTeamMember(slug, preview) {
  const data = await query(IndividualTeamMember, { variables: { slug }, preview })

  return await processPageData(
    { content: { ...data?.TeammemberItem.content, slug: `/${data?.TeammemberItem?.full_slug}` } },
    data?.TeammemberItem?.full_slug,
  )

  return data
}
