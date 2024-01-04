import outdent from "outdent"
import { print } from "graphql/language/printer"
import { resolve_relations } from "storyblok/resolveRelations"

/**
 * A utility function to fetch data from the Storyblok GraphQL API
 *
 * @param {string} query A template literal containing the query to send to the Storyblok Graphql API
 * @param {object} options An optional object containing variables used in the query and a preview value which returns unpublished (saved) content if true
 * @param {boolean} debug Log any query errors that occurred to console. This is false by default to avoid flooding the console when upstream errors create obvious query errors
 * @returns {Promise<object>} The requested data. An error is logged to the console if the query has an error or the fetch fails
 */
export default async function fetchQuery(query, { variables, preview } = {}, debug = false) {
  query = typeof query === "object" ? print(query) : query

  try {
    const queryRequest = async () =>
      await fetch(`https://gapi-us.storyblok.com/v1/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
          Version: preview ? "draft" : "published",
        },
        body: JSON.stringify({
          query: query,
          variables: {
            ...variables,
            resolve_relations,
          },
        }),
      })

    async function delay(ms) {
      return await new Promise((resolve) => setTimeout(resolve, ms))
    }

    /**
     * Retry queries until a successful response is retrieved
     *
     * @param {Function} query A query request to execute
     * @param {integer} backOff The amount of time, specificied in milliseconds, for the request to begin linearly backing off (incremented in units of 100) at
     * @returns {Promise<object>} The query requests responese
     */
    async function maybeRetryQuery(queryRequest, backOff = 250) {
      const response = await queryRequest()

      if (response.status === 429) {
        const timeToWait = backOff + 250

        const name = getQueryName(query)

        console.warn(`\n ${name} 429 Rate limit exceeded. Retrying in ${timeToWait}ms`)
        await delay(timeToWait)
        return await maybeRetryQuery(queryRequest, timeToWait)
      }

      if (response.status !== 200) {
        throw new Error(`Response code: ${response.status}`)
      }

      return response
    }

    const response = await maybeRetryQuery(queryRequest)

    const { data, errors } = await response.json()
    if (errors && debug) {
      console.error(
        outdent`

      ++++++++++++++++++++++++++++++++++++++
      --------------------------------------
      INVALID QUERY REQUEST
      --------------------------------------

      --------------------------------------
      PREVIEW MODE ENABLED:

      ${Boolean(preview)}

      --------------------------------------
      QUERY:

      ${query}

      --------------------------------------
      VARIABLES:

      ${JSON.stringify({ variables }, null, 2)}

      --------------------------------------
      ERRORS:

      ${JSON.stringify({ errors }, null, 2)}

      --------------------------------------
      ++++++++++++++++++++++++++++++++++++++

      `,
      )
    }

    // avoid returning unserializable data
    return data ?? null
  } catch (error) {
    console.error(`fetch error: ${error}`)
  }
}

/**
 * Given a query string, parses the query and returns a referencable name for use in logs
 *
 * @param {String} query The query to parse
 * @returns {string} A referencable name for the query
 */
function getQueryName(query) {
  const queryRegex = []
  void query.replace(/(?:query\s*)([A-Z]\w*)?(?:\(.*?\))?\s*{\s*(\w+)/g, (...args) => {
    if (args[1]) {
      queryRegex.push(args[1])
    } else if (args[2]) {
      queryRegex.push(args[2])
    } else {
      queryRegex.push("Invalid query name")
    }
  })
  const [name] = queryRegex

  // TODO: fix this to always detect something more usable
  return name ?? "Unknown"
}
