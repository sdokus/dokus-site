import {formatValue} from '@tec/tickets/seating/currency';
import {cancelReservations}  from '@tec/tickets/seating/frontend/ticketsBlock';
import { localizedData } from './localized-data';
const {
	arModalObjectName,
	arModalContentSelector,
	seatSelectionModalObjectName,
}  = localizedData;
import { setIsInterruptable } from '@tec/tickets/seating/frontend/session';

/**
 * Fetches a Ticket Block from the AR modal dialog.
 *
 * @since TBD
 *
 * @param {number} ticketId The ID of the ticket to fetch the block for.
 *
 * @returns {HTMLElement|null} The AR modal ticket block element, or `null` if not found.
 */
function getArDialogTicketCartItem(ticketId) {
	return document.getElementById(`tribe-modal-tickets-item-${ticketId}`) || null;
}

/**
 * Returns the ticket element price.
 *
 *  @since TBD
 *
 * @param {number} ticketId The ticket ID to get the price for.
 *
 * @returns {number} The ticket price, or `0` if the ticket price could not be read.
 */
function getTicketPrice(ticketId) {
	return Number(getArDialogTicketCartItem(ticketId)?.dataset?.ticketPrice) || 0;
}

/**
 * Provided a quantity, updates a Ticket cart entry.
 *
 * @since TBD
 *
 * @param {HTMLElement} ticketElement The ticket element to update.
 * @param {number} ticketId The ticket ID.
 * @param {number} quantity The quantity to update the ticket to.
 */
function setTicketQuantity(ticketElement, ticketId, quantity) {
	const input = ticketElement.querySelector('.tribe-tickets__tickets-item-quantity-number-input');
	const unitPrice = getTicketPrice(ticketId);

	if (!input || unitPrice === undefined) {
		return;
	}

	input.value = quantity;
	input.setAttribute('readonly', 'readonly');

	if (quantity === 0) {
		ticketElement.style.display = 'none';
	} else {
		ticketElement.style.removeProperty('display');
	}

	const newTotalPrice = quantity * Number(unitPrice);
	const amountElement = ticketElement.querySelector('.tribe-tickets__tickets-item-total .tribe-amount');

	if (!amountElement) {
		console.error('Could not find the amount element for the ticket');
		return;
	}

	amountElement.innerText = formatValue(newTotalPrice);
}

/**
 * Removes the quantity controls from a ticket element.
 *
 * @since TBD
 *
 * @param {HTMLElement} ticketElement The ticket element to remove the controls from.
 */
function removeTicketQuantityControls(ticketElement) {
	ticketElement.querySelectorAll('.tribe-tickets__tickets-item-remove-wrap').forEach((e) => e.remove());
	ticketElement.querySelectorAll('.tribe-tickets__tickets-item-quantity-remove').forEach((e) => e.remove());
	ticketElement.querySelectorAll('.tribe-tickets__tickets-item-quantity-add').forEach((e) => e.remove());

	// After removing the quantity controls, the ticket content title should be on the first column.
	ticketElement.querySelectorAll('.tribe-tickets__tickets-item-content-title-container').forEach((e) => e.style.gridColumn = '1');
}

/**
 * @typedef {FormData} CheckoutData
 * @property {string} tribe_tickets_ar_data The data to be sent to the Attendee Registration page in JSON format.
 *
 * @typedef {Object} CheckoutTicket
 * @property {string} ticket_id The ID of the ticket.
 * @property {string} optout The opt-out status of the ticket.
 * @property {number} quantity The amount of ticket of this type to be purchased.
 */

/**
 * Updates the ticket element from the ticket data.
 *
 * @since TBD
 *
 * @param {CheckoutTicket} ticketData The ticket data to update the element with.
 */
function updateTicketElementFromData(ticketData) {
	const ticketElement = getArDialogTicketCartItem(ticketData.ticket_id);

	if (!ticketElement) {
		console.error(`Could not find the ticket element for the ticket with id ${ticketData.ticket_id}`);
		return;
	}

	ticketElement.setAttribute(
		'data-seat-labels',
		ticketData.seat_labels.join(',')
	);

	setTicketQuantity(ticketElement, Number(ticketData.ticket_id), ticketData.quantity);
	removeTicketQuantityControls(ticketElement);
}

