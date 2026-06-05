/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	RangeControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'textarea-control', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, rows } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'TextareaControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'TextareaControl documentation',
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
					label={ __( 'Rows', 'blocks-preview' ) }
					value={ rows }
					onChange={ ( nextRows ) =>
						setAttributes( { rows: nextRows } )
					}
					min={ 2 }
					max={ 10 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<TextareaControl
					label={ label }
					value={ value }
					rows={ rows }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
