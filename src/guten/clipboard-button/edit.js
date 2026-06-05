/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ClipboardButtonPreview, {
	getCopyText,
	normalizeCopyText,
} from './clipboard-button-preview';
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'clipboard-button', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, buttonLabel } = attributes;
	const [ hasCopied, setHasCopied ] = useState( false );
	const copyText = getCopyText( text );

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-clipboard-button-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ClipboardButton options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ClipboardButton documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Text to copy', 'blocks-preview' ) }
					value={ normalizeCopyText( text ) }
					onChange={ ( nextText ) =>
						setAttributes( { text: nextText ?? '' } )
					}
				/>
				<TextControl
					label={ __( 'Button label', 'blocks-preview' ) }
					value={ buttonLabel ?? '' }
					onChange={ ( nextLabel ) =>
						setAttributes( { buttonLabel: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<p className="blocks-preview-component-block__preview-label">
					{ __( 'Text to copy', 'blocks-preview' ) }
				</p>
				<p className="blocks-preview-clipboard-button-block__copy-text">
					{ copyText }
				</p>
				<ClipboardButtonPreview
					variant="primary"
					text={ copyText }
					onCopy={ () => setHasCopied( true ) }
					onFinishCopy={ () => setHasCopied( false ) }
				>
					{ hasCopied
						? __( 'Copied!', 'blocks-preview' )
						: buttonLabel || __( 'Copy Text', 'blocks-preview' ) }
				</ClipboardButtonPreview>
			</div>
		</>
	);
}
