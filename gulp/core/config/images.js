// utils
var configMerge = require('../utils/configMerge');

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
module.exports = configMerge({
	paths: {
		clean: assets.dest + '/img/**/*.{gif,ico,jpg,jpeg,png,webp}'
	},

	options: {
		webpack: {
			defaults: {
				module: {
					rules: [
						{
							test: /\.(jpe?g|png|gif)$/i,
							use: [
								{
									loader: 'file-loader',
									options: {
										name: 'img/[name].[ext]'
									}
								},
								{
									loader: 'image-webpack-loader',
									query: {
										optipng: {
											optimizationLevel: 7,
										},
										gifsicle: {
											interlaced: false
										},
										pngquant: {
											quality: '65-90',
											speed: 4
										}
									}
								}
							]
						},
						{
							test: /\.(ico|webp)$/i,
							use: [
								{
									loader: 'file-loader',
									options: {
										name: 'img/[name].[ext]'
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