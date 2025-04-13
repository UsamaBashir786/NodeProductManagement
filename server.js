// ===============================================
// Express.js Starter Template with Public Files
// Serves HTML files from public directory
// ===============================================

const express = require('express');
const path = require('path');
const app = express();

// ===================
// MIDDLEWARE
// ===================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===================
// In-memory database
// ===================
let products = [
  {id : 1, name : 'Product 1', Description : "Description of Product 1", price : 100},
  {id : 2, name : 'Product 2', Description : "Description of Product 2", price : 150}
]


// ===================
// ROUTES
// ===================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login Routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic would go here
  res.json({ message: `Logged in as username`, token: 'sample-jwt-token' });
});

// Register Routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // User creation logic would go here
  res.json({ message: `User registered: username`, email });
});

// Contact Route
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});


// Serve the product list page
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-list.html'));
});

// Serve add product page
app.get('/add-product', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'add-product.html'));
});
app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-list.html'));
});

// Serve edit product page
app.get('/edit-product/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.sendFile(path.join(__dirname, 'public', 'edit-product.html'));
  } else {
    res.status(404).send('Product not found');
  }
});
// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});
// Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id == req.params.id);
  if (productIndex !== -1) {
    products[productIndex] = { id: req.params.id, ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).send('Product not found');
  }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.status(204).send();
});


// ===================
// SERVER START
// ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`); // Corrected this line
  console.log(`Available Routes:`);
  console.log(`- Home: http://localhost:${PORT}`); // Corrected this line
  console.log(`- Login: http://localhost:${PORT}/login`);
  console.log(`- Register: http://localhost:${PORT}/register`);
  console.log(`- Contact: http://localhost:${PORT}/contact`);
});
