import { MESSAGES } from '../constants';
import './ErrorAlert.css';

function ErrorAlert({ error = '' }) {
  const message = MESSAGES[error] || MESSAGES.default;

  return (
    <div className="error">
      {error && (
        <>
          <div className="error-icon">!</div>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}

export default ErrorAlert;