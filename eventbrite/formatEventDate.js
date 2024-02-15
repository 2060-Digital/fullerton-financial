export const formatEventDate = (str) => {
  const date = new Date(str)

  return `${new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date)}${formatPluralDay(date.getDate())}`
}

export const formartEventTime = (time) => {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric" }).format(new Date(time))
}

export const formatEventStartEndTime = (start, end) => {
  return `${formartEventTime(start)} - ${formartEventTime(end)}`
}

export const formatPluralDay = (day) => {
  const pluralRule = new Intl.PluralRules("en-US", { type: "ordinal" }).select(day)

  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  }

  return suffixes[pluralRule]
}
