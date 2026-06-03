/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { value } = attributes;
	const progressValue =
		typeof value === 'number' && value >= 0 && value <= 1
			? Math.round( value * 100 )
			: value;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				{ typeof progressValue === 'number'
					? `${ Math.round( progressValue ) }%`
					: '—' }
			</p>
		</div>
	);
}
