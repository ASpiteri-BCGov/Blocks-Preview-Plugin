/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Select } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'select', blockJson );

const SELECT_ITEMS = [
	{ id: 'one', label: 'Option one' },
	{ id: 'two', label: 'Option two' },
	{ id: 'three', label: 'Option three' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, placeholder, size } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-select-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Select settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Select docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<TextControl
					label={ __( 'Placeholder', 'blocks-preview' ) }
					value={ placeholder }
					onChange={ ( value ) =>
						setAttributes( { placeholder: value } )
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
				<Select
					label={ label }
					placeholder={ placeholder }
					size={ size }
					items={ SELECT_ITEMS }
				/>
			</div>
		</>
	);
}
