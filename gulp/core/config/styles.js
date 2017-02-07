// utils
var configMerge = require('../utils/configMerge');

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

// config
var overrides = require('../../config/styles');
var assets = require('./common').paths.assets;

/**
 * Style Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = configMerge({
	paths: {
		clean: assets.dest + '/css/**/*.{css,map}',
		src: [
			assets.src + '/scss/*.scss',
			'!' + assets.src + '/scss/**/_*'
		]
	},

	options: {
		webpack: {
			watch: {
				devtool: 'source-map',
				module: {
					rules: [
						{
							test: /\.scss$/,
							use: ExtractTextWebpackPlugin.extract({
								fallback: 'style-loader',
								use: [
									{
										loader: 'css-loader',
										options: {
											sourceMap: true
										}
									},
									{
										loader: 'postcss-loader',
										options: {
											plugins: [
												autoprefixer()
											]
										}
									},
									{
										loader: 'sass-loader',
										options: {
											sourceMap: true
										}
									}
								],
								publicPath: '../'
							})
						},
						{
							test: /\.css$/,
							use: ExtractTextWebpackPlugin.extract({
								fallback: 'style-loader',
								use: [
									{
										loader: 'css-loader',
										options: {
											sourceMap: true
										}
									},
									{
										loader: 'postcss-loader',
										options: {
											plugins: [
												autoprefixer()
											]
										}
									}
								],
								publicPath: '../'
							})
						}
					]
				}
			},

			prod: {
				module: {
					rules: [
						{
							test: /\.scss$/,
							use: ExtractTextWebpackPlugin.extract({
								fallback: 'style-loader',
								use: [
									{
										loader: 'css-loader',
										options: {
											minimize: {
												autoprefixer: false,
												discardComments: {
													removeAll: true
												}
											}
										}
									},
									{
										loader: 'postcss-loader',
										options: {
											plugins: [
												autoprefixer()
											]
										}
									},
									{
										loader: 'sass-loader'
									}
								],
								publicPath: '../'
							})
						},
						{
							test: /\.css$/,
							use: ExtractTextWebpackPlugin.extract({
								fallback: 'style-loader',
								use: [
									{
										loader: 'css-loader'
									},
									{
										loader: 'postcss-loader',
										options: {
											plugins: [
												autoprefixer()
											]
										}
									}
								],
								publicPath: '../'
							})
						}
					]
				}
			},
			defaults: {
				plugins: [
					new ExtractTextWebpackPlugin('css/[name].css')
				]
			},
		}
	}
}, overrides);
