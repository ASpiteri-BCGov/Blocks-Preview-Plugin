/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Button } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'button', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, variant, size, disabled, danger } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-button-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Button settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Button docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
				/>
				<SelectControl
					label={ __( 'Variant', 'blocks-preview' ) }
					value={ variant }
					options={ [
						{
							label: __( 'Primary', 'blocks-preview' ),
							value: 'primary',
						},
						{
							label: __( 'Secondary', 'blocks-preview' ),
							value: 'secondary',
						},
						{
							label: __( 'Tertiary', 'blocks-preview' ),
							value: 'tertiary',
						},
						{
							label: __( 'Link', 'blocks-preview' ),
							value: 'link',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { variant: value } )
					}
				/>
				<SelectControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					options={ [
						{
							label: __( 'XSmall', 'blocks-preview' ),
							value: 'xsmall',
						},
						{
							label: __( 'Small', 'blocks-preview' ),
							value: 'small',
						},
						{
							label: __( 'Medium', 'blocks-preview' ),
							value: 'medium',
						},
						{
							label: __( 'Large', 'blocks-preview' ),
							value: 'large',
						},
					] }
					onChange={ ( value ) => setAttributes( { size: value } ) }
				/>
				<ToggleControl
					label={ __( 'Disabled', 'blocks-preview' ) }
					checked={ disabled }
					onChange={ ( value ) =>
						setAttributes( { disabled: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Danger', 'blocks-preview' ) }
					checked={ danger }
					onChange={ ( value ) => setAttributes( { danger: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Button
					variant={ variant }
					size={ size }
					isDisabled={ disabled }
					danger={ danger }
				>
					{ text }
				</Button>
			</div>
		</>
	);
}
