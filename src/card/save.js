/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { headerTitle, bodyContent, footerContent } = attributes;

	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-card-block__saved',
	} );

	return (
		<div { ...blockProps }>
			{ headerTitle ? (
				<p className="blocks-preview-card-block__header">
					<strong>{ headerTitle }</strong>
				</p>
			) : null }
			{ bodyContent ? (
				<p className="blocks-preview-card-block__body">
					{ bodyContent }
				</p>
			) : null }
			{ footerContent ? (
				<p className="blocks-preview-card-block__footer">
					{ footerContent }
				</p>
			) : null }
		</div>
	);
}
