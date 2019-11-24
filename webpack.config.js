var webpack = require('webpack')

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: 
      __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  },
  module: {
    rules: [
        { 
            test: /\.scss$/, 
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets:['react'],
                plugins: ['transform-class-properties', 'transform-es2015-destructuring', 'transform-object-rest-spread']
            },
        }
    ]
  }
}