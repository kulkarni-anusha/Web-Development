function render({ state, appEl }) {
  if (state.isInitialLoading) {
    const html = generateLoadingSpinnerHtml('Checking session...');
    appEl.innerHTML = html;
    return;
  }

  const html = `
    ${state.isLoggedIn ? '' : generateStatusHtml(state)}
    ${generateLoginHtml(state)}
    ${generateContentHtml(state)}
  `;
  appEl.innerHTML = html;

  if (state.error) {
    const messageFormContainer = appEl.querySelector('.message-form-container');
    if (messageFormContainer) {
      const errorHtml = `<div class="message-error">${state.error}</div>`;
      messageFormContainer.insertAdjacentHTML('afterbegin', errorHtml);
    }
  }

  if (state.lastMessageId) {
    const messagesContainer = appEl.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}

function generateLoadingSpinnerHtml(text) {
  return `
    <div class="loading-spinner" id="loadingSpinner">
      <div class="loading-spinner-text">${text}</div>
    </div>
  `;
}

function generateStatusHtml(state) {
  return `
    <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login">
        <h1 class="login-title">Chat Application</h1>
        <div class="login-waiting">
          ${generateLoadingSpinnerHtml('Loading user data...')}
        </div>
      </div>
    `;
  }

  if (state.isLoggedIn) {
    return ``;
  }

  return `
    <div class="login">
      <h1 class="login-title">Chat Application</h1>
      <div class="login-error">${state.error}</div>
      <form class="login-form" action="#login">
        <label>
          <div>Username:</div>
          <input class="login-username" placeholder="Enter your username" value="">
        </label>
        <button class="login-button" type="submit">Login</button>
      </form>
    </div>
  `;
}


function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return ``;
  }

  if (state.isMessagesPending || state.isUsersPending) {
    return `
      <div class="content-container">
        <div class="content-card">
          ${generateLoadingSpinnerHtml('Loading workspace...')}
        </div>
      </div>
    `;
  }

  return `
    <div class="content-container">
      <div class="content-card">
        <div class="content">
          ${generateSidebarHtml(state)}
          ${generateChatHtml(state)}
        </div>
      </div>
    </div>
  `;
}

function generateSidebarHtml(state) {
  return `
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Workspace</h2>
        <div class="user-status">
          <div class="status-indicator online"></div>
          ${state.username}
        </div>
      </div>
      
      ${generateChannelsHtml(state)}
      ${generateUsersHtml(state)}
    </div>
  `;
}

function generateChannelsHtml(state) {
  const channels = state.channels || [
    { id: 'announcements', name: 'announcements' },
    { id: 'questions', name: 'questions' }
  ];

  const channelsHtml = channels.map(channel => {
    const isActive = state.currentChannel === channel.id;
    return `
      <li class="channel-item ${isActive ? 'active' : ''}" data-channel-id="${channel.id}">
        <div class="channel-icon">#</div>
        ${channel.name}
      </li>
    `;
  }).join('');

  return `
    <div class="channels-panel">
      <h3 class="sidebar-section-title">Channels</h3>
      <ul class="channels-list">
        ${channelsHtml || '<li class="user-item">No channels available</li>'}
      </ul>
    </div>
  `;
}

function generateUsersHtml(state) {
  if (state.isUsersPending) {
    return `
      <div class="users-panel">
        <h3 class="sidebar-section-title">Direct Messages</h3>
        <div class="users-waiting">
          <div class="loading-spinner" style="position: relative; height: 50px; background-color: transparent;">
            <div class="loading-spinner-text" style="margin-top: 60px;">Loading users...</div>
          </div>
        </div>
      </div>
    `;
  }

  const usersHtml = state.users.map(username => {
    const isActive = state.currentDM === username;
    return `
      <li class="user-item ${isActive ? 'active' : ''}" data-username="${username}">
        <div class="user-icon">
          <div class="status-indicator online"></div>
        </div>
        ${username}
      </li>
    `;
  }).join('');

  return `
    <div class="users-panel">
      <p class="sidebar-section-title">Direct Messages</p>
      <ul class="users-list">
        ${usersHtml || '<li class="user-item">No users online</li>'}
      </ul>
    </div>
  `;
}

