var project = require('../../../project.config');

var possibleOptions = {
	name: 'Text Domain',
	prettyName: 'Theme Name',
	themeURI: 'Theme URI',
	description: 'Description',
	parentTheme: 'Template',
	version: 'Version',
	author: 'Author',
	authorURI: 'Author URI',
	license: 'License',
	licenseURI: 'License URI',
	tags: 'Tags'
};
var options = {};
var value;

for (var optionKey in possibleOptions) {
	if (possibleOptions.hasOwnProperty(optionKey)) {
		if (project.hasOwnProperty(optionKey)) {
			value = project[optionKey];
			if (Array.isArray(value)) {
				value = value.join(', ');
			}

			options[optionKey] = value;
		} else {
			options[optionKey] = possibleOptions[optionKey];
		}
	}
}

module.exports = options;