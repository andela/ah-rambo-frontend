const merge = require('webpack-merge');
const path = require('path');
const Webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, '../src'),
    publicPath: '/',
    compress: true,
    hot: true,
    port: 8080,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:7000/',
        secure: false,
        changeOrigin: true,
      }
    }
  },

  plugins: [
    new Dotenv(),
    new Webpack.HotModuleReplacementPlugin()
  ]
});
