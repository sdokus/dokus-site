<?php
/**
 * Associated Events controller class.
 */

namespace TEC\Tickets\Seating\Admin\Events;

use TEC\Common\Contracts\Provider\Controller as Controller_Contract;
use TEC\Tickets\Seating\Admin\Template;
use TEC\Common\lucatume\DI52\Container;
use TEC\Tickets\Seating\Tables\Layouts;
use TEC\Common\StellarWP\DB\DB;

/**
 * Class Events Controller.
 *
 * @since TBD
 */
class Controller extends Controller_Contract {
	/**
	 * A reference to the template instance used to render the templates.
	 *
	 * @since TBD
	 *
	 * @var Template
	 */
	private Template $template;
	
	/**
	 * Events Controller constructor.
	 *
	 * @since TBD
	 *
	 * @param Container $container The container instance.
	 * @param Template  $template The template instance.
	 */
	public function __construct( Container $container, Template $template ) {
		parent::__construct( $container );
		$this->template = $template;
	}
	
	/**
	 * Register actions.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	protected function do_register(): void {
		add_action( 'admin_menu', [ $this, 'add_events_list_page' ], 20 );
		add_action( 'load-' . Associated_Events::PAGE, [ $this, 'setup_events_list_screen' ] );
		add_filter( 'set_screen_option_' . Associated_Events::OPTION_PER_PAGE, [ $this, 'save_per_page_option' ], 10, 3 );
	}
	
	/**
	 * Remove actions.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function unregister(): void {
		remove_action( 'admin_menu', [ $this, 'add_events_list_page' ], 20 );
		remove_action( 'load-' . Associated_Events::PAGE, [ $this, 'setup_events_list_screen' ] );
		remove_filter( 'set_screen_option_' . Associated_Events::OPTION_PER_PAGE, [ $this, 'save_per_page_option' ] );
	}
	
	/**
	 * Setup Event listing screen.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function setup_events_list_screen() {
		$screen = get_current_screen();
		if ( Associated_Events::PAGE !== $screen->id ) {
			return;
		}
		
		$screen->add_option(
			'per_page',
			[
				'label'   => __( 'Events per page', 'event-tickets' ),
				'default' => 10,
				'option'  => Associated_Events::OPTION_PER_PAGE,
			]
		);
	}
	
	/**
	 * Save per page option.
	 *
	 * @since TBD
	 *
	 * @param mixed  $screen_option The value to save instead of the option value. Default false (to skip saving the current option).
	 * @param string $option The option name.
	 * @param int    $value The option value.
	 *
	 * @return mixed The screen option value.
	 */
	public function save_per_page_option( $screen_option, $option, $value ) {
		if ( Associated_Events::OPTION_PER_PAGE !== $option ) {
			return $screen_option;
		}
		
		return $value;
	}
	
	/**
	 * Register Event listing page.
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function add_events_list_page() {
		add_submenu_page(
			'',
			__( 'Events', 'event-tickets' ),
			'',
			'manage_options',
			Associated_Events::SLUG,
			[ $this, 'render' ]
		);
	}
	
	/**
	 * Render the Associated Events list table.
	 *
	 * @since TBD
	 *        
	 * @return void
	 */
	public function render() {
		$events_table = new Associated_Events();
		$events_table->prepare_items();
		
		$layout_id = tribe_get_request_var( 'layout', false );
		$layout    = DB::table( Layouts::table_name( false ) )->where( 'id', $layout_id )->get();
		
		if ( empty( $layout ) ) {
			echo esc_html( _x( 'Layout ID is not valid!', 'Associated events list layout id', 'event-tickets' ) );
			return;
		}
		
		$header = sprintf(
			/* translators: %s: Layout name. */
			_x( 'Associated Events for %s', 'Associated events list header', 'event-tickets' ),
			$layout->name
		);
		
		$this->template->template(
			'events/list',
			[
				'header'       => $header,
				'events_table' => $events_table,
			]
		);
	}
}
