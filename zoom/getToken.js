const SECRET_TOKEN = "TT8X20t2TOatQvOgx7ufmA"
const CLIENT_ID = "qH2OlWCURDOc_BuAO0NAtw"
const CLIENT_SECRET = "TLijdxoNH4d26Wis1y7yKF1fQzal5Ze7"
const ACCOUNT_ID = "M--Ud4CIT2-Rn7yDIRzIyw"

async function getToken() {
  const { access_token } = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: ACCOUNT_ID,
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

export async function getMeetings() {
  try {
    const token = await getToken()

    const response = await fetch("https://api.zoom.us/v2/users/me/webinars/", {
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
