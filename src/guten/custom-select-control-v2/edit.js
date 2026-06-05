/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { CustomSelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'custom-select-control-v2', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, options } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'CustomSelectControl options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'CustomSelectControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<CustomSelectControl
					label={ label }
					value={ options.find( ( o ) => o.key === value ) }
					options={ options }
					onChange={ ( selected ) =>
						setAttributes( {
							value: selected?.selectedItem?.key || value,
						} )
					}
				/>
			</div>
		</>
	);
}
