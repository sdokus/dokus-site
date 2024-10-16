<?php
/**
 * Provides methods to register built assets for the Seating feature.
 *
 * @since   TBD
 *
 * @package TEC\Tickets_Plus\Seating;
 */

namespace TEC\Tickets_Plus\Seating;

use Tribe__Tickets_Plus__Main as Tickets_Plus;

/**
 * Trait Built_Assets.
 *
 * @since   TBD
 *
 * @package TEC\Tickets_Plus\Seating;
 */
trait Built_Assets {
	/**
	 * Returns the built asset URL for the Seating feature.
	 *
	 * @since TBD
	 *
	 * @param string $path The file path from the `/build/seating` directory of the plugin.
	 */
	protected function built_asset_url( string $path ): string {
		$plugin = Tickets_Plus::instance();

		return $plugin->plugin_url . 'build/Seating/' . ltrim( $path, '/' );
	}
}
