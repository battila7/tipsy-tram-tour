const path = require('path');

const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

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
      ]),
      new HandlebarsPlugin({
            entry: path.join(srcPath, 'templates', '*.hbs'),
            output: path.join(distPath, '[name].html'),
            data: path.join(srcPath, 'js/data.json'),

            helpers: {
              resolvePriceRange: function resolvePriceRange(value) {
                return [
                  'beer',
                  'wine',
                  'cocktail'
                ][value - 1];
              },
              printArray: function printArray(array) {
                if (array) {
                  return array.join(', ');
                } else {
                  return '';
                }
              }
            },

            partials: [
                path.join(srcPath, 'partials', '*.hbs')
            ],
        })
    ]
};

module.exports = config;
