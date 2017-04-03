<?php
/**
 * Walker Nav Menu extension
 * to force anchor
 * titles attributes to be equal to link text
 *
 * @author Max G J Panas <http://maxpanas.com>
 * @package @@name
 */

// Make sure this file is called by wp.
defined( 'ABSPATH' ) || die();



/**
 * Class MInc_Walker_Nav_Menu_Title
 *
 * Prints the Html for the navigation
 * menus with forced title attribute
 *
 * @since 1.0
 *
 * @uses  MOZ_Walker_Nav_Menu
 */
class MInc_Walker_Nav_Menu_Title extends MOZ_Walker_Nav_Menu {

	/**
	 * Start the element output.
	 *
	 * @see   Walker_Nav_Menu::start_el()
	 *
	 * @since 1.0
	 *
	 * @param string       $output Passed by reference. Used to append additional content.
	 * @param object       $item   Menu item data object.
	 * @param int          $depth  Depth of menu item. Used for padding.
	 * @param object|array $args   An array of arguments. @see wp_nav_menu().
	 * @param int          $id     Current item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {

		// Menu Item Opening.
		$item_classes = array( '__item' );

		// Add classes to current/parent/ancestor items.
		if ( isset( $item->current ) && $item->current ) {
			$item_classes[] = '__item--current';
		}
		if ( isset( $item->current_item_ancestor ) && $item->current_item_ancestor ) {
			$item_classes[] = '__item--ancestor';
		}
		if ( isset( $item->current_item_parent ) && $item->current_item_parent ) {
			$item_classes[] = '__item--parent';
		}
		if ( isset( $item->has_children ) && $item->has_children ) {
			$item_classes[] = '__item--has-children';
		}

		// BEM-ify the given sub classes.
		$item_classes_str = MOZ_BEM::get_bem( $args->menu_class, $item_classes );

		if ( isset( $item->classes[0] ) && ! empty( $item->classes[0] ) ) {
			// The first item in the 'classes' array is the user-set class.
			// The rest of the classes are superfluous.
			$item_classes_str .= " {$item->classes[0]}";
		}

		$output .= "<li class=\"$item_classes_str\">";

		$item->attr_title = apply_filters( 'the_title', $item->title, $item->ID );

		// Menu Link.
		$attrs = array_filter( array(
				'title'  => $item->attr_title,
				'target' => $item->target,
				'rel'    => $item->xfn,
				'href'   => ( ! empty( $item->url ) && '#' !== $item->url ) ? $item->url : '',
				'class'  => "{$args->menu_class}__link",
			), function ( $attr ) {
				// Filter out the empty
				// attributes.
				return ! empty( $attr );
			}
		);

		$tag = isset( $attrs['href'] ) ? 'a' : 'span';

		$link_content = $args->link_before
		                . apply_filters( 'the_title', $item->title, $item->ID )
		                . $args->link_after;

		$output .= $args->before;
		$output .= MOZ_Html::get_element( $tag, $attrs, $link_content );
		$output .= $args->after;
	}
}
