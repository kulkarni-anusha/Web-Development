'use strict';

import { randomUUID as uuid } from 'crypto';

const products = {
  'p1': {
    id: 'p1',
    name: 'iPhone 13 Pro',
    price: 999.99,
    description: 'Sleek iPhone 13 Pro in Pacific Blue displayed on a textured concrete surface, showcasing its premium triple camera system. Premium smartphone priced at $999.99 with elegant design and advanced photography capabilities.',
    category: 'smartphones',
    image: 'iPhone-13-pro.jpg',
  },
  'p2': {
    id: 'p2',
    name: 'Samsung Galaxy S25',
    price: 899.99,
    description: 'Samsung Galaxy S25 smartphone displayed against a vibrant blue-lit background with artistic bokeh effects. Cutting-edge Android flagship device priced at $899.99 featuring a distinctive camera array and sophisticated design.',
    category: 'smartphones',
    image: 'samsung-phone.jpg',
  },
  'p3': {
    id: 'p3',
    name: 'Google Pixel Phone',
    price: 799.99,
    description: 'Google Pixel phone packaging displayed with the device partially visible alongside its retail box. Clean, minimalist Google hardware design priced at $799.99 emphasizing the brand focus on software integration and camera technology.',
    category: 'smartphones',
    image: 'google-phone.jpg',
  },
  'p4': {
    id: 'p4',
    name: 'HP',
    price: 1199.99,
    description: 'Sleek HP laptop with silver aluminum chassis displayed on a wooden surface, showcasing its minimalist design. Professional-grade computing device priced at $1199.99 combining performance and portability for work and creative tasks.',
    category: 'laptops',
    image: 'hp.jpg',
  },
  'p5': {
    id: 'p5',
    name: 'MacBook Pro',
    price: 1999.99,
    description: 'MacBook Pro laptop with vibrant display showing colorful wallpaper against a clean workspace background. Premium Apple computing device priced at $1999.99 featuring the signature unibody design and high-resolution screen.',
    category: 'laptops',
    image: 'macbook-pro.jpg',
  },
  'p6': {
    id: 'p6',
    name: 'Dell XPS 13',
    price: 1299.99,
    description: 'Dell XPS 13 laptop with dark chassis and compact form factor displayed against a neutral background. High-performance ultrabook priced at $1299.99 featuring thin bezels and professional-grade build quality.',
    category: 'laptops',
    image: 'dell.jpg',
  },
  'p7': {
    id: 'p7',
    name: 'Apple AirPods Pro',
    price: 249.99,
    description: 'Apple AirPods Pro in their charging case with lid open, displayed on a white surface. Premium wireless earbuds priced at $249.99 offering noise cancellation and seamless integration with Apple devices.',
    category: 'audio',
    image: 'apple-airpods.jpg',
  },
  'p8': {
    id: 'p8',
    name: 'Sony WH-1000XM4',
    price: 349.99,
    description: 'Sony WH-1000XM4 wireless headphones in black displayed against a neutral background. Industry-leading noise-canceling headphones priced at $349.99 known for exceptional sound quality and comfort.',
    category: 'audio',
    image: 'sony-headphones.jpg',
  },
  'p9': {
    id: 'p9',
    name: 'JBL Flip 6',
    price: 129.99,
    description: 'JBL Flip 6 portable Bluetooth speaker in black displayed on a wooden surface. Compact yet powerful audio device priced at $129.99 featuring durable fabric covering and signature JBL sound.',
    category: 'audio',
    image: 'jbl-speaker.jpg',
  },
  'p10': {
    id: 'p10',
    name: 'Apple Watch Series 8',
    price: 399.99,
    description: 'Apple Watch Series 8 with white band displayed on a clean surface next to its packaging. Versatile smartwatch priced at $399.99 combining health tracking features with seamless iOS integration.',
    category: 'wearable',
    image: 'apple-watch.jpg',
  },
  'p11': {
    id: 'p11',
    name: 'Samsung Galaxy Watch 5',
    price: 279.99,
    description: 'Samsung Galaxy Watch 5 with orange band displayed on a wrist with its interface illuminated. Advanced Android-compatible smartwatch priced at $279.99 featuring comprehensive health monitoring and customizable watch faces.',
    category: 'wearable',
    image: 'samsung-watch.jpg',
  },
  'p12': {
    id: 'p12',
    name: 'Smart Ring',
    price: 299.99,
    description: 'Sleek black Smart Ring displayed on a textured dark surface, showcasing its minimalist design. Innovative wearable technology priced at $299.99 that combines fashion with health and activity tracking capabilities.',
    category: 'wearable',
    image: 'sleep-ring.jpg',
  },
  'p13': {
    id: 'p13',
    name: 'Wireless Mouse',
    price: 49.99,
    description: 'White wireless mouse with minimalist design and Logitech branding displayed on a clean surface. Ergonomic computer peripheral priced at $49.99 offering precision tracking and comfortable usage.',
    category: 'accessories',
    image: 'mouse.jpg',
  },
  'p14': {
    id: 'p14',
    name: 'Apple Keyboard',
    price: 129.99,
    description: 'Compact apple keyboard with white keycaps displayed against a neutral background. Premium typing peripheral priced at $129.99 featuring tactile feedback and durable construction for enhanced productivity.',
    category: 'accessories',
    image: 'keyboard.jpg',
  },
  'p15': {
    id: 'p15',
    name: 'Apple MacBook Charger',
    price: 79.99,
    description: 'Apple MacBook charger with attached cable coiled neatly on a white surface. Essential Apple accessory priced at $79.99 providing fast charging capabilities for MacBook laptops.',
    category: 'accessories',
    image: 'macbook-charger.jpg',
  }
};

export function getAll() {
  return Object.values(products);
}

export function getByCategory(category) {
  return Object.values(products).filter(product => product.category === category);
}

export function getById(id) {
  return products[id];
}

export function getFilteredAndPaginated(page, limit, filters) {
  const {
    category,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    searchQuery
  } = filters;

  let filteredProducts = Object.values(products);

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  if (minPrice !== null) {
    filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
  }

  if (maxPrice !== null) {
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  }

  filteredProducts.sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'price') {
      comparison = a.price - b.price;
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    },
    filters: {
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      searchQuery
    }
  };
}

export function getPaginated(page, limit, category) {
  let allProducts = category && category !== 'all'
    ? getByCategory(category)
    : Object.values(products);

  const totalItems = allProducts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
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

export function add({ name, price, description, category, image }) {
  const id = uuid();
  const newProduct = {
    id,
    name,
    price: Number(price),
    description,
    category,
    image,
  };

  products[id] = newProduct;
  return newProduct;
}

export function update(id, updates) {
  if (!products[id]) {
    return null;
  }

  const updatedProduct = {
    ...products[id],
    ...updates,
    id,
  };

  if (updates.price) {
    updatedProduct.price = Number(updates.price);
  }

  products[id] = updatedProduct;
  return updatedProduct;
}

export function replace(id, { name, price, description, category, image }) {
  if (!products[id]) {
    return null;
  }

  const replacedProduct = {
    id,
    name,
    price: Number(price),
    description: description || '',
    category,
    image: image || 'product.jpg'
  };

  products[id] = replacedProduct;
  return replacedProduct;
}

export function remove(id) {
  if (!products[id]) {
    return false;
  }

  delete products[id];
  return true;
}