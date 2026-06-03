/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ColorIndicator, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'color-indicator', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { colorValue } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-color-indicator-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ColorIndicator options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ColorIndicator documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Color value', 'blocks-preview' ) }
					value={ colorValue }
					onChange={ ( nextColor ) =>
						setAttributes( { colorValue: nextColor } )
					}
					help={ __(
						'Any CSS background value (hex, rgb, gradient, etc.).',
						'blocks-preview'
					) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ColorIndicator colorValue={ colorValue } />
				<span className="blocks-preview-color-indicator-block__value">
					{ colorValue }
				</span>
			</div>
		</>
	);
}
