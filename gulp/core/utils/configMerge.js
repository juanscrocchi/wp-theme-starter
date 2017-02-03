var lodash = require('lodash');
var deepMerge = require('./deepMerge');
var webpackMerge = require('./webpackMerge');

/**
 * Config merger to
 * properly merge paths and
 * webpack options
 *
 * @param a
 * @param b
 * @returns {*}
 */
module.exports = function (a, b) {
	return lodash.assign({
		paths: deepMerge(a.paths, lodash.isObject(b.paths) ? b.paths : {})
	},
	{
		options: {
			webpack: webpackMerge(a.options.webpack, lodash.isObject(b.options) && lodash.isObject(b.options.webpack) ? b.options.webpack : {})
		}
	});
};
