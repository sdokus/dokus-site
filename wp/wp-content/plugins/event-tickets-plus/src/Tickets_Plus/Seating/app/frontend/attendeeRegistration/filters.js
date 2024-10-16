import { addFilter } from '@wordpress/hooks';
import { filterTicketTemplateSeatLabels } from './hook-callbacks';

addFilter(
	'tec.tickets-plus.ticket-getTemplateData',
	'tec.tickets.seating',
	filterTicketTemplateSeatLabels,
);
