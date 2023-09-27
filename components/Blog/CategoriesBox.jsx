import Link from "next/link"
import CallToAction from "components/CallToAction"

export function CategoriesBox({ categories }) {
  return (
    <div className="flex flex-col gap-y-2 lg:self-start text-white bg-blue-dark px-10 py-8 w-full lg:max-w-sm lg:mr-6">
      <h2>
        <Link href="/blog/page/1" className="font-secondary text-xl2 italic hover:underline">
          Browse by Category
        </Link>
      </h2>
      {categories?.map((category, idx) => (
        <CallToAction
          href={`/blog/category/${category?.value}/1`}
          style="secondary"
          className="w-max text-white"
          key={idx}
        >
          {category?.name}
        </CallToAction>
      ))}
    </div>
  )
}
