/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { label, help, checked } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				{ label }: { checked ? 'Yes' : 'No' }
			</p>
			{ help ? (
				<p className="blocks-preview-checkbox-control-block__help">
					{ help }
				</p>
			) : null }
		</div>
	);
}
