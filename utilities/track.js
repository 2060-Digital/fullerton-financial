/**
 *  Send events to Google Tag Manager
 * @param {string} event Event Name
 * @param {object} options Optional parameters for event
 */
export default function track({ event, options = {} }) {
  window.dataLayer = window.dataLayer || []
  dataLayer.push({ event, ...options })

  console.debug(`Sent ${event} to GTM with options: ${JSON.stringify(options)}`)
}
