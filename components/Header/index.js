import Link from "next/link"
import NavMenu from "components/Header/NavMenu"

import Logo from "public/assets/logo.svg"
import UtilityBar from "components/Header/UtilityBar"

export default function Header({ header, utilityBar }) {
  return (
    <header>
      <UtilityBar menu={utilityBar} />
      <section className="px-6">
        <div className="flex justify-between max-w-screen-xl mx-auto py-11">
          <Link href="/">
            <Logo className="text-primary-1" />
          </Link>
          <NavMenu menu={header} />
        </div>
      </section>
    </header>
  )
}
