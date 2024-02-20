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
    case "heart":
      Icon = dynamic(() => import("public/assets/icons/heart.svg"))
      break
    case "notepad":
      Icon = dynamic(() => import("public/assets/icons/notepad.svg"))
      break
    case "lightbulb":
      Icon = dynamic(() => import("public/assets/icons/lightbulb.svg"))
      break
    case "shield":
      Icon = dynamic(() => import("public/assets/icons/shield.svg"))
      break
    case "speech-bubble":
      Icon = dynamic(() => import("public/assets/icons/speech-bubble.svg"))
      break
    default:
      console.error("An invalid value was provided to the IconList component's icon property")
      break
  }

  return <Icon className={className} />
}
