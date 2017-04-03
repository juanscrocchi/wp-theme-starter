<?php
/**
 * BEM class name convention
 * helper
 *
 * @author Max G J Panas <http://maxpanas.com>
 * @package @@name
 */

/**
 * Class MOZ_BEM
 */
class MOZ_BEM {


	/**
	 * Get the BEM className
	 * string given a list of
	 * element/modifier names
	 * and a block name
	 *
	 * @param string $block       BEM block name.
	 * @param array  $sub_classes Array of BEM subclasses.
	 *
	 * @return string
	 */
	public static function get_bem( $block, $sub_classes = array() ) {
		return $block . implode( " $block", (array) $sub_classes );
	}


	/**
	 * Print the BEM className
	 * string given a list of
	 * element/modifier names
	 * and a block name
	 *
	 * @param string $block       BEM block name.
	 * @param array  $sub_classes Array of BEM subclasses.
	 */
	public static function bem( $block, $sub_classes = array() ) {
		echo esc_attr( self::get_bem( $block, $sub_classes ) );
	}
}
