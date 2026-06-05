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
	Modal,
} from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'modal', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, message } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-modal-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Modal settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Modal docs',
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
					<Button variant="primary">Open modal</Button>
					<Modal>
						<Dialog isCloseable>
							<Heading slot="title">{ title }</Heading>
							<p>{ message }</p>
						</Dialog>
					</Modal>
				</DialogTrigger>
			</div>
		</>
	);
}
