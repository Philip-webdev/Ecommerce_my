const { restblogs } = require("./app");

// webpack.config.js
module.exports = {
    entry: {
      restblogs: './app.js'
  },
    output: {
      path: 'dist',
      filename: 'bundle.js'
  }
};