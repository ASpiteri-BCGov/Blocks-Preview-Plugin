/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { size } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				Icon ({ size }px)
			</p>
		</div>
	);
}
