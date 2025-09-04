import { useState } from 'react';
import './LoginForm.css';
function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username);
    }

    return (
        <div className="login">
            <div className="login-title">Welcome</div>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-label">
                    Username
                    <input
                        className="login-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Type your username"
                        autoFocus
                    />
                </label>
                <button className="login-btn" type="submit">Login</button>
            </form>
        </div>
    );
}
export default LoginForm;