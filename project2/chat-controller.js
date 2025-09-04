"use strict";

const sessions = require('./sessions');
const users = require('./users');
const chatData = require('./chat-data');

const chatController = {};

chatController.getMessages = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const allMessages = chatData.getMessages();
  res.json(allMessages);
};

chatController.addMessage = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { text, isDM, recipient, channel } = req.body;

  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({
      error: 'required-message',
      message: 'Message cannot be empty, please enter your message',
    });
  }

  const message = chatData.addMessage(username, text.trim(), {
    isDM: !!isDM,
    recipient: recipient || null,
    channel: channel,
  });

  res.json(message);
};

chatController.getUsers = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const allSessions = sessions.getAllSessions();
  const onlineUsers = users.getOnlineUsers(allSessions);

  res.json(onlineUsers);
};

chatController.getChannels = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const channels = [
    { id: 'announcements', name: 'announcements' },
    { id: 'questions', name: 'questions' }
  ];

  res.json(channels);
};

module.exports = chatController;