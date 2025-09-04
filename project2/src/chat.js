import { CLIENT } from './constants';
import state, {
  login,
  logout,
  setMessages,
  setUsers,
  setError,
} from './state';
import {
  fetchSession,
  fetchMessages,
  fetchUsers,
} from './services';
import render from './render';
import {
  initializeApp,
} from './listeners';

const appEl = document.querySelector('#app');

function showFullPageLoader(text = 'Loading application...') {
  const loadingEl = document.createElement('div');
  loadingEl.className = 'loading-spinner';
  loadingEl.innerHTML = `
    <div class="loading-spinner-text">${text}</div>
  `;
  document.body.appendChild(loadingEl);
  return loadingEl;
}

function hideFullPageLoader(loadingEl) {
  if (loadingEl) {
    loadingEl.classList.add('hidden');
    setTimeout(() => {
      document.body.removeChild(loadingEl);
    }, 500);
  }
}


function handleSessionSuccess(session) {
  login(session.username);
  render({ state, appEl });
  return Promise.all([fetchMessages(), fetchUsers()]);
}

function handleDataLoaded([messages, users]) {
  setMessages(messages);
  setUsers(users);
  render({ state, appEl });
}

function handleSessionError(err) {
  if (err?.error === CLIENT.NO_SESSION || err?.error === 'auth-missing') {
    logout();
  } else {
    setError(err?.error || 'ERROR');
  }
  render({ state, appEl });
}

function initializeAppState() {
  const initialLoader = showFullPageLoader('Checking session...');
  state.isInitialLoading = true;
  return initialLoader;
}

function initApp() {
  const initialLoader = initializeAppState();
  initializeApp({ state, appEl });

  setTimeout(() => {
    hideFullPageLoader(initialLoader);
    state.isInitialLoading = false;
    render({ state, appEl });

    fetchSession()
      .then(handleSessionSuccess)
      .then(handleDataLoaded)
      .catch(handleSessionError);
  }, 1000);
}

initApp();