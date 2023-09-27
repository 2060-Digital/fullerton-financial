import Image from "components/Image"
import { getAllBlogArticlePaths, getBlogArticle, getGlobals, getAllBlogCategories } from "storyblok/api"
import richText from "utilities/richText"
import DynamicVideo from "components/DynamicVideo"
import { CategoriesBox } from "components/Blog/CategoriesBox"
import Meta from "components/Meta"

export default function Article({ article: { content: article }, categories, meta }) {
  return (
    <>
      <Meta info={meta} />
      <div>
        <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto py-12 lg:pr-6  items-center">
          <div className="basis-2/3 max-w-4xl pb-12 lg:pb-0 px-10 lg:pl-6 lg:pr-12">
            {article?.featured_video?.length > 0 ? (
              <div className="relative lg:pb-12">
                <div className="relative z-10 lg:pr-12">
                  <DynamicVideo {...article?.featured_video[0]} />
                </div>
              </div>
            ) : null}
            {article?.featured_image?.filename ? (
              <div className="relative lg:pb-12">
                <div className="relative z-10 lg:pr-12">
                  <Image
                    placeholder={article?.featured_image?.blurDataURL ? "blur" : "empty"}
                    blurDataURL={article?.featured_image?.blurDataURL}
                    src={article?.featured_image?.filename}
                    alt={article?.featured_image?.alt}
                    layout="responsive"
                    objectFit="cover"
                    width={730}
                    height={503}
                  />
                </div>
              </div>
            ) : null}
            <div className="content prose-h2:pt-8 prose-h2:pb-0 prose-h2:text-l2 prose-p:py-2 prose-h3:pb-8 prose-h3:pt-4 prose-h3:uppercase prose-ul:list-disc prose-ul:pl-4 prose-ul:list prose-a:before:hidden prose-a:after:hidden prose-a:underline hover:prose-a:no-underline prose-a:normal-case prose-a:overflow-x-visible prose-a:pr-0 marker:text-gray-dark marker:text-sm xl:max-w-4xl">
              {richText(article?.content)}
            </div>
          </div>
          <CategoriesBox categories={categories} />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const globals = await getGlobals()
  const article = await getBlogArticle(slug)
  const categories = await getAllBlogCategories()

  return {
    props: {
      categories,
      article: article ?? null,
      meta: article?.content?.seo ?? null,
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
