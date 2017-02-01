<?php
/**
 * Security related functions
 *
 * @package @@name
 */

// Make sure this file is called by wp.
defined( 'ABSPATH' ) || die();

// Disable author pages and redirect to home page.
add_action( 'template_redirect', 'theme_disable_author_pages' );

// Remove wordpress version from the 'generator' page head tag.
add_filter( 'the_generator', 'theme_remove_wordpress_version' );

// Disable xml-rpc.
add_filter( 'xmlrpc_enabled', '__return_false' );

if ( ! function_exists( 'theme_disable_author_pages' ) ) {
	/**
	 * Disable author pages
	 *
	 * This function is registered to the template_redirect hook and checks
	 * to redirect the user to the homepage
	 */
	function theme_disable_author_pages() {
		global $post;

		$author_request = false;
		if ( is_404() ) {
			if ( ! get_query_var( 'author' ) && ! get_query_var( 'author_name' ) ) {
				return;
			}
			$author_request = true;
		}

		if ( is_author() || $author_request ) {
			wp_redirect( home_url(), '301' );
			exit;
		}
	}
}

if ( ! function_exists( 'theme_remove_wordpress_version' ) ) {
	/**
	 * Remove wordpress
	 * version from
	 * 'generator' head tag.
	 */
	function theme_remove_wordpress_version() {
		return '';
	}
}
