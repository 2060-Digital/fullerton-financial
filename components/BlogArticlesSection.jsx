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
    <article className="bg-gray-light border-l-[20px] border-l-white">
      <Link
        href={`/blog/${article?.slug}`}
        className="w-full block relative h-[238px] border-2 border-secondary-1 -left-4"
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
          className="w-full object-cover h-full relative -top-4 -right-4"
        />
      </Link>
      <div className="p-8">
        <Link href={`/blog/${article?.slug}`} className="block mb-4">
          <h3 className="text-primary-1 hover:underline">{article?.content?.title}</h3>
        </Link>
        {article?.content?.date !== "" ? (
          <time className="block mb-4">{`${new Intl.DateTimeFormat("en-UK", {
            month: "short",
            year: "numeric",
            day: "numeric",
          }).format(new Date(article?.content?.date))}`}</time>
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
        "font-primary text-white transition-all duration-300 text-left mr-8 lg:mr-0 whitespace-nowrap py-2 lg:py-4 lg:decoration-secondary-1 lg:underline-offset-4 lg:hover:underline lg:decoration-2 capitalize",
        {
          "h-0 opacity-0 lg:py-4 lg:h-auto lg:opacity-100": currentTab.value !== value && !open,
          "lg:decoration-secondary-1 lg:underline": currentTab.value === value,
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
      <nav className="bg-primary-2 lg:bg-primary w-full lg:px-5 sticky lg:relative top-0 z-50">
        <div className="lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between">
          <button
            className={cn("text-white self-start py-2 px-5 lg:hidden w-full text-left capitalize", {
              "scale-y-0": open,
              "scale-y-100": !open,
            })}
            onClick={() => setOpen(!open)}
          >
            {currentTab.name}
          </button>
          <div
            className={cn(
              "archive-tab-bar flex flex-col lg:flex-row lg:gap-8 xl:gap-12 mx-auto bg-primary-2 absolute lg:relative w-full transition-all duration-300 origin-top px-5 lg:px-0 z-10 lg:w-max lg:overflow-x-auto",
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
      <section id="blog-section" className="px-6">
        <div className="max-w-screen-xl mx-auto pt-12">
          {blogArticles?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 last:pb-12">
              {blogArticles?.map((article) => (
                <ArticleItem article={article} key={article?._uid} />
              ))}
            </div>
          ) : (
            <div className="pb-12">
              <p>Sorry, we did not find any articles in this category. Please try another category or visit the:</p>
              <CallToAction href="/blog/page/1">Main Blog Page</CallToAction>
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
    </>
  )
}
