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

    return (
      <Link href={socialMedia[label]} target="_blank">
        <Icon />
      </Link>
    )
  }

  return (
    <footer>
      <div className="bg-primary-1 px-6 py-8 lg:py-14">
        <div className="max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-28">
          <div>
            <Logo className="text-white mb-8 mx-auto sm:mx-0" />
            <div className="mb-8 flex sm:flex-col justify-between gap-4 sm:gap-8 max-w-80 mx-auto">
              <CallToAction href={getTelLink(phoneNumbers?.primary)} style="phone">
                {phoneNumbers?.primary}
              </CallToAction>
              <CallToAction href="/contact" style="chat">
                Schedule a Meeting
              </CallToAction>
            </div>
            <div className="flex gap-5 items-center mb-8 lg:mb-0 justify-center sm:justify-start">
              <SocialLink label="facebook" />
              <SocialLink label="instagram" />
              <SocialLink label="youtube" />
              <SocialLink label="linkedin" />
            </div>
          </div>
          <div className="flex flex-col gap-6 pb-8 sm:pb-12 lg:pb-0">
            {locations?.map((location) => (
              <div key={`${location?.name}-footer-menu`}>
                <h3 className="text-white text-center sm:text-left pb-2.5">{location?.name}</h3>
                <div className="prose-p:text-white text-center sm:text-left">{richText(location?.address)}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:col-span-2 gap-y-6 gap-x-6 sm:gap-x-28">
            {footerMenu?.map((item) => (
              <div key={item?._uid}>
                <h3 className="text-white pb-2.5">{item?.label}</h3>
                <ul>
                  {item?.nested_menu_items?.map((subitem) => {
                    const href = getStoryblokLink(subitem?.link)
                    return (
                      <li className="pb-2.5 last:pb-0" key={subitem?._uid}>
                        <Link href={href} className="text-white hover:underline font-primary" target={getTarget(href)}>
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
      <div className="bg-primary-2 py-6 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center xl:justify-between gap-y-4 gap-x-24">
          <div className="text-white font-primary text-center lg:text-left">
            © {new Date().getFullYear()} Fullerton Financial Planning | All Rights Reserved
          </div>
          <ul className="flex flex-wrap gap-6 justify-center">
            {colophon?.map((item) => {
              const href = getStoryblokLink(item?.link)
              return (
                <li key={item?._uid}>
                  <Link
                    href={href}
                    className="text-white font-primary transition-all duration-200 border-b-2 border-b-secondary-1 hover:border-b-tertiary-1"
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
