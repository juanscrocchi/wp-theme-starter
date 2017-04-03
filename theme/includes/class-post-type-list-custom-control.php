<?php
if ( ! class_exists( 'WP_Customize_Control' ) ) {
	return NULL;
}

/**
 * Class to create a custom post type control
 */
class MInc_Post_Type_List_Custom_Control extends WP_Customize_Control {

	private $posts;

	public function __construct( $manager, $id, $args = array(), $options = array() ) {
		$post_args = wp_parse_args( $options, array( 'post_type' => '' ) );
		$query = new WP_Query( array(
			'post_type'   => $post_args['post_type'],
			'post_status' => 'publish',
		) );
		$this->posts = $query->get_posts();
		parent::__construct( $manager, $id, $args );
	}
	/**
	* Render the content on the theme customizer page
	*/
	public function render_content() {
		if( empty( $this->posts ) ) {
			return false;
		}
		?>
			<label>
				<span class="customize-post-type-dropdown"><?php echo esc_html( $this->label ); ?></span>
				<select name="<?php echo $this->id; ?>" id="<?php echo $this->id; ?>" <?php echo $this->get_link(); ?>>
					<option value="0"><?php _e( '— Select —' ); ?></option>
				<?php
					foreach ( $this->posts as $post ) {
						printf( '<option value="%s" %s>%s</option>', $post->ID, selected( $this->value(), $post->ID, false ), $post->post_title );
					}
				?>
				</select>
			</label>
		<?php
	}
}
