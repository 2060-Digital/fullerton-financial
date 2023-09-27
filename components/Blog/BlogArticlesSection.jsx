import Image from "components/Image"
import CallToAction from "components/CallToAction"
import { formatBlogDate, BLOG_ARTICLES_PER_PAGE } from "utilities/blogHelpers"
import richText from "utilities/richText"
import Pagination from "../Pagination"
import { CategoriesBox } from "./CategoriesBox"
import { useRouter } from "next/router"

const ArticleItem = ({ article }) => {
  const Thumbnail = () => {
    let asset = { src: "", alt: "" }

    if (article?.content?.featured_video[0]?.thumbnail?.filename) {
      asset = {
        src: article?.content?.featured_video[0]?.thumbnail?.filename,
        alt: (asset.alt = article?.content?.featured_video[0]?.thumbnail?.alt),
      }
    } else if (article?.content?.featured_image?.filename) {
      asset = {
        src: article?.content?.featured_image?.filename,
        alt: article?.content?.featured_image?.filename,
      }
    } else {
      asset = {
        src: "/assets/blog-item-placeholder.svg",
        alt: "Placeholder image",
      }
    }

    return (
      <div className="w-full relative h-[238px] mb-2">
        {/* eslint-disable-next-line */}
        <Image
          placeholder={asset?.blurDataURL ? "blur" : "empty"}
          blurDataURL={asset?.blurDataURL}
          {...asset}
          layout="fill"
          objectFit="cover"
          width={345}
          height={238}
        />
      </div>
    )
  }

  return (
    <div className="max-w-sm">
      {/* <Thumbnail /> */}
      {article?.content?.category?.length <= 2 ? (
        <div className="flex gap-1">
          {article?.content?.date !== "" ? <div>{`${formatBlogDate(article?.content?.date)} |`}</div> : null}
          {article?.content?.category.map((category, idx) => (
            <div className="uppercase" key={idx}>
              {category.replaceAll("-", " ")}
              {article?.content?.category?.length > 1 && idx !== article?.content?.category?.length - 1 ? ", " : " "}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div>{article?.content?.date !== "" ? <div>{`${formatBlogDate(article?.content?.date)} |`}</div> : null}</div>
          <div className="flex gap-1">
            {article?.content?.category.map((category, idx) => (
              <div className="uppercase" key={idx}>
                {category.replaceAll("-", " ")}
                {article?.content?.category?.length > 1 && idx !== article?.content?.category?.length - 1 ? ", " : " "}
              </div>
            ))}
          </div>
        </div>
      )}
      <h3 className="text-l2 font-secondary italic">{article?.content?.title}</h3>
      <div className="article-item max-h-64 overflow-hidden font-light prose-headings:text-m3 prose-headings:not-italic  prose-headings:font-primary prose-headings:font-light prose-headings:leading-8 prose-p:text-m3 prose-span:leading-8 prose-p:leading-8 prose-a:before:hidden prose-a:after:hidden prose-a:underline hover:prose-a:no-underline prose-a:normal-case prose-a:overflow-x-visible prose-a:pr-0">
        {richText(article?.content?.content)}
      </div>
      <CallToAction href={`/blog/${article?.slug}`} style="secondary">
        continue reading
      </CallToAction>
    </div>
  )
}

export default function BlogArticlesSection({ blogArticles, categories, total, number }) {
  const router = useRouter()
  return (
    <div id="blog-section" className="flex flex-col lg:flex-row max-w-screen-xl mx-auto py-12">
      <div>
        {blogArticles?.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-y-12 gap-x-8 px-10 lg:pl-6 lg:pr-12 pb-12 lg:pb-0">
            {blogArticles?.map((article, idx) => (
              <ArticleItem article={article} key={idx} />
            ))}
          </div>
        ) : (
          <div className="px-10 lg:pl-6 lg:pr-12 pb-12 lg:pb-0">
            <p>Sorry, we did not find any articles in this category. Please try another category or visit the:</p>
            <CallToAction href="/blog" style="secondary">
              main blog page
            </CallToAction>
          </div>
        )}
        <Pagination
          scrollAnchor="blog-section"
          pageCount={Math.ceil(total / BLOG_ARTICLES_PER_PAGE)}
          currentPage={number}
          setCurrentPage={(number) =>
            router.push(
              `${router.pathname.replace("[number]", number).replace("[category]", router?.query?.category)}`,
              null,
              {
                scroll: false,
              }
            )
          }
        />
      </div>
      <CategoriesBox categories={categories} />
    </div>
  )
}
