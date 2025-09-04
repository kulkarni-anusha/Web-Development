import { MESSAGES } from './constants';

const state = {
  messages: [],
  filteredMessages: [],
  users: [],
  channels: [
    { id: 'announcements', name: 'announcements' },
    { id: 'questions', name: 'questions' }
  ],
  isLoggedIn: false,
  isLoginPending: false,
  isMessagesPending: false,
  isUsersPending: false,
  isInitialLoading: true,
  username: '',
  lastMessageId: '',
  currentChannel: 'announcements',
  currentDM: null,
  lastSeenMessageIds: {},
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.filteredMessages = [];
  state.users = [];
  state.error = '';
  state.currentChannel = 'announcements';
  state.currentDM = null;
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
  state.lastMessageId = '';
  state.currentChannel = 'announcements';
  state.currentDM = null;
  filterMessages();
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.filteredMessages = [];
  state.users = [];
  state.error = '';
  state.lastMessageId = '';
  state.currentChannel = 'announcements';
  state.currentDM = null;
  state.isInitialLoading = false;
}

export function waitOnMessages() {
  state.isMessagesPending = true;
  state.error = '';
}

export function waitOnUsers() {
  state.isUsersPending = true;
  state.error = '';
}

export function setMessages(messages) {
  state.messages = messages;
  state.isMessagesPending = false;
  state.error = '';
  filterMessages();
}

export function setUsers(users) {
  state.users = users;
  state.isUsersPending = false;
  state.error = '';
}

export function addMessage(message) {
  state.messages.push(message);
  state.lastMessageId = message.id;
  state.error = '';
  filterMessages();
}

export function setChannel(channelId) {
  state.currentChannel = channelId;
  state.currentDM = null;
  filterMessages();
}

export function setDirectMessage(username) {
  state.currentDM = username;
  state.currentChannel = null;
  filterMessages();
}

export function filterMessages() {
  if (state.currentDM) {
    state.filteredMessages = state.messages.filter(message => {
      return (message.isDM &&
        ((message.username === state.username && message.recipient === state.currentDM) ||
          (message.username === state.currentDM && message.recipient === state.username)));
    });
  } else {
    state.filteredMessages = state.messages.filter(message => {
      return (!message.isDM && message.channel === (state.currentChannel));
    });
  }
}

export function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.isMessagesPending = false;
  state.isUsersPending = false;
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;
