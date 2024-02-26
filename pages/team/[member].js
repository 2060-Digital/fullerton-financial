import Image from "next/image"
import { getGlobals } from "storyblok/api"
import { getTeamMember, getTeamMemberPaths } from "storyblok/teamMembers"
import Meta from "components/Meta"
import DynamicComponent from "components/DynamicComponent"
import StoryblokVisualEditor from "components/StoryblokVisualEditor"

export default function TeamMember({ story, meta }) {
  return (
    <>
      <Meta info={meta} />
      <StoryblokVisualEditor story={story?.content}>
        <main>
          <section className="bg-primary-1">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex flex-col lg:flex-row">
                <div>
                  <Image src={story.content.image.filename} alt={story.content.image.alt} />
                </div>
                <div className=""></div>
              </div>
            </div>
          </section>

          {story?.content?.body?.length
            ? story?.content?.body.map((blok) => <DynamicComponent blok={blok} key={blok._uid} />)
            : null}
        </main>
      </StoryblokVisualEditor>
    </>
  )
}

export async function getStaticProps({ params: { member }, preview = null }) {
  const globals = await getGlobals()
  const story = await getTeamMember(`team/${member}`, preview)

  return {
    props: {
      story: story ?? null,
      meta: story?.content?.seo ?? null,
      globals: globals ?? null,
      preview,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getTeamMemberPaths(),
    fallback: false,
  }
}
