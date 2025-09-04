import { products, state, getCartTotal, getTotalItems } from './model.js';

const renderProducts = () => {
  const productsSection = document.getElementById('products-section');

  productsSection.innerHTML = Object.values(products)
    .map(product => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-details">
          <h2>${product.name}</h2>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="button add-to-cart-btn" data-action="add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </article>
    `).join('');
};

const renderCart = () => {
  const cartSection = document.getElementById('cart-section');
  if (!state.isCartVisible) {
    const totalItems = getTotalItems();
    cartSection.innerHTML = `
      <button class="button view-cart-button" data-action="view-cart">
        View Cart ${totalItems > 0 ? `(${totalItems})` : ''}
      </button>
    `;
    return;
  }

  const cartItems = Object.entries(state.cart).map(([productId, quantity]) => {
    const product = products[productId];
    const total = (product.price * quantity).toFixed(2);
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)} each</p>
          <div class="quantity-control">
            <label for="quantity-${productId}">Quantity:</label>
            <input
              id="quantity-${productId}"
              type="number"
              class="quantity-input"
              value="${quantity}"
              min="1"
              data-action="update-quantity"
              data-product-id="${productId}"
            >
          </div>
          <p><strong>Total: $${total}</strong></p>
        </div>
      </div>
    `;
  }).join('');

  const cartTotal = getCartTotal().toFixed(2);
  cartSection.innerHTML = `
    <div class="cart-container">
      <button class="button hide-cart" data-action="hide-cart">Hide Cart</button>
      ${Object.keys(state.cart).length > 0
        ? `
        <div class="cart-items">
          ${cartItems}
        </div>
        <div class="cart-total">
          <p>Total: $${cartTotal}</p>
          <button class="button checkout-button" data-action="checkout">Checkout</button>
        </div>
        `
        : '<p class="empty-cart">Your cart is empty. Add some purr-fect items!</p>'
      }
    </div>
  `;
};

export { renderProducts, renderCart };
