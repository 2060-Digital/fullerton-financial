import { getToken } from "go-to-webinar/getToken"

export default async function fetchQuery(query) {
  try {
    const queryURL = `https://api.getgo.com/G2W/rest/v2${query}`

    const token = await getToken()

    const response = await fetch(queryURL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
    return response
  } catch (error) {
    console.error(`go to webinar fetch error: ${error}\nquery: ${query}`)
    return null
  }
}
