/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { COMPONENT_COLOR_PALETTE } from '../../shared/component-colors';
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'border-control', blockJson );
const BorderControl = resolveComponent(
	'BorderControl',
	'__experimentalBorderControl'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, withSlider, borderValue } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'BorderControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'BorderControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
				<ToggleControl
					label={ __( 'With slider', 'blocks-preview' ) }
					checked={ withSlider }
					onChange={ ( nextWithSlider ) =>
						setAttributes( { withSlider: nextWithSlider } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ BorderControl ? (
					<BorderControl
						__next40pxDefaultSize
						colors={ COMPONENT_COLOR_PALETTE }
						label={ label }
						withSlider={ withSlider }
						onChange={ ( nextValue ) =>
							setAttributes( { borderValue: nextValue } )
						}
						value={ borderValue }
					/>
				) : (
					<ComponentUnavailable componentName="BorderControl" />
				) }
			</div>
		</>
	);
}
