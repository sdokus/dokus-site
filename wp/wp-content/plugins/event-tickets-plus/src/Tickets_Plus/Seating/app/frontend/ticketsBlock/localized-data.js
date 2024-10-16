/**
 * @typedef {Object} ArLocalizedData
 * @property {boolean} isUsingModal Whether the modal is currently being used to collect Attendee Registration information or not.
 * @property {string} arModalObjectName   The name of the AR/IAC modal window object.
 * @property {string} arModalContentSelector   The selector of the AR/IAC modal window content.
 * @property {string} seatSelectionModalObjectName The name of the Seat Selection modal window object.
 * @property {string} arPageUrl    The URL to the Attendee Registration page.
 */

/**
 * @type {ArLocalizedData}
 */
export const localizedData = window.tec.tickets.seating.frontend.arModal;