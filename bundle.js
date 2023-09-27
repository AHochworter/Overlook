/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchCustomers": () => (/* binding */ fetchCustomers),
/* harmony export */   "fetchBookings": () => (/* binding */ fetchBookings),
/* harmony export */   "fetchRooms": () => (/* binding */ fetchRooms),
/* harmony export */   "sendBookingToServer": () => (/* binding */ sendBookingToServer)
/* harmony export */ });
const fetchCustomers = () => {
  return fetch('https://overlook-backend.vercel.app/api/v1/customers')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

const fetchBookings = () => {
  return fetch('https://overlook-backend.vercel.app/api/v1/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

const fetchRooms = () => {
  return fetch('https://overlook-backend.vercel.app/api/v1/rooms')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

const sendBookingToServer = booking => {
  const url = 'https://overlook-backend.vercel.app/api/v1/bookings';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error sending booking:', error);
      throw error;
    });
};


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterBookingsByGuest": () => (/* binding */ filterBookingsByGuest),
/* harmony export */   "bookingsByRoomByGuest": () => (/* binding */ bookingsByRoomByGuest),
/* harmony export */   "guestPastBookings": () => (/* binding */ guestPastBookings),
/* harmony export */   "guestComingBookings": () => (/* binding */ guestComingBookings),
/* harmony export */   "guestTotalSpent": () => (/* binding */ guestTotalSpent)
/* harmony export */ });
const filterBookingsByGuest = (currentGuest, allBookings) => {
  return allBookings.filter(booking => {
    return booking.userID === currentGuest.id;
  });
};

const bookingsByRoomByGuest = (currentGuest, allBookings, allRooms) => {
  const guestBookings = filterBookingsByGuest(currentGuest, allBookings);

  const bookingsByRoom = guestBookings.map(booking => {
    const guestRoom = allRooms.find(room => {
      return room.number === booking.roomNumber;
    });
    return {
      room: guestRoom,
      date: booking.date,
    };
  });
  return bookingsByRoom;
};

const guestPastBookings = (currentGuest, allBookings, allRooms) => {
  const guestBookings = bookingsByRoomByGuest(
    currentGuest,
    allBookings,
    allRooms
  );
  const currentDate = new Date();
  const pastBookings = guestBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < currentDate;
  });
  return pastBookings;
};

const guestComingBookings = (currentGuest, allBookings, allRooms) => {
  const guestBookings = bookingsByRoomByGuest(
    currentGuest,
    allBookings,
    allRooms
  );
  const currentDate = new Date();
  const upcomingBookings = guestBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= currentDate;
  });
  return upcomingBookings;
};

const guestTotalSpent = (currentGuest, allBookings, allRooms) => {
  const guestPriorBookings = guestPastBookings(
    currentGuest,
    allBookings,
    allRooms
  );
  const guestTotal = guestPriorBookings.reduce((acc, booking) => {
    const costPerNight = booking.room.costPerNight;
    acc += costPerNight;

    return acc;
  }, 0);
  return guestTotal;
};




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allUpcomingBookings": () => (/* binding */ allUpcomingBookings),
/* harmony export */   "allAvailableRooms": () => (/* binding */ allAvailableRooms),
/* harmony export */   "findSelectedRoom": () => (/* binding */ findSelectedRoom)
/* harmony export */ });
const allUpcomingBookings = (allBookings, currentDate) => {
  const upcomingBookings = allBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= currentDate;
  });
  return upcomingBookings;
};

const allAvailableRooms = (allRooms, allBookings, currentDate) => {
  const bookedRoomsOnDate = allBookings.filter(booking => {
    return booking.date === currentDate;
  });

  const bookedRoomNumbers = bookedRoomsOnDate.map(
    booking => booking.roomNumber
  );

  const availableRooms = allRooms.filter(
    room => !bookedRoomNumbers.includes(room.number)
  );
  return availableRooms;
};

const findSelectedRoom = (roomNumber, allRooms) => {
  return allRooms.rooms.filter(room => {
    return room.number === parseInt(roomNumber);
  });
};




