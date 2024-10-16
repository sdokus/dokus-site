/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["/wcI",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "/wcI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "wp.hooks"
var external_wp_hooks_ = __webpack_require__("g56x");

// EXTERNAL MODULE: external "tec.tickets.seating.currency"
var external_tec_tickets_seating_currency_ = __webpack_require__("Almt");

// EXTERNAL MODULE: external "tec.tickets.seating.frontend.ticketsBlock"
var external_tec_tickets_seating_frontend_ticketsBlock_ = __webpack_require__("lhIa");

// CONCATENATED MODULE: ./src/Tickets_Plus/Seating/app/frontend/ticketsBlock/localized-data.js
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
var localizedData = window.tec.tickets.seating.frontend.arModal;
// EXTERNAL MODULE: external "tec.tickets.seating.frontend.session"
var external_tec_tickets_seating_frontend_session_ = __webpack_require__("KO+N");

// CONCATENATED MODULE: ./src/Tickets_Plus/Seating/app/frontend/ticketsBlock/tc-ar-modal-checkout.js



var arModalObjectName = localizedData.arModalObjectName,
  arModalContentSelector = localizedData.arModalContentSelector,
  seatSelectionModalObjectName = localizedData.seatSelectionModalObjectName;


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
  return document.getElementById("tribe-modal-tickets-item-".concat(ticketId)) || null;
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
  var _getArDialogTicketCar, _getArDialogTicketCar2;
  return Number((_getArDialogTicketCar = getArDialogTicketCartItem(ticketId)) === null || _getArDialogTicketCar === void 0 ? void 0 : (_getArDialogTicketCar2 = _getArDialogTicketCar.dataset) === null || _getArDialogTicketCar2 === void 0 ? void 0 : _getArDialogTicketCar2.ticketPrice) || 0;
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
  var input = ticketElement.querySelector('.tribe-tickets__tickets-item-quantity-number-input');
  var unitPrice = getTicketPrice(ticketId);
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
  var newTotalPrice = quantity * Number(unitPrice);
  var amountElement = ticketElement.querySelector('.tribe-tickets__tickets-item-total .tribe-amount');
  if (!amountElement) {
    console.error('Could not find the amount element for the ticket');
    return;
  }
  amountElement.innerText = Object(external_tec_tickets_seating_currency_["formatValue"])(newTotalPrice);
}

/**
 * Removes the quantity controls from a ticket element.
 *
 * @since TBD
 *
 * @param {HTMLElement} ticketElement The ticket element to remove the controls from.
 */
function removeTicketQuantityControls(ticketElement) {
  ticketElement.querySelectorAll('.tribe-tickets__tickets-item-remove-wrap').forEach(function (e) {
    return e.remove();
  });
  ticketElement.querySelectorAll('.tribe-tickets__tickets-item-quantity-remove').forEach(function (e) {
    return e.remove();
  });
  ticketElement.querySelectorAll('.tribe-tickets__tickets-item-quantity-add').forEach(function (e) {
    return e.remove();
  });

  // After removing the quantity controls, the ticket content title should be on the first column.
  ticketElement.querySelectorAll('.tribe-tickets__tickets-item-content-title-container').forEach(function (e) {
    return e.style.gridColumn = '1';
  });
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
  var ticketElement = getArDialogTicketCartItem(ticketData.ticket_id);
  if (!ticketElement) {
    console.error("Could not find the ticket element for the ticket with id ".concat(ticketData.ticket_id));
    return;
  }
  ticketElement.setAttribute('data-seat-labels', ticketData.seat_labels.join(','));
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
  arDialogElement.querySelectorAll('.tribe-tickets__attendee-tickets-item-remove').forEach(function (e) {
    return e.remove();
  });
}

/**
 * Adds a class to the AR modal wrapper element to make it look like a Seat Selection modal.
 *
 * @since TBD
 *
 * @param {HTMLElement} arDialogElement The AR modal element to update.
 */
