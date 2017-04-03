<?php
/**
 * Generic Wordpress
 * utility class
 *
 * @author Mehdi Lahlou <http://usine.ch>
 * @package @@name
 */

// Make sure this file is called by wp.
defined( 'ABSPATH' ) || die();



/**
 * Class MInc_Utils
 *
 * Generic wordpress functions
 */
class MInc_Utils {

	/**
	 * Print a wp nav menu name
	 * for the given theme location
	 *
	 * @param string $theme_location Theme location.
	 */
	public static function nav_menu_name( $theme_location = 'primary' ) {
		echo wp_kses( self::get_nav_menu_name( $theme_location ), array() );
	}

	/**
	 * Return a wp nav menu name
	 * for the given theme location
	 *
	 * @param string $theme_location Theme location.
	 */
	public static function get_nav_menu_name( $theme_location = 'primary' ) {
		$theme_locations = get_nav_menu_locations();
		if ( ! isset( $theme_locations[ $theme_location ] ) ) {
			return false;
		}

		$menu_obj = get_term( $theme_locations[ $theme_location ], 'nav_menu' );
		if ( ! $menu_obj || ! isset( $menu_obj->name ) ) {
			return false;
		}

		return $menu_obj->name;
	}

	/**
	 * Registers a wp sidebar
	 * with its id and name
	 *
	 * @param string $sidebar_id   Sidebar dom identifier.
	 * @param string $sidebar_name Sidebar name.
	 * @param array  $extras       Extra sidebar parameters.
	 */
	public static function register_sidebar( $sidebar_id = 'sidebar1', $sidebar_name = 'Sidebar', $extras = array() ) {
		$sidebar_description = isset( $extras['sidebar_description'] ) && ! empty( $extras['sidebar_description'] )
			? $extras['sidebar_description']
			: '';

		$widget_container_element = isset( $extras['widget_container_element'] ) && ! empty( $extras['widget_container_element'] )
			? $extras['widget_container_element']
			: 'ul';

		$widget_container_class = isset( $extras['widget_container_class'] ) && ! empty( $extras['widget_container_class'] )
			? $extras['widget_container_class']
			: 'widget';

		$widget_title_element = isset( $extras['widget_title_element'] ) && ! empty( $extras['widget_title_element'] )
			? $extras['widget_title_element']
			: 'h2';

		$widget_title_class = isset( $extras['widget_title_class'] ) && ! empty( $extras['widget_title_class'] )
			? $extras['widget_title_class']
			: 'widget__header';

		return register_sidebar(array(
			'id' => $sidebar_id,
			'name' => $sidebar_name,
			'description' => $sidebar_description,
			'before_widget' => '<' . $widget_container_element . ' id="%1$s" class="' . $widget_container_class . ' %2$s">',
			'after_widget' => '</' . $widget_container_element . '>',
			'before_title' => '<' . $widget_title_element . ' class="' . $widget_title_class . '">',
			'after_title' => '</' . $widget_title_element . '>',
		));
	}

	/**
	 * Prints a wp sidebar
	 * given its identifier
	 *
	 * @param string $sidebar_id   Sidebar dom identifier.
	 * @param array  $extras       Extra sidebar parameters.
	 */
	public static function sidebar( $sidebar_id = 'sidebar1', $extras = array() ) {
		echo wp_kses( self::get_sidebar( $sidebar_id , $extras ), wp_kses_allowed_html( 'post' ) );
	}

	/**
	 * Return a wp sidebar
	 * given its identifier
	 *
	 * @param string $sidebar_id   Sidebar dom identifier.
	 * @param array  $extras       Extra sidebar parameters.
	 */
	public static function get_sidebar( $sidebar_id = 'sidebar1', $extras = array() ) {
		$sidebar_class = isset( $extras['sidebar_class'] ) && ! empty( $extras['sidebar_class'] )
			? $extras['sidebar_class']
			: 'sidebar';

		$container_class = 'sidebar' === $sidebar_class
			? "$sidebar_class $sidebar_class--$sidebar_id"
			: $sidebar_class;

		$sidebar_content_html = '';
		if ( is_active_sidebar( $sidebar_id ) ) :
			ob_start();
			dynamic_sidebar( $sidebar_id );
			$sidebar_content_html = ob_get_clean();
		else :
			// This content shows up if there are no widgets defined in the backend.
			$alert_class = "{$sidebar_class}__alert";
			$sidebar_content_html = MOZ_Html::get_element( 'div', array(
				'class' => $alert_class,
			), __( 'Please activate some Widgets.' ) );
		endif;

		$panel_class = "{$sidebar_class}__panel";
		$panel_html = MOZ_Html::get_element( 'div', array(
			'class' => $panel_class,
		), $sidebar_content_html );

		return MOZ_Html::get_element( 'div', array(
			'class' => $container_class,
			'role' => 'complementary',
		), $panel_html );
	}
}
