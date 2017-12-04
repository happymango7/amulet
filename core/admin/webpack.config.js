const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '/src/app.js'),
  output: {
    filename: "App.bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
	plugins: [new ExtractTextPlugin('[name].css')],
	resolve: {
		extensions: ['.js', '.scss']
	},
  module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					query: {
						presets: ['es2015', 'react', 'stage-0']
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 25000
					}
				}
			}

		]
	}
}