function addSeatingModalClassToARDialog(arDialogElement) {
  var arDialogWrapperElement = arDialogElement.querySelector('.tribe-dialog__wrapper');
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
function checkout(checkoutData) {
  /** @var {A11yDialog|undefined} arDialog */
  var arDialog = window[arModalObjectName];
  /** @var {HTMLElement|undefined} arContent */
  var arDialogContent = document.querySelector(arModalContentSelector);
  /** @var {A11yDialog|undefined} seatSelectionDialog */
  var seatSelectionDialog = window[seatSelectionModalObjectName];
  if (!(arDialog && arDialogContent && seatSelectionDialog)) {
    console.error('The modal is not currently being used to collect Attendee Registration information.');
    return false;
  }
  if (!checkoutData.has('tribe_tickets_ar_data')) {
    console.error('The checkout data does not contain the required data.');
    return false;
  }
  var ticketsData = JSON.parse(checkoutData.get('tribe_tickets_ar_data'));
  if (!(ticketsData instanceof Object && ticketsData.hasOwnProperty('tribe_tickets_tickets') && ticketsData.hasOwnProperty('tribe_tickets_post_id'))) {
    console.error('The checkout data does not contain the required data.');
    return false;
  }

  /**
   * @var {Object} ticketsData The data to be sent to the Attendee Registration page in JSON format.
   * @var {CheckoutTicket[]} tickets The tickets to be purchased.
   */
  var tickets = ticketsData.tribe_tickets_tickets;

  // Render the AR modal now, it will not show, but it will create its HTML node.
  arDialog.render();
  var arDialogElement = arDialog.node;
  if (!arDialogElement instanceof HTMLElement) {
    console.error('The AR modal did not create a valid HTML element.');
    return false;
  }
  tickets.map(function (ticket) {
    return updateTicketElementFromData(ticket);
  });
  seatSelectionDialog.hide();

  // On hide or destroy, we should interrupt the session and cancel the reservations.
  var onHideDestroyCallback = function onHideDestroyCallback() {
    Object(external_tec_tickets_seating_frontend_session_["setIsInterruptable"])(true);
    Object(external_tec_tickets_seating_frontend_ticketsBlock_["cancelReservations"])();
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
  Object(external_tec_tickets_seating_frontend_session_["setIsInterruptable"])(false);

  // Checkout is dealt with.
  return true;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("o0o1");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./src/Tickets_Plus/Seating/app/frontend/ticketsBlock/tc-ar-page-checkout.js




var arPageUrl = localizedData.arPageUrl;

/**
 * Handles the Ticket Commerce checkout using the Attendee Registration page in place of the modal.
 * While this function will return a Promise, on success it will redirect the user to the Attendee Registration page.
 *
 * @since TBDjA

 * @param {FormData} checkoutData The checkout data to be sent to the server.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the checkout was successful, `false` otherwise.
 */
function tc_ar_page_checkout_checkout(_x) {
  return _checkout.apply(this, arguments);
}
function _checkout() {
  _checkout = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(checkoutData) {
    var response;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(arPageUrl, {
            method: 'POST',
            body: checkoutData
          });
        case 2:
          response = _context.sent;
          if (response.redirected) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", false);
        case 5:
          // We're going to leave the page, but the session should not be interrupted.
          Object(external_tec_tickets_seating_frontend_session_["setIsInterruptable"])(false);

          // Redirect the user to the Attendee Registration page returned by the server.
          window.location.href = response.url;
          return _context.abrupt("return", false);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _checkout.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/Tickets_Plus/Seating/app/frontend/ticketsBlock/index.js




var isUsingModal = localizedData.isUsingModal;

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
      return isUsingModal ? checkout : tc_ar_page_checkout_checkout;
    default:
      return null;
  }
}
Object(external_wp_hooks_["addFilter"])('tec.tickets.seating.checkoutHandler', 'tec-tickets-plus-seating', filterCheckoutHandler);

/***/ }),

/***/ "Almt":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.currency;

/***/ }),

/***/ "KO+N":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.frontend.session;

/***/ }),

/***/ "g56x":
/***/ (function(module, exports) {

module.exports = wp.hooks;

/***/ }),

/***/ "lhIa":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.frontend.ticketsBlock;

/***/ })

/******/ });