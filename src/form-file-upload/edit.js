/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { FormFileUpload, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'form-file-upload', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { label, accept } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FormFileUpload options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FormFileUpload documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
				<TextControl
					label={ __( 'Accept', 'blocks-preview' ) }
					value={ accept }
					onChange={ ( v ) => setAttributes( { accept: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<FormFileUpload accept={ accept } onChange={ () => {} }>
					{ label }
				</FormFileUpload>
			</div>
		</>
	);
}
