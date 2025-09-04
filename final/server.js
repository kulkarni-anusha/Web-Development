'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as sessions from './sessions.js';
import * as users from './users.js';
import * as products from './products.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as orders from './orders.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist'));

const validateSession = (req, res, next) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValid(sid)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  next();
};

const isAdmin = (req, res, next) => {
  const sid = req.cookies.sid;
  if (!sid) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const username = sessions.getUsername(sid);
  if (!username || !users.isAdmin(username)) {
    res.status(403).json({ error: 'no-permission' });
    return;
  }
  next();
};

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!username || !username.trim()) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'user-banned' });
    return;
  }

  if (!users.exists(username)) {
    res.status(401).json({ error: 'username-not-found' });
    return;
  }

  const sid = sessions.create(username);
  res.cookie('sid', sid, {
    sameSite: 'strict',
    httpOnly: true,
  });
  res.json({ username, isAdmin: users.isAdmin(username) });
});

app.post('/api/v1/users', (req, res) => {
  const { username } = req.body;

  if (!username || !username.trim()) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    res.status(400).json({ error: 'invalid-username-pattern' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'user-banned' });
    return;
  }

  if (users.exists(username)) {
    res.status(400).json({ error: 'username-already-exists' });
    return;
  }
  users.add(username);
  res.json({ username });
});

app.delete('/api/v1/session', validateSession, (req, res) => {
  const sid = req.cookies.sid;
  sessions.remove(sid);
  res.clearCookie('sid');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/v1/products', (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;

  const category = req.query.category;
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const searchQuery = req.query.search || '';

  const filteredData = products.getFilteredAndPaginated(
    page,
    limit,
    {
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      searchQuery
    }
  );

  res.json(filteredData);
});

app.get('/api/v1/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.getById(id);
  if (!product) {
    res.status(404).json({ error: 'no-such-product' });
    return;
  }
  res.json(product);
});

app.post('/api/v1/products', validateSession, isAdmin, (req, res) => {
  const { name, price, description, category, image } = req.body;

  if (!name || !price || !category) {
    res.status(400).json({ error: 'required-product-info' });
    return;
  }
  if (isNaN(Number(price)) || Number(price) <= 0) {
    res.status(400).json({ error: 'invalid-price' });
    return;
  }
  const newProduct = products.add({ name, price, description, category, image });
  res.json(newProduct);
});

app.put('/api/v1/products/:id', validateSession, isAdmin, (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, image } = req.body;

  if (!name || !price || !category) {
    res.status(400).json({ error: 'required-product-info' });
    return;
  }

  if (isNaN(Number(price)) || Number(price) <= 0) {
    res.status(400).json({ error: 'invalid-price' });
    return;
  }

  const replacedProduct = products.replace(id, {
    name,
    price,
    description,
    category,
    image
  });

  if (!replacedProduct) {
    res.status(404).json({ error: 'no-such-product' });
    return;
  }

  res.json(replacedProduct);
});

app.patch('/api/v1/products/:id', validateSession, isAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if ((updates.name !== undefined && !updates.name) ||
    (updates.category !== undefined && !updates.category)) {
    res.status(400).json({ error: 'required-product-info' });
    return;
  }

  if (updates.price !== undefined && (isNaN(Number(updates.price)) || Number(updates.price) <= 0)) {
    res.status(400).json({ error: 'invalid-price' });
    return;
  }

  const updatedProduct = products.update(id, updates);
  if (!updatedProduct) {
    res.status(404).json({ error: 'no-such-product' });
    return;
  }
  res.json(updatedProduct);
});

app.delete('/api/v1/products/:id', validateSession, isAdmin, (req, res) => {
  const { id } = req.params;
  if (!products.remove(id)) {
    res.status(404).json({ error: 'no-such-product' });
    return;
  }
  res.json({ message: 'Product deleted successfully' });
});

app.get('/api/v1/orders', validateSession, (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions.getUsername(sid);

  if (users.isAdmin(username)) {
    res.status(403).json({ error: 'admin-order-forbidden' });
    return;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;


  const paginatedOrders = orders.getByUserPaginated(username, page, limit);
  res.json(paginatedOrders);
});

app.post('/api/v1/orders', validateSession, (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions.getUsername(sid);
  const { items, totalAmount } = req.body;

  if (users.isAdmin(username)) {
    res.status(403).json({ error: 'admin-order-forbidden' });
    return;
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'invalid-order-items' });
    return;
  }
  if (!totalAmount || isNaN(Number(totalAmount)) || Number(totalAmount) <= 0) {
    res.status(400).json({ error: 'invalid-order-amount' });
    return;
  }
  const order = orders.add(username, items, totalAmount);
  res.json(order);
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/v1/')) {
    return next();
  }

  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});