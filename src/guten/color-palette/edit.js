/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ColorPalette, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { COMPONENT_COLOR_PALETTE } from '../../shared/component-colors';
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'color-palette', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { color, clearable, disableCustomColors } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-color-palette-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ColorPalette options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ColorPalette documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( 'Clearable', 'blocks-preview' ) }
					checked={ clearable }
					onChange={ ( nextClearable ) =>
						setAttributes( { clearable: nextClearable } )
					}
				/>
				<ToggleControl
					label={ __( 'Disable custom colors', 'blocks-preview' ) }
					checked={ disableCustomColors }
					onChange={ ( nextDisable ) =>
						setAttributes( { disableCustomColors: nextDisable } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ColorPalette
					colors={ COMPONENT_COLOR_PALETTE }
					value={ color }
					clearable={ clearable }
					disableCustomColors={ disableCustomColors }
					onChange={ ( nextColor ) =>
						setAttributes( { color: nextColor } )
					}
				/>
			</div>
		</>
	);
}
