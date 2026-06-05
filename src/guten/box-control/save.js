/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { label, boxValues } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	const sides = [ 'top', 'right', 'bottom', 'left' ];
	const summary = sides
		.map( ( side ) => {
			const value = boxValues?.[ side ];
			return value ? `${ side }: ${ value }` : '';
		} )
		.filter( Boolean )
		.join( '; ' );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				{ label }: { summary }
			</p>
		</div>
	);
}
