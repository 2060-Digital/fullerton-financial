import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import cn from "classnames"
import Image from "components/Image"
import Pagination from "components/Pagination"
import CallToAction from "components/CallToAction"
import { formatBlogDate, BLOG_ARTICLES_PER_PAGE } from "utilities/blogHelpers"
import { getExcerpt } from "utilities/getExcerpt"
import Arrow from "public/assets/chevron-down.svg"

const ArticleItem = ({ article }) => {
  return (
    <article className="border-l-[20px] border-l-white bg-gray-light">
      <Link
        href={`/blog/${article?.slug}`}
        className="relative -left-4 block h-[238px] w-full border-2 border-secondary-1 transition-all duration-300 hover:border-tertiary-1"
      >
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
          className="relative -right-4 -top-4 h-full w-full object-cover"
        />
      </Link>
      <div className="p-8">
        <Link href={`/blog/${article?.slug}`} className="mb-4 block">
          <h3 className="text-primary-1 hover:underline">{article?.content?.title}</h3>
        </Link>
        {article?.content?.date?.length > 0 ? (
          <time className="mb-4 block font-primary text-primary-1">{formatBlogDate(article?.content?.date)}</time>
        ) : null}
        <p>{getExcerpt(article?.content?.content, 160)}</p>
      </div>
    </article>
  )
}

export default function BlogArticlesSection({ blogArticles, categories, total, number, currentTab }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const Tab = ({ name, value, link }) => (
    <Link
      className={cn(
        "mr-8 whitespace-nowrap py-2 text-left font-primary capitalize text-white transition-all duration-300 lg:mr-0 lg:py-4 lg:decoration-secondary-1 lg:decoration-2 lg:underline-offset-4 lg:hover:underline",
        {
          "h-0 opacity-0 lg:h-auto lg:py-4 lg:opacity-100": currentTab.value !== value && !open,
          "lg:underline lg:decoration-secondary-1": currentTab.value === value,
          "h-auto opacity-100": open,
          "hidden lg:block": open && currentTab === value,
        },
      )}
      href={link}
      onClick={() => setOpen(false)}
    >
      {name}
    </Link>
  )

  return (
    <>
      <nav className="lg:bg-primary sticky top-0 z-50 w-full bg-primary-2 lg:relative lg:px-5">
        <div className="mx-auto flex flex-col justify-between lg:max-w-screen-xl lg:flex-row">
          <button
            className={cn("w-full self-start px-5 py-2 text-left capitalize text-white lg:hidden", {
              "scale-y-0": open,
              "scale-y-100": !open,
            })}
            onClick={() => setOpen(!open)}
          >
            {currentTab.name}
          </button>
          <div
            className={cn(
              "archive-tab-bar absolute z-10 mx-auto flex w-full origin-top flex-col bg-primary-2 px-5 transition-all duration-300 lg:relative lg:w-max lg:flex-row lg:gap-8 lg:overflow-x-auto lg:px-0 xl:gap-12",
              {
                "scale-y-0 lg:scale-y-100": !open,
                "scale-y-100": open,
              },
            )}
            onScroll={(e) => {
              setNavbarScrollPosition(e.target.scrollLeft)
            }}
          >
            <Tab name="All" value="all" link="/blog/page/1" />
            {categories?.map((category) => (
              <Tab {...category} key={category.value} link={`/blog/category/${category.value}/1`} />
            ))}
          </div>
          <button
            className="absolute right-5 top-0 z-20 lg:hidden"
            onClick={() => setOpen(!open)}
            title="Filter Archive items by Title"
          >
            <Arrow
              className={cn("h-10", {
                "rotate-180 lg:-rotate-90": open,
                "lg:-rotate-90": !open,
              })}
            />
          </button>
        </div>
      </nav>
      {blogArticles?.length > 0 ? (
        <section id="blog-section" className="px-6" data-pagefind-body>
          <div className="mx-auto max-w-screen-xl pt-12 lg:pt-20">
            <div className="grid gap-x-8 gap-y-12 last:pb-12 sm:grid-cols-2 lg:grid-cols-3">
              {blogArticles?.map((article) => (
                <ArticleItem article={article} key={article?.content?._uid} />
              ))}
            </div>

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
      ) : (
        <div className="bg-secondary-2 px-6 py-12 lg:py-28" data-pagefind-ignore>
          <div className="mx-auto flex max-w-screen-md flex-col items-center justify-center text-center">
            <h1 className="mb-8 text-primary-1">Sorry, we did not find any articles in this category</h1>
            <p className="mb-4 font-secondary text-m2 font-bold text-primary-1 lg:text-l1">
              Please try another category or visit the:
            </p>
            <CallToAction href="/blog/page/1">Main Blog Page</CallToAction>
          </div>
        </div>
      )}
    </>
  )
}
