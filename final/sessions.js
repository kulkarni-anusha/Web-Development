'use strict';

import { randomUUID as uuid } from 'crypto';
import * as users from './users.js';

const sessions = {};

const SESSION_EXPIRATION = 30 * 60 * 1000;

export function create(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
    createdAt: Date.now(),
  };
  return sid;
}

export function isValid(sid) {
  if (!sessions[sid]) {
    return false;
  }
  
  const session = sessions[sid];
  const now = Date.now();
  
  if (now - session.createdAt > SESSION_EXPIRATION) {
    delete sessions[sid];
    return false;
  }
  
  if (!users.exists(session.username)) {
    delete sessions[sid];
    return false;
  }

  if (users.isBanned(session.username)) {
    delete sessions[sid];
    return false;
  }
  
  session.createdAt = now;
  return true;
}

export function getUsername(sid) {
  return sessions[sid]?.username;
}

export function remove(sid) {
  delete sessions[sid];
}