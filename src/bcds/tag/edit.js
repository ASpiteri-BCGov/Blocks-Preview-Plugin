/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Tag } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tag', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { textValue, color, tagStyle } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-tag-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tag settings', 'blocks-preview' ) }
				docsLinkLabel={ __( 'View BC Gov Tag docs', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Text', 'blocks-preview' ) }
					value={ textValue }
					onChange={ ( value ) =>
						setAttributes( { textValue: value } )
					}
				/>
				<SelectControl
					label={ __( 'Color', 'blocks-preview' ) }
					value={ color }
					options={ [
						{ label: 'bc-blue', value: 'bc-blue' },
						{ label: 'bc-gold', value: 'bc-gold' },
						{ label: 'blue', value: 'blue' },
						{ label: 'gray', value: 'gray' },
						{ label: 'green', value: 'green' },
						{ label: 'red', value: 'red' },
						{ label: 'yellow', value: 'yellow' },
					] }
					onChange={ ( value ) => setAttributes( { color: value } ) }
				/>
				<SelectControl
					label={ __( 'Style', 'blocks-preview' ) }
					value={ tagStyle }
					options={ [
						{
							label: __( 'Rectangular', 'blocks-preview' ),
							value: 'rectangular',
						},
						{
							label: __( 'Circular', 'blocks-preview' ),
							value: 'circular',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { tagStyle: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Tag
					textValue={ textValue }
					color={ color }
					tagStyle={ tagStyle }
				/>
			</div>
		</>
	);
}
