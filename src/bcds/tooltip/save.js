/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-tooltip-block__saved',
	} );

	return (
		<div { ...blockProps }>
			<span className="blocks-preview-bcds-block__label">
				Tooltip preview (editor only)
			</span>
		</div>
	);
}
