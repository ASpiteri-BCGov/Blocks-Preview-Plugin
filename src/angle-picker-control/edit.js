/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { AnglePickerControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'angle-picker-control', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value, label } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'AnglePickerControl options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'AnglePickerControl documentation',
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
			</ComponentInspector>

			<div { ...blockProps }>
				<AnglePickerControl
					value={ value }
					label={ label }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
