export default function SearchBar() {
  return (
    <form className="searchbar w-full relative max-w-80">
      <input type="text" id="search" name="search" placeholder="Search Our Site" maxLength={50} />
    </form>
  )
}
