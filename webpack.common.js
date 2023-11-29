const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; 

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: isDev ? [
             require.resolve('react-refresh/babel')
            ] : []
          }
        },
        exclude: /nodeModules/,

      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Quidditch Shop',
      lang: 'en'
      // favicon: './client/src/assets/favicon.png',
    }),
  ],
};
