const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  externals: nodeModules,
  target: 'node',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  entry: './src/server.tsx',

  output: {
    path: path.resolve('./build/public'),
    filename: '../server.js',
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
      },
      {
        test: /\.(css)$/i,
        loader: 'file-loader?name=styles/[hash].[ext]'
      }
    ]
  },

  plugins: [],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};

module.exports = config;
