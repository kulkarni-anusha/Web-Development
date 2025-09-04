"use strict";

const words = require('./words.js');
const sessions = {};
const games = {};
const leaderboard = {};

function updateLeaderboard(username, guessCount) {
    if (!leaderboard[username] || guessCount < leaderboard[username]) {
        leaderboard[username] = guessCount;
    }
}

function getLeaderboard() {
    return Object.entries(leaderboard)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 5)
        .map(([username, score]) => ({ username, score }));
}

function isValidUsername(username) {
    return username &&
        username.trim() !== '' &&
        /^[a-zA-Z0-9_]+$/.test(username) &&
        username !== 'dog';
}

function createSession(username) {
    const sid = crypto.randomUUID();
    sessions[sid] = username;
    return sid;
}

function getUsername(sid) {
    return sessions[sid];
}

function removeSession(sid) {
    delete sessions[sid];
}

function createGame(username) {
    const secretWord = words[Math.floor(Math.random() * words.length)];
    games[username] = {
        secretWord,
        guesses: [],
        matchCounts: [],
    };
    console.log(`New game for ${username}. Secret word: ${secretWord}`);
}

function getGame(username) {
    return games[username];
}

function makeGuess(username, guess) {
    const game = games[username];
    if (!game) return null;

    const secretWord = game.secretWord.toLowerCase();
    guess = guess.toLowerCase();

    if (!words.includes(guess)) {
        return { valid: false, error: "Can only guess from list of possible words." };
    }

    if (game.guesses.includes(guess)) {
        return { valid: false, error: "Already guessed." };
    }

    const matchCount = countMatches(secretWord, guess);
    game.guesses.push(guess);
    game.matchCounts.push(matchCount);

    return {
        valid: true,
        correct: guess === secretWord,
        matchCount,
    };
}

function countMatches(word1, word2) {
    const letters1 = word1.split('');
    const letters2 = word2.split('');
    let matches = 0;

    for (let letter of letters2) {
        const index = letters1.indexOf(letter);
        if (index !== -1) {
            matches++;
            letters1.splice(index, 1);
        }
    }

    return matches;
}

module.exports = {
    isValidUsername,
    createSession,
    getUsername,
    removeSession,
    createGame,
    getGame,
    makeGuess,
    words,
    updateLeaderboard,
    getLeaderboard,
};
