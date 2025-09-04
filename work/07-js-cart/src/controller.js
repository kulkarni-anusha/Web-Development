import { addToCart, updateQuantity, clearCart, toggleCart } from './model.js';
import { renderProducts, renderCart } from './view.js';

const init = () => {
    renderProducts();
    renderCart();

    const appElement = document.querySelector('#app');

    appElement.addEventListener('click', (event) => {
        const target = event.target;
        const action = target.dataset.action;
        const productId = target.dataset.productId;

        if (action === 'add-to-cart') {
            addToCart(productId);
            renderCart();
        } else if (action === 'view-cart') {
            toggleCart();
            renderCart();
        } else if (action === 'hide-cart') {
            toggleCart();
            renderCart();
        } else if (action === 'checkout') {
            clearCart();
            toggleCart();
            renderCart();
        }
    });

    appElement.addEventListener('change', (event) => {
        const target = event.target;
        if (target.dataset.action === 'update-quantity') {
            const productId = target.dataset.productId;
            updateQuantity(productId, target.value);
            renderCart();
        }
    });
};

document.addEventListener('DOMContentLoaded', init);
