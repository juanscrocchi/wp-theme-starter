// utils
var webpackMerge = require('../utils/webpackMerge');

// config
var project = require('../../../project.config');
var overrides = require('../../config/common');


/**
 * Common config
 * for all tasks
 *
 */
module.exports = webpackMerge({
	paths: {
		theme: {
			src: 'theme',
			dest: '../' + project.name
		},
		assets: {
			src: 'assets',
			dest: '../' + project.name +  '/assets'
		}
	}
}, overrides);