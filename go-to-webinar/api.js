import { formatEventStartEndTime, formatEventDate } from "eventbrite/formatEventDate"
import slugify from "slugify"
import query from "go-to-webinar/query"

function processWebinar(webinar, onDemand = false) {
  const slugifiedSubject = slugify(webinar.subject, {
    lower: true,
  })

  return {
    ...webinar,
    slug: `/webinars/${onDemand ? "on-demand/" : ""}${slugifiedSubject}-${webinar?.organizerKey}-${webinar?.webinarKey}`,
    ctaLabel: onDemand ? "Watch Now" : "Register Now",
    image: onDemand ? "/assets/navigating-medicare-hero-img.jpg" : "/assets/roth-conversions-hero-img.jpg",
    times: onDemand
      ? [{ formatted: "Recorded" }]
      : webinar.times.map((time) => ({
          raw: time,
          formatted: `${formatEventDate(time?.startTime)} ${formatEventStartEndTime(time.startTime, time.endTime)}`,
        })),
  }
}

// Upcoming Webinars
export async function getAllFutureWebinars() {
  const today = new Date()
  let oneYearFromToday = new Date()
  oneYearFromToday.setFullYear(today.getFullYear() + 1)
  const todayWithoutMilliseconds = today.toISOString().split(".")[0] + "Z"
  const oneYearFromTodayWithoutMilliseconds = oneYearFromToday.toISOString().split(".")[0] + "Z"

  const webinars = await query(
    `/accounts/${process.env.WEBINAR_ACCOUNT_KEY}/webinars?fromTime=${todayWithoutMilliseconds}&toTime=${oneYearFromTodayWithoutMilliseconds}&size=200`,
  )

  return webinars._embedded.webinars.map((webinar) => processWebinar(webinar))
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
  const webinar = await query(`/organizers/${organizerKey}/webinars/${webinarKey}`).then((webinar) =>
    processWebinar(webinar),
  )

  return webinar
}

// On-Demand Webinars
export async function getAllPastWebinars() {
  // Beginning from date of first webinar.
  const webinars = await query(
    `/accounts/${process.env.WEBINAR_ACCOUNT_KEY}/webinars?fromTime=2023-04-01T04:00:00Z&toTime=${new Date().toISOString().split(".")[0] + "Z"}&size=200`,
  )

  const webinarsWithRecordingAsset = Promise.all(
    webinars._embedded.webinars.map(async (webinar) => {
      const asset = await getRecordingAsset(webinar.webinarKey)

      return { ...processWebinar(webinar, true), asset }
    }),
  )

  return webinarsWithRecordingAsset
}

export async function getOnDemandWebinarPaths() {
  const webinars = await getAllPastWebinars()

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

export async function getRecordingAsset(webinarKey) {
  const recordingAsset = await query(`/webinars/${webinarKey}/recordingAssets?limit=200`)

  return recordingAsset.data[0]
}

export async function getOnDemandWebinarByIDs(organizerKey, webinarKey) {
  const webinar = await query(`/organizers/${organizerKey}/webinars/${webinarKey}`).then((webinar) =>
    processWebinar(webinar, true),
  )

  const asset = await getRecordingAsset(webinarKey)

  return { ...webinar, asset }
}

// Get Account Key
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
