/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views.js */ \"./src/views.js\");\n/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services.js */ \"./src/services.js\");\n\n\n\nvar clientState = {\n  username: null,\n  errorMessage: null,\n  secretErrorMessage: null\n};\nfunction render() {\n  var appEl = document.getElementById('app');\n  if (clientState.errorMessage) {\n    var friendlyError = _services_js__WEBPACK_IMPORTED_MODULE_1__.MESSAGES[clientState.errorMessage] || clientState.errorMessage;\n    appEl.innerHTML = (0,_views_js__WEBPACK_IMPORTED_MODULE_0__.errorView)(friendlyError);\n    return;\n  }\n  if (clientState.username) {\n    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.getSecret)().then(function (_ref) {\n      var username = _ref.username,\n        storedWord = _ref.storedWord;\n      var friendlySecretError = clientState.secretErrorMessage ? _services_js__WEBPACK_IMPORTED_MODULE_1__.MESSAGES[clientState.secretErrorMessage] || clientState.secretErrorMessage : null;\n      appEl.innerHTML = (0,_views_js__WEBPACK_IMPORTED_MODULE_0__.showSecret)(username, storedWord, friendlySecretError);\n      clientState.secretErrorMessage = null;\n    })[\"catch\"](function (err) {\n      if (err.error === 'auth-missing') {\n        clientState.username = null;\n        render();\n      } else {\n        clientState.errorMessage = err.error;\n        render();\n      }\n    });\n  } else {\n    var _friendlyError = clientState.errorMessage ? _services_js__WEBPACK_IMPORTED_MODULE_1__.MESSAGES[clientState.errorMessage] || clientState.errorMessage : null;\n    appEl.innerHTML = (0,_views_js__WEBPACK_IMPORTED_MODULE_0__.loginView)(_friendlyError);\n    clientState.errorMessage = null;\n  }\n}\nfunction pageLoad() {\n  (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.checkSession)().then(function (_ref2) {\n    var username = _ref2.username;\n    clientState.username = username;\n    render();\n  })[\"catch\"](function () {\n    render();\n  });\n}\npageLoad();\ndocument.addEventListener('click', function (e) {\n  if (e.target.id === 'login-button') {\n    e.preventDefault();\n    var username = document.getElementById('username').value;\n    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (_ref3) {\n      var username = _ref3.username;\n      clientState.username = username;\n      clientState.errorMessage = null;\n      render();\n    })[\"catch\"](function (err) {\n      clientState.errorMessage = err.error;\n      render();\n    });\n  }\n  if (e.target.id === 'update-button') {\n    e.preventDefault();\n    var word = document.getElementById('secret-input').value;\n    if (!word.trim()) {\n      clientState.secretErrorMessage = 'required-word';\n      render();\n      return;\n    }\n    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.putSecret)(word).then(function () {\n      clientState.secretErrorMessage = null;\n      render();\n    })[\"catch\"](function (err) {\n      clientState.secretErrorMessage = err.error;\n      render();\n    });\n  }\n  if (e.target.id === 'logout-button') {\n    (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {\n      clientState.username = null;\n      clientState.errorMessage = null;\n      clientState.secretErrorMessage = null;\n      render();\n    })[\"catch\"](function (err) {\n      clientState.errorMessage = err.error;\n      render();\n    });\n  }\n  if (e.target.id === 'home-link') {\n    e.preventDefault();\n    clientState.errorMessage = null;\n    render();\n  }\n});\n\n//# sourceURL=webpack://08-js-service-calls/./src/index.js?");

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),\n/* harmony export */   checkSession: () => (/* binding */ checkSession),\n/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),\n/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),\n/* harmony export */   getSecret: () => (/* binding */ getSecret),\n/* harmony export */   putSecret: () => (/* binding */ putSecret)\n/* harmony export */ });\nvar MESSAGES = {\n  'network-error': 'Unable to connect to the server. Please try again.',\n  'required-username': 'Username is required and must be alphanumeric.',\n  'auth-insufficient': 'Username \"dog\" is not allowed.',\n  'auth-missing': 'You must be logged in to access this page.',\n  'required-word': 'You must enter a word to update your secret.',\n  'invalid-word': 'The word must contain only letters.'\n};\nfunction fetchLogin(username) {\n  return fetch('/api/session', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      username: username\n    })\n  })[\"catch\"](function () {\n    return Promise.reject({\n      error: 'network-error'\n    });\n  }).then(function (response) {\n    if (!response.ok) {\n      return response.json().then(function (err) {\n        return Promise.reject(err);\n      });\n    }\n    return response.json();\n  });\n}\nfunction checkSession() {\n  return fetch('/api/session')[\"catch\"](function () {\n    return Promise.reject({\n      error: 'network-error'\n    });\n  }).then(function (response) {\n    if (!response.ok) {\n      return response.json().then(function (err) {\n        return Promise.reject(err);\n      });\n    }\n    return response.json();\n  });\n}\nfunction getSecret() {\n  return fetch('/api/word')[\"catch\"](function () {\n    return Promise.reject({\n      error: 'network-error'\n    });\n  }).then(function (response) {\n    if (!response.ok) {\n      return response.json().then(function (err) {\n        return Promise.reject(err);\n      });\n    }\n    return response.json();\n  });\n}\nfunction putSecret(word) {\n  return fetch('/api/word', {\n    method: 'PUT',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      word: word\n    })\n  })[\"catch\"](function () {\n    return Promise.reject({\n      error: 'network-error'\n    });\n  }).then(function (response) {\n    if (!response.ok) {\n      return response.json().then(function (err) {\n        return Promise.reject(err);\n      });\n    }\n    return response.json();\n  });\n}\nfunction fetchLogout() {\n  return fetch('/api/session', {\n    method: 'DELETE'\n  })[\"catch\"](function () {\n    return Promise.reject({\n      error: 'network-error'\n    });\n  }).then(function (response) {\n    if (!response.ok) {\n      return response.json().then(function (err) {\n        return Promise.reject(err);\n      });\n    }\n    return response.json();\n  });\n}\n\n//# sourceURL=webpack://08-js-service-calls/./src/services.js?");

