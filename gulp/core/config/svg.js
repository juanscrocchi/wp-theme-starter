// utils
var configMerge = require('../utils/configMerge');

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
module.exports = configMerge({
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
					rules: [
						{
							test: /\.svg$/i,
							include: /\/svg\/.*/,
							use: [
								{
									loader: 'file-loader',
									options: {
										name: 'svg/[name].[ext]'
									}
								},
								{
									loader: 'img-loader',
									options: {
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
								}
							]
						}
					]
				}
			}
		}
	}

}, overrides);