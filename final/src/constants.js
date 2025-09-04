export const ACTIONS = {

  SET_LOADING: "set_loading",
  SET_ERROR: "set_error",


  LOGIN_SUCCESS: "login_success",
  LOGOUT: "logout",


  NAVIGATE: "navigate",
  CLEAR_PRODUCT: "clear_product",
  SELECT_PRODUCT: "select_product",


  SHOW_LOGIN_FORM: "show_login_form",
  SHOW_REGISTER_FORM: "show_register_form",


  ADD_TO_CART: "add_to_cart",
  UPDATE_CART_QUANTITY: "update_cart_quantity",
  REMOVE_FROM_CART: "remove_from_cart",
  CLEAR_CART: "clear_cart",


  START_ORDER_PROCESSING: "start_order_processing",
  SET_ORDER_PROCESSING: "set_order_processing",
  ORDER_SUCCESS: "order_success",
  RESET_ORDER_STATUS: "reset_order_status",

};


export const SERVER = {
  AUTH_MISSING: "auth-missing",
  SESSION_EXPIRED: "session-expired",
  AUTH_INSUFFICIENT: "auth-insufficient",
  NO_PERMISSION: "no-permission",
  REQUIRED_USERNAME: "required-username",
  USERNAME_ALREADY_EXISTS: "username-already-exists",
  USERNAME_NOT_FOUND: "username-not-found",
  NO_SUCH_PRODUCT: "no-such-product",
  PRODUCT_INFO_MISSING: "required-product-info",
  EMPTY_CART: "empty-cart",
  NO_SUCH_ORDER: "no-such-order",
  ORDER_INFO_MISSING: "required-order-info",
  INVALID_USERNAME_PATTERN: "invalid-username-pattern",
  INVALID_PRICE: "invalid-price",
  ADMIN_ORDER_FORBIDDEN: "admin-order-forbidden",
  INVALID_ORDER_ITEMS: "invalid-order-items",
  INVALID_ORDER_AMOUNT: "invalid-order-amount",
  USER_BANNED: "user-banned",
  PRODUCT_DELETE_FAILED: "product-delete-failed",
};


export const CLIENT = {
  NETWORK_ERR: "networkError",
  NO_SESSION: "noSession",
  BANNED_USER: "bannedUser",
  SESSION_TIMEOUT: "timedOut",
  UNKNOWN_ACTION: "unknownAction",
};


export const MESSAGES_TO_USER = {

  [SERVER.AUTH_MISSING]: "Unauthorized - valid session required. Please log in to continue.",
  [SERVER.SESSION_EXPIRED]: "Your session has expired. Please login again.",
  [SERVER.NO_PERMISSION]: "Forbidden - admin access required. You don't have permission to perform this action.",
  [SERVER.REQUIRED_USERNAME]: "Username is required. Please enter a valid username.",
  [SERVER.USER_BANNED]: "User \"dog\" is banned and cannot access this feature.",
  [SERVER.USERNAME_NOT_FOUND]: "User does not exist. Please register first.",
  [SERVER.INVALID_USERNAME_PATTERN]: "Username can only contain letters, numbers, and underscores.",
  [SERVER.USERNAME_ALREADY_EXISTS]: "Username already exists. Please choose a different username.",


  [SERVER.NO_SUCH_PRODUCT]: "Product not found. The product may have been removed or is unavailable.",
  [SERVER.PRODUCT_INFO_MISSING]: "Name, price, and category are required fields. Please fill in all required information.",
  [SERVER.PRODUCT_DELETE_FAILED]: "Failed to delete product. Please try again later.",
  [SERVER.INVALID_PRICE]: "Price must be a positive number. Please enter a valid price.",


  [SERVER.ADMIN_ORDER_FORBIDDEN]: "Admin users cannot place or view orders.",
  [SERVER.INVALID_ORDER_ITEMS]: "Order must contain at least one item. Please add items to your cart.",
  [SERVER.INVALID_ORDER_AMOUNT]: "Total amount must be a positive number. Please check your order total.",


  [CLIENT.NETWORK_ERR]: "Server error. Please check your connection and try again.",


  default: "An unexpected error occurred. Please try again."
};