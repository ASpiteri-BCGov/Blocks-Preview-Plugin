/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	ExternalLink,
	Notice,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BaseFieldInput from './base-field-input';
import metadata from './block.json';

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value, prefix, suffix, disabled, hasError, isInline, isSubtle } =
		attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-base-field-block',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'BaseField options', 'blocks-preview' ) }
					initialOpen
				>
					{ metadata.experimental ? (
						<Notice
							status="warning"
							isDismissible={ false }
							className="blocks-preview-base-field-block__experimental-notice"
						>
							{ __(
								'This feature is still experimental. "Experimental" means this is an early implementation subject to drastic and breaking changes.',
								'blocks-preview'
							) }
						</Notice>
					) : null }
					{ metadata.description ? (
						<p className="blocks-preview-base-field-block__description">
							{ metadata.description }
						</p>
					) : null }
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
					{ metadata.documentation ? (
						<p className="blocks-preview-base-field-block__docs">
							<ExternalLink href={ metadata.documentation }>
								{ __(
									'BaseField documentation',
									'blocks-preview'
								) }
							</ExternalLink>
						</p>
					) : null }
				</PanelBody>
			</InspectorControls>

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
