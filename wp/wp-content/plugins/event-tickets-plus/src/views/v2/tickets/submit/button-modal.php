<?php
/**
 * Block: Tickets
 * Submit Button - Modal
 *
 * Override this template in your own theme by creating a file at:
 * [your-theme]/tribe/tickets-plus/v2/tickets/submit/button.php
 *
 * See more documentation about our views templating system.
 *
 * @link https://evnt.is/1amp
 *
 * @since 5.1.0
 *
 * @version 5.1.0
 *
 * @var string $post_id     The post ID.
 * @var string $provider_id The provider class name.
 * @var array  $tickets     The list of tickets.
 */

try {
	/** @var \Tribe__Tickets__Attendee_Registration__Main $attendee_registration */
	$attendee_registration = tribe( 'tickets.attendee_registration' );
} catch ( \Exception $e ) {
	return;
}

if ( ! $attendee_registration->is_modal_enabled() ) {
	return;
}

/* translators: %1$s: Event name, %2$s: Tickets label */
$title = sprintf( _x( '%1$s %2$s', 'Tickets modal title.', 'event-tickets-plus' ), get_the_title( $post_id ), tribe_get_ticket_label_plural( 'event-tickets-plus-modal-title' ) );

/* translators: %s: Tickets label */
$button_text = sprintf( _x( 'Get %s', 'Get Tickets button.', 'event-tickets-plus' ), tribe_get_ticket_label_plural( 'event-tickets-plus-modal-submit-button' ) );

/**
 * Allow filtering of the button classes for the tickets block.
 *
 * @since 4.11.3
 *
 * @param array $button_name The button classes.
 */
$button_classes = apply_filters(
	'tribe_tickets_ticket_block_submit_classes',
	[
		'tribe-common-c-btn',
		'tribe-common-c-btn--small',
		'tribe-tickets__tickets-buy',
	]
);

$modal_args = [
	'append_target'           => '#tribe-tickets__modal-target',
	'button_classes'          => $button_classes,
	'button_disabled'         => true,
	'button_id'               => 'tribe-tickets__tickets-submit',
	'button_name'             => $provider_id . '_get_tickets',
	'button_text'             => $button_text,
	'button_type'             => 'submit',
	'close_event'             => 'tribe_dialog_close_ar_modal',
	'content_wrapper_classes' => 'tribe-dialog__wrapper tribe-modal__wrapper--ar',
	'show_event'              => 'tribe_dialog_show_ar_modal',
	'title'                   => $title,
	'title_classes'           => [
		'tribe-dialog__title',
		'tribe-modal__title',
		'tribe-common-h5',
		'tribe-common-h--alt',
		'tribe-modal--ar__title',
	],
];

/**
 * Allows filtering the arguments used to render the AR modal.
 *
 * @since TBD
 *
 * @param array<string,mixed> $modal_args The modal arguments.
 */
$modal_args = apply_filters( 'tec_tickets_ar_modal_arguments', $modal_args );

/**
 * Filters the ID that will be used to render the AR modal.
 *
 * @since TBD
 *
 * @param string|null         $modal_id   The AR modal ID, `null` by default.
 * @param array<string,mixed> $modal_args The modal arguments.
 */
$modal_id = apply_filters( 'tec_tickets_ar_modal_id', null, $modal_args );

$content = $this->template( 'v2/modal/form', [], false );

$dialog_view = tribe( 'dialog.view' );
$dialog_view->render_modal( $content, $modal_args, $modal_id );

$this->template(
	'v2/attendee-registration/content/attendees/content',
	[
		'post_id' => $post_id,
		'tickets' => $tickets,
	] 
);
