"use strict";

const crypto = require('crypto');
const userModel = require('./user-model');
const views = require('./view');

module.exports = {
  home: (req, res) => {
    const sid = req.cookies.sid;
    if (sid && userModel.isValidSession(sid)) {
      const username = userModel.getUsernameFromSid(sid);
      const storedWord = userModel.getStoredWord(username);
      res.send(views.dataPage(username, storedWord));
    } else {
      res.send(views.loginPage());
    }
  },

  login: (req, res) => {
    const { username } = req.body;

    if (username === "") {
        return res.status(400).send(views.errorPage('Invalid username! Field cannot be empty.', '/'));
    }

    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
      return res.status(400).send(views.errorPage('Invalid username. Use only letters and numbers.', '/'));
    }

    if (username.toLowerCase() === 'dog') {
      return res.status(403).send(views.errorPage('This username "dog" is not allowed.', '/'));
    }

    const sid = crypto.randomUUID();
    userModel.createSession(sid, username);
    res.cookie('sid', sid);
    res.redirect('/');
  },

  logout: (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
      userModel.removeSession(sid);
      res.clearCookie('sid');
    }
    res.redirect('/');
  },
};
