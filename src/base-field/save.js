/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { value, prefix, suffix, disabled, hasError, isInline, isSubtle } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: [
			'blocks-preview-base-field-block',
			'blocks-preview-base-field',
			hasError && 'blocks-preview-base-field--error',
			isInline && 'blocks-preview-base-field--inline',
			isSubtle && 'blocks-preview-base-field--subtle',
			disabled && 'blocks-preview-base-field--disabled',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<div { ...blockProps }>
			{ prefix ? (
				<span className="blocks-preview-base-field__affix">
					{ prefix }
				</span>
			) : null }
			<span className="blocks-preview-base-field__value">{ value }</span>
			{ suffix ? (
				<span className="blocks-preview-base-field__affix">
					{ suffix }
				</span>
			) : null }
		</div>
	);
}
