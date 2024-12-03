import slugify from "slugify"

async function getToken() {
  const { access_token } = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: process.env.ZOOM_ACCOUNT_ID,
    }),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.error(err)
    })

  return access_token
}

export async function getWebinars() {
  try {
    const token = await getToken()

    const response = await fetch("https://api.zoom.us/v2/users/me/webinars/?type=upcoming", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getIndividualWebinar(id) {
  try {
    const token = await getToken()

    const response = await fetch(`https://api.zoom.us/v2/webinars/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getIndividualWebinarPaths() {
  const webinars = await getWebinars()

  return webinars.webinars.map(({ topic, id }) => {
    return {
      params: {
        webinar: `${slugify(topic, {
          lower: true,
        })}-${id}`,
      },
    }
  })
}
