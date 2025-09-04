'use strict';

function fetchHandler(response) {
  if (!response.ok) {
    return response.json().then(err => {
      if (response.status === 400) {
        throw { error: err.error || 'required-product-info' };
      } else if (response.status === 400) {
        throw { error: err.error || 'invalid-price' };
      } else if (response.status === 401) {
        throw { error: err.error || 'auth-missing' };
      } else if (response.status === 403) {
        throw { error: err.error || 'no-permission' };
      } else if (response.status === 400) {
        throw { error: err.error || 'not-found' };
      } else {
        throw { error: err.error || 'Server error' };
      }
    }).catch(processError => {
      if (processError.error) {
        throw processError;
      }
      throw { error: 'networkError' };
    });
  }
  return response.json();
}

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
    credentials: 'same-origin',
  })
    .catch(() => {
      throw { error: 'networkError' };
    })
    .then(fetchHandler);
}

export function fetchRegister(username) {
  return fetch('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
    credentials: 'same-origin',
  })
    .catch(() => {
      throw { error: 'networkError' };
    })
    .then(fetchHandler);
}

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
    credentials: 'same-origin',
  })
    .then(fetchHandler);
}

export function fetchCheckSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(fetchHandler);
}

export function fetchProducts(page = 1, limit = 9, filters = {}) {
  let queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  if (filters.category && filters.category !== 'all') {
    queryParams.append('category', filters.category);
  }

  if (filters.minPrice) {
    queryParams.append('minPrice', filters.minPrice);
  }

  if (filters.maxPrice) {
    queryParams.append('maxPrice', filters.maxPrice);
  }

  if (filters.sortBy) {
    queryParams.append('sortBy', filters.sortBy);
  }

  if (filters.sortOrder) {
    queryParams.append('sortOrder', filters.sortOrder);
  }

  if (filters.search) {
    queryParams.append('search', filters.search);
  }

  return fetch(`/api/v1/products?${queryParams.toString()}`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(fetchHandler);
}

let productsCache = null;

export function fetchProductById(id) {
  if (productsCache) {
    const product = productsCache.find(p => p.id === id);
    if (product) {
      return Promise.resolve(product);
    }
  }

  return fetch(`/api/v1/products/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(fetchHandler)
    .catch(err => {
      if (!productsCache) {
        return fetchProducts()
          .then(data => {
            productsCache = data.products;
            const product = productsCache.find(p => p.id === id);
            if (product) {
              return product;
            }
            throw { error: 'Product not found' };
          });
      }
      throw err;
    });
}

export function fetchAddProduct(productData) {
  return fetch('/api/v1/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
    credentials: 'same-origin',
  })
    .catch(() => {
      throw { error: 'networkError' };
    })
    .then(fetchHandler)
    .then(newProduct => {
      if (productsCache) {
        productsCache.push(newProduct);
      }
      return newProduct;
    });
}

export function fetchReplaceProduct(id, productData) {
  return fetch(`/api/v1/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
    credentials: 'same-origin',
  })
    .catch(() => {
      throw { error: 'networkError' };
    })
    .then(fetchHandler)
    .then(replacedProduct => {
      if (productsCache) {
        productsCache = productsCache.map(p =>
          p.id === replacedProduct.id ? replacedProduct : p
        );
      }
      return replacedProduct;
    });
}

export function fetchUpdateProduct(id, updates) {
  return fetch(`/api/v1/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
    credentials: 'same-origin',
  })
    .catch(() => {
      throw { error: 'networkError' };
    })
    .then(fetchHandler)
    .then(updatedProduct => {
      if (productsCache) {
        productsCache = productsCache.map(p =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
      }
      return updatedProduct;
    });
}

export function fetchDeleteProduct(id) {
  return fetch(`/api/v1/products/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })
    .catch(() => {
      throw { error: 'networkError' };
    })
    .then(fetchHandler)
    .then(result => {
      if (productsCache) {
        productsCache = productsCache.filter(p => p.id !== id);
      }
      return result;
    });
}

export function fetchOrders(page = 1, limit = 5) {
  let queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  return fetch(`/api/v1/orders?${queryParams.toString()}`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(fetchHandler);
}

export function fetchCreateOrder(orderData) {
  return fetch('/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
    credentials: 'same-origin',
  })
    .then(fetchHandler);
}