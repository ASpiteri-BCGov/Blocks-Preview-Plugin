/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	COMPONENT_COLOR_PALETTE,
	DUOTONE_PALETTE,
} from '../shared/component-colors';
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'duotone-picker', blockJson );

const DuotonePicker = resolveComponent(
	'DuotonePicker',
	'__experimentalDuotonePicker'
);

const DuotoneSwatch = resolveComponent(
	'DuotoneSwatch',
	'__experimentalDuotoneSwatch'
);

const DEFAULT_DUOTONE = [ '#000000', '#ffffff' ];

/**
 * @param {unknown} value Block attribute value.
 * @return {string[]} Duotone color pair.
 */
function getDuotoneValue( value ) {
	if ( Array.isArray( value ) && value.length >= 2 ) {
		return value;
	}
	return DEFAULT_DUOTONE;
}

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { duotone } = attributes;
	const duotoneValue = getDuotoneValue( duotone );

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-duotone-picker-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DuotonePicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DuotonePicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ DuotonePicker ? (
					<>
						<DuotonePicker
							colorPalette={ COMPONENT_COLOR_PALETTE }
							duotonePalette={ DUOTONE_PALETTE }
							value={ duotoneValue }
							onChange={ ( nextDuotone ) =>
								setAttributes( {
									duotone: nextDuotone ?? DEFAULT_DUOTONE,
								} )
							}
						/>
						{ DuotoneSwatch ? (
							<div className="blocks-preview-duotone-picker-block__swatch">
								<DuotoneSwatch values={ duotoneValue } />
							</div>
						) : null }
					</>
				) : (
					<ComponentUnavailable componentName="DuotonePicker" />
				) }
			</div>
		</>
	);
}
