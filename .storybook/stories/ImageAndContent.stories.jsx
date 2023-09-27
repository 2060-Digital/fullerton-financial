import ImageAndContent from "components/DynamicComponent/molecules/ImageAndContent"

export default {
  title: "Storyblok/Image And Content",
  component: ImageAndContent,
  parameters: {
    docs: {
      description: {
        component:
          "This component provides several options for users to style image and content. This includes setting a background color, orienting either the image or the content first, and offsetting the image above the content.",
      },
    },
  },
  argTypes: {
    content: {
      description: "The components content. This can include text and button.",
      type: { required: true },
      table: {
        type: { summary: null },
        defaultValue: { summary: null },
      },
    },
    image: {
      description: "The components image.",
      type: { required: true },
      table: {
        type: { summary: "image" },
        defaultValue: { summary: null },
      },
    },
    orientation: {
      description:
        "Determines whether the image comes first or the content comes first. On mobile the image is always on top of the content",
      type: { required: true },
      table: {
        type: { summary: null },
        defaultValue: { summary: null },
      },
      control: "select",
      options: ["image_first", "content_first"],
    },
    background_color: {
      description: "Determines the component's background color. If left empty then there will be no background color.",
      table: {
        type: { summary: "color" },
        defaultValue: { summary: null },
      },
      control: "select",
      options: [
        "blue",
        "blue-light",
        "blue-dark",
        "green",
        "green-light",
        "green-dark",
        "yellow",
        "orange",
        "gray",
        "gray-dark",
      ],
    },
  },
}

const content = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          text: "With a wide array of living options and a full schedule of entertainment and guest lecture series, Montgomery Place is the perfect place to enjoy and elevate your lifestyle.",
          type: "text",
        },
      ],
    },
    {
      type: "blok",
      attrs: {
        id: "3c4e1e9a-2a07-4d65-9c44-b0e0587eec0c",
        body: [
          {
            _uid: "i-1674a6ba-3892-47b9-bb67-60dbcceb3a23",
            link: {
              id: "",
              url: "#",
              linktype: "url",
              fieldtype: "multilink",
              cached_url: "#",
            },
            label: "Meet our residents",
            style: "secondary",
            component: "button",
          },
        ],
      },
    },
  ],
}

const image = {
  alt: "Vibrant Community",
  filename: "https://a.storyblok.com/f/179785/435x511/7df55a39fe/vibrant-community.jpg",
}

const Template = (args) => {
  const blok = {
    heading: args.heading,
    content: args.content,
    image: args.image,
    orientation: args.orientation,
    background_color: args.background_color,
  }
  return <ImageAndContent blok={blok} />
}

export const ImageOnLeft = Template.bind({})
ImageOnLeft.args = {
  heading: "At Montgomery Place, we are dedicated to creating an environment that is social & stress-free.",
  content: content,
  image: image,
  orientation: "image_first",
  background_color: "",
}

export const ContentOnLeft = Template.bind({})
ContentOnLeft.args = {
  heading: "At Montgomery Place, we are dedicated to creating an environment that is social & stress-free.",
  content: content,
  image: image,
  orientation: "content_first",
  background_color: "",
}

export const SetBackgroundColor = Template.bind({})
SetBackgroundColor.args = {
  heading: "At Montgomery Place, we are dedicated to creating an environment that is social & stress-free.",
  content: content,
  image: image,
  orientation: "image_first",
  background_color: "blue-light",
}

export const LargeContent = Template.bind({})
LargeContent.args = {
  heading: "At Montgomery Place, we are dedicated to creating an environment that is social & stress-free.",
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            text: "With a wide array of living options and a full schedule of entertainment and guest lecture series, Montgomery Place is the perfect place to enjoy and elevate your lifestyle. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, voluptatum. Quibusdam ratione porro odio, voluptatibus ut rem nam beatae magni quia, eius illum perspiciatis a corrupti voluptas quasi architecto nesciunt error esse deserunt, ullam est dolores enim. Corrupti obcaecati necessitatibus perspiciatis, et qui, nulla ducimus nostrum nesciunt cumque hic provident? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptas corrupti est, nisi eaque possimus perferendis tempore magnam reiciendis iusto magni illum alias! Nam distinctio dolore natus velit ratione quidem, debitis quibusdam, qui beatae totam modi repellat consequatur quod cum porro quo eligendi, eos expedita iure tenetur ea vel nesciunt incidunt rem! Dignissimos nihil explicabo asperiores velit sit nulla, molestias tempore recusandae aperiam quasi aliquam repudiandae harum. Alias facere quia ipsam officia nemo! Laboriosam, sed nesciunt qui doloremque ea hic a fugit sint aliquid debitis dolor totam ipsam cupiditate voluptas laudantium. Tempora, distinctio dolore obcaecati quae magni fugit eaque at.",
            type: "text",
          },
        ],
      },
      {
        type: "blok",
        attrs: {
          id: "3c4e1e9a-2a07-4d65-9c44-b0e0587eec0c",
          body: [
            {
              _uid: "i-1674a6ba-3892-47b9-bb67-60dbcceb3a23",
              link: {
                id: "",
                url: "#",
                linktype: "url",
                fieldtype: "multilink",
                cached_url: "#",
              },
              label: "Meet our residents",
              style: "secondary",
              component: "button",
            },
          ],
        },
      },
    ],
  },
  image: image,
  orientation: "image_first",
  background_color: "blue-light",
}
