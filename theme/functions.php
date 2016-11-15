<?php
/**
 * Theme Functions &
 * Functionality
 *
 * @package @@name
 */

/*
	=========================================
		ACTION HOOKS & FILTERS
	=========================================
*/

/**--- Actions ---**/

add_action( 'after_setup_theme',  'theme_setup' );

add_action( 'wp_enqueue_scripts', 'theme_styles' );

add_action( 'wp_enqueue_scripts', 'theme_scripts' );

/*
Expose php variables to js. just uncomment line
below and see function theme_scripts_localize.
add_action( 'wp_enqueue_scripts', 'theme_scripts_localize', 20 );
*/

// Add the inline script setting the 'js' class to the 'body' tag.
add_action( 'wp_head', 'theme_head_inline_scripts', 1, 2 );

// Disable author pages and redirect to home page.
add_action( 'template_redirect', 'theme_disable_author_pages' );

/**--- Filters ---**/

// Add async and defer tags to the theme core js file.
add_filter( 'script_loader_tag', 'theme_script_add_async_attribute', 10, 2 );

// Remove wordpress version from the 'generator' page head tag.
add_filter( 'the_generator', 'theme_remove_wordpress_version' );

/*
	=========================================
		HOOKED Functions
	=========================================
*/

/**--- Actions ---**/

if ( ! function_exists( 'theme_setup' ) ) {
	/**
	 * Setup the theme
	 *
	 * @since 1.0
	 */
	function theme_setup() {

		// Let wp know we want to use html5 for content.
		add_theme_support( 'html5', array(
			'comment-list',
			'comment-form',
			'search-form',
			'gallery',
			'caption',
		) );

		/* Let wp know we want to use post thumbnails. */

		/* add_theme_support( 'post-thumbnails' ); . */

		// Add WP 4.1 title tag support.
		add_theme_support( 'title-tag' );

		/* Add Custom Logo Support. */

		/*
		add_theme_support( 'custom-logo', array(
			'width'       => 181, // Example Width Size
			'height'      => 42,  // Example Height Size
			'flex-width'  => true,
		) );
		*/

		/* Register navigation menus for theme. */

		/*
		register_nav_menus( array(
			'primary' => 'Main Menu',
			'footer'  => 'Footer Menu'
		) );
		*/

		/* Let wp know we are going to handle styling galleries. */

		/*
		add_filter( 'use_default_gallery_style', '__return_false' );
		*/

		// Stop WP from printing emoji service on the front.
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );

		/* Remove toolbar for all users in front end.  */

		/*
		show_admin_bar( false );
		*/

		/* Add Custom Image Sizes. */

		/*
		add_image_size( 'ExampleImageSize', 1200, 450, true ); // Example Image Size
		...
		*/

		// WPML configuration.
		// Disable plugin from printing styles and js
		// we are going to handle all that ourselves.
		if ( ! is_admin() ) {
			define( 'ICL_DONT_LOAD_NAVIGATION_CSS', true );
			define( 'ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true );
			define( 'ICL_DONT_LOAD_LANGUAGES_JS', true );
		}

		/*
		Contact Form 7 Configuration needs to be done
		in wp-config.php. add the following snippet
		under the line:
		*/

		/*
		define( 'WP_DEBUG', false );
		*/

		/*
		//Contact Form 7 Plugin Configuration
		define ( 'WPCF7_LOAD_JS',  false ); // Added to disable JS loading
		define ( 'WPCF7_LOAD_CSS', false ); // Added to disable CSS loading
		define ( 'WPCF7_AUTOP',    false ); // Added to disable adding <p> & <br> in form output
		*/

		// Register Autoloaders Loader.
		$theme_dir = get_template_directory();
		include "$theme_dir/library/library-loader.php";
		include "$theme_dir/includes/includes-loader.php";
		include "$theme_dir/components/components-loader.php";
	}
}

if ( ! function_exists( 'theme_styles' ) ) {
	/**
	 * Register and/or Enqueue
	 * Styles for the theme
	 *
	 * @since 1.0
	 */
	function theme_styles() {
		$theme_dir = get_stylesheet_directory_uri();

		wp_enqueue_style( 'main', "$theme_dir/assets/css/main.css", array(), null, 'all' );
	}
}

if ( ! function_exists( 'theme_scripts' ) ) {
	/**
	 * Register and/or Enqueue
	 * Scripts for the theme
	 *
	 * @since 1.0
	 */
	function theme_scripts() {
		$theme_dir = get_stylesheet_directory_uri();

		wp_enqueue_script( 'html5shiv', '//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js' );
		wp_script_add_data( 'html5shiv', 'conditional', 'lt IE 9' );
		wp_enqueue_script( 'core', "$theme_dir/assets/js/core.js", array(), null, false );
		wp_enqueue_script( 'main', "$theme_dir/assets/js/main.js", array(), null, true );
	}
}

if ( ! function_exists( 'theme_scripts_localize' ) ) {
	/**
	 * Attach variables we want
	 * to expose to our JS
	 *
	 * @since 3.12.0
	 */
	function theme_scripts_localize() {
		$ajax_url_params = array();

		// You can remove this block if you don't use WPML.
		if ( function_exists( 'wpml_object_id' ) ) {
			/* @var object $sitepress SitePress object. */
			global $sitepress;

			$current_lang = $sitepress->get_current_language();
			wp_localize_script( 'main', 'i18n', array(
				'lang' => $current_lang,
			) );

			$ajax_url_params['lang'] = $current_lang;
		}

		wp_localize_script( 'main', 'urls', array(
			'home'  => home_url(),
			'theme' => get_stylesheet_directory_uri(),
			'ajax'  => add_query_arg( $ajax_url_params, admin_url( 'admin-ajax.php' ) ),
		) );
	}
}

if ( ! function_exists( 'theme_head_inline_scripts' ) ) {
	/**
	 * Print inline scripts
	 * we want in html head.
	 */
	function theme_head_inline_scripts() {
		ob_start();
		// Replace the no-js class with js on the html element.
?>
<script>
	document.documentElement.className=document.documentElement.className.replace(/\bno-js\b/,'js');
</script>
<?php
		echo ob_get_clean(); // WPCS: XSS ok.
	}
}

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

if ( ! function_exists( 'theme_script_add_async_attribute' ) ) {
	/**
	 * Add async
	 * and defer attributes
	 * to core.js.
	 *
	 * @param string $tag    Html code of script tag.
	 * @param string $handle Script handle.
	 */
	function theme_script_add_async_attribute( $tag, $handle ) {
		if ( 'core' !== $handle ) {
			return $tag;
		}
		return str_replace( ' src', ' async defer src', $tag );
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
