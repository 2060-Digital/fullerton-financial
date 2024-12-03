import SearchBar from "components/SearchBar"
import Link from "next/link"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function UtilityBar({ menu }) {
  return (
    <section className="hidden bg-gray-light px-6 py-6 xl:block">
      <div className="mx-auto flex max-w-screen-xl justify-between">
        <SearchBar />
        <ul className="flex flex-row items-center gap-8">
          {menu?.map((item) => (
            !!item?.link && <li key={item?._uid}>
              <Link
                href={getStoryblokLink(item?.link)}
                className="w-max font-primary text-primary-1 underline decoration-secondary-1 underline-offset-4 hover:decoration-primary-1"
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
