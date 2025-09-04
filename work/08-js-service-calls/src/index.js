import { loginView, showSecret, errorView } from './views.js';
import { fetchLogin, checkSession, getSecret, putSecret, fetchLogout } from './services.js';
import { MESSAGES } from './services.js';

const clientState = {
    username: null,
    errorMessage: null,
    secretErrorMessage: null
};

function render() {
    const appEl = document.getElementById('app');

    if (clientState.errorMessage) {
        const friendlyError = MESSAGES[clientState.errorMessage] || clientState.errorMessage;
        appEl.innerHTML = errorView(friendlyError);
        return;
    }

    if (clientState.username) {
        getSecret()
            .then(({ username, storedWord }) => {
                const friendlySecretError = clientState.secretErrorMessage ?
                    (MESSAGES[clientState.secretErrorMessage] || clientState.secretErrorMessage) : null;
                appEl.innerHTML = showSecret(username, storedWord, friendlySecretError);
                clientState.secretErrorMessage = null;
            })
            .catch((err) => {
                if (err.error === 'auth-missing') {
                    clientState.username = null;
                    render();
                } else {
                    clientState.errorMessage = err.error;
                    render();
                }
            });
    } else {
        const friendlyError = clientState.errorMessage ?
            (MESSAGES[clientState.errorMessage] || clientState.errorMessage) : null;
        appEl.innerHTML = loginView(friendlyError);
        clientState.errorMessage = null;
    }
}

function pageLoad() {
    checkSession()
        .then(({ username }) => {
            clientState.username = username;
            render();
        })
        .catch(() => {
            render();
        });
}

pageLoad();

document.addEventListener('click', (e) => {
    if (e.target.id === 'login-button') {
        e.preventDefault();
        const username = document.getElementById('username').value;
        fetchLogin(username)
            .then(({ username }) => {
                clientState.username = username;
                clientState.errorMessage = null;
                render();
            })
            .catch((err) => {
                clientState.errorMessage = err.error;
                render();
            });
    }

    if (e.target.id === 'update-button') {
        e.preventDefault();
        const word = document.getElementById('secret-input').value;
        if (!word.trim()) {
            clientState.secretErrorMessage = 'required-word';
            render();
            return;
        }
        putSecret(word)
            .then(() => {
                clientState.secretErrorMessage = null;
                render();
            })
            .catch((err) => {
                clientState.secretErrorMessage = err.error;
                render();
            });
    }

    if (e.target.id === 'logout-button') {
        fetchLogout()
            .then(() => {
                clientState.username = null;
                clientState.errorMessage = null;
                clientState.secretErrorMessage = null;
                render();
            })
            .catch((err) => {
                clientState.errorMessage = err.error;
                render();
            });
    }

    if (e.target.id === 'home-link') {
        e.preventDefault();
        clientState.errorMessage = null;
        render();
    }
});