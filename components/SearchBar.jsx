import { useRouter } from "next/router"

export default function SearchBar({ style = "dark" }) {
  const router = useRouter()

  return (
    <form
      className="searchbar w-full relative sm:max-w-80"
      onSubmit={(e) => {
        e.preventDefault()

        const { value } = e.target.query
        if (value !== "") {
          router.push(`/search?q=${value}`)
          e.target.query.value = ""

          return
        }
      }}
    >
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        type="text"
        id="search"
        name="query"
        className={`${style}-searchbar-input`}
        placeholder="Search Our Site"
        maxLength={50}
      />
    </form>
  )
}
