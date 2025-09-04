'use strict';

export function getImageUrl(image) {
  return new URL(`./assets/${image}`, import.meta.url).href;
}

export function formatPrice(price, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}