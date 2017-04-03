<?php
/**
 * WordPress Menu Utilities
 * to support BEM class namings
 * conventions
 *
 * @author Max G J Panas <http://maxpanas.com>
 * @package @@name
 */

/**
 * Class MOZ_Menu
 */
class MOZ_Menu {


	/**
	 * Print a wp nav menu for
	 * the given theme location
	 * using some sensible defaults
	 *
	 * @param string $theme_location Nav menu theme location.
	 * @param array  $extras         Extra menu parameters.
	 */
	public static function nav_menu( $theme_location = 'primary', $extras = array() ) {
		echo wp_kses( self::get_nav_menu( $theme_location, $extras ), wp_kses_allowed_html( 'post' ) );
	}


	/**
	 * Return a wp nav menu for
	 * the given theme location
	 * using some sensible defaults
	 *
	 * @param string $theme_location Nav menu theme location.
	 * @param array  $extras         Extra menu parameters.
	 *
	 * @returns string
	 */
	public static function get_nav_menu( $theme_location = 'primary', $extras = array() ) {
		$container = isset( $extras['container'] )
			? $extras['container']
			: 'nav';

		$menu_class = isset( $extras['menu_class'] ) && ! empty( $extras['menu_class'] )
			? $extras['menu_class']
			: 'menu';

		$container_class = 'menu' === $menu_class
			? "$menu_class $menu_class--$theme_location"
			: $menu_class;

		$show_level_class = isset( $extras['show_level_class'] )
			? (bool) $extras['show_level_class']
			: true;

		$wrap_class = "{$menu_class}__list";
		if ( $show_level_class ) {
			$wrap_class .= " {$menu_class}__list--level-0";
		}
		if ( isset( $extras['wrap_class'] ) ) {
			$wrap_class .= " {$extras['wrap_class']}";
		}

		return wp_nav_menu( array_merge( array(
			'echo'             => false,
			'theme_location'   => $theme_location,
			'container'        => $container,
			'container_class'  => $container_class,
			'menu_class'       => $menu_class,
			'show_level_class' => $show_level_class,
			'items_wrap'       => "<ul class=\"{$wrap_class}\">%3\$s</ul>",
			'fallback_cb'      => false,
			'walker'           => new MOZ_Walker_Nav_Menu,
		), $extras ) );
	}


	/**
	 * Get menu items for a given
	 * menu location
	 *
	 * @param string $theme_location Nav menu theme location.
	 *
	 * @return array|bool|false
	 */
	public static function get_menu_items( $theme_location = 'primary' ) {
		$locations = get_nav_menu_locations();

		if ( ! isset( $locations[ $theme_location ] ) ) {
			return false;
		}

		$menu_id = $locations[ $theme_location ];
		if ( function_exists( 'wpml_object_id' ) ) {
			$menu_id = wpml_object_id( (int) $menu_id, 'nav_menu' );
		}

		return wp_get_nav_menu_items( $menu_id );
	}


	/**
	 * Get a menu item given
	 * an object_id
	 *
	 * @param array|string $menu Array of menu items, or menu location id.
	 * @param int          $item_id Item dom identifier.
	 *
	 * @return bool
	 */
	public static function get_menu_item( $menu = 'primary', $item_id = 0 ) {
		if ( is_string( $menu ) ) {
			$menu = self::get_menu_items( $menu );
		}

		if ( ! $item_id ) {
			$item_id = get_queried_object_id();
		}

		foreach ( (array) $menu as $item ) {
			if ( (int) $item_id === (int) $item->object_id ) {
				return $item;
			}
		}

		return false;
	}


	/**
	 * Get the parent menu items
	 * given an object_id
	 *
	 * @param array|string $menu array of menu items, or menu location id.
	 * @param int          $item_id Item dom identifier.
	 *
	 * @return array|bool
	 */
	public static function get_parent_menu_items( $menu = 'primary', $item_id = 0 ) {
		if ( is_string( $menu ) ) {
			$menu = self::get_menu_items( $menu );
		}

		if ( ! $menu ) {
			return $menu;
		}

		if ( ! $item_id ) {
			$item_id = get_queried_object_id();
		}

		$parent_id = $item_id;
		$parents   = array();
		foreach ( array_reverse( (array) $menu ) as $menu_item ) {
			if ( $menu_item->object_id === $parent_id || $menu_item->ID === $parent_id ) {
				if ( $parent_id !== $item_id ) {
					$parents[] = $menu_item;
				}

				$parent_id = $menu_item->menu_item_parent;
				if ( ! ( $parent_id ) ) {
					return array_reverse( $parents );
				}
			}
		}

		return array();
	}
}
