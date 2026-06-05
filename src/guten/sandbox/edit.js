/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { SandBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'sandbox', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { src, title } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	const html =
		'<iframe src="' +
		src +
		'" title="' +
		title +
		'" width="100%" height="200" style="border:0;"></iframe>';
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'SandBox options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'SandBox documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
				/>
				<TextControl
					label={ __( 'Source URL', 'blocks-preview' ) }
					value={ src }
					onChange={ ( v ) => setAttributes( { src: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<SandBox title={ title } html={ html } />
			</div>
		</>
	);
}
