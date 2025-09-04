import { useState } from 'react';
import './StoredWord.css';
function StoredWord({ storedWord, onUpdateWord }) {
    const [newWord, setNewWord] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateWord(newWord);
        setNewWord('');
    }

    return (
        <div className="stored-word">
            <div className="stored-word-display">
                <div className="stored-word-title">Your Stored Word</div>
                <p className="stored-word-value">{storedWord || 'No word stored yet'}</p>
            </div>
            <form className="stored-word-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="stored-word-label">
                        Enter your secret word
                        <div className="input-wrapper">
                            <input
                                className="stored-word-input"
                                value={newWord}
                                onChange={(e) => setNewWord(e.target.value)}
                                placeholder="Enter a new word"
                            />
                            <button type="submit" className="stored-word-btn">Update</button>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    );
}
export default StoredWord;