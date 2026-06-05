/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-time-field-block__saved',
	} );

	return (
		<div { ...blockProps }>
			<span className="blocks-preview-bcds-block__label">
				Time Field preview (editor only)
			</span>
		</div>
	);
}
