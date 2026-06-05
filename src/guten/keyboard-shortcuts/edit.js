/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { KeyboardShortcuts, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'keyboard-shortcuts', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { shortcutName, shortcutLabel } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	const shortcuts = { [ shortcutName ]: () => {} };
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'Keyboard Shortcuts options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'KeyboardShortcuts documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Shortcut', 'blocks-preview' ) }
					value={ shortcutName }
					onChange={ ( v ) => setAttributes( { shortcutName: v } ) }
				/>
				<TextControl
					label={ __( 'Description', 'blocks-preview' ) }
					value={ shortcutLabel }
					onChange={ ( v ) => setAttributes( { shortcutLabel: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<KeyboardShortcuts shortcuts={ shortcuts } />
				<p>
					{ shortcutLabel } ({ shortcutName })
				</p>
			</div>
		</>
	);
}
