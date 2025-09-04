"use strict";

module.exports = {
    dataPage: (username, storedWord) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Data Page</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome, ${username}</h1>
              <form action="/logout" method="POST" class="logout-form">
                <button type="submit" class="logout-button">Logout</button>
              </form>
            </div>
            <p class="stored-word-label">Your stored word: ${storedWord}</p>
            <form action="/update-word" method="POST">
              <label for="word">Update your word:</label>
              <input type="text" id="word" name="word" value="${storedWord}" />
              <button type="submit">Update</button>
            </form>
          </div>
        </body>
      </html>
    `,

    loginPage: () => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Login</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <div class="container">
            <h1>Login</h1>
            <form action="/login" method="POST">
              <label for="username">Username:</label>
              <input type="text" id="username" name="username" />
              <button type="submit">Login</button>
            </form>
          </div>
        </body>
      </html>
    `,

    errorPage: (message, returnLink) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Error</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <div class="container">
            <h1>Error</h1>
             <p class="error-message">${message}</p>
            <a href="${returnLink}">Return to Login</a>
          </div>
        </body>
      </html>
    `,
};
