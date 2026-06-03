/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { label, help, value } = attributes;

	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-base-control-block',
	} );

	return (
		<div { ...blockProps }>
			{ label ? (
				<strong className="blocks-preview-base-control-block__label">
					{ label }
				</strong>
			) : null }
			{ help ? (
				<p className="blocks-preview-base-control-block__help">
					{ help }
				</p>
			) : null }
			<p className="blocks-preview-component-block__saved-value">
				{ value }
			</p>
		</div>
	);
}
