<?php
/**
 * Wordpress 'Post type list' theme customizer custom control.
 *
 * @package @@name
 */

// Make sure this file is called by wp.
defined( 'ABSPATH' ) || die();

?>

<?php
if ( ! class_exists( 'WP_Customize_Control' ) ) {
	return null;
}

/**
 * Class to create a custom post type control
 */
class MInc_Post_Type_List_Custom_Control extends WP_Customize_Control {
	/**
	 * Wordpress posts variable
	 *
	 * @var array $posts Wordpress posts array
	 **/
	private $posts;

	/**
	 * Constructor function
	 * Gets post type list before calling parent constructor
	 *
	 * @param object $manager WP manager object.
	 * @param int    $id      WP customize control ID.
	 * @param array  $args    WP customize control arguments.
	 * @param array  $options WP customize control options.
	 */
	public function __construct( $manager, $id, $args = array(), $options = array() ) {
		$post_args = wp_parse_args( $options, array(
			'post_type' => '',
		) );
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
		if ( empty( $this->posts ) ) {
			return false;
		}
		?>
			<label>
				<span class="customize-post-type-dropdown customize-control-title"><?php echo esc_html( $this->label ); ?></span>
				<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
				<select name="<?php echo esc_attr( $this->id ); ?>" id="<?php echo esc_attr( $this->id ); ?>" <?php $this->link(); ?>>
					<option value="0"><?php esc_attr_e( '— Select —' ); ?></option>
				<?php
				foreach ( $this->posts as $post ) {
					printf( '<option value="%s" %s>%s</option>', esc_attr( $post->ID ), selected( $this->value(), esc_attr( $post->ID ), false ), esc_attr( $post->post_title ) );
				}
				?>
				</select>
			</label>
		<?php
	}
}
