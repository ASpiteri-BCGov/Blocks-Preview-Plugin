/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { AlignmentMatrixControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'alignment-matrix-control', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value, label, width } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'AlignmentMatrixControl options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'AlignmentMatrixControl documentation',
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
				<TextControl
					label={ __( 'Width', 'blocks-preview' ) }
					type="number"
					value={ String( width ) }
					onChange={ ( nextWidth ) =>
						setAttributes( {
							width: Number( nextWidth ) || 92,
						} )
					}
					min={ 48 }
					max={ 200 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<AlignmentMatrixControl
					value={ value }
					label={ label }
					width={ width }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
