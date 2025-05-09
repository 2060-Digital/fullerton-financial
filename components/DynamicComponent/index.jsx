import SbEditable from "storyblok-react"
import dynamic from "next/dynamic"

// resolve Storyblok components to Next.js components
export const Components = {
  // Atoms
  button: dynamic(() => import("./atoms/StoryblokButton")),
  cta_banner: dynamic(() => import("./atoms/CTABanner")),
  multi_button: dynamic(() => import("./atoms/MultiButton")),
  icon_card: dynamic(() => import("./atoms/IconCard")),
  photo_card: dynamic(() => import("./atoms/PhotoCard")),
  resource_card: dynamic(() => import("./atoms/ResourceCard")),
  divider: dynamic(() => import("./atoms/Divider")),
  inline_quote: dynamic(() => import("./atoms/PullQuote")),
  audio_embed: dynamic(() => import("./atoms/AudioEmbed")),
  inline_video: dynamic(() => import("./atoms/InlineVideo")),
  two_column_list: dynamic(() => import("./atoms/TwoColumnList")),
  bamboo_hr_embed: dynamic(() => import("./atoms/BambooHREmbed")),
  callout: dynamic(() => import("./atoms/Callout")),
  dual_badge: dynamic(() => import("./atoms/DualBadge")),
  about_section: dynamic(() => import("./atoms/AboutSection")),
  inline_iframe: dynamic(() => import("./atoms/InlineIframe")),

  // Molecules
  faq: dynamic(() => import("./molecules/FAQSection")),
  featured_image: dynamic(() => import("./molecules/FeaturedImage")),
  image_and_content: dynamic(() => import("./molecules/ImageAndContent")),
  video_and_content: dynamic(() => import("./molecules/VideoAndContent")),
  page_header_section: dynamic(() => import("./molecules/PageHeader")),
  question_card_list: dynamic(() => import("./molecules/QuestionList")),
  video_hero: dynamic(() => import("./molecules/VideoHero")),
  free_retirement_toolbox_section: dynamic(() => import("./molecules/FreeRetirementToolboxSection")),
  logo_carousel_section: dynamic(() => import("./molecules/LogoCarouselSection")),
  logo_grid_section: dynamic(() => import("./molecules/LogoGridSection")),
  two_column_section: dynamic(() => import("./molecules/TwoColumnSection")),
  sidebar_cta_section: dynamic(() => import("./molecules/SidebarCTA")),
  upcoming_events_section: dynamic(() => import("./molecules/EventsCarouselSection")),
  three_column_section: dynamic(() => import("./molecules/ThreeColumnSection")),
  form_embed_section: dynamic(() => import("./molecules/FormEmbedSection")),
  iframe_embed_section: dynamic(() => import("./molecules/IframeEmbedSection")),
  full_width_text_section: dynamic(() => import("./molecules/FullWidthTextSection")),
  links_and_content: dynamic(() => import("./molecules/LinksAndContent")),
  two_column_text_section: dynamic(() => import("./molecules/TwoColumnTextSection")),
  tables_and_content_section: dynamic(() => import("./molecules/TablesAndContentSection")),
  icon_section: dynamic(() => import("./molecules/IconSection")),
  timeline_section: dynamic(() => import("./molecules/TimelineSection")),
  newsletter_sidebar: dynamic(() => import("./molecules/NewsletterSidebar")),
  map_section: dynamic(() => import("./molecules/MapSection")),
  video_section: dynamic(() => import("./molecules/VideoSection")),
  salesforce_form_embed_section: dynamic(() => import("./molecules/SalesforceEmbedSection")),

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
