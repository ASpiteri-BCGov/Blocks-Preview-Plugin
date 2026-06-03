/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getCopyText } from './clipboard-button-preview';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { text, buttonLabel } = attributes;
	const copyText = getCopyText( text );

	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-clipboard-button-block__saved',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__preview-label">
				{ __( 'Text to copy', 'blocks-preview' ) }
			</p>
			<p className="blocks-preview-clipboard-button-block__copy-text">
				{ copyText }
			</p>
			<p className="blocks-preview-component-block__saved-value">
				{ buttonLabel || __( 'Copy Text', 'blocks-preview' ) }
			</p>
		</div>
	);
}
