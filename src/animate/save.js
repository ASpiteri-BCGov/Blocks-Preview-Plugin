/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { animationType, origin, noticeText } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				{ noticeText }
			</p>
			<p className="blocks-preview-component-block__saved-value">
				{ __( 'Animation (editor preview):', 'blocks-preview' ) }{ ' ' }
				{ animationType }
				{ animationType !== 'loading' ? ` (${ origin })` : '' }
			</p>
		</div>
	);
}
