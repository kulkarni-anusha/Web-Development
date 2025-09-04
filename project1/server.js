const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const model = require('./model.js');
const view = require('./view.js');
const controller = require('./controller.js');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.get('/', controller.home);
app.post('/login', controller.login);
app.post('/logout', controller.logout);
app.post('/guess', controller.guess);
app.post('/new-game', controller.newGame);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
