/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'font-size-picker', blockJson );

const FontSizePicker = resolveComponent(
	'FontSizePicker',
	'__experimentalFontSizePicker'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { fontSize, fontSizes } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FontSizePicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FontSizePicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ FontSizePicker ? (
					<FontSizePicker
						fontSizes={ fontSizes }
						value={ fontSize }
						onChange={ ( nextFontSize ) =>
							setAttributes( { fontSize: nextFontSize } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="FontSizePicker" />
				) }
			</div>
		</>
	);
}
