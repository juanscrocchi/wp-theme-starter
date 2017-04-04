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

// Add SRI to html5shiv script file.
add_filter( 'script_loader_tag', 'theme_script_html5shiv_add_sri', 10, 2 );

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

if ( ! function_exists( 'theme_script_html5shiv_add_sri' ) ) {
	/**
	 * Add SRI
	 * https://wiki.mozilla.org/Security/Guidelines/Web_Security#Subresource_Integrity
	 * to html5shiv.
	 *
	 * @param string $tag    Html code of script tag.
	 * @param string $handle Script handle.
	 */
	function theme_script_html5shiv_add_sri( $tag, $handle ) {
		if ( 'html5shiv' !== $handle ) {
			return $tag;
		}
		return str_replace( ' src', ' integrity="sha384-qFIkRsVO/J5orlMvxK1sgAt2FXT67og+NyFTITYzvbIP1IJavVEKZM7YWczXkwpB" crossorigin="anonymous" src', $tag );
	}
}
