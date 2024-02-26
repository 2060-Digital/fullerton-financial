import { formatEventStartEndTime, formatEventDate } from "eventbrite/formatEventDate"
import slugify from "slugify"
import query from "go-to-webinar/query"

export async function getAllFutureWebinars() {
  const today = new Date()
  let oneYearFromToday = new Date()
  oneYearFromToday.setFullYear(today.getFullYear() + 1)
  const todayWithoutMilliseconds = today.toISOString().split(".")[0] + "Z"
  const oneYearFromTodayWithoutMilliseconds = oneYearFromToday.toISOString().split(".")[0] + "Z"

  const webinars = await query(
    `/accounts/${process.env.WEBINAR_ACCOUNT_KEY}/webinars?fromTime=${todayWithoutMilliseconds}&toTime=${oneYearFromTodayWithoutMilliseconds}&size=200`,
  )

  return webinars._embedded.webinars.map((webinar) => ({
    ...webinar,
    slug: `/webinars/${slugify(webinar.subject, {
      lower: true,
    })}-${webinar?.organizerKey}-${webinar?.webinarKey}`,
    times: webinar.times.map((time) => ({
      raw: time,
      formatted: `${formatEventDate(time?.startTime)} ${formatEventStartEndTime(time.startTime, time.endTime)}`,
    })),
  }))
}

export async function getIndividualWebinarPaths() {
  const webinars = await getAllFutureWebinars()

  return webinars.map(({ subject, organizerKey, webinarKey }) => {
    return {
      params: {
        webinar: `${slugify(subject, {
          lower: true,
        })}-${organizerKey}-${webinarKey}`,
      },
    }
  })
}

export async function getWebinarByIDs(organizerKey, webinarKey) {
  const webinar = await query(`/organizers/${organizerKey}/webinars/${webinarKey}`).then((webinar) => ({
    ...webinar,
    slug: `/webinars/${slugify(webinar.subject, {
      lower: true,
    })}-${webinar?.organizerKey}-${webinar?.webinarKey}`,
    times: webinar.times.map((time) => ({
      raw: time,
      formatted: `${formatEventDate(time?.startTime)} ${formatEventStartEndTime(time.startTime, time.endTime)}`,
    })),
  }))

  return webinar
}

export async function getAccountKey(token) {
  const { accountKey } = await fetch("https://api.getgo.com/admin/rest/v1/me", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())

  return accountKey
}
