import SearchBar from "components/SearchBar"
import Link from "next/link"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function UtilityBar({ menu }) {
  return (
    <section className="bg-gray-light px-6 py-6 hidden xl:block">
      <div className="mx-auto max-w-screen-xl flex justify-between">
        <SearchBar />
        <ul className="flex flex-row items-center gap-8">
          {menu?.map((item) => (
            <li key={item?._uid}>
              <Link
                href={getStoryblokLink(item?.link)}
                className="underline underline-offset-4 decoration-secondary-1 hover:decoration-primary-1 w-max font-primary text-primary-1"
              >
                {item?.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
