const chatView = {
  chatPage: function(model) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Chat Room</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="chat-container">
            <h1 class="chat-title">INFO6250 Chat Room</h1>
            <div>
              <section class="section-divider">
                <h2>Logged In Users</h2>
                ${chatView.getUserList(model)}
              </section>
              <section class="section-divider">
                <h2>Chat Messages</h2>
                ${chatView.getMessageList(model)}
              </section>
              <section class="section-divider">
                <h2>Send Message</h2>
                ${chatView.getSendMessageForm(model)}
              </section>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  getMessageList: function(model) {

    return `<ol class="messages">` +
      model.messages.map(msg => `
        <li>
          <div class="message">
            <div class="sender-info">
              <img class="avatar" 
                src="${msg.avatar}" 
                alt="avatar of ${msg.sender}"
              />
              <span class="username">${msg.sender}</span>
            </div>
            <p class="message-text">${msg.text}</p>
          </div>
        </li>`
      ).join('') +
      `</ol>`;
  },

  getUserList: function(model) {
    return `<ul class="users">` +
    Object.values(model.users).map( user => `
       <li>
        <div class="user">
          <img class="avatar" 
            src="${user.avatar}" 
            alt="avatar of ${user.name}"
          />
          <span class="username">${user.name}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },

  getSendMessageForm: function(model) {
    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <div class="form-group">
            <label for="username">Username:</label>
            <select name="username" id="username" class="username" required>
              ${Object.keys(model.users).map(user => `
                <option value="${user}">${user}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="to-send">Message:</label>
            <input 
              id="to-send" 
              name="text" 
              placeholder="Type your message here..."
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>`;
  }
};

module.exports = chatView;
