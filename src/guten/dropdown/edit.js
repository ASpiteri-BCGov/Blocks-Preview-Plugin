/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Dropdown, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'dropdown', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, contentText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Dropdown options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Dropdown documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( nextText ) =>
						setAttributes( { buttonText: nextText } )
					}
				/>
				<TextControl
					label={ __( 'Content text', 'blocks-preview' ) }
					value={ contentText }
					onChange={ ( nextContent ) =>
						setAttributes( { contentText: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							variant="secondary"
							onClick={ onToggle }
							aria-expanded={ isOpen }
						>
							{ buttonText }
						</Button>
					) }
					renderContent={ () => <p>{ contentText }</p> }
				/>
			</div>
		</>
	);
}
