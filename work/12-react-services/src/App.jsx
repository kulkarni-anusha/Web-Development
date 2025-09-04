import { useState, useEffect } from 'react';
import './App.css';
import { LOGIN_STATUS, CLIENT, SERVER } from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  updateWord
} from './services';
import LoginForm from './components/LoginForm';
import StoredWord from './components/StoredWord';
import Loading from './components/Loading';
import Status from './components/ErrorAlert';

function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isWordPending, setIsWordPending] = useState(false);
  const [storedWord, setStoredWord] = useState('');

  function onLogin(username) {
    setError('');
    setIsWordPending(true);
    fetchLogin(username)
      .then(userData => {
        setUsername(username);
        setStoredWord(userData.storedWord || '');
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setIsWordPending(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        setIsWordPending(false);
      });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setStoredWord('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onUpdateWord(word) {
    setError('');
    setIsWordPending(true);
    updateWord(word)
      .then(data => {
        setStoredWord(data.storedWord);
        setIsWordPending(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        setIsWordPending(false);
      });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(data => {
        setStoredWord(data.storedWord || '');
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Word Storage App</h1>
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <button onClick={onLogout} className="logout-btn">Logout</button>
        )}
      </header>

      {error && <Status error={error} />}

      {loginStatus === LOGIN_STATUS.PENDING && (
        <Loading className="app-loading">Loading user...</Loading>
      )}

      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <LoginForm onLogin={onLogin} />
      )}

      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className="app-content">
          <div className="user-greeting">
            <p className="greeting-prefix">Hello,</p>
            <p className="greeting-username">{username}</p>
          </div>

          {isWordPending ? (
            <Loading className="app-loading">Loading word...</Loading>
          ) : (
            <StoredWord
              storedWord={storedWord}
              onUpdateWord={onUpdateWord}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;