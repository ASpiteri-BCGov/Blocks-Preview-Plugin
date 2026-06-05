/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Heading } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'heading', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, level, color } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-heading-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Heading settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Heading docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
				/>
				<SelectControl
					label={ __( 'Level', 'blocks-preview' ) }
					value={ String( level ) }
					options={ [
						{ label: 'H1', value: '1' },
						{ label: 'H2', value: '2' },
						{ label: 'H3', value: '3' },
						{ label: 'H4', value: '4' },
					] }
					onChange={ ( value ) =>
						setAttributes( { level: Number( value ) } )
					}
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
				<Heading level={ level } color={ color }>
					{ text }
				</Heading>
			</div>
		</>
	);
}
