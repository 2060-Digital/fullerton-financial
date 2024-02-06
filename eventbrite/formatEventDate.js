export const formatEventDate = (str) => {
  const date = new Date(str)

  const day = new Intl.PluralRules("en-US", { type: "ordinal" }).select(date.getDate())

  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  }

  return `${new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date)}${suffixes[day]}`
}

export const formartEventTime = (time) => {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric" }).format(new Date(time))
}

export const formatEventStartEndTime = (start, end) => {
  return `${formartEventTime(start)} - ${formartEventTime(end)}`
}
