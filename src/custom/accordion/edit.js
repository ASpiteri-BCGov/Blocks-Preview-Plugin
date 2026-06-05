/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/image',
	'core/buttons',
	'core/list',
];

const TEMPLATE = [
	[ 'core/paragraph', { placeholder: 'Add content…' } ],
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-custom-accordion',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'blocks-preview-custom-accordion__content' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<details { ...blockProps } open>
			<RichText
				tagName="summary"
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				placeholder="Section title"
				allowedFormats={ [] }
			/>
			<div { ...innerBlocksProps } />
		</details>
	);
}
