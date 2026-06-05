/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Link } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'link', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, href, size } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-link-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Link settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Link docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
				/>
				<TextControl
					label={ __( 'URL', 'blocks-preview' ) }
					value={ href }
					onChange={ ( value ) => setAttributes( { href: value } ) }
				/>
				<SelectControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					options={ [
						{
							label: __( 'Small', 'blocks-preview' ),
							value: 'small',
						},
						{
							label: __( 'Medium', 'blocks-preview' ),
							value: 'medium',
						},
						{
							label: __( 'Large', 'blocks-preview' ),
							value: 'large',
						},
					] }
					onChange={ ( value ) => setAttributes( { size: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Link href={ href } size={ size }>
					{ text }
				</Link>
			</div>
		</>
	);
}
