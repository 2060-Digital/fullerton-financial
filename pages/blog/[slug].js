import Link from "next/link"
import { getGlobals } from "storyblok/api"
import { getAllBlogArticlePaths, getBlogArticle } from "storyblok/blog"
import Image from "components/Image"
import Meta from "components/Meta"
import Breadcrumbs from "components/Breadcrumbs"
import StoryblokVisualEditor from "components/StoryblokVisualEditor"
import Mail from "public/assets/social-media/mail.svg"
import LinkedIn from "public/assets/social-media/linkedin.svg"
import Facebook from "public/assets/social-media/facebook.svg"
import richText from "utilities/richText"
import { formatBlogDate } from "utilities/blogHelpers"

export default function Article({ story, meta }) {
  const url = `${process.env.URL}${story?.content?.slug}`

  const ShareLinks = () => (
    <>
      <h3 className="text-primary-1 pb-8">Share This Article</h3>
      <div className="flex justify-center items-center gap-10">
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
          <Facebook className="text-primary-1 hover:text-secondary-1 transition-all" />
        </Link>
        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target="_blank">
          <LinkedIn className="text-primary-1 hover:text-secondary-1 transition-all" />
        </Link>
        <Link href={`mailto:?subject=Fullerton Financial Planning&body=Check out this site ${url}`} target="_blank">
          <Mail className="text-primary-1 hover:text-secondary-1 transition-all" />
        </Link>
      </div>
    </>
  )

  return (
    <main>
      <Meta info={meta} />
      <StoryblokVisualEditor story={story?.content}>
        <section className="bg-primary-1 mt-24 lg:mt-0 lg:pt-12 lg:mb-12 pl-6 lg:pr-6">
          <div className="flex flex-col-reverse lg:flex-col max-w-screen-xl mx-auto">
            <div className="pr-6 lg:pr-0 pb-12 lg:pb-20">
              <Breadcrumbs
                breadcrumbs={[
                  { text: "Blog", href: "/blog/page/1" },
                  { text: story?.content?.title, href: story?.content?.slug },
                ]}
              />
              <h1 className="text-white">{story?.content?.title}</h1>
            </div>
            <div className="flex lg:-mb-12 gap-12">
              <div className="w-full border-2 border-secondary-1 relative lg:basis-2/3 -top-20 lg:-top-0 mr-[12px] lg:mr-0">
                <Image
                  src={
                    story?.content?.featured_image?.filename && story?.content?.featured_image?.filename !== ""
                      ? story?.content?.featured_image?.filename
                      : "/assets/blog-placeholder.svg"
                  }
                  alt={story?.content?.featured_image?.alt}
                  width={896}
                  height={585}
                  className="relative -right-3.5 -top-3.5 w-full"
                />
              </div>
              <div className="basis-1/3 hidden lg:block h-full text-center relative border-2 border-secondary-1">
                <div className="relative -right-3.5 -top-3.5 py-12 w-full  h-full">
                  <ShareLinks />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-12">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-4xl prose-headings:text-primary-1 prose-headings:pb-4 prose-h2:pt-6">
              {story?.content?.date?.length > 0 ? (
                <time className="block mb-4 font-primary text-primary-1">
                  {formatBlogDate(story?.content?.date, "en-US", "long")}
                </time>
              ) : null}
              {richText(story?.content?.content)}
              <div className="lg:hidden h-max text-center relative border-2 border-secondary-1 mt-8">
                <div className="relative -right-3.5 -top-3.5 bg-secondary-2 h-full py-12">
                  <ShareLinks />
                </div>
              </div>
            </div>
          </div>
        </section>
      </StoryblokVisualEditor>
    </main>
  )
}

export async function getStaticProps({ params: { slug }, preview = null }) {
  const globals = await getGlobals()
  const story = await getBlogArticle(slug, preview)

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
    paths: await getAllBlogArticlePaths(),
    fallback: false,
  }
}
