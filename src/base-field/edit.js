/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BaseFieldInput from './base-field-input';
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'base-field', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value, prefix, suffix, disabled, hasError, isInline, isSubtle } =
		attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'BaseField options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'BaseField documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Prefix', 'blocks-preview' ) }
					value={ prefix }
					onChange={ ( nextPrefix ) =>
						setAttributes( { prefix: nextPrefix } )
					}
				/>
				<TextControl
					label={ __( 'Suffix', 'blocks-preview' ) }
					value={ suffix }
					onChange={ ( nextSuffix ) =>
						setAttributes( { suffix: nextSuffix } )
					}
				/>
				<ToggleControl
					label={ __( 'Disabled', 'blocks-preview' ) }
					checked={ disabled }
					onChange={ ( nextDisabled ) =>
						setAttributes( { disabled: nextDisabled } )
					}
				/>
				<ToggleControl
					label={ __( 'Has error', 'blocks-preview' ) }
					checked={ hasError }
					onChange={ ( nextHasError ) =>
						setAttributes( { hasError: nextHasError } )
					}
				/>
				<ToggleControl
					label={ __( 'Inline', 'blocks-preview' ) }
					checked={ isInline }
					onChange={ ( nextIsInline ) =>
						setAttributes( { isInline: nextIsInline } )
					}
				/>
				<ToggleControl
					label={ __( 'Subtle', 'blocks-preview' ) }
					checked={ isSubtle }
					onChange={ ( nextIsSubtle ) =>
						setAttributes( { isSubtle: nextIsSubtle } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<BaseFieldInput
					value={ value }
					prefix={ prefix || undefined }
					suffix={ suffix || undefined }
					disabled={ disabled }
					hasError={ hasError }
					isInline={ isInline }
					isSubtle={ isSubtle }
					placeholder={ __( 'Enter text…', 'blocks-preview' ) }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
