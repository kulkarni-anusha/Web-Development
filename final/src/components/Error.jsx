import { MESSAGES_TO_USER } from '../constants';
import './Error.css';

function Error({ error }) {
  const message = MESSAGES_TO_USER[error] || MESSAGES_TO_USER.default;

  if (!error) {
    return null;
  }

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">!</div>
        <div className="error-message">{message}</div>
        <button className="error-close">
          <img src="/close-icon.svg" alt="Close" />
        </button>
      </div>
    </div>
  );
}

export default Error;
