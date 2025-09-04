"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const authController = require('./auth-controller');
const chatController = require('./chat-controller');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/v1/session', authController.checkSession);
app.post('/api/v1/session', authController.createSession);
app.delete('/api/v1/session', authController.endSession);
app.get('/api/v1/messages', chatController.getMessages);
app.post('/api/v1/messages', chatController.addMessage);

app.get('/api/v1/users', chatController.getUsers);

app.get('/api/v1/channels', chatController.getChannels);

app.listen(PORT, () => console.log(`Chat server running at http://localhost:${PORT}`));
