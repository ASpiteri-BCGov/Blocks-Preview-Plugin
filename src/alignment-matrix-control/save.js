/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { value, label } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				{ label }: { value }
			</p>
		</div>
	);
}
