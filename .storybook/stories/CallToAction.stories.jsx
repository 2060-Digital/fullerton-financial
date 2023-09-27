import CallToAction from "components/CallToAction"

export default {
  title: "Storyblok/Call to Action",
  component: CallToAction,
  parameters: {
    docs: {
      description: {
        component:
          "Allows user to create styled links or buttons. By default Call to Action is an a tag but can be turned into a button tag with the button argument.",
      },
    },
  },
  argTypes: {
    onClick: { action: "clicked" },
    onMouseEnter: { action: "hovered" },
    href: {
      description: "Sets the Call to Action's URL",
      type: { required: true },
      table: {
        defaultValue: { summary: "#" },
      },
    },
    style: {
      description: "Sets the Call to Action's style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
      control: "select",
      options: ["primary", "secondary"],
    },
    children: {
      description: "Determines the Call to Action's text",
      type: { required: true },
      table: {
        type: null,
      },
    },
    target: {
      description: "Determines where the href is opened",
      table: {
        type: null,
        defaultValue: { summary: "null" },
      },
    },
    button: {
      description: "Determines whether the Call to Action is an html button tag or an a tag",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
      control: {
        type: "boolean",
      },
    },
  },
}

const Template = (args) => <CallToAction {...args} />

export const Primary = Template.bind({})
Primary.args = {
  href: "#",
  style: "primary",
  target: "_self",
  children: "Get Started",
}

export const Secondary = Template.bind({})
Secondary.args = {
  href: "#",
  style: "secondary",
  target: "_self",
  children: "Let's Get Working",
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  href: "Tel:(859)224-2273",
  style: "tertiary",
  target: "_self",
  children: "Tel: (859) 224-2273",
}