/***/ }),

/***/ "./src/views.js":
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   errorView: () => (/* binding */ errorView),\n/* harmony export */   loginView: () => (/* binding */ loginView),\n/* harmony export */   showSecret: () => (/* binding */ showSecret)\n/* harmony export */ });\nfunction loginView(errorMessage) {\n  return \"\\n    <div class=\\\"login-form\\\">\\n      <h1 class=\\\"heading\\\">Secret Word App</h1> \\n      \".concat(errorMessage ? \"<p class=\\\"error-message\\\">\".concat(errorMessage, \"</p>\") : '', \"\\n      <form id=\\\"login-form\\\">\\n        <label for=\\\"username\\\" class=\\\"form-label\\\">Enter your username:</label>\\n        <input type=\\\"text\\\" id=\\\"username\\\" class=\\\"text-input\\\" placeholder=\\\"Username\\\" required>\\n        <button id=\\\"login-button\\\" class=\\\"button\\\">Login</button>\\n      </form>\\n    </div>\\n  \");\n}\nfunction showSecret(username, word, errorMessage) {\n  return \"\\n    <div class=\\\"main-content\\\">\\n      <button id=\\\"logout-button\\\" class=\\\"button\\\">Logout</button>\\n      <h1 class=\\\"heading\\\">Welcome to Your Dashboard</h1> \\n      <div class=\\\"username\\\">Hello, \".concat(username, \"!</div>\\n      \").concat(errorMessage ? \"<p class=\\\"error-message\\\">\".concat(errorMessage, \"</p>\") : '', \"\\n      <div class=\\\"secret-word\\\">\\n        <p>Your secret word is:</p>\\n        <p class=\\\"secret\\\">\").concat(word || 'No secret set', \"</p>\\n      </div>\\n      <form id=\\\"secret-form\\\" class=\\\"secret-form\\\">\\n        <input type=\\\"text\\\" id=\\\"secret-input\\\" class=\\\"text-input\\\" placeholder=\\\"Update your secret\\\">\\n        <button id=\\\"update-button\\\" class=\\\"button\\\">Update</button>\\n      </form>\\n    </div>\\n  \");\n}\nfunction errorView(errorMessage) {\n  return \"\\n    <div class=\\\"error-content\\\">\\n      <p class=\\\"error-message\\\">Error: \".concat(errorMessage, \"</p>\\n      <a href=\\\"/\\\" id=\\\"home-link\\\" class=\\\"button\\\">Back</a>\\n    </div>\\n  \");\n}\n\n//# sourceURL=webpack://08-js-service-calls/./src/views.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;