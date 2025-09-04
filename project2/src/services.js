export function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchMessages() {
  return fetch('/api/v1/messages')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchUsers() {
  return fetch('/api/v1/users')
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchSendMessage(messageData) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        return response.json().then(err => Promise.reject(err));
      }
      return Promise.reject({ error: 'unknownError' });
    });
}
