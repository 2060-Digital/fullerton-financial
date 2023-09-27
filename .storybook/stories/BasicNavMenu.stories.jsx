import NavMenu from "components/NavMenu"

export default {
  title: "Internal/Basic Nav Menu",
  component: Default,
  parameters: {
    docs: {
      description: {
        component: "This is a basic navigation menu for a website's global header component.",
      },
    },
  },
  argTypes: {},
}

export const Default = () => {
  const menu = [
    {
      label: "item 1",
      link: "#",
      _uid: 1,
      nested_menu_items: [
        { label: "item 1", link: "#", _uid: 2, nested_menu_items: [] },
        { label: "item 2", link: "#", _uid: 2, nested_menu_items: [] },
        { label: "item 3", link: "#", _uid: 2, nested_menu_items: [] },
        { label: "item 4", link: "#", _uid: 2, nested_menu_items: [] },
      ],
    },
    {
      label: "item 2",
      link: "#",
      _uid: 1,
      nested_menu_items: [],
    },
    {
      label: "item 3",
      link: "#",
      _uid: 1,
      nested_menu_items: [{ label: "item 1", link: "#", _uid: 2, nested_menu_items: [] }],
    },
    {
      label: "item 4",
      link: "#",
      _uid: 1,
      nested_menu_items: [],
    },
  ]
  return <NavMenu menu={menu} />
}
