/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { COMPONENT_COLOR_PALETTE } from '../shared/component-colors';
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'border-box-control', blockJson );
const BorderBoxControl = resolveComponent(
	'BorderBoxControl',
	'__experimentalBorderBoxControl'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, enableStyle, borderValue } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-border-box-control-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'BorderBoxControl options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'BorderBoxControl documentation',
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
					label={ __( 'Enable style', 'blocks-preview' ) }
					checked={ enableStyle }
					onChange={ ( nextEnableStyle ) =>
						setAttributes( { enableStyle: nextEnableStyle } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ BorderBoxControl ? (
					<BorderBoxControl
						__next40pxDefaultSize
						colors={ COMPONENT_COLOR_PALETTE }
						label={ label }
						enableStyle={ enableStyle }
						onChange={ ( nextValue ) =>
							setAttributes( { borderValue: nextValue } )
						}
						value={ borderValue }
					/>
				) : (
					<ComponentUnavailable componentName="BorderBoxControl" />
				) }
			</div>
		</>
	);
}
