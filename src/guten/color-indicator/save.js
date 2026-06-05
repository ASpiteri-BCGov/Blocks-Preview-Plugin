/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { colorValue } = attributes;

	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-color-indicator-block__saved',
	} );

	return (
		<div { ...blockProps }>
			<span
				className="blocks-preview-color-indicator-block__swatch"
				style={ { background: colorValue } }
			/>
			<span className="blocks-preview-component-block__saved-value">
				{ colorValue }
			</span>
		</div>
	);
}
