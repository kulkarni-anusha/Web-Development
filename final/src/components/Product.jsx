import { useState } from 'react';
import './Product.css';
import { getImageUrl } from '../utils.js';

function Product({ product, onAddToCart, isLoggedIn, isAdmin }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const increaseQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getImageUrl('product.jpg');
          }}
        />
      </div>
      <div className="product-detail-info">
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        {isLoggedIn && !isAdmin ? (
          <div className="product-actions">
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                className="quantity-btn"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {addedToCart && (
              <div className="added-notification">
                Added to cart!
              </div>
            )}
          </div>
        ) : isAdmin ? (
          <div>
            Admin users cannot add products to cart
          </div>
        ) : (
          <div className="login-prompt">
            Please log in to add products to your cart
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;