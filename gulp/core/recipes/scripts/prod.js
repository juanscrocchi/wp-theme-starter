var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var named        = require('vinyl-named');
var gulpWebpack  = require('webpack-stream');
var webpack      = require('webpack');
var notify       = require('gulp-notify');

// utils
var lodash       = require('lodash');
var webpackMerge = require('../../utils/webpackMerge');
var pumped       = require('../../utils/pumped');

// config
var config       = require('../../config/scripts');
var fonts        = require('../../config/fonts');
var images       = require('../../config/images');
var favicons     = require('../../config/favicons');
var styles       = require('../../config/styles');
var svg          = require('../../config/svg');

/**
 * Create minified JS
 * packages with webpack
 *
 * @returns {*}
 */
module.exports = function () {
	return gulp.src(lodash.union(config.paths.src, styles.paths.src))
		.pipe(plumber())

		.pipe(named()) // vinyl-named is used to allow for
									 // multiple entry files
		.pipe(gulpWebpack(
			webpackMerge(
				config.options.webpack.defaults,
				config.options.webpack.prod,
				fonts.options.webpack.defaults,
				fonts.options.webpack.prod,
				images.options.webpack.defaults,
				images.options.webpack.prod,
				styles.options.webpack.defaults,
				styles.options.webpack.prod,
				svg.options.webpack.defaults,
				svg.options.webpack.prod
			),
			require('webpack')
		))

		.pipe(gulp.dest(config.paths.dest))
		.pipe(notify({
			message: pumped('JS and assets Packaged & Minified!'),
			onLast: true
		}));
};