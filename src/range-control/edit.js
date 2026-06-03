/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'range-control', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, min, max } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'RangeControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'RangeControl documentation',
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
				<RangeControl
					label={ __( 'Minimum', 'blocks-preview' ) }
					value={ min }
					onChange={ ( nextMin ) =>
						setAttributes( { min: nextMin } )
					}
					min={ 0 }
					max={ 100 }
				/>
				<RangeControl
					label={ __( 'Maximum', 'blocks-preview' ) }
					value={ max }
					onChange={ ( nextMax ) =>
						setAttributes( { max: nextMax } )
					}
					min={ 0 }
					max={ 100 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<RangeControl
					label={ label }
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
					min={ min }
					max={ max }
				/>
			</div>
		</>
	);
}
