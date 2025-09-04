export function loginView(errorMessage) {
  return `
    <div class="login-form">
      <h1 class="heading">Secret Word App</h1> 
      ${errorMessage ? `<p class="error-message">${errorMessage}</p>` : ''}
      <form id="login-form">
        <label for="username" class="form-label">Enter your username:</label>
        <input type="text" id="username" class="text-input" placeholder="Username" required>
        <button id="login-button" class="button">Login</button>
      </form>
    </div>
  `;
}

export function showSecret(username, word, errorMessage) {
  return `
    <div class="main-content">
      <button id="logout-button" class="button">Logout</button>
      <h1 class="heading">Welcome to Your Dashboard</h1> 
      <div class="username">Hello, ${username}!</div>
      ${errorMessage ? `<p class="error-message">${errorMessage}</p>` : ''}
      <div class="secret-word">
        <p>Your secret word is:</p>
        <p class="secret">${word || 'No secret set'}</p>
      </div>
      <form id="secret-form" class="secret-form">
        <input type="text" id="secret-input" class="text-input" placeholder="Update your secret">
        <button id="update-button" class="button">Update</button>
      </form>
    </div>
  `;
}

export function errorView(errorMessage) {
  return `
    <div class="error-content">
      <p class="error-message">Error: ${errorMessage}</p>
      <a href="/" id="home-link" class="button">Back</a>
    </div>
  `;
}