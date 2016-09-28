// utils
var deepMerge = require('../utils/deepMerge');

// config
var overrides = require('../../config/images');
var assets = require('./common').paths.assets;

/**
 * Image Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		clean: assets.dest + '/img/**/*.{gif,ico,jpg,jpeg,png,webp}'
	},

	options: {
		webpack: {
			defaults: {
				module: {
					loaders: [
						{
							test: /\.(jpe?g|png|gif)$/i,
							loader: 'file-loader?name=img/[name].[ext]!img'
						},
						{
							test: /\.(ico|webp)$/i,
							loader: 'file-loader?name=img/[name].[ext]'
						}
					]
				},
				imagemin: {
					optimizationLevel: 7,
					interlaced: false,
					pngquant: {
						quality: '65-90',
						speed: 4
					}
				}
			},
		}
	}
}, overrides);