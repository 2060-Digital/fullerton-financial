import Link from "next/link"
import NavMenu from "./NavMenu"

export default function Header({ header, utilityBar }) {
  return (
    <header className="max-w-screen-xl mx-auto px-10 xl:px-8 py-4 flex items-center justify-between">
      <Link href="/">Home</Link>
      <NavMenu menu={header} />
    </header>
  )
}
