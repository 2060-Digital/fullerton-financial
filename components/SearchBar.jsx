export default function SearchBar({ style = "dark" }) {
  return (
    <form className="searchbar w-full relative sm:max-w-80">
      <input
        type="text"
        id="search"
        name="search"
        className={`${style}-searchbar-input`}
        placeholder="Search Our Site"
        maxLength={50}
      />
    </form>
  )
}
