import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from './sessions.js';
import users from './users.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!username || !username.trim()) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const sid = sessions.addSession(username);
    const userData = users.getUserData(username);
    if (!userData) {
        users.addUserData(username, { storedWord: '' });
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username));
});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

app.get('/api/v1/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const userData = users.getUserData(username);
    res.json({ storedWord: userData.storedWord });
});

app.put('/api/v1/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { word } = req.body;

    if (word && word.trim() && !users.isValidWord(word)) {
        res.status(400).json({ error: 'invalid-word' });
        return;
    }

    const userData = users.getUserData(username);
    userData.storedWord = word || '';
    res.json({ storedWord: userData.storedWord });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));