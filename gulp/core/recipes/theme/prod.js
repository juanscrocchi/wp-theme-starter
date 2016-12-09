var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var add          = require('gulp-add');
var filter       = require('gulp-filter');
var replace      = require('gulp-replace-task');
var notify       = require('gulp-notify');

// utils
var pumped       = require('../../utils/pumped');

// config
var project      = require('../../../../project.config');
var config       = require('../../config/theme');

// templates
var style        = require('../../templates/wordpress-style-css.js');
var phpHeaders   = require('../../templates/wordpress-php-headers.js');

// date
var date         = new Date();


/**
 * Move the Theme to
 * the build directory
 * and add required files
 *
 * @returns {*}
 */
module.exports = function () {
	var filterPHP  = filter('**/*.php', { restore: true });

	return gulp.src(config.paths.src)
		.pipe(plumber())

		.pipe(filterPHP) // Filter php files and transform
		                 // them to simply include the file
		                 // from the dev theme. This is to
		                 // make it possible to debug php from
		                 // within the dev theme
		.pipe(replace({
			patterns: [
				{
					json: phpHeaders
				},
				{
					match: 'time',
					replacement: date.getTime()
				}
			]
		}))
		.pipe(filterPHP.restore)

		.pipe(add({
			'.gitignore': '*',
			'style.css': style
		}))

		.pipe(gulp.dest(config.paths.dest))
		.pipe(notify({
			message: pumped('Theme Moved!'),
			onLast: true
		}));
};