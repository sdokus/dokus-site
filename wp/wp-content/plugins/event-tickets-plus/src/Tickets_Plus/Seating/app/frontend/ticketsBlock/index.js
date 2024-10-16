import {addFilter} from '@wordpress/hooks';
import {checkout as checkoutWithTicketsCommerceARModal} from './tc-ar-modal-checkout';
import {checkout as checkoutWithTicketsCommerceARPage} from './tc-ar-page-checkout';
import {localizedData} from './localized-data';

const {isUsingModal} = localizedData;

/**
 * Filters the checkout handler to either show the AR/IAC modal, or rediredt the user to the Attendee
 * Registration page.
 *
 * @since TBD
 *
 * @param {Function|null} checkoutHandler The checkout handler for the provider, `null` if not found.
 * @param {string}        provider        The provider to get the checkout handler for.
 */
function filterCheckoutHandler(checkoutHandler, provider) {
	switch (provider) {
		case 'TECTicketsCommerceModule':
		case 'TEC\\Tickets\\Commerce\\Module':
			return isUsingModal ?
				checkoutWithTicketsCommerceARModal
				: checkoutWithTicketsCommerceARPage;
		default:
			return null;
	}
}

addFilter('tec.tickets.seating.checkoutHandler', 'tec-tickets-plus-seating', filterCheckoutHandler);
