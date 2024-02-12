import SbEditable from "storyblok-react"
import dynamic from "next/dynamic"

// resolve Storyblok components to Next.js components
export const Components = {
  // Atoms
  button: dynamic(() => import("./atoms/StoryblokButton")),
  cta_banner: dynamic(() => import("./atoms/CTABanner")),
  dual_button: dynamic(() => import("./atoms/DualButton")),
  divider: dynamic(() => import("./atoms/Divider")),

  // Molecules
  faq: dynamic(() => import("./molecules/FAQSection")),
  featured_image: dynamic(() => import("./molecules/FeaturedImage")),
  image_and_content: dynamic(() => import("./molecules/ImageAndContent")),
  page_header_section: dynamic(() => import("./molecules/PageHeader")),
  question_card_list: dynamic(() => import("./molecules/QuestionList")),
  free_retirement_toolbox_section: dynamic(() => import("./molecules/FreeRetirementToolboxSection")),
  logo_carousel_section: dynamic(() => import("./molecules/LogoCarouselSection")),
  two_column_section: dynamic(() => import("./molecules/TwoColumnSection")),
  sidebar_cta_section: dynamic(() => import("./molecules/SidebarCTA")),

  // Organisms
  page: dynamic(() => import("./organisms/Page")),
}

const DynamicComponent = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok?.component] !== "undefined") {
    const Component = Components[blok.component]

    // Set an _editable value to avoid error in SbEditable
    if (blok._editable === null) {
      blok._editable = undefined
    }
    if (typeof window !== "undefined" && window.location.search.includes("_storyblok")) {
      return (
        <SbEditable content={blok}>
          <Component blok={blok} />
        </SbEditable>
      )
    }

    return <Component blok={blok} />
  }

  // fallback if the component doesn't exist
  return null
}

export default DynamicComponent
