/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { SearchControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'search-control', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, placeholder } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'SearchControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'SearchControl documentation',
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
					label={ __( 'Placeholder', 'blocks-preview' ) }
					value={ placeholder }
					onChange={ ( nextPlaceholder ) =>
						setAttributes( { placeholder: nextPlaceholder } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<SearchControl
					label={ label }
					value={ value }
					placeholder={ placeholder }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
