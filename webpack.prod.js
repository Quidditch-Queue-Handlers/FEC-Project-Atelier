const { merge } = require('webpack-merge');
// const CompressionPlugin = require('compression-webpack-plugin'); 
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // new CompressionPlugin()
    new MiniCssExtractPlugin({
      filename: '[name].css', 
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
});
