export const formatEventDate = (str) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date(str))

export const formartEventTime = (time) => {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric" }).format(new Date(time))
}

export const formatEventStartEndTime = (start, end) => {
  return `${formartEventTime(start)} - ${formartEventTime(end)}`
}
