const chai = require('chai');
const expect = chai.expect;
const TornaSDK = require('../src/index');

// Mock Express app
const mockExpressApp = () => {
  return {
    _router: {
      stack: [
        {
          route: {
            path: '/users',
            methods: { get: true },
          },
        },
        {
          route: {
            path: '/users/:id',
            methods: { get: true, post: true },
          },
        },
      ],
    },
  };
};

describe('TornaSDK', function() {
  let tornaSDK;

  before(function() {
    process.env.TORNA_URL = 'http://localhost:7700/api';
    process.env.TORNA_ACCESS_TOKEN = 'dummy_token';
    tornaSDK = new TornaSDK();
  });

  describe('formatRoutes', function() {
    it('should format Express routes correctly', function() {
      const app = mockExpressApp();
      const formattedRoutes = tornaSDK.formatRoutes(app._router.stack.map(layer => layer.route));

      expect(formattedRoutes).to.be.an('array').that.has.lengthOf(2);
      expect(formattedRoutes[0]).to.include({
        name: 'GET /users',
        url: '/users',
        httpMethod: 'GET',
      });
      expect(formattedRoutes[1]).to.include({
        name: 'GET /users/:id',
        url: '/users/:id',
        httpMethod: 'GET',
      });
    });
  });

  describe('uploadRoutes', function() {
    it('should throw an error if Torna URL or access token is missing', function() {
      process.env.TORNA_URL = '';
      process.env.TORNA_ACCESS_TOKEN = '';

      expect(() => new TornaSDK()).to.throw('Please set TORNA_URL and TORNA_ACCESS_TOKEN in environment variables or pass them in config');
    });
  });
});
