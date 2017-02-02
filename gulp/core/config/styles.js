// utils
var deepMerge = require('../utils/deepMerge');

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');

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
module.exports = deepMerge({
	paths: {
		clean: assets.dest + '/css/**/*.{css,map}'
	},

	options: {
		webpack: {
			watch: {
				devtool: 'source-map',
				module: {
					loaders: [
						{
							test: /\.scss$/,
							loader: ExtractTextWebpackPlugin.extract(
								'style-loader',
								'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap',
								{ publicPath: '../' }
							)
						},
						{
							test: /\.css$/,
							loader: ExtractTextWebpackPlugin.extract(
								'style-loader',
								'css-loader?sourceMap!postcss-loader',
								{ publicPath: '../' }
							)
						}
					]
				}
			},

			prod: {
				module: {
					loaders: [
						{
							test: /\.scss$/,
							loader: ExtractTextWebpackPlugin.extract(
								'style-loader',
								'css-loader!postcss-loader!sass-loader',
								{ publicPath: '../' }
							)
						},
						{
							test: /\.css$/,
							loader: ExtractTextWebpackPlugin.extract(
								'style-loader',
								'css-loader!postcss-loader',
								{ publicPath: '../' }
							)
						}
					]
				},
				postcss: [
					cssnano({
						autoprefixer: false,
						discardComments: { removeAll: true }
					})
				]
			},
			defaults: {
				plugins: [
					new ExtractTextWebpackPlugin('css/[name].css')
				],
				sassLoader: {},
				postcss: [
					precss,
					autoprefixer({
						browsers: [
							'last 2 version',
							'ie >= 9',
							'IOS >= 7'
						]
					})
				]
			},
		}
	}
}, overrides);
