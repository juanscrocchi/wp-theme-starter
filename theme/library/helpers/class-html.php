<?php
/**
 * WordPress HTML Helpers
 *
 * @author Max G J Panas <http://maxpanas.com>
 * @package @@name
 */

/**
 * Class MOZ_Html
 */
class MOZ_Html {


	/**
	 * Returns a self-closing HTML
	 * element constructed
	 * by php
	 *
	 * @param string $tag   Html tag.
	 * @param array  $attrs Html element attributes.
	 *
	 * @return string
	 */
	static function get_sc_element( $tag = 'img', $attrs = array() ) {
		$html = "<$tag";
		foreach ( (array) $attrs as $attr => $value ) {
			$value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
			$html .= " $attr=\"$value\"";
		}
		$html .= '>';

		return $html;
	}


	/**
	 * Prints a self-closing HTML
	 * element constructed
	 * by php
	 *
	 * @param string $tag   Html tag.
	 * @param array  $attrs Html element attributes.
	 */
	static function sc_element( $tag = 'img', $attrs = array() ) {
		echo wp_kses( self::get_sc_element( $tag, $attrs ), wp_kses_allowed_html( 'post' ) );
	}


	/**
	 * Returns an HTML
	 * element constructed
	 * by php
	 *
	 * @param string $tag     Html tag.
	 * @param array  $attrs   Html element attributes.
	 * @param string $content Html element content.
	 *
	 * @return string
	 */
	static function get_element( $tag = 'div', $attrs = array(), $content = '' ) {
		$html = self::get_sc_element( $tag, $attrs );

		$html .= $content;

		$html .= "</$tag>";

		return $html;
	}


	/**
	 * Prints an HTML
	 * element constructed
	 * by php
	 *
	 * @param string $tag     Html tag.
	 * @param array  $attrs   Html element attributes.
	 * @param string $content Html element content.
	 */
	static function element( $tag = 'div', $attrs = array(), $content = '' ) {
		echo wp_kses( self::get_element( $tag, $attrs, $content ), wp_kses_allowed_html( 'post' ) );
	}
}
