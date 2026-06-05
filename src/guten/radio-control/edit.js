/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RadioControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'radio-control', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, selected, options } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'RadioControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'RadioControl documentation',
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
				<RadioControl
					label={ label }
					selected={ selected }
					options={ options }
					onChange={ ( nextSelected ) =>
						setAttributes( { selected: nextSelected } )
					}
				/>
			</div>
		</>
	);
}
