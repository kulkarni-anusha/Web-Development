import { useState, useEffect, useRef } from 'react';
import { fetchOrders } from '../services';
import Loading from './Loading';
import { getImageUrl } from '../utils.js';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pollingIntervalRef = useRef(null);

  const productImageMap = {
    'iPhone 13 Pro': 'iPhone-13-pro.jpg',
    'Samsung Galaxy S25': 'samsung-phone.jpg',
    'Google Pixel Phone': 'google-phone.jpg',
    'HP': 'hp.jpg',
    'MacBook Pro': 'macbook-pro.jpg',
    'Dell XPS 13': 'dell.jpg',
    'AirPods Pro': 'apple-airpods.jpg',
    'Sony WH-1000XM4': 'sony-headphones.jpg',
    'JBL Flip 6': 'jbl-speaker.jpg',
    'Apple Watch Series 8': 'apple-watch.jpg',
    'Samsung Galaxy Watch 5': 'samsung-watch.jpg',
    'Smart Ring': 'sleep-ring.jpg',
    'Wireless Mouse': 'mouse.jpg',
    'Apple Keyboard': 'keyboard.jpg',
    'MacBook Charger': 'macbook-charger.jpg',
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { date: formattedDate, time: formattedTime };
  };

  const loadOrders = (page = pagination.currentPage) => {
    const initialLoad = loading;
    if (initialLoad) {
      setLoading(true);
    }

    fetchOrders(page, 3)
      .then(data => {
        setOrders(data.orders);
        setPagination(data.pagination);
        if (initialLoad) {
          setLoading(false);
        }
        setError('');
      })
      .catch(err => {
        setError(err.message || 'Failed to load orders. Please try again.');
        if (initialLoad) {
          setLoading(false);
        }
        stopPolling();
      });
  };

  const handlePageChange = (newPage) => {
    loadOrders(newPage);
    window.scrollTo(0, 0);
  };

  const startPolling = () => {
    if (!pollingIntervalRef.current) {
      pollingIntervalRef.current = setInterval(() => {
        loadOrders(pagination.currentPage);
      }, 10000);
    }
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  useEffect(() => {
    loadOrders(1);

    startPolling();

    return () => {
      stopPolling();
    };
  }, []);

  if (loading && orders.length === 0) {
    return <Loading />;
  }

  if (error && orders.length === 0) {
    return (
      <div className="orders-error">
        <p>{error}</p>
        <button onClick={() => loadOrders(1)}>Retry</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>Your Orders</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>

      <div className="orders-list">
        {orders.map(order => {
          const { date, time } = formatDateTime(order.createdAt);
          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-header-left">
                  <h3>Order #{order.id.substring(0, 8)}</h3>
                  <div className="order-datetime">
                    <div className="order-date">{date}</div>
                    <div className="order-time">{time}</div>
                  </div>
                </div>
                <div className={`order-status status-${order.status === 'pending' ? 'successful' : order.status}`}>
                  {order.status === 'pending' ? 'successful' : order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={`${order.id}-${index}`} className="order-item">
                    <div className="item-image-container">
                      <img
                        src={getImageUrl(productImageMap[item.name] || item.image || 'product.jpg')}
                        alt={item.name}
                        className="item-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getImageUrl('product.jpg');
                        }}
                      />
                    </div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">x{item.quantity}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <div className="total-container">
                  <p className="total-label">Total:</p>
                  <p className="total-amount">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            disabled={!pagination.hasPreviousPage}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            aria-label="Previous page"
          >
            Prev
          </button>

          <div className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>

          <button
            className="pagination-btn"
            disabled={!pagination.hasNextPage}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;