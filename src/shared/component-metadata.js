/**
 * Internal dependencies
 */
import gutenConfig from '../guten/components-config.json';
import bcdsConfig from '../bcds/components-config.json';

/**
 * @typedef {Object} ComponentConfigEntry
 * @property {boolean} [experimental]          Whether the component is marked experimental in the docs.
 * @property {boolean} [deprecated]            Whether the component is marked deprecated in the docs.
 * @property {string}  [deprecatedReplacement] Recommended replacement component name (when deprecated).
 * @property {string}  [description]           Component description shown in the block sidebar.
 * @property {string}  [documentation]         URL to the component reference documentation.
 */

/**
 * Resolves the components config entry for a block name.
 *
 * @param {string} slug      Config key passed from the block edit file.
 * @param {Object} blockJson block.json metadata for the block.
 * @return {ComponentConfigEntry} Matching config entry, if any.
 */
function resolveConfigEntry( slug, blockJson ) {
	const blockName = blockJson?.name || '';

	if ( blockName.startsWith( 'blocks-preview-guten/' ) ) {
		const configSlug = blockName.replace( 'blocks-preview-guten/', '' );
		return gutenConfig[ configSlug ] || gutenConfig[ slug ] || {};
	}

	if ( blockName.startsWith( 'blocks-preview-bcds/' ) ) {
		const configSlug = blockName.replace( 'blocks-preview-bcds/', '' );
		return bcdsConfig[ configSlug ] || bcdsConfig[ slug ] || {};
	}

	return gutenConfig[ slug ] || {};
}

/**
 * Returns block metadata merged with the shared components config.
 *
 * @param {string} slug      Config key (matches the block folder / build slug).
 * @param {Object} blockJson block.json metadata for the block.
 * @return {Object & ComponentConfigEntry} Merged metadata for the block editor.
 */
export function getComponentMetadata( slug, blockJson ) {
	const config = resolveConfigEntry( slug, blockJson );

	return {
		...blockJson,
		...config,
	};
}
