/* eslint-disable import/imports-first */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
/* eslint import/no-unresolved: [2, { ignore: ['^glob:'] }] */

/**
 * Setup webpack public path
 * to enable lazy-including of
 * js chunks
 *
 */
import './vendor/webpack.publicPath';

/* Bootstrap */
require(`bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/vendor/.bootstraprc!bootstrap-loader`);

/**
 * Import
 * fonts
 *
 */
import 'glob:../fonts/**/*.{eot,otf,ttf,woff,woff2,svg}';
/**
 * Import
 * images
 *
 */
import 'glob:../img/**/*.{gif,ico,jpg,jpeg,png,webp}';
/**
 * Import
 * sass
 *
 */
import 'glob:../scss/*.scss';
/**
 * Import
 * svgs
 *
 */
import 'glob:../svg/**/*.svg!../svg/sprite/**/*.svg';

/**
 * Your theme's js starts
 * here...
 */

// silly example:
import obj from './scripts/example';

/* eslint no-console: 0 */
console.log(obj);
