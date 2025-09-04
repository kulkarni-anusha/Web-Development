"use strict";

const uuid = require('crypto').randomUUID;

const messages = [];

function getMessages() {
  return messages;
}

function addMessage(username, text, options = {}) {
  const id = uuid();
  const timestamp = Date.now();

  const message = {
    id,
    username,
    text,
    timestamp,
    isDM: options.isDM || false,
    recipient: options.recipient || null,
    channel: options.channel || 'announcements'
  };

  messages.push(message);
  return message;
}

module.exports = {
  getMessages,
  addMessage,
};
