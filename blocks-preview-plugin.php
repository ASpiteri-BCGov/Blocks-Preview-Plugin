<?php
/**
 * Plugin Name:       Blocks Preview
 * Plugin URI:        https://github.com/aspiteri/Blocks-Preview-Plugin
 * Description:       Preview WordPress block editor components as blocks.
 * Version:           0.5.0
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
 * Block slugs built by @wordpress/scripts (must match build/ folder names).
 */
const BLOCKS_PREVIEW_BLOCK_SLUGS = array(
	'base-field',
	'alignment-matrix-control',
	'angle-picker-control',
	'animate',
	'autocomplete',
	'base-control',
	'border-box-control',
	'border-control',
	'box-control',
	'button',
	'button-group',
	'card',
	'checkbox-control',
	'clipboard-button',
	'color-indicator',
	'color-palette',
	'color-picker',
	'combobox-control',
	'custom-gradient-picker',
	'custom-select-control',
	'dashicon',
	'date-time-picker',
	'disabled',
	'draggable',
	'drop-zone',
	'dropdown',
	'dropdown-menu',
	'duotone-picker',
	'elevation',
	'external-link',
	'flex',
	'focal-point-picker',
	'font-size-picker',
	'form-toggle',
	'form-token-field',
	'gradient-picker',
	'guide',
	'heading',
	'h-stack',
	'icon',
	'input-control',
	'menu-group',
	'menu-item',
	'menu-items-choice',
	'modal',
	'navigable-menu',
	'navigator',
	'notice',
	'notice-list',
	'panel',
	'placeholder',
	'popover',
	'progress-bar',
	'query-controls',
	'radio-control',
	'range-control',
	'badge',
	'calendar',
	'circular-option-picker',
	'composite',
	'confirm-dialog',
	'custom-select-control-v2',
	'divider',
	'focusable-iframe',
	'form-file-upload',
	'grid',
	'higher-order',
	'isolated-event-container',
	'item-group',
	'keyboard-shortcuts',
	'menu',
	'mobile',
	'number-control',
	'radio-group',
	'resizable-box',
	'responsive-wrapper',
	'sandbox',
	'scroll-lock',
	'scrollable',
	'search-control',
	'select-control',
	'slot-fill',
	'snackbar',
	'spacer',
	'spinner',
	'surface',
	'tab-panel',
	'tabs',
	'text',
	'text-control',
	'text-highlight',
	'textarea-control',
	'theme',
	'toggle-control',
	'toggle-group-control',
	'toolbar',
	'tools-panel',
	'tooltip',
	'tree-grid',
	'tree-select',
	'truncate',
	'unit-control',
	'v-stack',
	'view',
	'visually-hidden',
	'z-stack',
);

/**
 * Adds an inserter category so preview blocks are easy to find.
 *
 * @param array $categories Registered block categories.
 * @return array
 */
function blocks_preview_block_categories( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'blocks-preview',
				'title' => __( 'Blocks Preview', 'blocks-preview' ),
				'icon'  => null,
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'blocks_preview_block_categories', 10, 1 );
add_filter( 'block_categories', 'blocks_preview_block_categories', 10, 1 );

/**
 * Admin notice when compiled assets are missing.
 */
function blocks_preview_missing_build_notice() {
	if ( ! current_user_can( 'activate_plugins' ) ) {
		return;
	}

	printf(
		'<div class="notice notice-error"><p><strong>%1$s</strong> %2$s</p><p><code>%3$s</code></p></div>',
		esc_html__( 'Blocks Preview:', 'blocks-preview' ),
		esc_html__(
			'Block assets are missing. From the plugin directory run npm install && npm run build, then reload the editor.',
			'blocks-preview'
		),
		esc_html( 'npm install && npm run build' )
	);
}

/**
 * Loads shared component metadata from src/components-config.json.
 *
 * @return array<string, array<string, mixed>>
 */
function blocks_preview_get_components_config() {
	static $config = null;

	if ( null !== $config ) {
		return $config;
	}

	$config_path = __DIR__ . '/src/components-config.json';

	if ( ! file_exists( $config_path ) ) {
		$config = array();
		return $config;
	}

	// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Reading local plugin config.
	$decoded = json_decode( file_get_contents( $config_path ), true );

	$config = is_array( $decoded ) ? $decoded : array();

	return $config;
}

/**
 * Merges description (and related fields) from components-config.json into block metadata.
 *
 * @param array $metadata Block metadata from block.json.
 * @return array
 */
function blocks_preview_merge_component_config( $metadata ) {
	if ( empty( $metadata['name'] ) || 0 !== strpos( $metadata['name'], 'blocks-preview/' ) ) {
		return $metadata;
	}

	$slug   = substr( $metadata['name'], strlen( 'blocks-preview/' ) );
	$config = blocks_preview_get_components_config();

	if ( empty( $config[ $slug ] ) || ! is_array( $config[ $slug ] ) ) {
		return $metadata;
	}

	return array_merge( $metadata, $config[ $slug ] );
}
add_filter( 'block_type_metadata', 'blocks_preview_merge_component_config' );

/**
 * Registers blocks built with @wordpress/scripts.
 */
function blocks_preview_register_blocks() {
	$build_dir = __DIR__ . '/build';
	$manifest  = $build_dir . '/blocks-manifest.php';

	if ( ! file_exists( $manifest ) ) {
		add_action( 'admin_notices', 'blocks_preview_missing_build_notice' );
		return;
	}

	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( $build_dir, $manifest );
		return;
	}

	foreach ( BLOCKS_PREVIEW_BLOCK_SLUGS as $block_slug ) {
		$block_dir = $build_dir . '/' . $block_slug;

		if ( file_exists( $block_dir . '/block.json' ) ) {
			register_block_type( $block_dir );
		}
	}
}
add_action( 'init', 'blocks_preview_register_blocks' );

/**
 * Enqueues wp-components styles so component previews match the editor UI.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
function blocks_preview_enqueue_editor_styles() {
	wp_enqueue_style( 'wp-components' );
}
add_action( 'enqueue_block_editor_assets', 'blocks_preview_enqueue_editor_styles' );
