import dynamic from "next/dynamic"

export default function Icon({ icon, className }) {
  let Icon = () => null

  switch (icon) {
    case "heartbeat":
      Icon = dynamic(() => import("public/assets/icons/heartbeat.svg"))
      break
    case "calendar":
      Icon = dynamic(() => import("public/assets/icons/calendar.svg"))
      break
    case "financial":
      Icon = dynamic(() => import("public/assets/icons/financial.svg"))
      break
    default:
      console.error("An invalid value was provided to the IconList component's icon property")
  }

  return <Icon className={className} />
}
