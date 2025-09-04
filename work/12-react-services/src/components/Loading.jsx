import './Loading.css';

function Loading({ className = 'loading', children = 'Loading...' }) {
    return (
        <div className={`loading ${className}`}>
            <div className="loading-spinner"></div>
            <p>{children}</p>
        </div>
    );
}

export default Loading;