/* eslint
		no-var: 0,
	  no-multi-spaces: 0,
	  no-mixed-spaces-and-tabs: 0,
	  no-multiple-empty-lines: 0
*/
var gulp  = require('gulp');
var gutil = require('gulp-util');

// utils
var validateConfig = require('./gulp/core/utils/validateConfig');
var lazyQuire      = require('./gulp/core/utils/lazyQuire');

// config
var project = require('./project.config');

// validate the project
// configuration
validateConfig(project);

// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));



/**
 * Grouped
 */
gulp.task('default', [
	  'fonts:clean',
	    'svg:clean',
	 'sprite:watch',
	 'images:clean',
   'favicons:watch',
	'scripts:watch',
	 'styles:clean',
	  'theme:watch',
	'browser:sync'
]);

gulp.task('build', [
	 'fonts:clean',
	   'svg:clean',
	 'sprite:prod',
	'images:clean',
   'favicons:prod',
	'scripts:prod',
	'styles:clean',
	  'theme:prod'
]);


/**
 * Browser
 */
gulp.task('browser:sync', [], lazyQuire(require, './gulp/core/recipes/browser-sync'));


/**
 * Fonts
 */
gulp.task('fonts:clean', [],              lazyQuire(require, './gulp/core/recipes/fonts/clean'));


/**
 * Svgs
 */
gulp.task('svg:clean', [],            lazyQuire(require, './gulp/core/recipes/svg/clean'));


/**
 * Svg Sprites
 */
gulp.task('sprite:clean', [],               lazyQuire(require, './gulp/core/recipes/sprite/clean'));
gulp.task('sprite:dev',   ['sprite:clean'], lazyQuire(require, './gulp/core/recipes/sprite/dev'));
gulp.task('sprite:prod',  ['sprite:clean'], lazyQuire(require, './gulp/core/recipes/sprite/prod'));
gulp.task('sprite:watch', ['sprite:dev'],   lazyQuire(require, './gulp/core/recipes/sprite/watch'));


/**
 * Images
 */
gulp.task('images:clean', [],               lazyQuire(require, './gulp/core/recipes/images/clean'));

/**
 * Favicons
 */
gulp.task('favicons:clean', [],               lazyQuire(require, './gulp/core/recipes/favicons/clean'));
gulp.task('favicons:dev',   ['favicons:clean'], lazyQuire(require, './gulp/core/recipes/favicons/dev'));
gulp.task('favicons:prod',  ['favicons:clean'], lazyQuire(require, './gulp/core/recipes/favicons/prod'));
gulp.task('favicons:watch', ['favicons:dev'],   lazyQuire(require, './gulp/core/recipes/favicons/watch'));


/**
 * Scripts
 */
gulp.task('scripts:clean', [],                lazyQuire(require, './gulp/core/recipes/scripts/clean'));
gulp.task('scripts:prod',  ['scripts:clean'], lazyQuire(require, './gulp/core/recipes/scripts/prod'));
gulp.task('scripts:watch', ['scripts:clean'], lazyQuire(require, './gulp/core/recipes/scripts/watch'));


/**
 * Styles
 */
gulp.task('styles:clean', [],               lazyQuire(require, './gulp/core/recipes/styles/clean'));


/**
 * Theme
 */
gulp.task('theme:clean', [],              lazyQuire(require, './gulp/core/recipes/theme/clean'));
gulp.task('theme:dev',   ['theme:clean'], lazyQuire(require, './gulp/core/recipes/theme/dev'));
gulp.task('theme:prod',  ['theme:clean'], lazyQuire(require, './gulp/core/recipes/theme/prod'));
gulp.task('theme:watch', ['theme:dev'],   lazyQuire(require, './gulp/core/recipes/theme/watch'));
