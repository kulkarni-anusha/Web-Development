"use strict";

const sessions = {};
const storedWords = {};

module.exports = {
  isValidSession: (sid) => !!sessions[sid],

  getUsernameFromSid: (sid) => sessions[sid]?.username || null,

  setStoredWord: (username, word) => {
    storedWords[username] = word;
  },

  getStoredWord: (username) => storedWords[username] || '',

  createSession: (sid, username) => {
    sessions[sid] = { username };
  },

  removeSession: (sid) => {
    delete sessions[sid];
  },
};
