// utils
var deepMerge = require('../utils/deepMerge');

// config
var overrides = require('../../config/svg');
var assets = require('./common').paths.assets;

/**
 * Svg Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		clean: [
			assets.dest + '/svg/**/*.svg',
			'!' + assets.dest + '/svg/sprite-*.svg'
		]
	},

	options: {
		webpack: {
			defaults: {
				module: {
					loaders: [
						{
							test: /\.svg$/i,
							include: /\/svg\/.*/,
							loader: 'file-loader?name=svg/[name].[ext]!img'
						}
					]
				},
				imagemin: {
					svgo: {
						plugins: [
							{
								removeViewBox: false
							},
							{
								removeEmptyAttrs: false
							}
						]
					}
				}
			},
		}
	}

}, overrides);