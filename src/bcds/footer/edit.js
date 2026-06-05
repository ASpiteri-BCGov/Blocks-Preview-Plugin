/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Footer } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'footer', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { copyright } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-footer-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Footer settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Footer docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Copyright (optional)', 'blocks-preview' ) }
					value={ copyright }
					onChange={ ( value ) =>
						setAttributes( { copyright: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Footer copyright={ copyright || undefined } />
			</div>
		</>
	);
}
