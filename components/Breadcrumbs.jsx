import Link from "next/link"
import Script from "next/script"

export function Crumb({ text, href, last }) {
  return (
    <li className="inline-block text-white font-primary capitalize">
      {last ? (
        <div className="" aria-current="page">
          {text}
        </div>
      ) : (
        <Link
          href={href}
          className="crumb text-white underline hover:no-underline decoration-secondary-1 underline-offset-4 pr-6 relative"
        >
          {text}
        </Link>
      )}
    </li>
  )
}

export default function Breadcrumbs({ breadcrumbs }) {
  return breadcrumbs?.length ? (
    <>
      <nav aria-label="Breadcrumb" className="pb-2">
        <ol className="max-w-screen-xl w-full leading-7">
          <Crumb {...{ href: "/", text: "Home" }} />
          {breadcrumbs.map((crumb, idx) => (
            <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
          ))}
        </ol>
      </nav>
      <Script type="application/ld+json" id="breadcrumbs-schema">
        {`{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "/"
            },
            ${breadcrumbs.map(
              (crumb, idx) => `{
            "@type": "ListItem",
            "position": ${idx + 2},
            "name": "${crumb?.text}",
            "item": "${crumb?.href ?? ""}"
          }`,
            )}]
      }`}
      </Script>
    </>
  ) : null
}
