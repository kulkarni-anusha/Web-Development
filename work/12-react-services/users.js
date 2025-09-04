const users = {};

function isValid(username) {
    return !!username &&
        username.trim().length > 0 &&
        username.match(/^[A-Za-z0-9_]+$/);
}

function isValidWord(word) {
    return !!word &&
        word.trim().length > 0 &&
        word.match(/^[A-Za-z0-9]+$/);
}

function getUserData(username) {
    return users[username];
}

function addUserData(username, userData) {
    users[username] = userData;
}

export default {
    isValid,
    isValidWord,
    getUserData,
    addUserData,
};