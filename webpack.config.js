// https://dev.to/lxxxvi/middleman-tailwindcss-webpack-ap3
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin()
  ],
  entry: {
    application: './source/javascripts/site.js',
    styles: './source/stylesheets/site.css',
  },
  output: {
    path: __dirname + '/.tmp/dist',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  }
}
