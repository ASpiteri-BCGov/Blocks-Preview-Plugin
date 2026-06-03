/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tooltip', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, triggerText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tooltip options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Tooltip documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Trigger text', 'blocks-preview' ) }
					value={ triggerText }
					onChange={ ( nextText ) =>
						setAttributes( { triggerText: nextText } )
					}
				/>
				<TextControl
					label={ __( 'Tooltip text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( nextText ) =>
						setAttributes( { text: nextText } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Tooltip text={ text }>
					<span>{ triggerText }</span>
				</Tooltip>
			</div>
		</>
	);
}
