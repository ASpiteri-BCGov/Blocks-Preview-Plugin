/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { ProgressBar } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'progress-bar', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value, size } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-progress-bar-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Progress Bar settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Progress Bar docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Value', 'blocks-preview' ) }
					type="number"
					value={ String( value ) }
					onChange={ ( val ) =>
						setAttributes( { value: Number( val ) || 0 } )
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
					onChange={ ( val ) => setAttributes( { size: val } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<ProgressBar
					value={ value }
					size={ size }
					aria-label="Progress preview"
				/>
			</div>
		</>
	);
}
