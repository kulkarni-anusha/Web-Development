import { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '../services';
import Loading from './Loading';
import { getImageUrl } from '../utils.js';
import './Products.css';

function Products({ onProductSelect }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [imgErrors, setImgErrors] = useState({});

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const isResetting = useRef(false);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'smartphones', name: 'Smartphones', icon: 'smartphone-icon.svg' },
    { id: 'laptops', name: 'Laptops', icon: 'laptop-icon.svg' },
    { id: 'audio', name: 'Audio Gear', icon: 'audio-icon.svg' },
    { id: 'wearable', name: 'Wearable Tech', icon: 'watch-icon.svg' },
    { id: 'accessories', name: 'Accessories', icon: 'accessories-icon.svg' },
  ];

  const loadProducts = (page = 1, category = activeCategory) => {
    setLoading(true);

    const filters = {
      category,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      sortBy,
      sortOrder,
      search: searchQuery
    };

    fetchProducts(page, 9, filters)
      .then(data => {
        setProducts(data.products);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts(1, 'all');
  }, []);

  const handlePageChange = (newPage) => {
    loadProducts(newPage, activeCategory);
    window.scrollTo(0, 0);
  };

  const filterByCategory = (categoryId) => {
    setActiveCategory(categoryId);
    loadProducts(1, categoryId);
  };

  const handleSelectChange = (e) => {
    const categoryId = e.target.value;
    filterByCategory(categoryId);
  };


  const handleFilterSubmit = (e) => {
    e.preventDefault();

    if (searchQuery === '' &&
      activeCategory === 'all' &&
      minPrice === '' &&
      maxPrice === '' &&
      sortBy === 'name' &&
      sortOrder === 'asc') {
      handleResetFilters();
      return;
    }

    loadProducts(1);
  };


  const handleResetFilters = () => {
    isResetting.current = true;

    setMinPrice('');
    setMaxPrice('');
    setSortBy('name');
    setSortOrder('asc');
    setSearchQuery('');
    setActiveCategory('all');

    const resetFilters = {
      category: 'all',
      minPrice: null,
      maxPrice: null,
      sortBy: 'name',
      sortOrder: 'asc',
      search: ''
    };

    setLoading(true);
    fetchProducts(1, 9, resetFilters)
      .then(data => {
        setProducts(data.products);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });


    setTimeout(() => {
      isResetting.current = false;
    }, 100);
  };

  useEffect(() => {
    if (!isResetting.current && searchQuery === '') {
      if (activeCategory !== 'all' || minPrice !== '' || maxPrice !== '' ||
        sortBy !== 'name' || sortOrder !== 'asc') {
        loadProducts(1, activeCategory);
      }
    }
  }, [searchQuery, activeCategory, minPrice, maxPrice, sortBy, sortOrder]);

  const handleImageError = (productId) => {
    if (!imgErrors[productId]) {
      setImgErrors(prev => ({
        ...prev,
        [productId]: true
      }));
    }
  };

  if (loading && products.length === 0) {
    return <Loading />;
  }

  if (error && products.length === 0) {
    return (
      <div className="products-error">
        <p>{error}</p>
        <button onClick={() => loadProducts(1, activeCategory)}>Retry</button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="product-filters">
        <div className="search-container">
          <label htmlFor="search-input">Search Products</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFilterSubmit(e);
              }
            }}
            className="search-input"
          />
          <button className="search-button" onClick={handleFilterSubmit}>
            Search
          </button>
        </div>

        <div className="filter-section">
          <div className="price-range-section">
            <label className="filter-label">Price Range</label>
            <div className="price-range-inputs">
              <label htmlFor="min-price">Min Price</label>
              <input
                id="min-price"
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
                min="0"
              />
              <span className="price-separator">to</span>
              <label htmlFor="max-price">Max Price</label>
              <input
                id="max-price"
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
          </div>

          <div className="sort-section">
            <label className="filter-label">Sort By</label>
            <div className="sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="apply-filters-btn" onClick={handleFilterSubmit}>
              Apply Filters
            </button>
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-select-container">
        <select
          className="mobile-category-select"
          value={activeCategory}
          onChange={handleSelectChange}
          aria-label="Filter products by category"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => filterByCategory(category.id)}
          >
            {category.icon && (
              <img
                src={getImageUrl(category.icon)}
                alt=""
                className="category-icon"
                aria-hidden="true"
              />
            )}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="no-products-message">
          <p>No products found with the selected filters.</p>
          <button onClick={handleResetFilters} className="reset-search-btn">Clear Filters</button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => onProductSelect(product)}
            >
              <div className="product-image">
                {product.image && !imgErrors[product.id] ? (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div className="product-image">
                    <img
                      src={getImageUrl('product.jpg')}
                      alt={product.name}
                    />
                  </div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-category">
                  {categories.find(cat => cat.id === product.category)?.name || product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default Products;