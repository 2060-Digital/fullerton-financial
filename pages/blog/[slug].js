import { useEffect, useState } from "react"
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
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const ShareLinks = () => (
    <div className="relative -right-3.5 -top-3.5 h-full w-full bg-secondary-2 py-12">
      <h3 className="pb-8 text-primary-1">Share This Article</h3>
      <div className="flex items-center justify-center gap-10">
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank">
          <Facebook className="text-primary-1 transition-all hover:text-secondary-1" />
        </Link>
        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`} target="_blank">
          <LinkedIn className="text-primary-1 transition-all hover:text-secondary-1" />
        </Link>
        <Link
          href={`mailto:?subject=Fullerton Financial Planning&body=Check out this site ${currentUrl}`}
          target="_blank"
        >
          <Mail className="text-primary-1 transition-all hover:text-secondary-1" />
        </Link>
      </div>
    </div>
  )

  return (
    <main data-pagefind-body>
      <Meta info={meta} />
      <StoryblokVisualEditor story={story?.content}>
        <section className="mt-24 bg-primary-1 pl-6 lg:mb-12 lg:mt-0 lg:pr-6 lg:pt-12">
          <div className="mx-auto flex max-w-screen-xl flex-col-reverse lg:flex-col">
            <div className="pb-12 pr-6 lg:pb-20 lg:pr-0">
              <Breadcrumbs
                breadcrumbs={[
                  { text: "Blog", href: "/blog/page/1" },
                  { text: story?.content?.title, href: story?.content?.slug },
                ]}
              />
              <h1 className="text-white">{story?.content?.title}</h1>
            </div>
            <div className="flex gap-12 lg:-mb-12">
              <div className="relative -top-20 -mb-12 mr-[12px] w-full border-2 border-secondary-1 lg:-top-0 lg:-mb-0 lg:mr-0 lg:basis-2/3">
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
              <div className="relative hidden h-full basis-1/3 border-2 border-secondary-1 text-center lg:block">
                <ShareLinks />
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-4xl prose-headings:pb-4 prose-headings:text-primary-1 prose-h2:pt-6">
              {story?.content?.date?.length > 0 ? (
                <time className="mb-4 block font-primary text-primary-1">
                  {formatBlogDate(story?.content?.date, "en-US", "long")}
                </time>
              ) : null}
              {richText(story?.content?.content)}
              <div className="relative mt-8 h-max border-2 border-secondary-1 text-center lg:hidden">
                <ShareLinks />
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
