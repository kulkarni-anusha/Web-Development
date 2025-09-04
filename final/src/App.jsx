import { useReducer, useEffect } from 'react';
import { fetchLogin, fetchLogout, fetchCheckSession, fetchProductById, fetchCreateOrder } from './services';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import Product from './components/Product';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import AdminPanel from './components/AdminPanel';
import Loading from './components/Loading';
import { ACTIONS } from './constants';
import reducer, { initialState } from './reducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    username,
    isLoggedIn,
    isAdmin,
    view,
    selectedProduct,
    cart,
    error,
    loading,
    orderSuccess,
    isOrderProcessing,
    showLoginForm,
    showRegisterForm
  } = state;

  function getViewFromPath(path) {
    switch (path) {
      case '/cart':
        return 'cart';
      case '/checkout':
        return 'checkout';
      case '/orders':
        return 'orders';
      case '/admin':
        return 'admin';
      case '/login':
        return 'login';
      case '/register':
        return 'register';
      default:
        if (path.startsWith('/product/')) {
          return 'product';
        }
        return 'products';
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    const initialView = getViewFromPath(path);

    dispatch({ type: ACTIONS.NAVIGATE, view: initialView });

    if (initialView === 'product') {
      const productId = path.split('/').pop();
      if (productId) {
        dispatch({ type: ACTIONS.SET_LOADING, loading: true });
        fetchProductById(productId)
          .then(product => {
            dispatch({ type: ACTIONS.SELECT_PRODUCT, product });
            dispatch({ type: ACTIONS.SET_LOADING, loading: false });
          })
          .catch(err => {
            dispatch({ type: ACTIONS.SET_ERROR, error: 'Product not found' });
            dispatch({ type: ACTIONS.SET_LOADING, loading: false });
            goToProducts();
          });
      }
    }

    if (initialView === 'login') {
      dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: true });
    } else if (initialView === 'register') {
      dispatch({ type: ACTIONS.SHOW_REGISTER_FORM, show: true });
    }
  }, []);

  useEffect(() => {
    function handlePopState() {
      const path = window.location.pathname;
      const newView = getViewFromPath(path);

      dispatch({ type: ACTIONS.NAVIGATE, view: newView });

      if (newView === 'products') {
        dispatch({ type: ACTIONS.CLEAR_PRODUCT });
        dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: false });
        dispatch({ type: ACTIONS.SHOW_REGISTER_FORM, show: false });
      } else if (newView === 'product') {
        const productId = path.split('/').pop();
        if (productId) {
          dispatch({ type: ACTIONS.SET_LOADING, loading: true });
          fetchProductById(productId)
            .then(product => {
              dispatch({ type: ACTIONS.SELECT_PRODUCT, product });
              dispatch({ type: ACTIONS.SET_LOADING, loading: false });
            })
            .catch(err => {
              dispatch({ type: ACTIONS.SET_ERROR, error: 'Product not found' });
              dispatch({ type: ACTIONS.SET_LOADING, loading: false });
              goToProducts();
            });
        }
      } else if (newView === 'login') {
        dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: true });
        dispatch({ type: ACTIONS.SHOW_REGISTER_FORM, show: false });
      } else if (newView === 'register') {
        dispatch({ type: ACTIONS.SHOW_REGISTER_FORM, show: true });
        dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: false });
      }

      dispatch({ type: ACTIONS.SET_ERROR, error: '' });
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    fetchCheckSession()
      .then(data => {
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          username: data.username,
          isAdmin: data.isAdmin
        });
      })
      .catch(() => {
      });
  }, []);

  const handleLogin = (username) => {
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
    dispatch({ type: ACTIONS.SET_LOADING, loading: true });

    fetchLogin(username)
      .then(data => {
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          username: data.username,
          isAdmin: data.isAdmin
        });
        dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: false });
        window.history.pushState(null, '', '/');
        dispatch({ type: ACTIONS.NAVIGATE, view: 'products' });
        dispatch({ type: ACTIONS.SET_LOADING, loading: false });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.SET_ERROR, error: err.message || 'Login failed' });
        dispatch({ type: ACTIONS.SET_LOADING, loading: false });
      });
  };

  const handleLogout = () => {
    dispatch({ type: ACTIONS.SET_LOADING, loading: true });

    fetchLogout()
      .then(() => {
        dispatch({ type: ACTIONS.LOGOUT });
        window.history.pushState(null, '', '/');
        dispatch({ type: ACTIONS.SET_LOADING, loading: false });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.SET_ERROR, error: err.message });
        dispatch({ type: ACTIONS.SET_LOADING, loading: false });
      });
  };

  const goToProducts = () => {
    window.history.pushState(null, '', '/');
    dispatch({ type: ACTIONS.NAVIGATE, view: 'products' });
    dispatch({ type: ACTIONS.CLEAR_PRODUCT });
    dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: false });
    dispatch({ type: ACTIONS.SHOW_REGISTER_FORM, show: false });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const goToProduct = (product) => {
    if (isAdmin) {
      return;
    }
    window.history.pushState(null, '', `/product/${product.id}`);
    dispatch({ type: ACTIONS.SELECT_PRODUCT, product });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const goToCart = () => {
    if (isAdmin) {
      return;
    }
    window.history.pushState(null, '', '/cart');
    dispatch({ type: ACTIONS.NAVIGATE, view: 'cart' });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const goToCheckout = () => {
    if (isAdmin || !isLoggedIn) {
      return;
    }
    if (cart.length === 0) {
      dispatch({ type: ACTIONS.SET_ERROR, error: 'Your cart is empty. Add some products before proceeding to checkout.' });
      return;
    }
    window.history.pushState(null, '', '/checkout');
    dispatch({ type: ACTIONS.NAVIGATE, view: 'checkout' });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const goToOrders = () => {
    if (!isLoggedIn) {
      dispatch({ type: ACTIONS.SET_ERROR, error: 'Please log in to view your orders' });
      showLogin();
      return;
    }
    window.history.pushState(null, '', '/orders');
    dispatch({ type: ACTIONS.NAVIGATE, view: 'orders' });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const goToAdmin = () => {
    if (!isAdmin) {
      dispatch({ type: ACTIONS.SET_ERROR, error: 'You do not have permission to access the admin panel' });
      return;
    }
    window.history.pushState(null, '', '/admin');
    dispatch({ type: ACTIONS.NAVIGATE, view: 'admin' });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const addToCart = (product, quantity = 1) => {
    if (isAdmin) {
      return;
    }
    dispatch({ type: ACTIONS.ADD_TO_CART, product, quantity });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: ACTIONS.UPDATE_CART_QUANTITY, productId, quantity });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, productId });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (isOrderProcessing || loading) {
      return;
    }

    if (!isLoggedIn) {
      dispatch({ type: ACTIONS.SET_ERROR, error: 'Please log in to place an order' });
      return;
    }

    if (cart.length === 0) {
      dispatch({ type: ACTIONS.SET_ERROR, error: 'Your cart is empty' });
      return;
    }

    dispatch({ type: ACTIONS.START_ORDER_PROCESSING });

    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: cartTotal
    };

    fetchCreateOrder(orderData)
      .then(() => {
        dispatch({ type: ACTIONS.ORDER_SUCCESS });
        setTimeout(() => {
          dispatch({ type: ACTIONS.CLEAR_CART });
          dispatch({ type: ACTIONS.RESET_ORDER_STATUS });
          window.history.pushState(null, '', '/');
          dispatch({ type: ACTIONS.NAVIGATE, view: 'products' });
        }, 3000);
      })
      .catch(err => {
        dispatch({ type: ACTIONS.SET_ERROR, error: err.message });
        dispatch({ type: ACTIONS.SET_LOADING, loading: false });
        dispatch({ type: ACTIONS.SET_ORDER_PROCESSING, processing: false });
      });
  };

  const showLogin = () => {
    window.history.pushState(null, '', '/login');
    dispatch({ type: ACTIONS.SHOW_LOGIN_FORM, show: true });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const showRegister = () => {
    window.history.pushState(null, '', '/register');
    dispatch({
      type: ACTIONS.SHOW_REGISTER_FORM,
      show: true
    });
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.SET_ERROR, error: '' });
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    const commonProps = {
      onClearError: clearError,
      errorMessage: error
    };

    if (showLoginForm) {
      return <LoginForm
        onLogin={handleLogin}
        onRegisterClick={showRegister}
        {...commonProps}
      />;
    }

    if (showRegisterForm) {
      return <RegisterForm
        onLoginClick={showLogin}
        {...commonProps}
      />;
    }

    switch (view) {
      case 'products':
        return <Products
          onProductSelect={goToProduct}
          isAdmin={isAdmin}
          {...commonProps}
        />;
      case 'product':
        return (
          <Product
            product={selectedProduct}
            onAddToCart={addToCart}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            {...commonProps}
          />
        );
      case 'cart':
        if (isAdmin) {
          return <Products
            onProductSelect={goToProduct}
            isAdmin={isAdmin}
            {...commonProps}
          />;
        }
        return (
          <Cart
            items={cart}
            total={cartTotal}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            isLoggedIn={isLoggedIn}
            onCheckout={goToCheckout}
            {...commonProps}
          />
        );
      case 'checkout':
        if (isAdmin) {
          return <Products
            onProductSelect={goToProduct}
            isAdmin={isAdmin}
            {...commonProps}
          />;
        }
        return (
          <Checkout
            items={cart}
            total={cartTotal}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={goToCart}
            isLoading={loading || isOrderProcessing}
            orderSuccess={orderSuccess}
            {...commonProps}
          />
        );
      case 'orders':
        return <Orders {...commonProps} />;
      case 'admin':
        return <AdminPanel {...commonProps} />;
      default:
        return <Products
          onProductSelect={goToProduct}
          isAdmin={isAdmin}
          {...commonProps}
        />;
    }
  };

  return (
    <div className="app">
      <Header
        username={username}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)}
        onLoginClick={showLogin}
        onLogoutClick={handleLogout}
        onCartClick={goToCart}
        onHomeClick={goToProducts}
        onOrdersClick={goToOrders}
        onAdminClick={goToAdmin}
      />
      <main className="content">
        {error && (
          <div className="error-container">
            <div className="error-content">
              <div className="error-icon">!</div>
              <div className="error-message">{error}</div>
              <button className="error-close" onClick={clearError}>
                <img src="/close-icon.svg" alt="Close" />
              </button>
            </div>
          </div>
        )}
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;