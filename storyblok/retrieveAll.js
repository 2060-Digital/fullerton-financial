import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"
import storyblok from "storyblok/fetch"
import { print } from "graphql/language/printer"
import { resolve_relations } from "storyblok/resolveRelations"

/**
 * Retrieves all pages for a given query
 *
 * Storyblok limits pages to 100 by default. This function iterates through all pages until complete.
 *
 * @param {Object} config The configuration object containing a query and whether or not preview mode is enabled
 * @returns {Promise<Array>} An array of all items within the given query
 */
export default async function retrieveAll({ query, type, preview, variables }) {
  query = typeof query === "object" ? print(query) : query

  try {
    if (!query.includes("per_page:") || !query.includes("page:")) {
      throw new Error(
        `The query must include $per_page and $page variables args and supply them to the requested type as arguments.

Requested Type: ${type}

Provided Query:

${query}

`,
      )
    }

    const per_page = 100
    const fetchPage = async (page) =>
      await storyblok(query, {
        variables: { per_page, page, resolve_relations, ...variables },
        preview,
      })

    // first request
    const data = []
    const initial = await fetchPage(1)

    data.push(...initial[type].items)

    let total = initial[type].total

    if (total === 0) {
      return []
    }

    if (!total) {
      throw new Error(
        `The provided GraphQL query must include the requested type's 'total' field to determine how many requests to make.
        
        Requested Type: ${type}

        Provided Query:

        ${query}
        `,
      )
    }

    const pageCount = total % per_page === 0 ? total / per_page : total / per_page + 1
    let currentPage = 2

    // loop until we catch 'em all
    while (pageCount >= currentPage) {
      const nextPage = await fetchPage(currentPage)
      data.push(...nextPage[type].items)
      currentPage++
    }

    const dataWithPlaiceholders = await Promise.all(data.map(async (d) => await generateSBPlaiceholders(d)))

    return [...new Set(dataWithPlaiceholders)]
  } catch (error) {
    console.error(`
--------------------------------------------------------------------------------------------------------
Error: An error has occurred while attempting to retrieve all entries of a type from Storyblok!
--------------------------------------------------------------------------------------------------------

${error}
--------------------------------------------------------------------------------------------------------
    `)
  }
}
