var path = require('path');
var webpack = require('webpack-stream').webpack;

// utils
var deepMerge = require('../utils/deepMerge');

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
module.exports = deepMerge({
	paths: {
		watch: assets.src + '/js/**/*.js',
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
				devtool: 'eval',
				keepalive: true
			},


			// merged with defaults
			// for :dev task
			dev: {
			},

			// merged with defaults
			// for :prod task
			prod: {
				plugins: [
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.OccurenceOrderPlugin(true),
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
				eslint: {
					failOnError: true,
					failOnWarning: true
				}
			},

			defaults: {
				resolve: {
					extensions: ['', '.js', '.jsx'],
					modulesDirectories: [
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
					preLoaders: [
						{
							test: /\.jsx?$/,
							exclude: [
								/node_modules/,
								/bower_components/,
								/vendor/,
								/polyfills/
							],
							loader: 'eslint'
						}
					],
					loaders: [
						{
							test: /\.jsx?$/,
							exclude: [
								/node_modules/,
								/bower_components/,
								/polyfills/
							],
							loader: 'babel',
							query: {
								presets: ['es2015', 'stage-2'],
								plugins: ['transform-runtime', 'import-glob']
							}
						}
					]
				},
				plugins: [
					new webpack.ResolverPlugin(
						new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
							'bower.json', ['main']
						)
					)
				],
				eslint: {
					emitError: true,
					emitWarning: true,
					configFile: path.resolve('./.eslintrc')
				}
			}

		}
	}
}, overrides);
