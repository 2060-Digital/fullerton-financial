import Link from "next/link"
import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getTarget from "utilities/getTarget"
import getTelLink from "utilities/getTelLink"
import Logo from "public/assets/logo.svg"
import Facebook from "public/assets/social-media/facebook.svg"
import Instagram from "public/assets/social-media/instagram.svg"
import Youtube from "public/assets/social-media/youtube.svg"
import LinkedIn from "public/assets/social-media/linkedin.svg"
import richText from "utilities/richText"

export default function Footer({ footerMenu, colophon, locations, socialMedia, phoneNumbers }) {
  function SocialLink({ label }) {
    const Icons = {
      facebook: <Facebook />,
      youtube: <Youtube />,
      instagram: <Instagram />,
      linkedin: <LinkedIn />,
    }
    const Icon = () => Icons?.[label] ?? null

    return (!!socialMedia[label] && 
      <Link href={socialMedia[label]} target="_blank">
        <Icon />
      </Link>
    )
  }

  return (
    <footer>
      <div className="bg-primary-1 px-6 py-8 lg:py-14">
        <div className="mx-auto grid max-w-screen-xl sm:grid-cols-2 sm:gap-x-28 lg:grid-cols-4">
          <div>
            <Logo className="mx-auto mb-8 w-[233px] text-white sm:mx-0" />
            <div className="mx-auto mb-8 flex max-w-80 justify-between gap-4 sm:flex-col sm:gap-8">
              <CallToAction href={getTelLink(phoneNumbers?.primary)} style="phone">
                {phoneNumbers?.primary}
              </CallToAction>
              <CallToAction href="/contact" style="chat">
                Schedule a Meeting
              </CallToAction>
            </div>
            <div className="mb-8 flex items-center justify-center gap-5 sm:justify-start lg:mb-0">
              <SocialLink label="facebook" />
              <SocialLink label="instagram" />
              <SocialLink label="youtube" />
              <SocialLink label="linkedin" />
            </div>
          </div>
          <div className="flex flex-col gap-6 pb-8 sm:pb-12 lg:pb-0">
            {locations?.map((location) => (
              <div key={`${location?.name}-footer-menu`}>
                <h3 className="pb-2.5 text-center text-white sm:text-left">{location?.name}</h3>
                <div className="text-center prose-p:pb-0 prose-p:text-white sm:text-left">
                  {richText(location?.address)}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:col-span-2 sm:gap-x-28">
            {footerMenu?.map((item) => (
              <div key={item?._uid}>
                <h3 className="pb-2.5 text-white">{item?.label}</h3>
                <ul>
                  {item?.nested_menu_items?.map((subitem) => {
                    const href = getStoryblokLink(subitem?.link)
                    return (
                      !!href && <li className="pb-2.5 last:pb-0" key={subitem?._uid}>
                        <Link href={href} className="font-primary text-white hover:underline" target={getTarget(href)}>
                          {subitem?.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-primary-2 px-6 py-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-x-24 gap-y-4 xl:justify-between">
          <div className="text-center font-primary text-white lg:text-left">
            © {new Date().getFullYear()} Fullerton Financial Planning | All Rights Reserved
          </div>
          <ul className="flex flex-wrap justify-center gap-6">
            {colophon?.map((item) => {
              const href = getStoryblokLink(item?.link)
              return (
                <li key={item?._uid}>
                  <Link
                    href={href}
                    className="border-b-2 border-b-secondary-1 font-primary text-white transition-all duration-200 hover:border-b-tertiary-1"
                    target={getTarget(href)}
                  >
                    {item?.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
