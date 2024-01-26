import { useRouter } from "next/router"
import Link from "next/link"
import Image from "components/Image"
import Pagination from "components/Pagination"
import CallToAction from "components/CallToAction"
import { formatBlogDate, BLOG_ARTICLES_PER_PAGE } from "utilities/blogHelpers"
import { getExcerpt } from "utilities/getExcerpt"

const ArticleItem = ({ article }) => {
  return (
    <article className="bg-gray-light border-l-[20px] border-l-white">
      <div className="w-full relative h-[238px] border-2 border-secondary-1 -left-4">
        <Image
          src={
            article?.content?.featured_image?.filename && article?.content?.featured_image?.filename !== ""
              ? article?.content?.featured_image?.filename
              : "/assets/blog-placeholder.svg"
          }
          alt={article?.content?.featured_image?.alt ?? "Placeholder image"}
          placeholder={article?.content?.blurDataURL ? "blur" : "empty"}
          blurDataURL={article?.content?.blurDataURL}
          width={345}
          height={238}
          className="w-full object-cover h-full relative -top-4 -right-4"
        />
      </div>
      <div className="p-8">
        <Link href={`/blog/${article?.slug}`} className="block mb-4">
          <h3 className="text-primary-1">{article?.content?.title}</h3>
        </Link>
        {article?.content?.date !== "" ? (
          <time className="block mb-4">{`${formatBlogDate(article?.content?.date)}`}</time>
        ) : null}
        <p>{getExcerpt(article?.content?.content, 160)}</p>
      </div>
    </article>
  )
}

export default function BlogArticlesSection({ blogArticles, categories, total, number }) {
  const router = useRouter()
  return (
    <section id="blog-section" className="flex flex-col lg:flex-row max-w-screen-xl mx-auto py-12">
      <div>
        {blogArticles?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 px-10 lg:pl-6 lg:pr-12 pb-12 lg:pb-0">
            {blogArticles?.map((article) => (
              <ArticleItem article={article} key={article?._uid} />
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
              },
            )
          }
        />
      </div>
    </section>
  )
}
