# TechNest Electronics

TechNest Electronics is a comprehensive e-commerce web application built with React and Express. The application offers a complete shopping experience where users can browse electronics products, manage their shopping cart, place orders, and view their order history. It also includes an admin panel for product management with full CRUD operations.

## Features Breakdown

### Core Components
- App.jsx: Main application container that manages routing, state, and renders different views
- Header.jsx: Navigation component with responsive design and role-based menu options
- Footer.jsx: Simple footer component with copyright information
- Loading.jsx: Loading spinner component displayed during asynchronous operations
- Error.jsx: Error display component for consistent error messaging

### User Authentication Flow
1. User Registration: New users register via RegisterForm component
   - Input validation for username
   - Error handling for existing usernames or banned users
   - Success confirmation and redirection to login
2. User Login: Existing users log in via LoginForm component
   - Username validation
   - Session creation via cookie
   - Role determination (admin vs regular user)
3. Session Management: Backend validates session for protected operations
   - Cookie-based session tracking
   - Session expiration handling
   - Role-based access control

### Product Management System
1. Product Listing: AdminPanel displays all products in a table
   - Sortable columns
   - Pagination controls
   - Image thumbnails
2. Product Creation/Editing: Form with validation for all fields
   - Required field validation
   - Price format validation
   - Image path handling
   - Success/error feedback
3. Product Deletion: Confirmation and removal from database
   - Immediate UI update
   - Error handling for failed deletions

### Shopping Experience
1. Product Browsing: Products component with filtering and search
   - Category-based filtering
   - Price range filtering
   - Text search functionality
   - Sorting options (name/price, asc/desc)
2. Product Details: Detailed view of selected product
   - Complete product information
   - Add to cart functionality with quantity selection
   - Dynamic UI based on user role
3. Shopping Cart: Cart management with real-time calculations
   - Add/remove items
   - Quantity adjustments
   - Subtotal and total calculations
   - Clear cart function
4. Checkout Process: Multi-step form with validation
   - Billing information
   - Payment information with card validation
   - Shipping information with same-as-billing option
   - Order confirmation

### Order Management
1. Order Creation: Backend processing of cart into orders
   - Validation of order data
   - User association
   - Timestamp and status assignment
2. Order Listing: Display of user's order history
   - Chronological listing
   - Status indicators
   - Detailed product information
   - Pagination support
3. Real-time Updates: Polling for order status changes
   - Automatic refresh of order data
   - Clean polling implementation with cleanup

### State Management
1. Global State: Reducer-based state management
   - Action types defined in constants.js
   - Reducer function in reducer.js
   - Initial state definition
2. Component State: Local state for component-specific data
   - Form state management
   - UI state (loading, errors, success messages)
   - Pagination state

### Data Services
1. User Services: Authentication and user management
   - Registration
   - Login/logout
   - Session validation
2. Product Services: Product data operations
   - Fetching with filters
   - Creation/updating
   - Deletion
3. Order Services: Order processing
   - Creation
   - Retrieval with pagination
   - Status updates

## Features

### User Authentication
- Registration System: New users can register with a username through the RegisterForm component (`RegisterForm.jsx`)
- Login System: Users can log in with their registered username via the LoginForm component (`LoginForm.jsx`)
- Session Management: Backend maintains user sessions using cookies (`sessions.js`)
- Role-based Access: Different permissions for regular users and administrators (`server.js`, `App.jsx`)
- Banned User Handling: The username "dog" is specifically banned from accessing features (`users.js`, `server.js`)

### Product Management (Admin)
- Product Dashboard: Admin users can view all products in a responsive table (`AdminPanel.jsx`)
- Product Creation: Add new products with name, price, description, category, and image (`AdminPanel.jsx`)
- Product Editing: Update existing product information with real-time validation (`AdminPanel.jsx`)
- Product Deletion: Remove products from the inventory (`AdminPanel.jsx`)
- Error Handling: Comprehensive error handling for all CRUD operations (`AdminPanel.jsx`)

