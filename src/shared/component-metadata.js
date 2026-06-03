/**
 * Internal dependencies
 */
import componentsConfig from '../components-config.json';

/**
 * @typedef {Object} ComponentConfigEntry
 * @property {boolean} [experimental]           Whether the component is marked experimental in the docs.
 * @property {boolean} [deprecated]             Whether the component is marked deprecated in the docs.
 * @property {string}  [deprecatedReplacement]  Recommended replacement component name (when deprecated).
 * @property {string}  [description]            Component description shown in the block sidebar.
 * @property {string}  [documentation]          URL to the component reference documentation.
 */

/**
 * Returns block metadata merged with the shared components config.
 *
 * @param {string} slug      Config key (matches the block folder / build slug).
 * @param {Object} blockJson block.json metadata for the block.
 * @return {Object & ComponentConfigEntry} Merged metadata for the block editor.
 */
export function getComponentMetadata( slug, blockJson ) {
	const config = componentsConfig[ slug ] || {};

	return {
		...blockJson,
		...config,
	};
}
