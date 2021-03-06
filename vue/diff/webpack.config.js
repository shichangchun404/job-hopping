const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js'
  },
  output: {
    filename: './js/[name].js', // name = index
    path: path.resolve(__dirname,'./public')
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: '8082',
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './index.html' // ζεε° output.path δΈ
    })
  ]
}