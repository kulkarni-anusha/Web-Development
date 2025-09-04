'use strict';

import { randomUUID as uuid } from 'crypto';

const orders = {};

export function add(username, items, totalAmount) {
  const id = uuid();
  const timestamp = Date.now();
  const newOrder = {
    id,
    username,
    items,
    totalAmount: Number(totalAmount),
    status: 'pending',
    createdAt: timestamp,
  };

  if (!orders[username]) {
    orders[username] = [];
  }

  const isDuplicate = orders[username].some(order => {
    return JSON.stringify(order.items) === JSON.stringify(items) &&
      order.totalAmount === Number(totalAmount) &&
      Math.abs(order.createdAt - timestamp) < 5000;
  });

  if (!isDuplicate) {
    orders[username].push(newOrder);
  }

  return newOrder;
}

export function getByUser(username) {
  if (!orders[username]) {
    return [];
  }

  const contentMap = new Map();
  orders[username].forEach(order => {
    const contentKey = JSON.stringify({
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: order.totalAmount
    });

    if (!contentMap.has(contentKey) || order.createdAt > contentMap.get(contentKey).createdAt) {
      contentMap.set(contentKey, { ...order });
    }
  });

  return Array.from(contentMap.values())
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getByUserPaginated(username, page, limit) {
  if (!orders[username]) {
    return {
      orders: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: limit,
        hasNextPage: false,
        hasPreviousPage: false
      }
    };
  }

  const contentMap = new Map();
  orders[username].forEach(order => {
    const contentKey = JSON.stringify({
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: order.totalAmount
    });

    if (!contentMap.has(contentKey) || order.createdAt > contentMap.get(contentKey).createdAt) {
      contentMap.set(contentKey, { ...order });
    }
  });

  const allOrders = Array.from(contentMap.values())
    .sort((a, b) => b.createdAt - a.createdAt);

  const totalItems = allOrders.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedOrders = allOrders.slice(startIndex, endIndex);

  return {
    orders: paginatedOrders,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
}

export function getById(id) {
  for (const username in orders) {
    const userOrder = orders[username].find(order => order.id === id);
    if (userOrder) {
      return { ...userOrder };
    }
  }
  return null;
}

export function updateStatus(id, status) {
  for (const username in orders) {
    const orderIndex = orders[username].findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      orders[username][orderIndex].status = status;
      return { ...orders[username][orderIndex] };
    }
  }
  return null;
}