'use strict';

// Set default node environment to development




// env赋值 ; 

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test' || env ==="local") {
  // Register the Babel require hook
  require('babel-core/register');
}

// Export the application
exports = module.exports = require('./app');
