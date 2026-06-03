/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, VisuallyHidden } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'visually-hidden', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { content, visibleLabel } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Visually Hidden options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'VisuallyHidden documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Visible label', 'blocks-preview' ) }
					value={ visibleLabel }
					onChange={ ( v ) => setAttributes( { visibleLabel: v } ) }
				/>
				<TextControl
					label={ __( 'Hidden text', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<span>{ visibleLabel }</span>
				<VisuallyHidden>{ content }</VisuallyHidden>
			</div>
		</>
	);
}
