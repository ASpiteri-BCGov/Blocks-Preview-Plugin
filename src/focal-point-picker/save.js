/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { focalPoint } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				{ focalPoint
					? `${ Math.round( focalPoint.x * 100 ) }%, ${ Math.round(
							focalPoint.y * 100
					  ) }%`
					: '—' }
			</p>
		</div>
	);
}
