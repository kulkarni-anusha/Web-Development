export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    INVALID_WORD: 'invalid-word',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection and try again.',
    [SERVER.AUTH_MISSING]: 'You need to be logged in to perform this action. Please log in first.',
    [SERVER.AUTH_INSUFFICIENT]: 'The username "dog" is restricted. Please choose a different username to continue.',
    [SERVER.REQUIRED_USERNAME]: 'Username is required and must contain only letters, numbers, and underscores.',
    [SERVER.INVALID_WORD]: 'Invalid secret word. Please use only letters and numbers.',
    default: 'An unexpected error occurred. Please try again or contact support if the issue persists.',
};