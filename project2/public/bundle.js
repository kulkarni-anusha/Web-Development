/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   POLL_INTERVAL: () => (/* binding */ POLL_INTERVAL),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Unable to connect to the chat server. Please check your internet connection and try again.'), SERVER.AUTH_INSUFFICIENT, 'The username "dog" is not permitted. Please choose a different username.'), SERVER.REQUIRED_USERNAME, 'Please enter a username containing only letters, numbers, and underscores.'), SERVER.REQUIRED_MESSAGE, 'Your message cannot be empty. Please type something before sending.'), SERVER.AUTH_MISSING, 'Your session has expired. Please log in again.'), "default", 'An unexpected error occurred. Please try again or refresh the page.');
var POLL_INTERVAL = 5000;

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbilityToLogin: () => (/* binding */ addAbilityToLogin),
/* harmony export */   addAbilityToLogout: () => (/* binding */ addAbilityToLogout),
/* harmony export */   addAbilityToSelectChannel: () => (/* binding */ addAbilityToSelectChannel),
/* harmony export */   addAbilityToSelectDM: () => (/* binding */ addAbilityToSelectDM),
/* harmony export */   addAbilityToSendMessage: () => (/* binding */ addAbilityToSendMessage),
/* harmony export */   initializeApp: () => (/* binding */ initializeApp)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var pollIntervalId;
function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login-form')) {
      return;
    }
    e.preventDefault();
    var username = appEl.querySelector('.login-username').value.trim();
    if (!username) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('required-username');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    var loadingEl = showLoading(appEl);
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (_ref2) {
      var messages = _ref2.messages,
        users = _ref2.users;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(users);
      setTimeout(function () {
        hideLoading(loadingEl);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        startPolling({
          state: state,
          appEl: appEl
        });
      }, 1000);
    })["catch"](function (err) {
      setTimeout(function () {
        hideLoading(loadingEl);
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      }, 1000);
    });
  });
}
function showLoading(appEl) {
  var loadingEl = document.createElement('div');
  loadingEl.className = 'loader-container';
  loadingEl.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loadingEl);
  return loadingEl;
}
function hideLoading(loadingEl) {
  if (document.body.contains(loadingEl)) {
    document.body.removeChild(loadingEl);
  }
}
function addAbilityToLogout(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls-logout')) {
      return;
    }
    stopPolling();
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function createMessageData(state, text) {
  return {
    text: text,
    channel: state.currentChannel || 'announcements',
    isDM: !!state.currentDM,
    recipient: state.currentDM
  };
}
function handleMessageSuccess(message, messageInput, state, appEl) {
  messageInput.value = '';
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.addMessage)(message);
  state.error = '';
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
    state: state,
    appEl: appEl
  });
}
function handleMessageError(err, state, appEl) {
  if ((err === null || err === void 0 ? void 0 : err.error) === 'required-message') {
    state.error = 'Message cannot be empty, please enter your message';
  } else {
    state.error = (err === null || err === void 0 ? void 0 : err.error) || 'ERROR';
  }
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
    state: state,
    appEl: appEl
  });
}
function addAbilityToSendMessage(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('message-form')) {
      return;
    }
    e.preventDefault();
    var messageInput = appEl.querySelector('.message-form-input');
    var text = messageInput.value.trim();
    var messageData = createMessageData(state, text);
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSendMessage)(messageData).then(function (message) {
      return handleMessageSuccess(message, messageInput, state, appEl);
    })["catch"](function (err) {
      return handleMessageError(err, state, appEl);
    });
  });
}
function addAbilityToSelectChannel(_ref5) {
  var state = _ref5.state,
    appEl = _ref5.appEl;
  appEl.addEventListener('click', function (e) {
    var channelItem = e.target.closest('.channel-item');
    if (!channelItem) {
      return;
    }
    var channelId = channelItem.dataset.channelId;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setChannel)(channelId);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
  });
}
function addAbilityToSelectDM(_ref6) {
  var state = _ref6.state,
    appEl = _ref6.appEl;
  appEl.addEventListener('click', function (e) {
    var userItem = e.target.closest('.user-item');
    if (!userItem) {
      return;
    }
    var username = userItem.dataset.username;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setDirectMessage)(username);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
  });
}
function startPolling(_ref7) {
  var state = _ref7.state,
    appEl = _ref7.appEl;
  pollIntervalId = setInterval(function () {
    Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)()]).then(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
        messages = _ref9[0],
        users = _ref9[1];
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(users);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  }, _constants__WEBPACK_IMPORTED_MODULE_3__.POLL_INTERVAL);
}
function stopPolling() {
  clearInterval(pollIntervalId);
}
function initializeApp(_ref10) {
  var state = _ref10.state,
    appEl = _ref10.appEl;
  addAbilityToLogin({
    state: state,
    appEl: appEl
  });
  addAbilityToLogout({
    state: state,
    appEl: appEl
  });
  addAbilityToSendMessage({
    state: state,
    appEl: appEl
  });
  addAbilityToSelectChannel({
    state: state,
    appEl: appEl
  });
  addAbilityToSelectDM({
    state: state,
    appEl: appEl
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  if (state.isInitialLoading) {
    var _html = generateLoadingSpinnerHtml('Checking session...');
    appEl.innerHTML = _html;
    return;
  }
  var html = "\n    ".concat(state.isLoggedIn ? '' : generateStatusHtml(state), "\n    ").concat(generateLoginHtml(state), "\n    ").concat(generateContentHtml(state), "\n  ");
  appEl.innerHTML = html;
  if (state.error) {
    var messageFormContainer = appEl.querySelector('.message-form-container');
    if (messageFormContainer) {
      var errorHtml = "<div class=\"message-error\">".concat(state.error, "</div>");
      messageFormContainer.insertAdjacentHTML('afterbegin', errorHtml);
    }
  }
  if (state.lastMessageId) {
    var messagesContainer = appEl.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}
function generateLoadingSpinnerHtml(text) {
  return "\n    <div class=\"loading-spinner\" id=\"loadingSpinner\">\n      <div class=\"loading-spinner-text\">".concat(text, "</div>\n    </div>\n  ");
}
function generateStatusHtml(state) {
  return "\n    <div class=\"status\">".concat(state.error, "</div>\n  ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login\">\n        <h1 class=\"login-title\">Chat Application</h1>\n        <div class=\"login-waiting\">\n          ".concat(generateLoadingSpinnerHtml('Loading user data...'), "\n        </div>\n      </div>\n    ");
  }
  if (state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"login\">\n      <h1 class=\"login-title\">Chat Application</h1>\n      <div class=\"login-error\">".concat(state.error, "</div>\n      <form class=\"login-form\" action=\"#login\">\n        <label>\n          <div>Username:</div>\n          <input class=\"login-username\" placeholder=\"Enter your username\" value=\"\">\n        </label>\n        <button class=\"login-button\" type=\"submit\">Login</button>\n      </form>\n    </div>\n  ");
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isMessagesPending || state.isUsersPending) {
    return "\n      <div class=\"content-container\">\n        <div class=\"content-card\">\n          ".concat(generateLoadingSpinnerHtml('Loading workspace...'), "\n        </div>\n      </div>\n    ");
  }
  return "\n    <div class=\"content-container\">\n      <div class=\"content-card\">\n        <div class=\"content\">\n          ".concat(generateSidebarHtml(state), "\n          ").concat(generateChatHtml(state), "\n        </div>\n      </div>\n    </div>\n  ");
}
function generateSidebarHtml(state) {
  return "\n    <div class=\"sidebar\">\n      <div class=\"sidebar-header\">\n        <h2>Workspace</h2>\n        <div class=\"user-status\">\n          <div class=\"status-indicator online\"></div>\n          ".concat(state.username, "\n        </div>\n      </div>\n      \n      ").concat(generateChannelsHtml(state), "\n      ").concat(generateUsersHtml(state), "\n    </div>\n  ");
}
function generateChannelsHtml(state) {
  var channels = state.channels || [{
    id: 'announcements',
    name: 'announcements'
  }, {
    id: 'questions',
    name: 'questions'
  }];
  var channelsHtml = channels.map(function (channel) {
    var isActive = state.currentChannel === channel.id;
    return "\n      <li class=\"channel-item ".concat(isActive ? 'active' : '', "\" data-channel-id=\"").concat(channel.id, "\">\n        <div class=\"channel-icon\">#</div>\n        ").concat(channel.name, "\n      </li>\n    ");
  }).join('');
  return "\n    <div class=\"channels-panel\">\n      <h3 class=\"sidebar-section-title\">Channels</h3>\n      <ul class=\"channels-list\">\n        ".concat(channelsHtml || '<li class="user-item">No channels available</li>', "\n      </ul>\n    </div>\n  ");
}
function generateUsersHtml(state) {
  if (state.isUsersPending) {
    return "\n      <div class=\"users-panel\">\n        <h3 class=\"sidebar-section-title\">Direct Messages</h3>\n        <div class=\"users-waiting\">\n          <div class=\"loading-spinner\" style=\"position: relative; height: 50px; background-color: transparent;\">\n            <div class=\"loading-spinner-text\" style=\"margin-top: 60px;\">Loading users...</div>\n          </div>\n        </div>\n      </div>\n    ";
  }
  var usersHtml = state.users.map(function (username) {
    var isActive = state.currentDM === username;
    return "\n      <li class=\"user-item ".concat(isActive ? 'active' : '', "\" data-username=\"").concat(username, "\">\n        <div class=\"user-icon\">\n          <div class=\"status-indicator online\"></div>\n        </div>\n        ").concat(username, "\n      </li>\n    ");
  }).join('');
  return "\n    <div class=\"users-panel\">\n      <p class=\"sidebar-section-title\">Direct Messages</p>\n      <ul class=\"users-list\">\n        ".concat(usersHtml || '<li class="user-item">No users online</li>', "\n      </ul>\n    </div>\n  ");
}
function generateChatHtml(state) {
  var chatTitle = '';
  var chatType = '';
  if (state.currentDM) {
    chatTitle = state.currentDM;
    chatType = 'dm';
  } else {
    chatTitle = "#".concat(state.currentChannel);
    chatType = 'channel';
  }
  var messagesHtml = state.isMessagesPending ? "<div class=\"messages-waiting\">Loading messages...</div>" : generateMessagesHtml(state);
  return "\n    <div class=\"chat-panel\">\n      ".concat(generateControlsHtml(state, chatTitle, chatType), "\n      <div class=\"messages\">\n        ").concat(messagesHtml, "\n      </div>\n      ").concat(generateMessageFormHtml(state), "\n    </div>\n  ");
}
function generateControlsHtml(state, chatTitle, chatType) {
  return "\n    <div class=\"controls\">\n      <div class=\"controls-chat-info\">\n        <p class=\"controls-title\">".concat(chatTitle, "</p>\n        <div class=\"controls-subtitle\">").concat(chatType === 'dm' ? 'Direct Message' : 'Channel', "</div>\n      </div>\n      <button class=\"controls-logout\">Logout</button>\n    </div>\n  ");
}

// function generateMessagesHtml(state) {
//   if (state.isMessagesPending) {
//     return `
//       <div class="messages-waiting">
//         <div class="loading-spinner" style="position: relative; height: 100px; background-color: transparent;">
//           <div class="loading-spinner-text">Loading messages...</div>
//         </div>
//       </div>
//     `;
//   }

//   if (!state.filteredMessages || !state.filteredMessages.length) {
//     return `<div class="messages-empty">No messages yet. Start the conversation!</div>`;
//   }

//   return state.filteredMessages.map(message => {
//     const isCurrentUser = message.username === state.username;
//     const messageClass = isCurrentUser ? 'message-self' : 'message-other';
//     const isNewClass = message.id === state.lastMessageId ? 'message-new' : '';

//     return `
//       <div class="message ${messageClass} ${isNewClass}">
//         <div class="message-content">
//           <div class="message-username">${message.username}</div>
//           <div class="message-text">${message.text}</div>
//           <div class="message-time">${formatTime(message.timestamp)}</div>
//         </div>
//       </div>
//     `;
//   }).join('');
// }

function generateLoadingMessages() {
  return "\n    <div class=\"messages-waiting\">\n      <div class=\"loading-spinner\" style=\"position: relative; height: 100px; background-color: transparent;\">\n        <div class=\"loading-spinner-text\">Loading messages...</div>\n      </div>\n    </div>\n  ";
}
function generateEmptyMessages() {
  return "<div class=\"messages-empty\">No messages yet. Start the conversation!</div>";
}
function generateMessageHtml(message, state) {
  var isCurrentUser = message.username === state.username;
  var messageClass = isCurrentUser ? 'message-self' : 'message-other';
  var isNewClass = message.id === state.lastMessageId ? 'message-new' : '';
  return "\n    <div class=\"message ".concat(messageClass, " ").concat(isNewClass, "\">\n      <div class=\"message-content\">\n        <div class=\"message-username\">").concat(message.username, "</div>\n        <div class=\"message-text\">").concat(message.text, "</div>\n        <div class=\"message-time\">").concat(formatTime(message.timestamp), "</div>\n      </div>\n    </div>\n  ");
}
function generateMessagesHtml(state) {
  if (state.isMessagesPending) {
    return generateLoadingMessages();
  }
  if (!state.filteredMessages || !state.filteredMessages.length) {
    return generateEmptyMessages();
  }
  return state.filteredMessages.map(function (message) {
    return generateMessageHtml(message, state);
  }).join('');
}
function generateMessageFormHtml(state) {
  var placeholder = state.currentDM ? "Message ".concat(state.currentDM) : "Message #".concat(state.currentChannel);
  var errorMessage = state.error === 'required-message' ? "<div class=\"message-error\">Message cannot be empty, please enter your message</div>" : '';
  return "\n    <div class=\"message-form-container\">\n      ".concat(errorMessage, "\n      <form class=\"message-form\" action=\"#send\">\n        <input class=\"message-form-input\" placeholder=\"").concat(placeholder, "\">\n        <button class=\"message-form-button\" type=\"submit\">Send</button>\n      </form>\n    </div>\n  ");
}
function formatTime(timestamp) {
  var date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchSendMessage: () => (/* binding */ fetchSendMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch('/api/v1/messages')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsers() {
  return fetch('/api/v1/users')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSendMessage(messageData) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageData)
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    if (response.status === 400) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return Promise.reject({
      error: 'unknownError'
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMessage: () => (/* binding */ addMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   filterMessages: () => (/* binding */ filterMessages),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setChannel: () => (/* binding */ setChannel),
/* harmony export */   setDirectMessage: () => (/* binding */ setDirectMessage),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setUsers: () => (/* binding */ setUsers),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin),
/* harmony export */   waitOnMessages: () => (/* binding */ waitOnMessages),
/* harmony export */   waitOnUsers: () => (/* binding */ waitOnUsers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  messages: [],
  filteredMessages: [],
  users: [],
  channels: [{
    id: 'announcements',
    name: 'announcements'
  }, {
    id: 'questions',
    name: 'questions'
  }],
  isLoggedIn: false,
  isLoginPending: false,
  isMessagesPending: false,
  isUsersPending: false,
  isInitialLoading: true,
  username: '',
  lastMessageId: '',
  currentChannel: 'announcements',
  currentDM: null,
  lastSeenMessageIds: {},
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.filteredMessages = [];
  state.users = [];
  state.error = '';
  state.currentChannel = 'announcements';
  state.currentDM = null;
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
  state.lastMessageId = '';
  state.currentChannel = 'announcements';
  state.currentDM = null;
  filterMessages();
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.filteredMessages = [];
  state.users = [];
  state.error = '';
  state.lastMessageId = '';
  state.currentChannel = 'announcements';
  state.currentDM = null;
  state.isInitialLoading = false;
}
function waitOnMessages() {
  state.isMessagesPending = true;
  state.error = '';
}
function waitOnUsers() {
  state.isUsersPending = true;
  state.error = '';
}
function setMessages(messages) {
  state.messages = messages;
  state.isMessagesPending = false;
  state.error = '';
  filterMessages();
}
function setUsers(users) {
  state.users = users;
  state.isUsersPending = false;
  state.error = '';
}
function addMessage(message) {
  state.messages.push(message);
  state.lastMessageId = message.id;
  state.error = '';
  filterMessages();
}
function setChannel(channelId) {
  state.currentChannel = channelId;
  state.currentDM = null;
  filterMessages();
}
function setDirectMessage(username) {
  state.currentDM = username;
  state.currentChannel = null;
  filterMessages();
}
function filterMessages() {
  if (state.currentDM) {
    state.filteredMessages = state.messages.filter(function (message) {
      return message.isDM && (message.username === state.username && message.recipient === state.currentDM || message.username === state.currentDM && message.recipient === state.username);
    });
  } else {
    state.filteredMessages = state.messages.filter(function (message) {
      return !message.isDM && message.channel === state.currentChannel;
    });
  }
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.isMessagesPending = false;
  state.isUsersPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var appEl = document.querySelector('#app');
function showFullPageLoader() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading application...';
  var loadingEl = document.createElement('div');
  loadingEl.className = 'loading-spinner';
  loadingEl.innerHTML = "\n    <div class=\"loading-spinner-text\">".concat(text, "</div>\n  ");
  document.body.appendChild(loadingEl);
  return loadingEl;
}
function hideFullPageLoader(loadingEl) {
  if (loadingEl) {
    loadingEl.classList.add('hidden');
    setTimeout(function () {
      document.body.removeChild(loadingEl);
    }, 500);
  }
}
function handleSessionSuccess(session) {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
  return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)()]);
}
function handleDataLoaded(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    messages = _ref2[0],
    users = _ref2[1];
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(users);
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
}
function handleSessionError(err) {
  if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION || (err === null || err === void 0 ? void 0 : err.error) === 'auth-missing') {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
  } else {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
  }
  (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
}
function initializeAppState() {
  var initialLoader = showFullPageLoader('Checking session...');
  _state__WEBPACK_IMPORTED_MODULE_1__["default"].isInitialLoading = true;
  return initialLoader;
}
function initApp() {
  var initialLoader = initializeAppState();
  (0,_listeners__WEBPACK_IMPORTED_MODULE_4__.initializeApp)({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
  setTimeout(function () {
    hideFullPageLoader(initialLoader);
    _state__WEBPACK_IMPORTED_MODULE_1__["default"].isInitialLoading = false;
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(handleSessionSuccess).then(handleDataLoaded)["catch"](handleSessionError);
  }, 1000);
}
initApp();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map