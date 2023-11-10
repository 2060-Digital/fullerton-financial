export default async function fetchQuery(query) {
  try {
    const queryURL = `https://www.eventbriteapi.com/v3${query}`

    console.info(`eventbrite query url: ${queryURL}`)

    const response = await fetch(queryURL, {
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
      },
    }).then((response) => response.json())

    return response
  } catch (error) {
    console.error(`eventbrite fetch error: ${error}`)
    return null
  }
}
