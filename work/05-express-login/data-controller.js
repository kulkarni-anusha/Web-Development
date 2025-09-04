"use strict";

const userModel = require('./user-model');

module.exports = {
  updateWord: (req, res) => {
    const sid = req.cookies.sid;
    const { word } = req.body;

    if (sid && userModel.isValidSession(sid)) {
      const username = userModel.getUsernameFromSid(sid);
      userModel.setStoredWord(username, word);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  },
};
