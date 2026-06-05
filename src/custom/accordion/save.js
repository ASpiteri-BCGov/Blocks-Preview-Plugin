/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-custom-accordion',
	} );

	return (
		<details { ...blockProps }>
			<RichText.Content tagName="summary" value={ title } />
			<div className="blocks-preview-custom-accordion__content">
				<InnerBlocks.Content />
			</div>
		</details>
	);
}
