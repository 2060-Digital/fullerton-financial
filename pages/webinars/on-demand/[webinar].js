// import { getGlobals } from "storyblok/api"
// import { getOnDemandWebinarPaths, getOnDemandWebinarByIDs } from "go-to-webinar/api"
// import WebinarPage from "components/Webinars/WebinarPage"

// export default function OnDemandWebinar({ webinar }) {
//   return <WebinarPage webinar={webinar} onDemand />
// }

// export async function getStaticProps({ params: { webinar } }) {
//   const globals = await getGlobals()

//   const webinarIDs = webinar.split("-")

//   const individualWebinar = await getOnDemandWebinarByIDs(
//     webinarIDs[webinarIDs.length - 2],
//     webinarIDs[webinarIDs.length - 1],
//   )

//   return {
//     props: {
//       globals,
//       webinar: individualWebinar ?? null,
//     },
//   }
// }

// export async function getStaticPaths() {
//   return {
//     paths: await getOnDemandWebinarPaths(),
//     fallback: false,
//   }
// }

export default function onDemandWebinars() {
  return <></>
}