function generateChatHtml(state) {
  let chatTitle = '';
  let chatType = '';

  if (state.currentDM) {
    chatTitle = state.currentDM;
    chatType = 'dm';
  } else {
    chatTitle = `#${state.currentChannel}`;
    chatType = 'channel';
  }

  const messagesHtml = state.isMessagesPending
    ? `<div class="messages-waiting">Loading messages...</div>`
    : generateMessagesHtml(state);

  return `
    <div class="chat-panel">
      ${generateControlsHtml(state, chatTitle, chatType)}
      <div class="messages">
        ${messagesHtml}
      </div>
      ${generateMessageFormHtml(state)}
    </div>
  `;
}

function generateControlsHtml(state, chatTitle, chatType) {
  return `
    <div class="controls">
      <div class="controls-chat-info">
        <p class="controls-title">${chatTitle}</p>
        <div class="controls-subtitle">${chatType === 'dm' ? 'Direct Message' : 'Channel'}</div>
      </div>
      <button class="controls-logout">Logout</button>
    </div>
  `;
}

// function generateMessagesHtml(state) {
//   if (state.isMessagesPending) {
//     return `
//       <div class="messages-waiting">
//         <div class="loading-spinner" style="position: relative; height: 100px; background-color: transparent;">
//           <div class="loading-spinner-text">Loading messages...</div>
//         </div>
//       </div>
//     `;
//   }

//   if (!state.filteredMessages || !state.filteredMessages.length) {
//     return `<div class="messages-empty">No messages yet. Start the conversation!</div>`;
//   }

//   return state.filteredMessages.map(message => {
//     const isCurrentUser = message.username === state.username;
//     const messageClass = isCurrentUser ? 'message-self' : 'message-other';
//     const isNewClass = message.id === state.lastMessageId ? 'message-new' : '';

//     return `
//       <div class="message ${messageClass} ${isNewClass}">
//         <div class="message-content">
//           <div class="message-username">${message.username}</div>
//           <div class="message-text">${message.text}</div>
//           <div class="message-time">${formatTime(message.timestamp)}</div>
//         </div>
//       </div>
//     `;
//   }).join('');
// }

function generateLoadingMessages() {
  return `
    <div class="messages-waiting">
      <div class="loading-spinner" style="position: relative; height: 100px; background-color: transparent;">
        <div class="loading-spinner-text">Loading messages...</div>
      </div>
    </div>
  `;
}

function generateEmptyMessages() {
  return `<div class="messages-empty">No messages yet. Start the conversation!</div>`;
}

function generateMessageHtml(message, state) {
  const isCurrentUser = message.username === state.username;
  const messageClass = isCurrentUser ? 'message-self' : 'message-other';
  const isNewClass = message.id === state.lastMessageId ? 'message-new' : '';

  return `
    <div class="message ${messageClass} ${isNewClass}">
      <div class="message-content">
        <div class="message-username">${message.username}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-time">${formatTime(message.timestamp)}</div>
      </div>
    </div>
  `;
}

function generateMessagesHtml(state) {
  if (state.isMessagesPending) {
    return generateLoadingMessages();
  }

  if (!state.filteredMessages || !state.filteredMessages.length) {
    return generateEmptyMessages();
  }

  return state.filteredMessages
    .map(message => generateMessageHtml(message, state))
    .join('');
}

function generateMessageFormHtml(state) {
  const placeholder = state.currentDM
    ? `Message ${state.currentDM}`
    : `Message #${state.currentChannel}`;

  const errorMessage = state.error === 'required-message'
    ? `<div class="message-error">Message cannot be empty, please enter your message</div>`
    : '';

  return `
    <div class="message-form-container">
      ${errorMessage}
      <form class="message-form" action="#send">
        <input class="message-form-input" placeholder="${placeholder}">
        <button class="message-form-button" type="submit">Send</button>
      </form>
    </div>
  `;
}


function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default render;
