import { format } from "date-fns"

export const formatEventDate = (start, end) => {
  return `${format(start, "EEEE, LLLL do, p")} - ${format(end, "p")}`
}
