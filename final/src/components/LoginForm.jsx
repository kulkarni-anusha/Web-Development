import { useState } from 'react';
import { fetchLogin } from '../services';
import { MESSAGES_TO_USER, SERVER, CLIENT } from '../constants';
import './LoginForm.css';

function LoginForm({ onLogin, onRegisterClick, errorMessage }) {
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState(errorMessage || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');
    setLoading(true);

    fetchLogin(username)
      .then(userData => {
        setLoading(false);
        onLogin(userData.username);
      })
      .catch(err => {
        setLoading(false);

        if (err.error === SERVER.USERNAME_NOT_FOUND) {
          setFormError(MESSAGES_TO_USER[SERVER.USERNAME_NOT_FOUND]);
        } else if (err.error === SERVER.AUTH_INSUFFICIENT) {
          setFormError(MESSAGES_TO_USER[SERVER.AUTH_INSUFFICIENT]);
        } else if (err.error === 'networkError') {
          setFormError(MESSAGES_TO_USER[CLIENT.NETWORK_ERR]);
        } else if (err.error === SERVER.USER_BANNED) {
          setFormError(MESSAGES_TO_USER[SERVER.USER_BANNED]);
        } else if (err.error === SERVER.REQUIRED_USERNAME) {
          setFormError(MESSAGES_TO_USER[SERVER.REQUIRED_USERNAME]);
        } else if (err.error === SERVER.AUTH_MISSING) {
          setFormError(MESSAGES_TO_USER[SERVER.AUTH_MISSING]);
        } else {
          setFormError(MESSAGES_TO_USER.default);
        }
      });
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {formError && <div className="form-error">{formError}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={loading}
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="auth-switch">
          Don't have an account?{' '}
          <button
            type="button"
            className="switch-button"
            onClick={onRegisterClick}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;