'use strict';

const users = {};

users['admin'] = {
  username: 'admin',
  isAdmin: true,
  createdAt: Date.now(),
};

const BANNED_USERS = ['dog'];

export function add(username) {
  if (BANNED_USERS.includes(username.toLowerCase())) {
    throw new Error('User is banned');
  }
  if (users[username]) {
    throw new Error('Username already exists');
  }
  
  users[username] = {
    username,
    isAdmin: username === 'admin',
    createdAt: Date.now(),
  };
  
  return users[username];
}

export function exists(username) {
  return !!users[username];
}

export function isAdmin(username) {
  return users[username]?.isAdmin || false;
}

export function isBanned(username) {
  return BANNED_USERS.includes(username.toLowerCase());
}

export function get(username) {
  return users[username];
}

export function isValidUsername(username) {
  return Boolean(username && typeof username === 'string' && username.trim() && /^[A-Za-z0-9_]+$/.test(username));
}

export function validateUserPermissions(username) {
  if (!exists(username)) {
    return { valid: false, error: 'username-not-found' };
  }
  
  if (isBanned(username)) {
    return { valid: false, error: 'user-banned' };
  }

  return { valid: true, isAdmin: isAdmin(username) };
}