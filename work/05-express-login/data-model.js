"use strict";

const storedWords = {};

const dataModel = {
  getStoredWord: (username) => {
    return storedWords[username] || '';
  },

  setStoredWord: (username, word) => {
    storedWords[username] = word;
  }
};

module.exports = dataModel;
