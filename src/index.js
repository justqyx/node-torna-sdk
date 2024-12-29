const axios = require('axios');
require('dotenv').config();

class TornaSDK {
  constructor(config = {}) {
    this.tornaUrl = config.tornaUrl || process.env.TORNA_URL;
    this.accessToken = config.accessToken || process.env.TORNA_ACCESS_TOKEN;
    
    if (!this.tornaUrl || !this.accessToken) {
      throw new Error('Please set TORNA_URL and TORNA_ACCESS_TOKEN in environment variables or pass them in config');
    }
  }

  /**
   * Convert Express routes to Torna API format
   * @param {Array} routes - Express routes array
   * @returns {Array} - Formatted routes for Torna
   */
  formatRoutes(routes) {
    return routes.map(route => {
      const path = route.path;
      const methods = route.methods ? Object.keys(route.methods).filter(method => method !== '_all') : [];
      const method = methods.length > 0 ? methods[0].toUpperCase() : 'GET';

      // Extract path parameters
      const pathParams = [];
      const paramRegex = /:([^\/]+)/g;
      let match;
      while ((match = paramRegex.exec(path)) !== null) {
        pathParams.push({
          name: match[1],
          type: "string",
          required: 1,
          description: `Path parameter: ${match[1]}`
        });
      }

      return {
        name: `${method} ${path}`,
        type: 0,
        url: path,
        httpMethod: method,
        contentType: "application/json",
        isFolder: 0,
        isShow: 1,
        pathParams,
        headerParams: [],
        queryParams: [],
        requestParams: [],
        responseParams: [],
        orderIndex: 0
      };
    });
  }

  /**
   * Upload routes to Torna
   * @param {Array} routes - Formatted routes array
   * @returns {Promise} - API response
   */
  async uploadRoutes(routes) {
    const data = {
      debugEnvs: [],
      commonErrorCodes: [],
      isReplace: 0,
      isOverride: 0,
      apis: routes
    };

    const requestBody = {
      access_token: this.accessToken,
      name: "doc.push",
      version: "1.0",
      data: encodeURIComponent(JSON.stringify(data))
    };

    try {
      const response = await axios.post(this.tornaUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading to Torna:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Extract and upload Express app routes
   * @param {Express.Application} app - Express application instance
   * @returns {Promise} - Upload result
   */
  async uploadExpressRoutes(app) {
    const routes = [];
    
    // Get registered routes
    const stack = app._router?.stack || [];
    
    stack.forEach(layer => {
      if (layer.route) {
        routes.push(layer.route);
      } else if (layer.name === 'router') {
        // Handle sub-routers
        layer.handle.stack.forEach(routeLayer => {
          if (routeLayer.route) {
            routes.push(routeLayer.route);
          }
        });
      }
    });

    const formattedRoutes = this.formatRoutes(routes);
    return this.uploadRoutes(formattedRoutes);
  }
}

module.exports = TornaSDK;
