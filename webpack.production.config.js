'use strict';

const webpack = require('webpack');

const config = require('./webpack.config');

const plugins = [];

plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: '"production"' }
  }),
  new webpack.NoEmitOnErrorsPlugin()
);

config.plugins = plugins;

module.exports = config;
