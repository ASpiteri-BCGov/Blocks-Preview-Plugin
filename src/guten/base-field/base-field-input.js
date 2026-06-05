/**
 * Custom field built on useBaseField, following the component docs example.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/base-field/
 */

import { Flex } from '@wordpress/components';
import { View } from '@wordpress/primitives';
import { useBaseField } from './use-base-field';

/**
 * @param {import('./use-base-field').UseBaseFieldProps & {
 *   prefix?: import('react').ReactNode;
 *   suffix?: import('react').ReactNode;
 *   value?: string;
 *   onChange?: ( value: string ) => void;
 *   placeholder?: string;
 * }} props
 */
export function useBaseFieldInput( props ) {
	const {
		prefix,
		suffix,
		value = '',
		onChange,
		placeholder,
		...baseFieldProps
	} = props;

	const { disabled, wrapperClassName, inputClassName, onFocus, onBlur } =
		useBaseField( baseFieldProps );

	const inputProps = {
		className: inputClassName,
		type: 'text',
		value,
		placeholder,
		disabled,
		onChange: ( event ) => onChange?.( event.target.value ),
		onFocus,
		onBlur,
		autoComplete: 'off',
	};

	return {
		prefix,
		suffix,
		disabled,
		wrapperClassName,
		inputProps,
	};
}

/**
 * @param {Parameters<typeof useBaseFieldInput>[0]} props
 */
export default function BaseFieldInput( props ) {
	const { prefix, suffix, disabled, wrapperClassName, inputProps } =
		useBaseFieldInput( props );

	return (
		<Flex
			as={ View }
			className={ wrapperClassName }
			align="center"
			gap={ 2 }
			aria-disabled={ disabled }
		>
			{ prefix ? (
				<span className="blocks-preview-base-field__affix">
					{ prefix }
				</span>
			) : null }
			<View
				as="input"
				className={ inputProps.className }
				type={ inputProps.type }
				value={ inputProps.value }
				placeholder={ inputProps.placeholder }
				disabled={ inputProps.disabled }
				onChange={ inputProps.onChange }
				onFocus={ inputProps.onFocus }
				onBlur={ inputProps.onBlur }
				autoComplete={ inputProps.autoComplete }
			/>
			{ suffix ? (
				<span className="blocks-preview-base-field__affix">
					{ suffix }
				</span>
			) : null }
		</Flex>
	);
}
