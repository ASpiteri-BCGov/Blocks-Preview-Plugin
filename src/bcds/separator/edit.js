/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Separator } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'separator', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { size } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-separator-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Separator settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Separator docs',
					'blocks-preview'
				) }
			>
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
			</ComponentInspector>
			<div { ...blockProps }>
				<Separator size={ size } />
			</div>
		</>
	);
}
