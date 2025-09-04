export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Unable to connect to the chat server. Please check your internet connection and try again.',
  [SERVER.AUTH_INSUFFICIENT]: 'The username "dog" is not permitted. Please choose a different username.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a username containing only letters, numbers, and underscores.',
  [SERVER.REQUIRED_MESSAGE]: 'Your message cannot be empty. Please type something before sending.',
  [SERVER.AUTH_MISSING]: 'Your session has expired. Please log in again.',
  default: 'An unexpected error occurred. Please try again or refresh the page.'
};

export const POLL_INTERVAL = 5000;

