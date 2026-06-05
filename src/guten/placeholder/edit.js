/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Placeholder, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'placeholder', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, instructions, buttonText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Placeholder options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Placeholder documentation',
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
					label={ __( 'Instructions', 'blocks-preview' ) }
					value={ instructions }
					onChange={ ( nextInstructions ) =>
						setAttributes( { instructions: nextInstructions } )
					}
				/>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( nextText ) =>
						setAttributes( { buttonText: nextText } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Placeholder
					icon="admin-post"
					label={ label }
					instructions={ instructions }
				>
					<Button variant="primary">{ buttonText }</Button>
				</Placeholder>
			</div>
		</>
	);
}
