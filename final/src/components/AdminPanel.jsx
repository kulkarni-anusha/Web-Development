import { useState, useEffect } from 'react';
import {
  fetchProducts,
  fetchAddProduct,
  fetchUpdateProduct,
  fetchDeleteProduct
} from '../services';
import Loading from './Loading';
import { getImageUrl } from '../utils.js';
import { MESSAGES_TO_USER, SERVER } from '../constants';
import './AdminPanel.css';

function AdminPanel({ errorMessage, onClearError }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const categories = [
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'audio', name: 'Audio Gear' },
    { id: 'wearable', name: 'Wearable Tech' },
    { id: 'accessories', name: 'Accessories' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [errorMessage]);

  const loadProducts = () => {
    setLoading(true);
    fetchProducts()
      .then(data => {
        const productsList = Array.isArray(data) ? data : data.products || [];
        setProducts(productsList);
        setLoading(false);
      })
      .catch(err => {
        setError(MESSAGES_TO_USER[err.error] || 'Failed to load products. Please try again.');
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (formError) {
      setFormError('');
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      category: product.category,
      image: product.image || ''
    });
    setFormError('');
    setFormSuccess('');
    setShowForm(true);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    resetForm();
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setCurrentProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      image: ''
    });
    setFormError('');
    setFormSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');
    setLoading(true);

    const submissionData = {
      ...formData,
      price: parseFloat(formData.price || 0),
      image: formData.image.trim() || 'product.jpg'
    };

    if (isEditing && currentProduct) {
      fetchUpdateProduct(currentProduct.id, submissionData)
        .then(updatedProduct => {
          setProducts(products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
          ));
          setFormSuccess('Product updated successfully!');
          setLoading(false);
          setTimeout(() => {
            setShowForm(false);
            resetForm();
          }, 1500);
        })
        .catch(err => {
          setLoading(false);
          console.log("Error from server:", err.error);

          if (err.error === 'required-product-info') {
            setFormError(MESSAGES_TO_USER[SERVER.PRODUCT_INFO_MISSING]);
          } else if (err.error === 'invalid-price') {
            setFormError(MESSAGES_TO_USER[SERVER.INVALID_PRICE]);
          } else {
            setFormError(MESSAGES_TO_USER.default);
          }
        });
    } else {
      fetchAddProduct(submissionData)
        .then(newProduct => {
          setProducts([...products, newProduct]);
          setFormSuccess('Product added successfully!');
          setLoading(false);
          setTimeout(() => {
            setShowForm(false);
            resetForm();
          }, 1500);
        })
        .catch(err => {
          setLoading(false);
          console.log("Error from server:", err.error);

          if (err.error === 'required-product-info') {
            setFormError(MESSAGES_TO_USER[SERVER.PRODUCT_INFO_MISSING]);
          } else if (err.error === 'invalid-price') {
            setFormError(MESSAGES_TO_USER[SERVER.INVALID_PRICE]);
          } else {
            setFormError(MESSAGES_TO_USER.default);
          }
        });
    }
  };

  const handleDelete = (productId) => {
    setLoading(true);
    fetchDeleteProduct(productId)
      .then(() => {
        setProducts(products.filter(p => p.id !== productId));
        if (currentProduct && currentProduct.id === productId) {
          handleCancel();
        }
        setLoading(false);
      })
      .catch(err => {
        setError(MESSAGES_TO_USER[SERVER.PRODUCT_DELETE_FAILED]);
        setLoading(false);
      });
  };

  const clearLocalError = () => {
    setError('');
    if (onClearError) {
      onClearError();
    }
  };

  if (loading && products.length === 0) {
    return <Loading />;
  }

  if (error && products.length === 0) {
    return (
      <div className="admin-error">
        <p>{error}</p>
        <button onClick={() => { clearLocalError(); loadProducts(); }}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button
          className="add-product-btn"
          onClick={handleAddNew}
        >
          Add New Product
        </button>
      </div>

      {showForm ? (
        <div className="product-form-container">
          <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>

          {formError && (
            <div className="form-error">
              <p>{formError}</p>
            </div>
          )}

          {formSuccess && (
            <div className="form-success">
              <p>{formSuccess}</p>
            </div>
          )}

          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image Filename</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="e.g., product.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-products">
                    No products found. Add some products to get started.
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td className="image-cell">
                      {product.image ? (
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="product-thumbnail"
                          onError={(e) => {
                            e.target.src = getImageUrl('product.jpg');
                          }}
                        />
                      ) : (
                        <div className="product-name-placeholder">
                          <img
                            src={getImageUrl('product.jpg')}
                            alt={product.name}
                            className="product-thumbnail"
                          />
                        </div>
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</td>
                    <td>{categories.find(c => c.id === product.category)?.name || product.category}</td>
                    <td className="actions-cell">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(product)}
                        aria-label="Edit product"
                      >
                        <img
                          src={getImageUrl("edit-icon.svg")}
                          alt="Edit"
                        />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.id)}
                        aria-label="Delete product"
                      >
                        <img
                          src={getImageUrl("delete-icon.svg")}
                          alt="Delete"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;