/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Button, Popover, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'popover', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, content } = attributes;
	const [ isOpen, setIsOpen ] = useState( false );

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Popover options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Popover documentation',
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
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Button
					variant="secondary"
					onClick={ () => setIsOpen( ! isOpen ) }
					aria-expanded={ isOpen }
				>
					{ buttonText }
				</Button>
				{ isOpen ? (
					<Popover onClose={ () => setIsOpen( false ) }>
						<div style={ { padding: '16px', minWidth: '200px' } }>
							<p>{ content }</p>
						</div>
					</Popover>
				) : null }
			</div>
		</>
	);
}
