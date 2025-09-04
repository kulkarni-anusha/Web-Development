import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = loginName.trim();

    if (!trimmedName) {
      setError("Username cannot be empty.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmedName)) {
      setError("Username can only contain letters, digits, and underscores. Special characters are not allowed.");
      return;
    }

    if (trimmedName.toLowerCase() === 'dog') {
      setError("The username 'dog' is not allowed in this application. Please choose another username.");
      return;
    }

    setError('');
    onLogin(trimmedName);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Welcome</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={loginName}
              onInput={(e) => setLoginName(e.target.value)}
              placeholder="Enter your username"
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;