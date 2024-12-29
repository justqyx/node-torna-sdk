# Node Torna SDK

This SDK helps you automatically upload your Express.js routes to Torna API documentation service.

## Installation

```bash
npm install node-torna-sdk
```

## Usage

1. Set up environment variables in your `.env` file:

```env
TORNA_URL=your_torna_api_url
TORNA_ACCESS_TOKEN=your_torna_access_token
```

2. Use the SDK in your Express application:

```javascript
const express = require('express');
const TornaSDK = require('node-torna-sdk');

const app = express();

// Set up your routes
app.get('/users', (req, res) => {
  res.json({ message: 'Get users' });
});

app.post('/users/:id', (req, res) => {
  res.json({ message: 'Create user' });
});

// Initialize Torna SDK
const tornaSDK = new TornaSDK({
  // Optional: provide config here instead of using env variables
  // tornaUrl: 'your_torna_url',
  // accessToken: 'your_access_token'
});

// Upload routes to Torna
tornaSDK.uploadExpressRoutes(app)
  .then(response => {
    console.log('Routes uploaded successfully:', response);
  })
  .catch(error => {
    console.error('Failed to upload routes:', error);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Features

- Automatically extracts all routes from your Express application
- Supports path parameters, query parameters, and different HTTP methods
- Configurable through environment variables or constructor options
- Handles nested routers and subroutes

## API Reference

### `new TornaSDK(config)`

Creates a new instance of the Torna SDK.

- `config.tornaUrl`: (Optional) Torna API URL
- `config.accessToken`: (Optional) Torna access token

### `uploadExpressRoutes(app)`

Uploads all routes from an Express application to Torna.

- `app`: Express application instance
- Returns: Promise with upload result

### `formatRoutes(routes)`

Converts Express routes to Torna API format.

- `routes`: Array of Express routes
- Returns: Array of formatted routes for Torna

### `uploadRoutes(routes)`

Uploads formatted routes to Torna.

- `routes`: Array of formatted routes
- Returns: Promise with API response
