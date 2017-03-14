const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
      app: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: '[name].bundle.js',
    },
    resolve : {
      modules: [
        "node_modules",
        path.resolve(__dirname, "app")
      ],
  // directories where to look for modules

      extensions: [".js", ".json", ".jsx", ".css"],
    },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      },

      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        // include: './assets/css',
        exclude: /node_modules/,
        loader: 'css-loader!style-loader'
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?url-loader?mimetype=image/png!./file.png'
      }
    ]
  },

// devServer: {
//
// }
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Card game',
  //     filename: './dist/index.html',
  //     template: './../index.html'
  //   }),
  //   new ExtractTextPlugin("[name].css")
  // ]
}
