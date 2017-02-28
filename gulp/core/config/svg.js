var webpack = require('webpack');

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
				plugins: [
					new webpack.LoaderOptionsPlugin({
						minimize: true,
						debug: false
					}),
				],
				module: {
					rules: [
						{
							test: /\.svg$/i,
							use: [
								{
									loader: 'file-loader',
									options: {
										name: 'svg/[name].[ext]'
									}
								},
								{
									loader: 'image-webpack-loader',
									query: {
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