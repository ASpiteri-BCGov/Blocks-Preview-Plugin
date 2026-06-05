/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import {
	Button,
	Dialog,
	DialogTrigger,
	Heading,
} from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'dialog', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, message } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-dialog-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Dialog settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Dialog docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
				<TextControl
					label={ __( 'Message', 'blocks-preview' ) }
					value={ message }
					onChange={ ( value ) =>
						setAttributes( { message: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<DialogTrigger>
					<Button variant="primary">Open dialog</Button>
					<Dialog isCloseable>
						<Heading slot="title">{ title }</Heading>
						<p>{ message }</p>
					</Dialog>
				</DialogTrigger>
			</div>
		</>
	);
}
