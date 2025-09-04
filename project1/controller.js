"use strict";

const model = require('./model.js');
const view = require('./view.js');

function home(req, res) {
    const sid = req.cookies.sid;
    const username = model.getUsername(sid);

    if (!username) {
        return res.send(view.Login());
    }

    let game = model.getGame(username);
    if (!game) {
        model.createGame(username);
        game = model.getGame(username);
    }

    const leaderboard = model.getLeaderboard();

    res.send(view.Home(username, {
        words: model.words,
        guesses: game.guesses,
        matchCounts: game.matchCounts,
        won: game.guesses.includes(game.secretWord),
        leaderboard: leaderboard,
    }, req.query.message));
}

function login(req, res) {
    const username = req.body.username;

    if (!username || username.trim() === "") {
        return res.send(view.Login("Invalid username! Field cannot be empty."));
    }

    if (username === 'dog') {
        return res.send(view.Login("The username 'dog' is not allowed."));
    }

    if (!model.isValidUsername(username)) {
        return res.send(view.Login("Invalid username! Only letters, numbers, and underscores are allowed."));
    }

    const sid = model.createSession(username);
    res.cookie('sid', sid);
    res.redirect('/');
}

function logout(req, res) {
    const sid = req.cookies.sid;
    model.removeSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
}

function guess(req, res) {
    const sid = req.cookies.sid;
    const username = model.getUsername(sid);

    if (!username) {
        return res.redirect('/');
    }

    const guess = req.body.guess;
    const result = model.makeGuess(username, guess);

    if (!result) {
        return res.redirect('/');
    }

    let message = '';
    if (!result.valid) {
        message = result.error;
    } else if (result.correct) {
        const game = model.getGame(username);
        model.updateLeaderboard(username, game.guesses.length);
        message = 'Correct! You won!';
    }


    const updatedGame = model.getGame(username);
    const leaderboard = model.getLeaderboard();

    res.send(view.Home(username, {
        words: model.words,
        guesses: updatedGame.guesses,
        matchCounts: updatedGame.matchCounts,
        won: updatedGame.guesses.includes(updatedGame.secretWord),
        leaderboard: leaderboard,
    }, message));
}

function newGame(req, res) {
    const sid = req.cookies.sid;
    const username = model.getUsername(sid);

    if (!username) {
        return res.redirect('/');
    }

    model.createGame(username);


    const newGame = model.getGame(username);
    const leaderboard = model.getLeaderboard();

    res.send(view.Home(username, {
        words: model.words,
        guesses: newGame.guesses,
        matchCounts: newGame.matchCounts,
        won: false,
        leaderboard: leaderboard,
    }, 'New game started!'));
}

module.exports = {
    home,
    login,
    logout,
    guess,
    newGame,
};
