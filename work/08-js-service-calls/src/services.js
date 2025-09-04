export const MESSAGES = {
  'network-error': 'Unable to connect to the server. Please try again.',
  'required-username': 'Username is required and must be alphanumeric.',
  'auth-insufficient': 'Username "dog" is not allowed.',
  'auth-missing': 'You must be logged in to access this page.',
  'required-word': 'You must enter a word to update your secret.',
  'invalid-word': 'The word must contain only letters.',
};

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function checkSession() {
  return fetch('/api/session')
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function getSecret() {
  return fetch('/api/word')
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function putSecret(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}