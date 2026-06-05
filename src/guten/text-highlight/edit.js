/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, TextHighlight } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'text-highlight', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, highlight } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'TextHighlight options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'TextHighlight documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( nextText ) =>
						setAttributes( { text: nextText } )
					}
				/>
				<TextControl
					label={ __( 'Highlight', 'blocks-preview' ) }
					value={ highlight }
					onChange={ ( nextHighlight ) =>
						setAttributes( { highlight: nextHighlight } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<TextHighlight text={ text } highlight={ highlight } />
			</div>
		</>
	);
}