### Product Browsing
- Responsive Grid Layout: Products displayed in a visually appealing grid (`Products.jsx`, `Products.css`)
- **Category Filtering: Filter products by predefined categories with intuitive UI (`Products.jsx`)
- Search Functionality: Search products by name or description (`Products.jsx`)
- Advanced Sorting: Sort products by name or price in ascending/descending order (`Products.jsx`)
- Price Range Filtering: Filter products based on minimum and maximum price (`Products.jsx`)
- Pagination**: Navigate through product pages with prev/next controls (`Products.jsx`)

### Shopping Cart
- Add to Cart: Add products with quantity selection (`Product.jsx`)
- Cart Management: View, update quantities, and remove items (`Cart.jsx`)
- Real-time Calculations: Automatic subtotal and total calculations (`Cart.jsx`)
- Persistent Cart: Cart state maintained during the session (`reducer.js`)
- Clear Cart: Option to remove all items at once (`Cart.jsx`)

### Checkout Process
- Multi-step Form: Comprehensive checkout form with multiple sections (`Checkout.jsx`)
- Form Validation: Real-time validation for all input fields (`Checkout.jsx`)
- Payment Information: Credit card number, expiry date, and CVV validation (`Checkout.jsx`)
- Shipping Options: Option to use same billing address or enter different shipping address (`Checkout.jsx`)
- Order Confirmation: Clear confirmation after successful order placement (`Checkout.jsx`)

### Order Management
- Order History: View all past orders with details (`Orders.jsx`)
- Status Tracking: Visual indicators for different order statuses (`Orders.jsx`)
- Detailed Order Information: Complete product list, quantities, and prices (`Orders.jsx`)
- Paginated Results: Navigate through order history with pagination controls (`Orders.jsx`)
- Real-time Updates: Auto-refresh order data through polling (`Orders.jsx`)

### Responsive Design
- Mobile-First Approach: Fully responsive layouts for all screen sizes (all CSS files)
- Adaptive Components: UI elements that adjust based on viewport size (all CSS files)
- Mobile Navigation: Hamburger menu for smaller screens (`Header.jsx`, `Header.css`)
- Flexible Grids: Product and cart displays that work on any device (`Products.css`, `Cart.css`)
- Media Queries: Targeted styles for different screen sizes (all CSS files)

## Core Technologies

### Frontend
- React: Functional components with hooks for state management
- CSS: Custom styling with responsive design principles
- Fetch API: Promise-based HTTP requests to backend services

### Backend
- Express.js: RESTful API framework for handling requests
- Node.js: JavaScript runtime environment
- Cookie-based Sessions: Secure authentication mechanism
- In-memory Data Store: Server-side state management for products, users, and orders

## Architecture

### Frontend Architecture
- Component Structure: Modular components with specific responsibilities
- State Management: Reducer pattern with context for global state
- Conditional Rendering: View management without a router library
- Event Handling: Consistent patterns for user interactions
- Error Handling: Graceful error display and recovery

### Backend Architecture
- RESTful API: Well-designed endpoints following REST principles
- Middleware: Authentication and authorization checking
- Data Models: Clearly separated data handling (`users.js`, `products.js`, `orders.js`)
- Error Handling: Consistent error responses with appropriate status codes
- Session Management: Secure user session handling

## How to Use

### Installation and Setup
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the application:
   ```
   npm run build
   ```
4. Start the server:
   ```
   npm start
   ```
5. Access the application at: http://localhost:3000

### User Roles
- Regular Users: Can browse products, add items to cart, checkout, and view order history
- Admin User: Can manage products through the admin panel
  - Default admin username: `admin`
- Banned User: The username `dog` is banned and cannot access certain features

### Using the Application

#### As a Regular User
1. Register a new account or log in
2. Browse products on the home page
3. Use filters and search to find specific products
4. Click on a product to view details
5. Add products to your cart
6. Go to cart to adjust quantities or remove items
7. Proceed to checkout
8. Fill out the checkout form
9. Place your order
10. View your order history

#### As an Admin
1. Log in with the admin username
2. Access the Admin Panel from the navigation menu
3. View all products in the system
4. Add new products using the "Add New Product" button
5. Edit or delete existing products

## Implemented Bonus Requirements

### Extra Service Interaction Complexity
* Additional HTTP methods x 5: Uses GET, POST, PUT, PATCH, and DELETE in a RESTful way - `server.js`
* Polling x 1: Implemented in the Orders component to automatically refresh order data - `Orders.jsx` 
* Services with pagination x 2: Both Products and Orders components support paginated results - `products.js`, `orders.js` 
* Filtered data via query params x 3: Products can be filtered by category, price range, and search terms - `products.js`, `server.js`

