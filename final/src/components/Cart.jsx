import { useState } from 'react';
import { getImageUrl } from '../utils.js';
import './Cart.css';

function Cart({ items, total, onUpdateQuantity, onRemoveItem, onClearCart, isLoggedIn, onCheckout }) {
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);


  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setCheckoutError('Please log in to checkout');
      return;
    }

    if (items.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    onCheckout();
  };


  if (items.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Your Cart</h2>
        <p>Your cart is empty. Add some products to get started.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {checkoutError && (
        <div className="cart-error">
          {checkoutError}
        </div>
      )}

      {checkoutSuccess && (
        <div className="cart-success">
          Order placed successfully! Thank you for your purchase.
        </div>
      )}

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={getImageUrl(item.image || 'product.jpg')}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getImageUrl('product.jpg');
                }}
              />
            </div>

            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <p className="quantity">{item.quantity}</p>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => onRemoveItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <img
                src={getImageUrl('delete-icon.svg')}
                alt="Remove"
                className="remove-icon"
              />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <p>Total:</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <div className="cart-actions">
          <button
            className="clear-cart-btn"
            onClick={onClearCart}
          >
            Clear Cart
          </button>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={!isLoggedIn || items.length === 0}
          >
            {isLoggedIn ? 'Checkout' : 'Login to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;