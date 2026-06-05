/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { NumberField } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'number-field', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, defaultValue, size } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-number-field-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Number Field settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Number Field docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<TextControl
					label={ __( 'Default value', 'blocks-preview' ) }
					type="number"
					value={ String( defaultValue ) }
					onChange={ ( value ) =>
						setAttributes( { defaultValue: Number( value ) || 0 } )
					}
				/>
				<SelectControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					options={ [
						{
							label: __( 'Small', 'blocks-preview' ),
							value: 'small',
						},
						{
							label: __( 'Medium', 'blocks-preview' ),
							value: 'medium',
						},
					] }
					onChange={ ( value ) => setAttributes( { size: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<NumberField
					label={ label }
					defaultValue={ defaultValue }
					size={ size }
				/>
			</div>
		</>
	);
}
