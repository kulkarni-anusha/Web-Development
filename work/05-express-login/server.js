const express = require('express');
const cookieParser = require('cookie-parser');
const userController = require('./user-controller');
const dataController = require('./data-controller');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', userController.home);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.post('/update-word', dataController.updateWord);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
