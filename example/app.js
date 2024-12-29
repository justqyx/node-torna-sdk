const express = require('express');
const TornaSDK = require('../src/index');

const app = express();
app.use(express.json());

// Sample routes
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

app.get('/users/:id', (req, res) => {
  res.json({ message: 'Get user by ID' });
});

app.post('/users', (req, res) => {
  res.json({ message: 'Create user' });
});

app.put('/users/:id', (req, res) => {
  res.json({ message: 'Update user' });
});

app.delete('/users/:id', (req, res) => {
  res.json({ message: 'Delete user' });
});

// Initialize Torna SDK
const tornaSDK = new TornaSDK();

// Upload routes to Torna
tornaSDK.uploadExpressRoutes(app)
  .then(response => {
    console.log('Routes uploaded successfully:', response);
  })
  .catch(error => {
    console.error('Failed to upload routes:', error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
