/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, ToggleControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'box-control', blockJson );
const BoxControl = resolveComponent( 'BoxControl', '__experimentalBoxControl' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, splitOnAxis, boxValues } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'BoxControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'BoxControl documentation',
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
					label={ __( 'Split on axis', 'blocks-preview' ) }
					checked={ splitOnAxis }
					onChange={ ( nextSplitOnAxis ) =>
						setAttributes( { splitOnAxis: nextSplitOnAxis } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ BoxControl ? (
					<BoxControl
						__next40pxDefaultSize
						label={ label }
						splitOnAxis={ splitOnAxis }
						values={ boxValues }
						onChange={ ( nextValues ) =>
							setAttributes( { boxValues: nextValues } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="BoxControl" />
				) }
			</div>
		</>
	);
}
