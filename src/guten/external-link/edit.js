/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ExternalLink, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'external-link', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { href, linkText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ExternalLink options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ExternalLink documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Link text', 'blocks-preview' ) }
					value={ linkText }
					onChange={ ( nextText ) =>
						setAttributes( { linkText: nextText } )
					}
				/>
				<TextControl
					label={ __( 'URL', 'blocks-preview' ) }
					value={ href }
					onChange={ ( nextHref ) =>
						setAttributes( { href: nextHref } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ExternalLink href={ href }>{ linkText }</ExternalLink>
			</div>
		</>
	);
}