/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findGuest": () => (/* binding */ findGuest)
/* harmony export */ });
const findGuest = (username, password, customerData) => {
  const guestUsername = username.split('customer')[1];

  if (guestUsername) {
    const customerId = parseInt(guestUsername, 10);

    if (customerId >= 1 && customerId <= customerData.length) {
      const byId = customerData.find(user => user.id === customerId);
      if (byId) {
        return byId;
      }
    }
  }
  return undefined;
};




/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 7 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_village_on_lake_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_village_on_lake_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #948a8b;\n  height: 100vh;\n  width: 100vw;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n/* PAGE HEADER */\n.page-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 1395px;\n  height: 175px;\n}\n\n.img-logo {\n  height: 100px;\n  width: 100px;\n  margin-top: 10px;\n}\n\n.overlook-heading {\n  display: flex;\n  font-family: 'Outfit', sans-serif;\n  font-size: 45px;\n  color: #c6a82b;\n  margin: 3px 5px 3px 5px;\n}\n\n.och-tagline {\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n  color: #ffffff;\n}\n\n.logo-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 165px;\n}\n\n.opening-message-wrapper {\n  display: flex;\n  flex-direction: column;\n  height: 175px;\n}\n\n.master-buttons-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n}\n\n/* LOGIN VIEW */\n.login-view {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 75vh;\n  width: 100vw;\n}\n\n.username,\n.password {\n  color: #531a1a;\n  text-align: center;\n  font-family: Roboto;\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.user-input,\n.password-input {\n  width: 200px;\n  padding: 6px;\n  margin-bottom: 15px;\n}\n\n.login-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 412px;\n  height: 481px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  background: rgba(217, 217, 217, 0.5);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.5);\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 365px;\n  height: 250px;\n  padding: 0px;\n  margin: 0px;\n  border-radius: 5px;\n  background: rgba(33, 29, 29, 0.2);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.3);\n}\n\n/* DASHBOARD VIEW */\n.opening-img {\n  width: 1395px;\n  height: 700px;\n  background: lightgray 50% / cover no-repeat;\n}\n\n.welcome-user {\n  display: flex;\n  justify-content: flex-start;\n  width: 645px;\n  height: 40px;\n  margin: 3px 5px 3px 5px;\n  flex-shrink: 0;\n  color: #531a1a;\n  text-align: center;\n  font-family: Roboto;\n  font-size: 25px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: normal;\n}\n\n.total-spent {\n  display: flex;\n  justify-content: flex-start;\n  width: 645px;\n  height: 35px;\n  margin: 3px 5px 3px 5px;\n  flex-shrink: 0;\n  color: #531a1a;\n  text-align: center;\n  font-family: Roboto;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: normal;\n}\n\n/* BUTTONS TOP LEVEL */\n.login-btn,\n.master-nav {\n  color: #ffffff;\n  font-size: 14px;\n  width: 150px;\n  height: 40px;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 83px;\n  background: #531a1a;\n}\n\n.dashboard-view,\n.book-a-room-step-one {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 1395px;\n  height: 850px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  background: rgba(217, 217, 217, 0.5);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.5);\n}\n\n.card-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  overflow-y: auto;\n  width: 1250px;\n  height: 700px;\n  flex-shrink: 0;\n}\n\n.book-a-room-step-two {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  width: 1395px;\n  height: 850px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  background: rgba(217, 217, 217, 0.5);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.5);\n}\n\n/* NAVIGATION AREA AT TOP OF EACH VIEW */\n.dashboard-view-nav,\n.book-a-room-one {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: #b7b1b2;\n  height: 75px;\n}\n\n/* BUTTONS DASHBOARD*/\n.upcoming-bookings-btn,\n.past-bookings-btn {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 156px;\n  height: 35px;\n  border: none;\n  border-radius: 83px;\n  margin: 0px 10px 0px 10px;\n  background: #c6a82b;\n  color: #000;\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n}\n\n.upcoming-bookings-btn:focus {\n  background-color: aqua;\n}\n\n.past-bookings-btn:focus {\n  background-color: aqua;\n}\n\n/* BUTTONS BOOK-A-ROOM */\n.single-room,\n.junior-suite,\n.residential,\n.suite,\n.all-room-types {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-shrink: 0;\n  width: 140px;\n  height: 40px;\n  border: none;\n  border-radius: 83px;\n  margin: 0px 10px 0px 10px;\n  background: #c6a82b;\n  color: #000;\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.all-room-types:focus {\n  background-color: aqua;\n}\n\n.junior-suite:focus {\n  background-color: aqua;\n}\n.suite:focus {\n  background-color: aqua;\n}\n\n.single-room:focus {\n  background-color: aqua;\n}\n\n.residential:focus {\n  background-color: aqua;\n}\n\n.room-details {\n  font-family: 'Roboto', sans-serif;\n  font-size: 14px;\n  line-height: 0.25;\n}\n\n.room-type {\n  font-family: 'Roboto', sans-serif;\n  margin: 6px 0px 3px 0px;\n  font-size: 17px;\n  font-weight: bolder;\n  line-height: 0.5;\n}\n\n.date-booked {\n  font-size: 1em;\n  line-height: 0.5;\n}\n\nform {\n  width: 425px;\n}\n\nfieldset {\n  display: block;\n  width: 375px;\n  font-size: 18px;\n  margin-inline-start: 2px;\n  margin-inline-end: 2px;\n  padding-block-start: 0.35em;\n  padding-inline-start: 0.75em;\n  padding-inline-end: 0.75em;\n  padding-block-end: 0.625em;\n  min-inline-size: min-content;\n  border-width: 2px;\n  border-style: groove;\n  border-color: rgb(192, 192, 192);\n  border-image: initial;\n}\n\n.date-input {\n  font-family: 'Roboto', sans-serif;\n  font-size: 14px;\n  align-items: center;\n  border: none;\n  border-radius: 15px;\n  height: 25px;\n  width: 200px;\n}\n\n.select-a-date {\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px;\n}\n\nlegend {\n  font-family: 'Roboto', sans-serif;\n  font-family: 'Outfit', sans-serif;\n  font-size: 16px;\n}\n\n.room-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  /* background-color: aquamarine; */\n  overflow-y: auto;\n  width: 1250px;\n  height: 725px;\n  flex-shrink: 0;\n}\n\n.rooms-available {\n  height: 15px;\n}\n\n.selected-room {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  width: 703px;\n  height: 659px;\n  flex-shrink: 0;\n  border-radius: 5px;\n  background: rgba(33, 29, 29, 0.2);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.3);\n}\n\n.card-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 325px;\n  height: 325px;\n  flex-shrink: 0;\n  margin: 15px 15px 15px 15px;\n  border-radius: 5px;\n  background: rgba(33, 29, 29, 0.2);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.3);\n}\n\n.single-img-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 587px;\n  height: 342px;\n  flex-shrink: 0;\n  background: #000;\n}\n\n.single-img {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 513px;\n  height: 342px;\n  flex-shrink: 0;\n}\n\n.img-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 300px;\n  height: 200px;\n  flex-shrink: 0;\n  background: rgba(33, 29, 29, 0.2);\n}\n\n.room-img {\n  display: flex;\n  width: 266px;\n  max-height: 178px;\n}\n\n/* BUTTONS-RESERVATION */\n.bookBtn,\n.select-date-btn {\n  width: 110px;\n  height: 25px;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 83px;\n  background: #531a1a;\n  color: #ffffff;\n}\n\n.reservation-message {\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n  font-weight: bolder;\n  font-style: italic;\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #948a8b;\n  height: 100vh;\n  width: 100vw;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\n/* PAGE HEADER */\n.page-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 1395px;\n  height: 175px;\n}\n\n.img-logo {\n  height: 100px;\n  width: 100px;\n  margin-top: 10px;\n}\n\n.overlook-heading {\n  display: flex;\n  font-family: 'Outfit', sans-serif;\n  font-size: 45px;\n  color: #c6a82b;\n  margin: 3px 5px 3px 5px;\n}\n\n.och-tagline {\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n  color: #ffffff;\n}\n\n.logo-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 165px;\n}\n\n.opening-message-wrapper {\n  display: flex;\n  flex-direction: column;\n  height: 175px;\n}\n\n.master-buttons-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n}\n\n/* LOGIN VIEW */\n.login-view {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background-image: url('/src/images/village-on-lake.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  height: 75vh;\n  width: 100vw;\n}\n\n.username,\n.password {\n  color: #531a1a;\n  text-align: center;\n  font-family: Roboto;\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.user-input,\n.password-input {\n  width: 200px;\n  padding: 6px;\n  margin-bottom: 15px;\n}\n\n.login-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 412px;\n  height: 481px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  background: rgba(217, 217, 217, 0.5);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.5);\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 365px;\n  height: 250px;\n  padding: 0px;\n  margin: 0px;\n  border-radius: 5px;\n  background: rgba(33, 29, 29, 0.2);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.3);\n}\n\n/* DASHBOARD VIEW */\n.opening-img {\n  width: 1395px;\n  height: 700px;\n  background: lightgray 50% / cover no-repeat;\n}\n\n.welcome-user {\n  display: flex;\n  justify-content: flex-start;\n  width: 645px;\n  height: 40px;\n  margin: 3px 5px 3px 5px;\n  flex-shrink: 0;\n  color: #531a1a;\n  text-align: center;\n  font-family: Roboto;\n  font-size: 25px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: normal;\n}\n\n.total-spent {\n  display: flex;\n  justify-content: flex-start;\n  width: 645px;\n  height: 35px;\n  margin: 3px 5px 3px 5px;\n  flex-shrink: 0;\n  color: #531a1a;\n  text-align: center;\n  font-family: Roboto;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: normal;\n}\n\n/* BUTTONS TOP LEVEL */\n.login-btn,\n.master-nav {\n  color: #ffffff;\n  font-size: 14px;\n  width: 150px;\n  height: 40px;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 83px;\n  background: #531a1a;\n}\n\n.dashboard-view,\n.book-a-room-step-one {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 1395px;\n  height: 850px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  background: rgba(217, 217, 217, 0.5);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.5);\n}\n\n.card-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  overflow-y: auto;\n  width: 1250px;\n  height: 700px;\n  flex-shrink: 0;\n}\n\n.book-a-room-step-two {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  width: 1395px;\n  height: 850px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  background: rgba(217, 217, 217, 0.5);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.5);\n}\n\n/* NAVIGATION AREA AT TOP OF EACH VIEW */\n.dashboard-view-nav,\n.book-a-room-one {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: #b7b1b2;\n  height: 75px;\n}\n\n/* BUTTONS DASHBOARD*/\n.upcoming-bookings-btn,\n.past-bookings-btn {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 156px;\n  height: 35px;\n  border: none;\n  border-radius: 83px;\n  margin: 0px 10px 0px 10px;\n  background: #c6a82b;\n  color: #000;\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n}\n\n.upcoming-bookings-btn:focus {\n  background-color: aqua;\n}\n\n.past-bookings-btn:focus {\n  background-color: aqua;\n}\n\n/* BUTTONS BOOK-A-ROOM */\n.single-room,\n.junior-suite,\n.residential,\n.suite,\n.all-room-types {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-shrink: 0;\n  width: 140px;\n  height: 40px;\n  border: none;\n  border-radius: 83px;\n  margin: 0px 10px 0px 10px;\n  background: #c6a82b;\n  color: #000;\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n  flex-shrink: 0;\n}\n\n.all-room-types:focus {\n  background-color: aqua;\n}\n\n.junior-suite:focus {\n  background-color: aqua;\n}\n.suite:focus {\n  background-color: aqua;\n}\n\n.single-room:focus {\n  background-color: aqua;\n}\n\n.residential:focus {\n  background-color: aqua;\n}\n\n.room-details {\n  font-family: 'Roboto', sans-serif;\n  font-size: 14px;\n  line-height: 0.25;\n}\n\n.room-type {\n  font-family: 'Roboto', sans-serif;\n  margin: 6px 0px 3px 0px;\n  font-size: 17px;\n  font-weight: bolder;\n  line-height: 0.5;\n}\n\n.date-booked {\n  font-size: 1em;\n  line-height: 0.5;\n}\n\nform {\n  width: 425px;\n}\n\nfieldset {\n  display: block;\n  width: 375px;\n  font-size: 18px;\n  margin-inline-start: 2px;\n  margin-inline-end: 2px;\n  padding-block-start: 0.35em;\n  padding-inline-start: 0.75em;\n  padding-inline-end: 0.75em;\n  padding-block-end: 0.625em;\n  min-inline-size: min-content;\n  border-width: 2px;\n  border-style: groove;\n  border-color: rgb(192, 192, 192);\n  border-image: initial;\n}\n\n.date-input {\n  font-family: 'Roboto', sans-serif;\n  font-size: 14px;\n  align-items: center;\n  border: none;\n  border-radius: 15px;\n  height: 25px;\n  width: 200px;\n}\n\n.select-a-date {\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px;\n}\n\nlegend {\n  font-family: 'Roboto', sans-serif;\n  font-family: 'Outfit', sans-serif;\n  font-size: 16px;\n}\n\n.room-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  /* background-color: aquamarine; */\n  overflow-y: auto;\n  width: 1250px;\n  height: 725px;\n  flex-shrink: 0;\n}\n\n.rooms-available {\n  height: 15px;\n}\n\n.selected-room {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  width: 703px;\n  height: 659px;\n  flex-shrink: 0;\n  border-radius: 5px;\n  background: rgba(33, 29, 29, 0.2);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.3);\n}\n\n.card-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 325px;\n  height: 325px;\n  flex-shrink: 0;\n  margin: 15px 15px 15px 15px;\n  border-radius: 5px;\n  background: rgba(33, 29, 29, 0.2);\n  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.3);\n}\n\n.single-img-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 587px;\n  height: 342px;\n  flex-shrink: 0;\n  background: #000;\n}\n\n.single-img {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 513px;\n  height: 342px;\n  flex-shrink: 0;\n}\n\n.img-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 300px;\n  height: 200px;\n  flex-shrink: 0;\n  background: rgba(33, 29, 29, 0.2);\n}\n\n.room-img {\n  display: flex;\n  width: 266px;\n  max-height: 178px;\n}\n\n/* BUTTONS-RESERVATION */\n.bookBtn,\n.select-date-btn {\n  width: 110px;\n  height: 25px;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 83px;\n  background: #531a1a;\n  color: #ffffff;\n}\n\n.reservation-message {\n  font-family: 'Roboto', sans-serif;\n  font-size: 18px;\n  font-weight: bolder;\n  font-style: italic;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 8 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 9 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 10 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/village-on-lake.jpg");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook-logo.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/welcome-to-overlook.jpg");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single room.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/junior suite.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/residential suite.jpg");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/suite.jpg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_guest_bookings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _src_new_bookings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _src_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _images_overlook_logo_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _images_village_on_lake_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_welcome_to_overlook_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _images_single_room_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _images_junior_suite_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);
/* harmony import */ var _images_residential_suite_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16);
/* harmony import */ var _images_suite_jpg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
// Do not delete or rename this file ********





// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)








//Query Selectors 👇
const loginView = document.querySelector('.login-view');
const username = document.getElementById('username');
const password = document.getElementById('password');
const dashboardView = document.getElementById('dashboardView');
const bookRoomOne = document.getElementById('bookARoomOne');
const bookRoomTwo = document.getElementById('bookARoomTwo');
const welcomeUser = document.getElementById('welcomeUser');
const totalSpent = document.getElementById('totalSpent');
const cardContainer = document.getElementById('cardContainer');
const roomContainer = document.querySelector('.room-container');
const selectedRoomContainer = document.querySelector('.selected-room');
const openingImage = document.querySelector('.opening-img');
const selectDataForm = document.querySelector('.book-a-room-form');
const roomsAvailMessage = document.getElementById('roomsAvail');
const dateSelected = (document.getElementById('dateOfStay').min = new Date()
  .toISOString()
  .split('T')[0]);

//BUTTONS
const loginBtn = document.querySelector('.login-btn');
const upcomingBookingsBtn = document.getElementById('upcomingBookings');
const pastBookingsBtn = document.getElementById('pastBookings');
const bookRoomBtn = document.getElementById('bookRoomBtn');
const logoutBtn = document.getElementById('logOutBtn');
const dashboardBtn = document.getElementById('dashboard');
const selectDateBtn = document.querySelector('.select-date-btn');
const singleRoom = document.querySelector('.single-room');
const juniorSuite = document.querySelector('.junior-suite');
const residential = document.querySelector('.residential');
const suite = document.querySelector('.suite');
const allRoomTypes = document.querySelector('.all-room-types');

