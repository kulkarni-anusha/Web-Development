/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   clearCart: () => (/* binding */ clearCart),
/* harmony export */   getCartTotal: () => (/* binding */ getCartTotal),
/* harmony export */   getTotalItems: () => (/* binding */ getTotalItems),
/* harmony export */   products: () => (/* binding */ products),
/* harmony export */   state: () => (/* binding */ state),
/* harmony export */   toggleCart: () => (/* binding */ toggleCart),
/* harmony export */   updateQuantity: () => (/* binding */ updateQuantity)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var products = {
  jorts: {
    id: 'jorts',
    name: 'Jorts',
    price: 0.99,
    image: 'http://placehold.co/150x150?text=Jorts'
  },
  jean: {
    id: 'jean',
    name: 'Jean',
    price: 3.14,
    image: 'http://placehold.co/150x150?text=Jean'
  },
  nyancat: {
    id: 'nyancat',
    name: 'Nyancat',
    price: 2.73,
    image: 'http://placehold.co/150x150?text=Nyancat'
  }
};
var state = {
  cart: {},
  isCartVisible: false
};
var addToCart = function addToCart(productId) {
  if (!state.cart[productId]) {
    state.cart[productId] = 1;
  } else {
    state.cart[productId] += 1;
  }
};
var updateQuantity = function updateQuantity(productId, quantity) {
  var newQuantity = parseInt(quantity, 10);
  if (newQuantity > 0) {
    state.cart[productId] = newQuantity;
  } else {
    delete state.cart[productId];
  }
};
var clearCart = function clearCart() {
  state.cart = {};
};
var toggleCart = function toggleCart() {
  state.isCartVisible = !state.isCartVisible;
};
var getCartTotal = function getCartTotal() {
  return Object.entries(state.cart).reduce(function (total, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      productId = _ref2[0],
      quantity = _ref2[1];
    return total + products[productId].price * quantity;
  }, 0);
};
var getTotalItems = function getTotalItems() {
  return Object.values(state.cart).reduce(function (sum, quantity) {
    return sum + quantity;
  }, 0);
};


/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCart: () => (/* binding */ renderCart),
/* harmony export */   renderProducts: () => (/* binding */ renderProducts)
/* harmony export */ });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/model.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var renderProducts = function renderProducts() {
  var productsSection = document.getElementById('products-section');
  productsSection.innerHTML = Object.values(_model_js__WEBPACK_IMPORTED_MODULE_0__.products).map(function (product) {
    return "\n      <article class=\"product-card\">\n        <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" class=\"product-image\">\n        <div class=\"product-details\">\n          <h2>").concat(product.name, "</h2>\n          <p class=\"product-price\">$").concat(product.price.toFixed(2), "</p>\n          <button class=\"button add-to-cart-btn\" data-action=\"add-to-cart\" data-product-id=\"").concat(product.id, "\">\n            Add to Cart\n          </button>\n        </div>\n      </article>\n    ");
  }).join('');
};
var renderCart = function renderCart() {
  var cartSection = document.getElementById('cart-section');
  if (!_model_js__WEBPACK_IMPORTED_MODULE_0__.state.isCartVisible) {
    var totalItems = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getTotalItems)();
    cartSection.innerHTML = "\n      <button class=\"button view-cart-button\" data-action=\"view-cart\">\n        View Cart ".concat(totalItems > 0 ? "(".concat(totalItems, ")") : '', "\n      </button>\n    ");
    return;
  }
  var cartItems = Object.entries(_model_js__WEBPACK_IMPORTED_MODULE_0__.state.cart).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      productId = _ref2[0],
      quantity = _ref2[1];
    var product = _model_js__WEBPACK_IMPORTED_MODULE_0__.products[productId];
    var total = (product.price * quantity).toFixed(2);
    return "\n      <div class=\"cart-item\">\n        <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n        <div class=\"cart-item-details\">\n          <h3>").concat(product.name, "</h3>\n          <p>$").concat(product.price.toFixed(2), " each</p>\n          <div class=\"quantity-control\">\n            <label for=\"quantity-").concat(productId, "\">Quantity:</label>\n            <input\n              id=\"quantity-").concat(productId, "\"\n              type=\"number\"\n              class=\"quantity-input\"\n              value=\"").concat(quantity, "\"\n              min=\"1\"\n              data-action=\"update-quantity\"\n              data-product-id=\"").concat(productId, "\"\n            >\n          </div>\n          <p><strong>Total: $").concat(total, "</strong></p>\n        </div>\n      </div>\n    ");
  }).join('');
  var cartTotal = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getCartTotal)().toFixed(2);
  cartSection.innerHTML = "\n    <div class=\"cart-container\">\n      <button class=\"button hide-cart\" data-action=\"hide-cart\">Hide Cart</button>\n      ".concat(Object.keys(_model_js__WEBPACK_IMPORTED_MODULE_0__.state.cart).length > 0 ? "\n        <div class=\"cart-items\">\n          ".concat(cartItems, "\n        </div>\n        <div class=\"cart-total\">\n          <p>Total: $").concat(cartTotal, "</p>\n          <button class=\"button checkout-button\" data-action=\"checkout\">Checkout</button>\n        </div>\n        ") : '<p class="empty-cart">Your cart is empty. Add some purr-fect items!</p>', "\n    </div>\n  ");
};


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
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/view.js");


var init = function init() {
  (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderProducts)();
  (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
  var appElement = document.querySelector('#app');
  appElement.addEventListener('click', function (event) {
    var target = event.target;
    var action = target.dataset.action;
    var productId = target.dataset.productId;
    if (action === 'add-to-cart') {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
    } else if (action === 'view-cart') {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.toggleCart)();
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
    } else if (action === 'hide-cart') {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.toggleCart)();
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
    } else if (action === 'checkout') {
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.clearCart)();
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.toggleCart)();
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
    }
  });
  appElement.addEventListener('change', function (event) {
    var target = event.target;
    if (target.dataset.action === 'update-quantity') {
      var productId = target.dataset.productId;
      (0,_model_js__WEBPACK_IMPORTED_MODULE_0__.updateQuantity)(productId, target.value);
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.renderCart)();
    }
  });
};
document.addEventListener('DOMContentLoaded', init);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map