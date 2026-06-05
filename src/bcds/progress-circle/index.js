/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './editor.scss';
import './style.scss';
import '../../shared/bcds-editor-setup';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
} );
