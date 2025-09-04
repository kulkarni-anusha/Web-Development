const products = {
    jorts: {
        id: 'jorts',
        name: 'Jorts',
        price: 0.99,
        image: 'http://placehold.co/150x150?text=Jorts'
    },
    jean: {
        id: 'jean',
        name: 'Jean',
        price: 3.14,
        image: 'http://placehold.co/150x150?text=Jean'
    },
    nyancat: {
        id: 'nyancat',
        name: 'Nyancat',
        price: 2.73,
        image: 'http://placehold.co/150x150?text=Nyancat'
    }
};

const state = {
    cart: {},
    isCartVisible: false
};

const addToCart = (productId) => {
    if (!state.cart[productId]) {
        state.cart[productId] = 1;
    } else {
        state.cart[productId] += 1;
    }
};

const updateQuantity = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
        state.cart[productId] = newQuantity;
    } else {
        delete state.cart[productId];
    }
};

const clearCart = () => {
    state.cart = {};
};

const toggleCart = () => {
    state.isCartVisible = !state.isCartVisible;
};

const getCartTotal = () => {
    return Object.entries(state.cart).reduce((total, [productId, quantity]) => {
        return total + (products[productId].price * quantity);
    }, 0);
};

const getTotalItems = () => {
    return Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0);
};

export {
    products,
    state,
    addToCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getCartTotal,
    getTotalItems
};