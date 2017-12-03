const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const config = {
    context: srcPath,
    entry: {
      app: './js/main.js',
    },
    output: {
      path: path.join(distPath, 'assets'),
      publicPath: '/assets/',
      filename: 'bundle.js',
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(srcPath, 'css/**'),
          to: path.join(distPath, 'assets')
        },
        {
          context: path.join(srcPath, 'html'),
          from: '*.html',
          to: distPath 
        },
        {
          from: path.resolve(srcPath, 'img/**'),
          to: path.join(distPath, 'assets')
        },
      ])
    ]
};

module.exports = config;
