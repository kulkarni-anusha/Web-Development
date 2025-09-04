import { useState } from 'react';
import { fetchRegister } from '../services';
import { MESSAGES_TO_USER, SERVER } from '../constants';
import './RegisterForm.css';

function RegisterForm({ onLoginClick, errorMessage }) {
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState(errorMessage || '');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');
    setLoading(true);


    fetchRegister(username)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);

        if (err.error === SERVER.USERNAME_ALREADY_EXISTS) {
          setFormError(MESSAGES_TO_USER[SERVER.USERNAME_ALREADY_EXISTS]);
        } else if (err.error === 'networkError') {
          setFormError(MESSAGES_TO_USER[CLIENT.NETWORK_ERR]);
        } else if (err.error === SERVER.USER_BANNED) {
          setFormError(MESSAGES_TO_USER[SERVER.USER_BANNED]);
        } else if (err.error === SERVER.REQUIRED_USERNAME) {
          setFormError(MESSAGES_TO_USER[SERVER.REQUIRED_USERNAME]);
        } else if (err.error === SERVER.INVALID_USERNAME_PATTERN) {
          setFormError(MESSAGES_TO_USER[SERVER.INVALID_USERNAME_PATTERN]);
        } else {
          setFormError(MESSAGES_TO_USER.default);
        }
      });
  };

  if (success) {
    return (
      <div className="auth-form-container">
        <div className="auth-form">
          <h2>Registration Successful!</h2>
          <p>Your account has been created successfully.</p>
          <button
            className="auth-button"
            onClick={onLoginClick}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {formError && <div className="form-error">{formError}</div>}
        <div className="form-group">
          <label htmlFor="reg-username">Username</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            disabled={loading}
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="auth-switch">
          Already have an account?{' '}
          <button
            type="button"
            className="switch-button"
            onClick={onLoginClick}
            disabled={loading}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;