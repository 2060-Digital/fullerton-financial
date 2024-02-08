import dynamic from "next/dynamic"

export default function Icon({ icon, className }) {
  let Icon = () => null

  switch (icon) {
    case "blahbitty-blah":
      Icon = dynamic(() => import("public/assets/icons/blahbitty-blah"))
      break
    default:
      console.error("An invalid value was provided to the IconList component's icon property")
  }

  return <Icon className={className} />
}
