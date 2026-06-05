/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { FormTokenField, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'form-token-field', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, tokens, suggestions } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FormTokenField options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FormTokenField documentation',
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
				<FormTokenField
					label={ label }
					value={ tokens }
					suggestions={ suggestions }
					onChange={ ( nextTokens ) =>
						setAttributes( { tokens: nextTokens } )
					}
				/>
			</div>
		</>
	);
}
