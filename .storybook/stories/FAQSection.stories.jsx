import FAQSection from "components/DynamicComponent/molecules/FAQSection"

export default {
  title: "Storyblok/FAQ Section",
  component: Default,
  parameters: {
    docs: {
      description: {
        component:
          "This is a frequently asked question component. This component requires an array of items. These items have a title and content. The title is also displayed while the content is only displayed if the user presses a button to display it.",
      },
    },
  },
  argTypes: {
    items: {
      description:
        "This is an array of items which contains each FAQ. Each FAQ is an object which requires title and content keys.",
      type: { required: true },
    },
  },
}

export const Default = () => {
  const blok = {
    items: [
      {
        title: "Question 1",
        _uid: 1,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt placeat hic error earum est. Odio molestias qui quam perspiciatis dicta quos nihil repudiandae! Mollitia, voluptatibus?",
      },
      {
        title: "Question 2",
        _uid: 2,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt placeat hic error earum est. Odio molestias qui quam perspiciatis dicta quos nihil repudiandae! Mollitia, voluptatibus?",
      },
      {
        title: "Question 3",
        _uid: 3,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt placeat hic error earum est. Odio molestias qui quam perspiciatis dicta quos nihil repudiandae! Mollitia, voluptatibus?",
      },
    ],
  }
  return <FAQSection blok={blok} />
}
