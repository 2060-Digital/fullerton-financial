import FeatureImage from "components/DynamicComponent/molecules/FeaturedImage"

export default {
  title: "Storyblok/Featured Image Section",
  component: Default,
  parameters: {
    docs: {
      description: {
        component:
          "This is a featured image component. This is commonly placed at the top of pages below the global header. ",
      },
    },
  },
  argTypes: {
    bg: {
      description: "This is the main featured image. This is an object which requires a filename and alt keys.",
      type: { required: true },
    },
  },
}

export const Default = () => {
  const blok = {
    bg: {
      // filename: "",
      alt: "placeholder",
    },
  }
  return <FeatureImage blok={blok} />
}
