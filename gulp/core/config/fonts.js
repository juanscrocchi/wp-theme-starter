// utils
var webpackMerge = require('../utils/webpackMerge');

// config
var overrides = require('../../config/fonts');
var assets = require('./common').paths.assets;

/**
 * Font Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = webpackMerge({
	paths: {
		clean: assets.dest + '/fonts/**/*.{eot,otf,ttf,woff,woff2,svg}'
	},

	options: {
		webpack: {
			defaults: {
				module: {
					loaders: [
						{
							test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
							loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
						},
						{
							test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
							loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
						},
						{
							test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
							loader: 'file?name=fonts/[name].[ext]'
						},
						{
							test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
							include: /\/fonts\/.*/,
							loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]!img'
						}
					]
				},
				imagemin: {
					svgo: {
						plugins: [
							{
								removeUselessDefs: false
							}
						]
					}
				}
			}
		}
	}
}, overrides);