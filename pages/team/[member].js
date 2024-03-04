import Image from "next/image"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getTeamMember, getTeamMemberPaths } from "storyblok/teamMembers"
import CallToAction from "components/CallToAction"
import Meta from "components/Meta"
import StoryblokVisualEditor from "components/StoryblokVisualEditor"
import getSbImageDimensions from "utilities/getSbImageDimensions"
import richText from "utilities/richText"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import storyblokImageLoader from "utilities/storyblokImageLoader"
import DynamicComponent from "components/DynamicComponent"
import Breadcrumbs from "components/Breadcrumbs"

export default function TeamMember({ teamMember, meta }) {
  return (
    <>
      <Meta info={meta} />
      <StoryblokVisualEditor story={teamMember?.content}>
        <main>
          <section className="bg-primary-1 px-6 py-11 lg:py-20">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                <div className="lg:basis-1/3 flex flex-col">
                  <div className="order-2 lg:order-1 mt-10 lg:mb-5 lg:mt-0">
                    <Breadcrumbs
                      breadcrumbs={[
                        { text: "Meet the Team", href: "/team/" },
                        { text: teamMember?.content?.name, href: teamMember?.content?.slug },
                      ]}
                    />
                  </div>
                  <div className="pl-5 order-1 lg:order-2">
                    <div className="relative">
                      <div className="w-full h-full absolute border-2 border-secondary-1 top-5 right-5 z-10"></div>
                      <Image
                        src={teamMember?.content?.image?.filename}
                        alt={teamMember?.content?.image?.alt}
                        loader={
                          teamMember?.content?.image.filename && teamMember.content.image.filename !== ""
                            ? storyblokImageLoader
                            : undefined
                        }
                        height={getSbImageDimensions("height", teamMember?.content?.image?.filename)}
                        width={getSbImageDimensions("width", teamMember?.content?.image?.filename)}
                        placeholder={teamMember?.content?.image.blurDataURL ? "blur" : "empty"}
                        blurDataURL={teamMember?.content?.image.blurDataURL}
                        className="aspect-square z-20 relative"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:basis-2/3 lg:flex lg:flex-col justify-center">
                  <h1 className="text-white pb-6">
                    {teamMember?.content?.first_name} {teamMember?.content?.last_name}
                  </h1>
                  <div className="eyebrow text-white">{teamMember?.content?.job_title}</div>
                  <div className="py-4">
                    <CallToAction href={getStoryblokLink(teamMember?.content?.email)} style="email" target="_blank">
                      {teamMember?.content?.email?.url}
                    </CallToAction>
                  </div>
                  <div className="prose-p:text-white">{richText(teamMember?.content?.intro_content)}</div>
                </div>
              </div>
            </div>
          </section>

          <div>
            {teamMember?.content?.body?.map((blok) => (
              <DynamicComponent blok={blok} key={blok._uid} />
            ))}
          </div>
        </main>
      </StoryblokVisualEditor>
      <Script type="application/ld+json" id="profile-schema">
        {`{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": ${teamMember?.content?.name},
            "description": "Defender of Truth",
            "image": ${teamMember?.content?.image.filename}
          }
        }`}
      </Script>
    </>
  )
}

export async function getStaticProps({ params: { member }, preview = null }) {
  const globals = await getGlobals("exclude-global-sections")
  const story = await getTeamMember(`team/${member}`, preview)

  return {
    props: {
      teamMember: story ?? null,
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
