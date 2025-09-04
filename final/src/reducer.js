'use strict';

import { ACTIONS } from "./constants";

export const initialState = {
  username: "",
  isLoggedIn: false,
  isAdmin: false,

  view: "products",
  selectedProduct: null,
  showLoginForm: false,
  showRegisterForm: false,

  cart: [],

  error: "",
  loading: false,
  orderSuccess: false,
  isOrderProcessing: false
};

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
        isLoggedIn: true,
        isAdmin: action.isAdmin,
        error: ""
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        username: "",
        isLoggedIn: false,
        isAdmin: false,
        view: "products",
        cart: [],
        error: ""
      };

    case ACTIONS.NAVIGATE:
      return {
        ...state,
        view: action.view,
        error: ""
      };

    case ACTIONS.CLEAR_PRODUCT:
      return {
        ...state,
        selectedProduct: null
      };

    case ACTIONS.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
        view: "product",
        error: ""
      };

    case ACTIONS.SHOW_LOGIN_FORM:
      return {
        ...state,
        showLoginForm: action.show,
        showRegisterForm: false,
        view: action.show ? 'login' : state.view
      };

    case ACTIONS.SHOW_REGISTER_FORM:
      return {
        ...state,
        showRegisterForm: action.show,
        showLoginForm: false,
        view: action.show ? 'register' : state.view
      };

    case ACTIONS.ADD_TO_CART: {
      const { product, quantity } = action;
      const existingItemIndex = state.cart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return {
          ...state,
          cart: updatedCart
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, quantity }]
        };
      }
    }

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        )
      };

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.productId)
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTIONS.START_ORDER_PROCESSING:
      return {
        ...state,
        isOrderProcessing: true,
        loading: true,
        error: ''
      };

    case ACTIONS.SET_ORDER_PROCESSING:
      return {
        ...state,
        isOrderProcessing: action.processing,
        loading: action.processing ? true : state.loading
      };

    case ACTIONS.ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: true,
        isOrderProcessing: false,
        loading: false
      };

    case ACTIONS.RESET_ORDER_STATUS:
      return {
        ...state,
        orderSuccess: false,
        isOrderProcessing: false
      };

    default:
      return state;
  }
}