// utils
var deepMerge = require('../utils/deepMerge');

var path = require('path');

// config
var overrides = require('../../config/favicons');
var assets = require('./common').paths.assets;
var project = require('../../../project.config');

/**
 * Favicons Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		watch: assets.src + '/favicons/favicon.png',
		src: assets.src + '/favicons/favicon.png',
		dest: assets.dest + '/favicons',
		clean: assets.dest + '/favicons/**/*.{ico,png,json,webapp,php,xml}',
	},

	options: {
        styleSheetPathReplacement: 'wp-content/themes/' + project.name,
        favicons: {
    	   appName: project.appName,
    	   appDescription: project.appDescription,
    	   developerName: project.author,
    	   developerURL: project.authorURI,
    	   background: '#fff',
    	   path: '@@stylesheet_directory_uri/' + assets.src + '/favicons',
    	   display: 'browser',
    	   orientation: 'portrait',
    	   start_url: '',
    	   version: project.version,
    	   logging: false,
    	   online: false,
    	   icons: {
                android: true,              // Create Android homescreen icon. `boolean`
                appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
                appleStartup: false,        // Create Apple startup images. `boolean`
                coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
                favicons: true,             // Create regular favicons. `boolean`
                firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
                windows: true,              // Create Windows 8 tile icons. `boolean`
                yandex: true                // Create Yandex browser icon. `boolean`
            },
    	   html: 'favicons.html',
    	   pipeHTML: true,
    	   replace: true
        }
    }
}, overrides);
