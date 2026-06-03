/**
 * useBaseField implements the hook pattern documented for BaseField.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/base-field/
 */

import { useCallback, useState } from '@wordpress/element';

/**
 * @typedef {Object} UseBaseFieldProps
 * @property {boolean} [disabled] Whether the field is disabled.
 * @property {boolean} [hasError] Whether the field renders an error state.
 * @property {boolean} [isInline] Whether the field can be inlined in text.
 * @property {boolean} [isSubtle] Whether the field renders a subtle variant.
 */

/**
 * @param {UseBaseFieldProps} props
 */
export function useBaseField( props ) {
	const {
		disabled = false,
		hasError = false,
		isInline = false,
		isSubtle = false,
	} = props;

	const [ isFocused, setIsFocused ] = useState( false );

	const onFocus = useCallback( () => setIsFocused( true ), [] );
	const onBlur = useCallback( () => setIsFocused( false ), [] );

	const wrapperClassName = [
		'blocks-preview-base-field',
		hasError && 'blocks-preview-base-field--error',
		isInline && 'blocks-preview-base-field--inline',
		isSubtle && 'blocks-preview-base-field--subtle',
		disabled && 'blocks-preview-base-field--disabled',
		isFocused && 'blocks-preview-base-field--focused',
	]
		.filter( Boolean )
		.join( ' ' );

	return {
		as: 'input',
		disabled,
		hasError,
		isInline,
		isSubtle,
		wrapperClassName,
		inputClassName: 'blocks-preview-base-field__input',
		onFocus,
		onBlur,
	};
}
