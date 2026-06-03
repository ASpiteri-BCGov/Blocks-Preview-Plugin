<?php
/**
 * Plugin Name:       Blocks Preview
 * Plugin URI:        https://github.com/aspiteri/Blocks-Preview-Plugin
 * Description:       Preview WordPress block editor components as blocks.
 * Version:           0.2.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            aspiteri
 * License:           Apache-2.0
 * License URI:       https://www.apache.org/licenses/LICENSE-2.0
 * Text Domain:       blocks-preview
 *
 * @package BlocksPreview
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers blocks built with @wordpress/scripts.
 */
function blocks_preview_register_blocks() {
	$build_dir = __DIR__ . '/build';

	if ( ! file_exists( $build_dir . '/blocks-manifest.php' ) ) {
		return;
	}

	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection(
			$build_dir,
			$build_dir . '/blocks-manifest.php'
		);
		return;
	}

	register_block_type( $build_dir . '/base-field' );
}
add_action( 'init', 'blocks_preview_register_blocks' );

/**
 * Enqueues wp-components styles so BaseField layout matches the editor UI.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
function blocks_preview_enqueue_editor_styles() {
	wp_enqueue_style( 'wp-components' );
}
add_action( 'enqueue_block_editor_assets', 'blocks_preview_enqueue_editor_styles' );
