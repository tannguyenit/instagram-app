const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk')

module.exports = {
  entry: ['regenerator-runtime/runtime.js','./src/index.js'],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  performance: {
    hints: false,
  },
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    // open: true,
    // clientLogLevel: 'silent',
    port: 3000,
    // publicPath: "/",
    historyApiFallback: true,
    // static: {
    //   // directory: path.join(__dirname, 'assets'),
    //   publicPath: '/',
    // },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-0'],
            plugins: [
              'react-html-attrs',
              'transform-class-properties',
              'transform-decorators-legacy',
              'transform-react-jsx-source',
            ],
          }
        }],
      },
      {
        test: /\.(css|scss)$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]']
      }
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new Dotenv(),
    new NodePolyfillPlugin()
    // new MiniCssExtractPlugin({
    //   filename: '[name].bundle.css',
    //   chunkFilename: '[id].css'
    // }),

  ],
}
