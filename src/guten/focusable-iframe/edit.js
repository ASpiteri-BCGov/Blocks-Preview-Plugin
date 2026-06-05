/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { FocusableIframe, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'focusable-iframe', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { src, title } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FocusableIframe options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FocusableIframe documentation',
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
				<FocusableIframe
					title={ title }
					src={ src }
					width="100%"
					height={ 200 }
				/>
			</div>
		</>
	);
}
