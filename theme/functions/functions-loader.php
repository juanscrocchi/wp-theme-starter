<?php
/**
 * The Functions Loader
 *
 * @package @@name
 */

// Make sure this file is called by wp.
defined( 'ABSPATH' ) || die();

$files = array_diff( glob( __DIR__ . DIRECTORY_SEPARATOR . '*.php' ), array( __FILE__ ) );
foreach ( $files as $filename ) {
	include $filename;
}
