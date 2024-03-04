import slugify from "slugify"
import query from "go-to-webinar/query"
import { add, formatISO } from "date-fns"

function processWebinar(webinar, onDemand = false) {
  const slugifiedSubject = slugify(webinar.subject, {
    lower: true,
  })

  return {
    ...webinar,
    slug: `/webinars/${onDemand ? "on-demand/" : ""}${slugifiedSubject}-${webinar?.organizerKey}-${webinar?.webinarKey}`,
    ctaLabel: onDemand ? "Watch Now" : "Register Now",
    image: onDemand ? "/assets/navigating-medicare-hero-img.jpg" : "/assets/roth-conversions-hero-img.jpg",
    times:
      webinar?.times?.map((time) => ({
        startTime: new Date(time?.startTime).toLocaleString("en-US", { timeZone: "America/Phoenix" }),
        endTime: new Date(time?.endTime).toLocaleString("en-US", { timeZone: "America/Phoenix" }),
      })) ?? [],
  }
}

const today = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" }))

// Future Webinars
export async function getAllFutureWebinars() {
  // GoToWebinar requires a date range (fromTime,toTime) in order to
  // retrieve webinars. In order to ensure that we fetch all future webinars,
  // we use a range with an end date that is far in the future.
  const tenYearsFromToday = add(today, { years: 10 })

  const webinars = await query(
    `/accounts/${process.env.WEBINAR_ACCOUNT_KEY}/webinars?fromTime=${formatISO(today)}&toTime=${formatISO(tenYearsFromToday)}&size=200`,
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
    `/accounts/${process.env.WEBINAR_ACCOUNT_KEY}/webinars?fromTime=2023-04-04T00:00:00Z&toTime=${formatISO(today)}&size=200`,
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
