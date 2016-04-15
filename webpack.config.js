const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: 'index.compiled.js'
  },
  resolve: {
		moduleDirectorys: ['node_modules', 'src'],
		extensions: ['','.js','.jsx']
	},
  plugins: [	
		new webpack.NoErrorsPlugin()
  ]
}