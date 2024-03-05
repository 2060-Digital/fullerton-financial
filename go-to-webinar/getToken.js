import query from "storyblok/fetch"
import WebinarsTokens from "storyblok/gql/webinars/WebinarsTokens.gql"

export async function getToken() {
  try {
    const oldRefreshToken = await query(WebinarsTokens).then(
      (response) => response.DatasourceEntries.items.find((entry) => entry.name === "refresh_token").value,
    )

    const { access_token, refresh_token } = await fetch("https://authentication.logmeininc.com/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: oldRefreshToken,
      }),
    }).then((response) => response.json())

    // Update refresh token when old token expires after 30 days
    if (refresh_token) {
      await fetch("https://api-us.storyblok.com/v1/spaces/1017266/datasource_entries/95185", {
        method: "PUT",
        headers: {
          Authorization: process.env.STORYBLOK_OAUTH_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datasource_entry: {
            name: "refresh_token",
            value: refresh_token,
            datasource_id: 4783,
          },
        }),
      })
      console.info("Updating GoToWebinar Refresh Token")
    }

    return access_token
  } catch (error) {
    console.error(error)
  }
}
