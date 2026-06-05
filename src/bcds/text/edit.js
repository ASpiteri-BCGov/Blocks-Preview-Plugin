/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Text } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'text', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content, size, color } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-text-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Text settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Text docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
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
						{
							label: __( 'Large', 'blocks-preview' ),
							value: 'large',
						},
					] }
					onChange={ ( value ) => setAttributes( { size: value } ) }
				/>
				<SelectControl
					label={ __( 'Color', 'blocks-preview' ) }
					value={ color }
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
							label: __( 'Danger', 'blocks-preview' ),
							value: 'danger',
						},
					] }
					onChange={ ( value ) => setAttributes( { color: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Text size={ size } color={ color }>
					{ content }
				</Text>
			</div>
		</>
	);
}