//Global Variables👇
let currentGuest;
let customerData;
let bookingsData;
let roomData;
let selectedRoomType = null;
let searchDate;

//Event Listeners👇
const fetchAllData = () => {
  return Promise.all([(0,_src_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchCustomers)(), (0,_src_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchBookings)(), (0,_src_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchRooms)()])
    .then(data => {
      // Assign data to global variables
      customerData = data[0].customers;
      bookingsData = data[1].bookings;
      roomData = data[2].rooms;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

const removeHiddenClass = elements => {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
  return elements;
};

const addHiddenClass = elements => {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
  return elements;
};

loginBtn.addEventListener('click', event => {
  event.preventDefault();
  const enteredUsername = username.value;
  const enteredPassword = password.value;

  if (!enteredPassword) {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = 'Please enter a password.';
    return;
  }

  const loginResult = verifyLogin(
    enteredUsername,
    enteredPassword,
    customerData
  );

  if (loginResult === true) {
    currentGuest = (0,_src_login__WEBPACK_IMPORTED_MODULE_3__.findGuest)(enteredUsername, enteredPassword, customerData);
    console.log(currentGuest);
    removeHiddenClass([
      dashboardView,
      openingImage,
      cardContainer,
      bookRoomBtn,
      logoutBtn,
      welcomeUser,
      totalSpent,
    ]);
    addHiddenClass([
      loginView,
      bookRoomOne,
      bookRoomTwo,
      selectedRoomContainer,
    ]);

    const guestTotal = (0,_src_guest_bookings__WEBPACK_IMPORTED_MODULE_1__.guestTotalSpent)(currentGuest, bookingsData, roomData);
    totalSpent.textContent = `Your total Spent for PAST Stays is $${guestTotal.toFixed(
      2
    )}`;

    welcomeUser.textContent = `Welcome Back ${currentGuest.name}!`;
  } else {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = loginResult;
  }
});

const verifyLogin = (username, password, customerData) => {
  if (!password) {
    return 'Please enter a password.';
  }

  if (password !== 'overlook2021') {
    return 'Incorrect password. Please try again.';
  }

  const user = (0,_src_login__WEBPACK_IMPORTED_MODULE_3__.findGuest)(username, password, customerData);

  if (user) {
    currentGuest = user;
    console.log(currentGuest);
    return true;
  } else {
    return 'User not found. Please check your username.';
  }
};

upcomingBookingsBtn.addEventListener('click', () => {
  const upcomingBookings = (0,_src_guest_bookings__WEBPACK_IMPORTED_MODULE_1__.guestComingBookings)(
    currentGuest,
    bookingsData,
    roomData
  );
  addHiddenClass([openingImage]);

  if (upcomingBookings.length === 0) {
    cardContainer.innerHTML += `<div class="display-message">
    <h3>You Have Not Booked Any Upcoming Visits Yet.</h3>
    </div>`;
  } else {
    displayBookings(upcomingBookings, roomData);
  }
});

pastBookingsBtn.addEventListener('click', () => {
  const pastBookings = (0,_src_guest_bookings__WEBPACK_IMPORTED_MODULE_1__.guestPastBookings)(currentGuest, bookingsData, roomData);
  addHiddenClass([openingImage]);
  displayBookings(pastBookings, roomData);
});

logoutBtn.addEventListener('click', () => {
  location.reload();
});

bookRoomBtn.addEventListener('click', () => {
  document.getElementById('dateOfStay').value = '';
  roomContainer.innerHTML = '';
  selectedRoomType = null;

  removeHiddenClass([bookRoomOne, logoutBtn, dashboardBtn]);
  addHiddenClass([
    cardContainer,
    bookRoomBtn,
    welcomeUser,
    totalSpent,
    dashboardView,
    selectedRoomContainer,
  ]);
});

singleRoom.addEventListener('click', () => {
  selectedRoomType = 'single room';
  displaySearchResults();
});

juniorSuite.addEventListener('click', () => {
  selectedRoomType = 'junior suite';
  displaySearchResults();
});

residential.addEventListener('click', () => {
  selectedRoomType = 'residential suite';
  displaySearchResults();
});

suite.addEventListener('click', () => {
  selectedRoomType = 'suite';
  displaySearchResults();
});

allRoomTypes.addEventListener('click', () => {
  selectedRoomType = null;
  displaySearchResults();
});

dashboardBtn.addEventListener('click', () => {
  cardContainer.innerHTML = `<img class="opening-img "src="./images/welcome-to-overlook.jpg" alt="overlook-hotel-from-across-the-lake"/>`;
  roomsAvailMessage.textContent = '';
  removeHiddenClass([
    openingImage,
    dashboardView,
    cardContainer,
    bookRoomBtn,
    welcomeUser,
    totalSpent,
  ]);
  addHiddenClass([
    loginView,
    bookRoomOne,
    bookRoomTwo,
    roomContainer,
    selectedRoomContainer,
    dashboardBtn,
  ]);
});

// Call fetchAllData when the page loads
window.addEventListener('load', () => {
  fetchAllData()
    .then(() => {
      if (currentGuest) {
        displayBookings(bookingsData, roomData);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function displayBookings(bookings, roomData) {
  cardContainer.innerHTML = '';
  bookings.forEach(booking => {
    const roomDetails = (0,_src_guest_bookings__WEBPACK_IMPORTED_MODULE_1__.bookingsByRoomByGuest)(
      currentGuest,
      bookingsData,
      roomData
    ).filter(item => item.date === booking.date);

    if (roomDetails) {
      roomDetails.forEach(booking => {
        cardContainer.innerHTML += `
      <div class="card-wrapper"> 
        <div class="img-wrapper">
          <img class="room-img" src="./images/${
            booking.room.roomType
          }.jpg" alt="${booking.room.roomType}" />
        </div>
        <div class="card room-details-wrapper">
        <h3 class="room-type">${booking.room.roomType.toUpperCase()}</h3>
        <h3 class="date-booked">Date: ${new Date(
          booking.date
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}</h3>
        <h4 class="room-details room-number">Room Number: ${
          booking.room.number
        }</h4>
        <h4 class="room-details">${booking.room.numBeds} ${
          booking.room.bedSize
        } bed(s)</h4>
        <h4 class="room-details room-cost">Cost Per Night: $${
          booking.room.costPerNight
        }</h4>
      </div>
    </div>`;
      });
    }
  });
}

selectDataForm.addEventListener('submit', event => {
  event.preventDefault();
  displaySearchResults();
});

function displaySearchResults() {
  const searchDateValue = document.getElementById('dateOfStay').value;

  if (!searchDateValue) {
    roomContainer.innerHTML = `
      <div class="no-date-selected-message">
        <p class="no-dates-match">Please Select A Date</p>
      </div>`;
    return;
  }

  searchDate = searchDateValue.replaceAll('-', '/');

  let filteredRooms = (0,_src_new_bookings__WEBPACK_IMPORTED_MODULE_2__.allAvailableRooms)(roomData, bookingsData, searchDate);

  removeHiddenClass([roomsAvailMessage]);
  roomsAvailMessage.textContent = `There are ${filteredRooms.length} rooms available!`;

  if (selectedRoomType !== null) {
    filteredRooms = filteredRooms.filter(
      room => room.roomType === selectedRoomType
    );
  }

  if (filteredRooms.length === 0) {
    roomContainer.innerHTML = `
      <div class="no-rooms-available-message">
        <p class="no-rooms-match">No Rooms Available</p>
      </div>`;
    cardContainer.classList.add('hidden');
    roomContainer.classList.remove('hidden');
  } else {
    cardContainer.classList.add('hidden');
    roomContainer.classList.remove('hidden');

    roomContainer.innerHTML = '';

    filteredRooms.forEach(room => {
      roomContainer.innerHTML += `
        <div class="card-wrapper" data-room-number="${room.number}"> 
          <div class="img-wrapper">
            <img class="room-img" src="./images/${room.roomType}.jpg" alt="${
        room.roomType
      }" />
          </div>
          <div class="card room-details-wrapper">
          <h3 class="room-type">${room.roomType.toUpperCase()}</h3>
          <h3 class="room-number room-details">Room Number: ${room.number}</h3>
          <h4 class="bedsize room-details">Bedsize: ${room.bedSize}</h4>
          <h4 class="num-beds room-details">Number of Beds: ${room.numBeds}</h4>
          <button class="bookBtn">Book Now!</button>
          </div>
        </div>`;
    });
  }
}

roomContainer.addEventListener('click', event => {
  if (event.target.classList.contains('bookBtn')) {
    handleRoomBooking(event);
  }
});

const handleRoomBooking = event => {
  const roomCard = event.target.closest('.card-wrapper');
  const roomNumber = parseInt(roomCard.dataset.roomNumber); // Assuming you set a "data-room-number" attribute in your HTML
  const selectedRoom = roomData.find(room => room.number === roomNumber);
  if (selectedRoom) {
    displaySelectedBooking(selectedRoom);
  }
};

const displaySelectedBooking = selectedRoom => {
  addHiddenClass([bookRoomOne]);
  removeHiddenClass([bookRoomTwo, selectedRoomContainer]);
  // Clear the content of selectedRoomContainer
  selectedRoomContainer.innerHTML = '';
  //fill the content of selectedRoomContainer
  selectedRoomContainer.innerHTML = `
    <article class="selected-room">
      <div class="single-img-wrapper">
        <img class="single-img" src="./images/${
          selectedRoom.roomType
        }.jpg" alt="hotel room image">
      </div>
      <div class="single-card-main-wrapper">
        <div class="single-card-text-wrapper">
          <h2 class="card-booking-text">We Look Forward to Your Visit!</h2>
          <h3 class="date-booked">Date: ${new Date(
            searchDate
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}</h3>
          <p class="card-booking-text roomType">${selectedRoom.roomType[0].toUpperCase()}${selectedRoom.roomType.substring(
    1
  )} with ${selectedRoom.numBeds} ${selectedRoom.bedSize} sized bed(s)</p>
          <p class="card-booking-text roomNumber">Room Number: ${
            selectedRoom.number
          }</p>
          <p class="card-booking-text roomCost" id="${
            selectedRoom.number
          }">Cost Per Night: $${selectedRoom.costPerNight}</p>
          <p class="reservation-message hidden">Thank you ${currentGuest.name}! 
          Your Reservation has been booked.</p>
          <button class="reserve bookBtn" id="${
            selectedRoom.number
          }">Reserve Now</button>
          </div>
      </div>
    </article>`;

  const reserveButton = selectedRoomContainer.querySelector('.reserve.bookBtn');
  reserveButton.addEventListener('click', () => {
    handleReservation(selectedRoom, searchDate);
  });
};

const handleReservation = (selectedRoom, searchDate) => {
  const bookingData = {
    userID: currentGuest.id,
    date: searchDate,
    roomNumber: selectedRoom.number,
  };
  const reserveButton = selectedRoomContainer.querySelector('.reserve');
  reserveButton.classList.add('hidden');

  const reservationMessage = selectedRoomContainer.querySelector(
    '.reservation-message'
  );
  reservationMessage.classList.remove('hidden');

  (0,_src_apiCalls__WEBPACK_IMPORTED_MODULE_0__.sendBookingToServer)(bookingData)
    .then(() => {
      return (0,_src_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchBookings)();
    })
    .then(data => {
      bookingsData = data.bookings;
    })
    .catch(error => {
      console.error('Error in handleReservation:', error);
    });
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map