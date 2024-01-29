import Link from "next/link"
import { getGlobals } from "storyblok/api"
import { getAllBlogArticlePaths, getBlogArticle } from "storyblok/blog"
import richText from "utilities/richText"
import Image from "components/Image"
import Meta from "components/Meta"
import Breadcrumbs from "components/Breadcrumbs"
import Mail from "public/assets/social-media/mail.svg"
import LinkedIn from "public/assets/social-media/linkedin.svg"
import Facebook from "public/assets/social-media/facebook.svg"

export default function Article({ story, meta }) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${story?.content?.slug}`

  const ShareLinks = () => (
    <>
      <h3 className="text-primary-1 pb-8">Share This Article</h3>
      <div className="flex justify-center items-center gap-10">
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
          <Facebook className="text-primary-1" />
        </Link>
        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}>
          <LinkedIn className="text-primary-1" />
        </Link>
        <Link href={`mailto:?body=Check out this site ${url}`}>
          <Mail />
        </Link>
      </div>
    </>
  )

  return (
    <main>
      <Meta info={meta} />
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
            <div className="w-full border-2 border-secondary-1 relative lg:basis-2/3 -top-20 lg:-top-0">
              <Image
                src={
                  story?.content?.featured_image?.filename && story?.content?.featured_image?.filename !== ""
                    ? story?.content?.featured_image?.filename
                    : "/assets/blog-placeholder.svg"
                }
                alt={story?.content?.featured_image?.alt}
                width={896}
                height={585}
                className="relative -right-5 -top-5 w-full"
              />
            </div>
            <div className="basis-1/3 hidden lg:block bg-secondary-2 h-max py-12 text-center relative lg:-top-[18px]">
              <ShareLinks />
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <section className="max-w-screen-xl mx-auto">
          <div className="max-w-4xl">
            <div className="prose-headings:text-primary-1 prose-headings:pb-4 prose-h2:pt-6">
              {story?.content?.date !== "" ? (
                <time className="block mb-4 font-primary text-primary-1">{`${new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                }).format(new Date(story?.content?.date))}`}</time>
              ) : null}
              {richText(story?.content?.content)}
              <div className="lg:hidden bg-secondary-2 h-max py-12 text-center">
                <ShareLinks />
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const globals = await getGlobals()
  const story = await getBlogArticle(slug)

  return {
    props: {
      story: story ?? null,
      meta: story?.content?.seo ?? null,
      globals: globals ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getAllBlogArticlePaths(),
    fallback: false,
  }
}
