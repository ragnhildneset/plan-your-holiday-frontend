/* eslint-disable no-var, prefer-arrow-callback, consistent-return, object-shorthand*/
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var config = require('./base.config');

config.devServer = {
    outputPath: path.join(__dirname, '../dist'),
    publicPath: config.output.publicPath,
    historyApiFallback: true
};

config.plugins = config.plugins.concat([
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:3000'
    }, {
        reload: false
    }),
    new webpack.NoErrorsPlugin()
]);

module.exports = config;