### Extra State Complexity
* Different levels of authorization x 2: Regular users and admin users have different access permissions - `server.js`, `App.jsx`
* Different "pages" managed through state x 6: The application manages multiple views (products, product details, cart, checkout, orders, admin panel) without using a router - `App.jsx`
* Complex form validation x 2: The checkout form includes validation for credit card information, expiry dates, and address fields - `Checkout.jsx`
* Good separation of concerns x 3: Clear separation between components, services, and state management - Project structure with separate files for components, services, and state management
* useReducer for state management x 1: The application uses a reducer pattern to manage global state - `reducer.js`, `App.jsx`

## Image Credits

All images used in this project are sourced from Unsplash under their free-to-use license.

### Smartphones
- iPhone 13 Pro: Photo by [Sophia Stark](https://unsplash.com/@sambalina) on [Unsplash](https://unsplash.com/photos/an-iphone-11-pro-sitting-on-top-of-a-white-box-hOqqZAftlSo)
- Samsung Galaxy S25: Photo by [Amanz](https://unsplash.com/@amanz) on [Unsplash](https://unsplash.com/photos/a-box-with-a-pair-of-ear-buds-in-it-V9H5VaSbRbE)
- Google Pixel Phone: Photo by [Sebastian Bednarek](https://unsplash.com/@abeso) on [Unsplash](https://unsplash.com/photos/white-iphone-5s-box-BBuxnOkl2Uk)

### Audio Gear
- AirPods Pro: Photo by [David Levêque](https://unsplash.com/@davidleveque) on [Unsplash](https://unsplash.com/photos/white-apple-earpods-in-white-plastic-case-dOj90TiZhAM)
- Sony Headphones: Photo by [Claudio Schwarz](https://unsplash.com/@purzlbaum) on [Unsplash](https://unsplash.com/photos/black-wireless-headset-lEFCuHd8RiI)
- JBL Speaker: Photo by [Nejc Soklič](https://unsplash.com/@nejc_soklic) on [Unsplash](https://unsplash.com/photos/black-jbl-portable-speaker-on-brown-wooden-table-g5Y5kjOwGwQ)

### Wearable Tech
- Apple Watch: Photo by [Infino Photography](https://unsplash.com/@infinostudio) on [Unsplash](https://unsplash.com/photos/white-and-black-apple-watch-KjsRBYfj9hA)
- Samsung Watch: Photo by [Amanz](https://unsplash.com/@amanz) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-person-holding-a-smart-watch-IpVoJv7j7DI)
- Smart Ring: Photo by [Jerry Kavan](https://unsplash.com/@jerrykavan) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-ring-3ayB2SanzYQ)

### Laptops
- HP Laptop: Photo by [Andrey Matveev](https://unsplash.com/@zelebb) on [Unsplash](https://unsplash.com/photos/a-white-rectangular-device-on-a-wooden-surface-qmcTZZ7XhqY)
- MacBook Pro: Photo by [Sahej Brar](https://unsplash.com/@sahejbrar_) on [Unsplash](https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-ol9kKZbc48M)
- Dell Laptop: Photo by [Erick Cerritos](https://unsplash.com/@eroneko11) on [Unsplash](https://unsplash.com/photos/black-and-silver-asus-laptop-computer-i5UV2HpITYA)

### Accessories
- MacBook Charger: Photo by [Homemade Media](https://unsplash.com/@homemademedia) on [Unsplash](https://unsplash.com/photos/white-apple-charging-adapter-on-white-table-6l5z2EPrnFc)
- Mouse: Photo by [Frankie](https://unsplash.com/@v3frankie) on [Unsplash](https://unsplash.com/photos/white-and-grey-logitech-g-series-cordless-mouse-on-white-surface-VghbBAYqUJ0)
- Keyboard: Photo by [Clay Banks](https://unsplash.com/@claybanks) on [Unsplash](https://unsplash.com/photos/silver-and-white-computer-keyboard-PXaQXThG1FY)

### Default/Placeholder
- Default Product Image: Own image (Created by Anusha Kulkarni)