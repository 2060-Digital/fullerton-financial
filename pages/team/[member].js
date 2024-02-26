import Image from "next/image"
import { getGlobals } from "storyblok/api"
import { getTeamMember, getTeamMemberPaths } from "storyblok/teamMembers"
import CallToAction from "components/CallToAction"
import Meta from "components/Meta"
import DynamicComponent from "components/DynamicComponent"
import StoryblokVisualEditor from "components/StoryblokVisualEditor"
import getSbImageDimensions from "utilities/getSbImageDimensions"
import richText from "utilities/richText"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function TeamMember({ story, meta }) {
  return (
    <>
      <Meta info={meta} />
      <StoryblokVisualEditor story={story?.content}>
        <main>
          <section className="bg-primary-1 px-6 py-11 lg:py-20">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:basis-1/3 relative">
                  <div className="w-full h-full absolute border-2 border-secondary-1 top-5 right-5 z-10"></div>
                  <Image
                    src={story.content.image.filename}
                    alt={story.content.image.alt}
                    height={getSbImageDimensions("height", story.content.image.filename)}
                    width={getSbImageDimensions("width", story.content.image.filename)}
                    className="aspect-square z-20 relative"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="lg:basis-2/3 lg:flex lg:flex-col justify-center">
                  <h1 className="text-white pb-6">
                    {story.content.first_name} {story.content.last_name}
                  </h1>
                  <div className="eyebrow text-white">{story.content.job_title}</div>
                  <div className="py-4 flex flex-col gap-4">
                    <CallToAction href={getStoryblokLink(story?.content.email)} style="email" target="_blank">
                      {story.content.email.url}
                    </CallToAction>
                    <CallToAction href={getStoryblokLink(story?.content.linked_in)} style="linkedin">
                      LINKEDIN PROFILE
                    </CallToAction>
                  </div>
                  <div className="prose-p:text-white">{richText(story.content.intro_content)}</div>
                </div>
              </div>
            </div>
          </section>
          <section className="px-6 py-11 lg:py-20">
            <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row lg:gap-20">
              <div className="prose-headings:text-primary-1 prose-headings:pb-4 lg:basis-1/3">
                {richText(story.content.sidebar_content)}
              </div>
              <div className="lg:basis-2/3">{richText(story.content.content)}</div>
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
