import { useState, useEffect } from 'react';
import { formatPrice, getImageUrl } from '../utils';
import './Checkout.css';

function Checkout({ items, total, onPlaceOrder, onBackToCart, isLoading, orderSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    sameAsBilling: false,
    shippingAddress: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingCountry: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState('');


  const cart = {
    items: items.reduce((obj, item) => {
      obj[item.id] = {
        ...item,
        subtotal: item.price * item.quantity
      };
      return obj;
    }, {}),
    totalPrice: total
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));


    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };


  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };


  useEffect(() => {
    validateForm();
  }, [formData, touched]);


  const validateForm = () => {
    const newErrors = {};


    if (touched.fullName && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }


    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }


    if (touched.address && !formData.address.trim()) {
      newErrors.address = 'Address is required';
    }


    if (touched.city && !formData.city.trim()) {
      newErrors.city = 'City is required';
    }


    if (touched.zipCode) {
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'ZIP code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
      }
    }


    if (touched.country && !formData.country.trim()) {
      newErrors.country = 'Country is required';
    }


    if (touched.cardNumber) {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
    }


    if (touched.expiryDate) {
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      } else {

        const [month, year] = formData.expiryDate.split('/');
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const currentDate = new Date();

        if (expiryDate < currentDate) {
          newErrors.expiryDate = 'Card is expired';
        }
      }
    }


    if (touched.cvv) {
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV (3 or 4 digits)';
      }
    }


    if (!formData.sameAsBilling) {
      if (touched.shippingAddress && !formData.shippingAddress.trim()) {
        newErrors.shippingAddress = 'Shipping address is required';
      }

      if (touched.shippingCity && !formData.shippingCity.trim()) {
        newErrors.shippingCity = 'Shipping city is required';
      }

      if (touched.shippingZipCode) {
        if (!formData.shippingZipCode.trim()) {
          newErrors.shippingZipCode = 'Shipping ZIP code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.shippingZipCode)) {
          newErrors.shippingZipCode = 'Please enter a valid shipping ZIP code';
        }
      }

      if (touched.shippingCountry && !formData.shippingCountry.trim()) {
        newErrors.shippingCountry = 'Shipping country is required';
      }
    }

    setErrors(newErrors);

    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    validateForm();

    if (isFormValid) {
      try {
        onPlaceOrder({
          ...formData,
          shippingAddress: formData.sameAsBilling ? formData.address : formData.shippingAddress,
          shippingCity: formData.sameAsBilling ? formData.city : formData.shippingCity,
          shippingZipCode: formData.sameAsBilling ? formData.zipCode : formData.shippingZipCode,
          shippingCountry: formData.sameAsBilling ? formData.country : formData.shippingCountry
        });
      } catch (error) {
        setFormError('An error occurred while processing your order. Please try again.');
      }
    } else {
      setFormError('Please fix the errors in the form before placing your order.');
    }
  };

  let show = 'CONTENT';
  if (isLoading) {
    show = 'PENDING';
  } else if (Object.keys(cart.items).length === 0) {
    show = 'EMPTY';
  } else if (orderSuccess) {
    show = 'SUCCESS';
  }

  return (
    <div className={show === 'EMPTY' ? 'empty-checkout-container' : 'checkout-container'}>
      <h2>Checkout</h2>

      {show === 'PENDING' && (
        <div className="checkout-loading">
          <div className="loading-spinner"></div>
          <p>Processing your order...</p>
        </div>
      )}

      {show === 'EMPTY' && (
        <div>
          <p>Your cart is empty. Please add items to your cart before checkout.</p>
          <button onClick={onBackToCart} className="place-order-btn">
            Back to Cart
          </button>
        </div>
      )}

      {show === 'SUCCESS' && (
        <div className="order-success">
          <h3>Order Placed Successfully!</h3>
          <p>Thank you for your purchase.</p>
          <p>Your order has been received and is being processed.</p>
        </div>
      )}

      {show === 'CONTENT' && !orderSuccess && (
        <div>
          {formError && (
            <div className="checkout-error">
              {formError}
            </div>
          )}

          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="checkout-items">
              {Object.values(cart.items).map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item-image">
                    {item.image ?
                      <img src={getImageUrl(item.image)} alt={item.name} /> :
                      <div className="checkout-item-placeholder">{item.name.substring(0, 1)}</div>
                    }
                  </div>

                  <div className="checkout-item-details">
                    <h4 className="checkout-item-name">{item.name}</h4>
                    <p className="checkout-item-price">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>

                  <div className="checkout-item-total">
                    {formatPrice(item.subtotal)}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-total">
              <p>Total:</p>
              <p>{formatPrice(cart.totalPrice)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Billing Information</h3>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.city ? 'input-error' : ''}
                  />
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.zipCode ? 'input-error' : ''}
                  />
                  {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.country ? 'input-error' : ''}
                />
                {errors.country && <div className="error-message">{errors.country}</div>}
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Information</h3>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? 'input-error' : ''}
                />
                {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="MM/YY"
                    className={errors.expiryDate ? 'input-error' : ''}
                  />
                  {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="123"
                    className={errors.cvv ? 'input-error' : ''}
                  />
                  {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Shipping Information</h3>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="sameAsBilling"
                  name="sameAsBilling"
                  checked={formData.sameAsBilling}
                  onChange={handleChange}
                />
                <label htmlFor="sameAsBilling">Same as billing address</label>
              </div>

              {!formData.sameAsBilling && (
                <>
                  <div className="form-group">
                    <label htmlFor="shippingAddress">Address</label>
                    <input
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.shippingAddress ? 'input-error' : ''}
                    />
                    {errors.shippingAddress && <div className="error-message">{errors.shippingAddress}</div>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="shippingCity">City</label>
                      <input
                        type="text"
                        id="shippingCity"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.shippingCity ? 'input-error' : ''}
                      />
                      {errors.shippingCity && <div className="error-message">{errors.shippingCity}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="shippingZipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="shippingZipCode"
                        name="shippingZipCode"
                        value={formData.shippingZipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.shippingZipCode ? 'input-error' : ''}
                      />
                      {errors.shippingZipCode && <div className="error-message">{errors.shippingZipCode}</div>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="shippingCountry">Country</label>
                    <input
                      type="text"
                      id="shippingCountry"
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.shippingCountry ? 'input-error' : ''}
                    />
                    {errors.shippingCountry && <div className="error-message">{errors.shippingCountry}</div>}
                  </div>
                </>
              )}
            </div>

            <div className="checkout-actions">
              <button
                type="button"
                onClick={onBackToCart}
                className="back-to-cart-btn"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="place-order-btn"
                disabled={!isFormValid || isLoading}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;