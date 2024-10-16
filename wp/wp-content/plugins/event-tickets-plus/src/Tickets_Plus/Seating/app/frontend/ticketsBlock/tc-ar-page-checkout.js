import { localizedData } from './localized-data';
import { setIsInterruptable } from '@tec/tickets/seating/frontend/session';

const {arPageUrl} = localizedData;

/**
 * Handles the Ticket Commerce checkout using the Attendee Registration page in place of the modal.
 * While this function will return a Promise, on success it will redirect the user to the Attendee Registration page.
 *
 * @since TBDjA

 * @param {FormData} checkoutData The checkout data to be sent to the server.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the checkout was successful, `false` otherwise.
 */
export async function checkout(checkoutData) {
	const response = await fetch(arPageUrl, {
		method: 'POST',
		body: checkoutData,
	});

	if (!response.redirected) {
		// The server should reply with a redirect to the Attendee Registration page.
		return false;
	}

	// We're going to leave the page, but the session should not be interrupted.
	setIsInterruptable(false);

	// Redirect the user to the Attendee Registration page returned by the server.
	window.location.href = response.url;

	return false;
}