/**
 * Updates the Attendee Registration controls in the AR modal to remove the controls for the
 * Attendee Registration fields that would allow adding/remove attendees in it.
 *
 * @since TBD
 *
 * @param {HTMLElement} arDialogElement The AR modal element to update.
 */
function removeAttendeeControls(arDialogElement) {
	arDialogElement.querySelectorAll('.tribe-tickets__attendee-tickets-item-remove').forEach((e) => e.remove());
}

/**
 * Adds a class to the AR modal wrapper element to make it look like a Seat Selection modal.
 *
 * @since TBD
 *
 * @param {HTMLElement} arDialogElement The AR modal element to update.
 */
function addSeatingModalClassToARDialog(arDialogElement) {
	const arDialogWrapperElement = arDialogElement.querySelector('.tribe-dialog__wrapper');

	if (!arDialogWrapperElement) {
		console.error('Could not find the AR modal wrapper element.');
		return;
	}

}

/**
 * Handles the Ticket Commerce checkout using the Cart and Attendee Registration modal.
 *
 * @since TBD
 *
 * @param {CheckoutData} checkoutData The checkout data to be sent to the server.
 *
 * @returns {boolean} Whether the checkout was successful or not.
 */
export function checkout(checkoutData) {
	/** @var {A11yDialog|undefined} arDialog */
	const arDialog = window[arModalObjectName];
	/** @var {HTMLElement|undefined} arContent */
	const arDialogContent = document.querySelector(arModalContentSelector);
	/** @var {A11yDialog|undefined} seatSelectionDialog */
	const seatSelectionDialog = window[seatSelectionModalObjectName];

	if (!(arDialog && arDialogContent && seatSelectionDialog)) {
		console.error('The modal is not currently being used to collect Attendee Registration information.');
		return false;
	}

	if (!checkoutData.has('tribe_tickets_ar_data')) {
		console.error('The checkout data does not contain the required data.');
		return false;
	}

	const ticketsData = JSON.parse(checkoutData.get('tribe_tickets_ar_data'));

	if (!(
		ticketsData instanceof Object
		&& ticketsData.hasOwnProperty('tribe_tickets_tickets')
		&& ticketsData.hasOwnProperty('tribe_tickets_post_id')
	)) {
		console.error('The checkout data does not contain the required data.');
		return false;
	}

	/**
	 * @var {Object} ticketsData The data to be sent to the Attendee Registration page in JSON format.
	 * @var {CheckoutTicket[]} tickets The tickets to be purchased.
	 */
	const {tribe_tickets_tickets: tickets} = ticketsData;

	// Render the AR modal now, it will not show, but it will create its HTML node.
	arDialog.render();
	const arDialogElement = arDialog.node;

	if (!arDialogElement instanceof HTMLElement) {
		console.error('The AR modal did not create a valid HTML element.');
		return false;
	}

	tickets.map(ticket => updateTicketElementFromData(ticket));

	seatSelectionDialog.hide();

	// On hide or destroy, we should interrupt the session and cancel the reservations.
	const onHideDestroyCallback = () => {
		setIsInterruptable(true);
		cancelReservations();
	};

	arDialog.on('hide', onHideDestroyCallback);
	arDialog.on('destroy', onHideDestroyCallback);

	/*
	 * Show the AR modal now.
	 * On this event, the `tickets-modal.js` script, slug `tribe-tickets-plus-modal`, will deal with
	 * quantity and price updates, showing and hiding the required AR/IAC fields.
	 */
	arDialog._show();

	removeAttendeeControls(arDialogElement);
	addSeatingModalClassToARDialog(arDialogElement);

	// The user might leave the page to check out: that should not interrupt the session.
	setIsInterruptable(false);

	// Checkout is dealt with.
	return true;
}
