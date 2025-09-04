import {
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchUsers,
  fetchSendMessage,
} from './services';

import {
  waitOnLogin,
  setMessages,
  setUsers,
  setError,
  login,
  logout,
  addMessage,
  setChannel,
  setDirectMessage,
} from './state';

import render from './render';
import { POLL_INTERVAL, MESSAGES } from './constants';

let pollIntervalId;

export function addAbilityToLogin({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('login-form')) {
      return;
    }
    e.preventDefault();

    const username = appEl.querySelector('.login-username').value.trim();

    if (!username) {
      setError('required-username');
      render({ state, appEl });
      return;
    }

    waitOnLogin();
    render({ state, appEl });

    const loadingEl = showLoading(appEl);

    fetchLogin(username)
      .then(({ messages, users }) => {
        login(username);
        setMessages(messages);
        setUsers(users);

        setTimeout(() => {
          hideLoading(loadingEl);
          render({ state, appEl });
          startPolling({ state, appEl });
        }, 1000);
      })
      .catch(err => {
        setTimeout(() => {
          hideLoading(loadingEl);
          setError(err?.error || 'ERROR');
          render({ state, appEl });
        }, 1000);
      });
  });
}

function showLoading(appEl) {
  const loadingEl = document.createElement('div');
  loadingEl.className = 'loader-container';
  loadingEl.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loadingEl);
  return loadingEl;
}

function hideLoading(loadingEl) {
  if (document.body.contains(loadingEl)) {
    document.body.removeChild(loadingEl);
  }
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('controls-logout')) {
      return;
    }

    stopPolling();
    logout();
    render({ state, appEl });

    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });
  });
}

function createMessageData(state, text) {
  return {
    text,
    channel: state.currentChannel || 'announcements',
    isDM: !!state.currentDM,
    recipient: state.currentDM,
  };
}

function handleMessageSuccess(message, messageInput, state, appEl) {
  messageInput.value = '';
  addMessage(message);
  state.error = '';
  render({ state, appEl });
}

function handleMessageError(err, state, appEl) {
  if (err?.error === 'required-message') {
    state.error = 'Message cannot be empty, please enter your message';
  } else {
    state.error = err?.error || 'ERROR';
  }
  render({ state, appEl });
}

export function addAbilityToSendMessage({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('message-form')) {
      return;
    }

    e.preventDefault();
    const messageInput = appEl.querySelector('.message-form-input');
    const text = messageInput.value.trim();
    const messageData = createMessageData(state, text);

    fetchSendMessage(messageData)
      .then(message => handleMessageSuccess(message, messageInput, state, appEl))
      .catch(err => handleMessageError(err, state, appEl));
  });
}

export function addAbilityToSelectChannel({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    const channelItem = e.target.closest('.channel-item');
    if (!channelItem) {
      return;
    }

    const channelId = channelItem.dataset.channelId;
    setChannel(channelId);
    render({ state, appEl });
  });
}

export function addAbilityToSelectDM({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    const userItem = e.target.closest('.user-item');
    if (!userItem) {
      return;
    }

    const username = userItem.dataset.username;
    setDirectMessage(username);
    render({ state, appEl });
  });
}

function startPolling({ state, appEl }) {
  pollIntervalId = setInterval(() => {
    Promise.all([fetchMessages(), fetchUsers()])
      .then(([messages, users]) => {
        setMessages(messages);
        setUsers(users);
        render({ state, appEl });
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        render({ state, appEl });
      });
  }, POLL_INTERVAL);
}

function stopPolling() {
  clearInterval(pollIntervalId);
}

export function initializeApp({ state, appEl }) {
  addAbilityToLogin({ state, appEl });
  addAbilityToLogout({ state, appEl });
  addAbilityToSendMessage({ state, appEl });
  addAbilityToSelectChannel({ state, appEl });
  addAbilityToSelectDM({ state, appEl });
}
