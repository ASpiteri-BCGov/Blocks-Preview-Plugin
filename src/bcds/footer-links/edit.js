/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { FooterLinks, Link } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'footer-links', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-footer-links-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Footer Links settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Footer Links docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<FooterLinks
					title={ title }
					links={ [
						<Link key="one" href="#">
							Link one
						</Link>,
						<Link key="two" href="#">
							Link two
						</Link>,
					] }
				/>
			</div>
		</>
	);
}
