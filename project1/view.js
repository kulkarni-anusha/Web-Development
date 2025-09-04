"use strict";

function Home(username, game, message) {
    const leaderboard = game.leaderboard || [];
    let content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Word Guessing Game</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="home-container">
          <h1 class="game-title">Word Guessing Game</h1>
          <div class="header-section">
            <p class="greeting">Welcome, ${username}!</p>
            <form action="/logout" method="POST" class="logout-form">
              <button type="submit" class="logout-button action-button">Logout</button>
            </form>
          </div>
          <div class="game-layout">
            <div class="game-main">
              <section class="words-section">
                <h2>Possible Words</h2>
                <div class="word-list">
                  ${game.words.join(', ')}
                </div>
              </section>
              ${message && message !== 'Correct! You won!' ? `
                <div class="error-message">${message}</div>
              ` : ''}
              <section>
                ${GuessForm(game, message)}
              </section>
              <section>
                <h2>Your Guesses</h2>
                ${game.guesses.length > 0 ? `
                  <ul class="guesses-list">
                    ${game.guesses.map((guess, index) => `
                      <li class="guess-item">${guess} - Matches: ${game.matchCounts[index]}</li>
                    `).join('')}
                  </ul>` : `<p>No guesses yet!</p>`}
                <p class="guesses-total">Total guesses: ${game.guesses.length}</p>
              </section>
              ${message === 'Correct! You won!' ? `<p class="success-message">Congratulations! You won the game!</p>` : ''}
            </div>
            <div class="leaderboard-section">
              <h2>Top Players</h2>
              ${leaderboard.length > 0 ? `
                <ul class="leaderboard-list">
                  ${leaderboard.map((entry, index) => `
                    <li class="leaderboard-item ${entry.username === username ? 'current-user' : ''}">
                      <span class="rank">#${index + 1}</span>
                      <span class="username">${entry.username}</span>
                      <span class="score">${entry.score} guesses</span>
                    </li>
                  `).join('')}
                </ul>
              ` : `<p>No winners yet!</p>`}
            </div>
          </div>
          <section class="game-actions">
            <div class="button-group">
              <form action="/new-game" method="POST">
                <button type="submit" class="new-game-button action-button">Start New Game</button>
              </form>
            </div>
          </section>
        </div>
      </body>
      </html>
    `;
    return content;
}


function GuessForm(game) {
    if (game.won) {
        return '';
    }
    return `
      <form action="/guess" method="POST" class="guess-form">
        <input type="text" name="guess" placeholder="Enter your guess" required class="guess-input">
        <button type="submit" class="guess-button action-button">Guess</button>
      </form>
    `;
}

function Login(message) {
    let errorMessage = null;
    if (message === "The username 'dog' is not allowed.") {
        errorMessage = `<p class="error-message">${message}</p>`;
    } else if (message === "Invalid username! Field cannot be empty.") {
        errorMessage = `<p class="error-message">${message}</p>`;
    } else if (message && message.startsWith("Invalid username")) {
        errorMessage = `<p class="error-message">${message}</p>`;
    } else if (message) {
        errorMessage = `<p class="message">${message}</p>`;
    }

    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Word Guessing Game - Login</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="login-container">
          <h1 class="login-title">Login</h1>
          ${errorMessage || ''}
          <form action="/login" method="POST" class="login-form">
            <input type="text" name="username" placeholder="Enter your username" class="login-input">
            <button type="submit" class="login-button action-button">Login</button>
          </form>
        </div>
      </body>
      </html>
    `;
    return content;
}


function Page(content) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Word Guessing Game</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
}

module.exports = {
    Home,
    Login,
};
