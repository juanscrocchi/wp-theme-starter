var path = require('path');
var webpack = require('webpack');

// utils
var configMerge = require('../utils/configMerge');

// config
var overrides = require('../../config/scripts');
var assets = require('./common').paths.assets;

/**
 * Script Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = configMerge({
	paths: {
		src: [
			assets.src + '/js/*.js',
			'!' + assets.src + '/js/**/_*'
		],
		dest: assets.dest,
		clean: assets.dest + '/js/**/*.{js,map}'
	},

	options: {
		webpack: {

			// merged with defaults
			// for :watch task
			watch: {
				cache: true,
				watch: true,
				devtool: 'eval'
			},


			// merged with defaults
			// for :dev task
			dev: {
			},

			// merged with defaults
			// for :prod task
			prod: {
				devtool: 'source-map',
				plugins: [
					new webpack.DefinePlugin({
						'process.env': {
							'NODE_ENV': JSON.stringify('production')
						}
					}),
					new webpack.optimize.UglifyJsPlugin({
						sourceMap: false,
						comments: false,
						screw_ie8: true,
						compress: {
							drop_console: true,
							unsafe: true,
							unsafe_comps: true,
							screw_ie8: true,
							warnings: false
						}
					})
				],
				module: {
					rules: [
						{
							enforce: 'pre',
							test: /\.jsx?$/,
							exclude: [
								/node_modules/,
								/bower_components/,
								/vendor/,
								/polyfills/
							],
							use: [
								{
									loader: 'eslint-loader',
									options: {
										failOnError: true,
										failOnWarning: true,
										configFile: path.resolve('./.eslintrc')
									}
								}
							]
						}
					]
				}
			},

			defaults: {
				resolve: {
					extensions: ['.js', '.jsx'],
					modules: [
						'node_modules',
						'bower_components'
					]
				},
				output: {
					filename: 'js/[name].js',
					chunkFilename: 'chunk-[name].js'
				},
				stats: {
					colors: true
				},
				module: {
					rules: [
						{
							enforce: 'pre',
							test: /\.jsx?$/,
							exclude: [
								/node_modules/,
								/bower_components/,
								/vendor/,
								/polyfills/
							],
							use: [
								{
									loader: 'eslint-loader',
									options: {
										emitError: true,
										emitWarning: true,
										configFile: path.resolve('./.eslintrc')
									}
								}
							]
						},
						{
							test: /\.jsx?$/,
							exclude: [
								/node_modules/,
								/bower_components/,
								/polyfills/
							],
							use: [
								{
									loader: 'babel-loader',
									query: {
										presets: [
											['es2015', { loose: true, modules: false }],
											'stage-2'
										],
										plugins: ['transform-runtime', 'import-glob']
									}
								}
							]
						}
					]
				}
			}

		}
	}
}, overrides);
