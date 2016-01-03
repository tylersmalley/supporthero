/**
 * Dependencies
 */

var webpack = require('webpack');
var config = require('./src/config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// expose configuration through globals
var globals = new webpack.DefinePlugin({
  __CONFIG__: JSON.stringify(config)
});

var WebpackConfig = {
  devtool: 'source-map',

  entry: {
    main: './src/index.js'
  },

  output: {
    path: __dirname + '/public/bundle',
    filename: '[name].js',
    publicPath: '/bundle/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
      exclude: /node_modules/
    }]
  },

  plugins: [
    globals,
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};

if (process.env.NODE_ENV == 'production') {
  // speed up development bundling by limiting minification
  // to production builds
  WebpackConfig.plugins = WebpackConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({ mangle: true }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
}

module.exports = WebpackConfig;
