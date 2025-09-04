import { useState } from 'react';
import { compareWords } from './compareWords';
import './Game.css';

function Game({ username, onLogout }) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const secretWord = 'RECAT';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCorrect(false);

    const currentGuess = guess.trim();
    setGuess('');

    if (currentGuess === '') {
      setMessage('Cannot be empty. Please guess a 5-letter word.');
      return;
    }

    if (currentGuess.length !== 5) {
      setMessage(`${currentGuess} was not a valid word`);
      return;
    }

    if (currentGuess.toUpperCase() === secretWord) {
      setMessage(`${currentGuess} is the secret word!`);
      setIsCorrect(true);
      return;
    }

    const commonLetters = compareWords(currentGuess, secretWord);
    setMessage(`${currentGuess} had ${commonLetters} letters in common`);
  };

  return (
    <div className="game-wrapper">
      <div className="game-header">
        <div className="user-greeting">Hello {username}</div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>

      <div className="game-content">
        <div className="game-intro">
          <h1>Guess the secret 5-letter Word</h1>
        </div>

        <div className="guess-container">
          <label htmlFor="guess-input" className="guess-label">Enter your Guess</label>

          <form className="guess-form" onSubmit={handleSubmit}>
            <input
              id="guess-input"
              type="text"
              className="guess-input"
              value={guess}
              onInput={(e) => setGuess(e.target.value)}
              placeholder="Type a 5-letter word..."
            />
            <button type="submit" className="guess-button">Guess</button>
          </form>

          {message && (
            <div className={`guess-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;