var merge = require('webpack-merge');


/**
 * Simple webpack-merge wrapper to
 * deep merge two webpack configs (objects with arrays)
 *
 * @param a
 * @param ...b
 * @returns {*}
 */
module.exports = merge.smart;
