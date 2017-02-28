// utils
var configMerge = require('../utils/configMerge');

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
module.exports = configMerge({
	paths: {
		clean: assets.dest + '/fonts/**/*.{eot,otf,ttf,woff,woff2,svg}'
	},

	options: {
		webpack: {
			defaults: {
				module: {
					rules: [
						{
							test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
							use: [
								{
									loader: 'url-loader',
									options: {
										limit: 10000,
										mimetype: 'application/font-woff',
										name: 'fonts/[name].[ext]'
									}
								}
							]
						},
						{
							test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
							use: [
								{
									loader: 'url-loader',
									options: {
										limit: 10000,
										mimetype: 'application/octet-stream',
										name: 'fonts/[name].[ext]'
									}
								}
							]
						},
						{
							test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
							use: [
								{
									loader: 'file-loader',
									options: {
										name: 'fonts/[name].[ext]'
									}
								}
							]
						},
						{
							test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
							exclude: /\/svg\/.*/,
							use: [
								{
									loader: 'url-loader',
									options: {
										limit: 10000,
										mimetype: 'image/svg+xml',
										name: 'fonts/[name].[ext]'
									}
								},
								{
									loader: 'image-webpack-loader',
									query: {
										svgo: {
											plugins: [
												{
													removeUselessDefs: false
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