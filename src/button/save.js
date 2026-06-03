/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { text, variant, disabled, isDestructive, isPressed } = attributes;

	const blockProps = useBlockProps.save( {
		className: [
			'blocks-preview-component-block',
			'blocks-preview-button-block__saved',
			`blocks-preview-button-block__saved--${ variant }`,
			disabled ? 'blocks-preview-button-block__saved--disabled' : '',
			isDestructive
				? 'blocks-preview-button-block__saved--destructive'
				: '',
			isPressed ? 'blocks-preview-button-block__saved--pressed' : '',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<div { ...blockProps }>
			<span className="blocks-preview-button-block__label">{ text }</span>
		</div>
	);
}
