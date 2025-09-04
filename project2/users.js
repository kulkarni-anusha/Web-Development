"use strict";

const users = {};

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isPermitted(username) {
  return username !== 'dog';
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, userData) {
  users[username] = userData;
}

function getOnlineUsers(sessions) {
  const onlineUsers = new Set();

  Object.values(sessions).forEach(session => {
    if (session.username) {
      onlineUsers.add(session.username);
    }
  });

  return Array.from(onlineUsers);
}

module.exports = {
  isValid,
  isPermitted,
  getUserData,
  addUserData,
  getOnlineUsers,
};
