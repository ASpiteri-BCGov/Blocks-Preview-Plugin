/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-text-field-block__saved',
	} );

	return (
		<div { ...blockProps }>
			<span className="blocks-preview-bcds-block__label">
				Text Field preview (editor only)
			</span>
		</div>
	);
}
