const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Webpack = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  bail: true,
  mode: 'production',
  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.EnvironmentPlugin({ NODE_ENV: 'production' })
  ],

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {}
      })
    ]
  }
});
