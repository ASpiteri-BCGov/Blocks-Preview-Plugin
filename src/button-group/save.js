/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { buttonOneLabel, buttonTwoLabel, buttonThreeLabel, selectedIndex } =
		attributes;

	const blockProps = useBlockProps.save( {
		className:
			'blocks-preview-component-block blocks-preview-button-group-block__saved',
	} );

	const labels = [ buttonOneLabel, buttonTwoLabel, buttonThreeLabel ];

	return (
		<div { ...blockProps }>
			{ labels.map( ( label, index ) => (
				<span
					key={ label }
					className={
						selectedIndex === index
							? 'blocks-preview-button-group-block__item blocks-preview-button-group-block__item--active'
							: 'blocks-preview-button-group-block__item'
					}
				>
					{ label }
				</span>
			) ) }
		</div>
	);
}
