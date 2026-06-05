/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import {
	AlertDialog,
	Button,
	DialogTrigger,
} from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'alert-dialog', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { variant, title, message } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-alert-dialog-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Alert Dialog settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Alert Dialog docs',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Variant', 'blocks-preview' ) }
					value={ variant }
					options={ [
						{
							label: __( 'Info', 'blocks-preview' ),
							value: 'info',
						},
						{
							label: __( 'Confirmation', 'blocks-preview' ),
							value: 'confirmation',
						},
						{
							label: __( 'Warning', 'blocks-preview' ),
							value: 'warning',
						},
						{
							label: __( 'Error', 'blocks-preview' ),
							value: 'error',
						},
						{
							label: __( 'Destructive', 'blocks-preview' ),
							value: 'destructive',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { variant: value } )
					}
				/>
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
					<Button variant="primary">Open alert dialog</Button>
					<AlertDialog
						variant={ variant }
						title={ title }
						buttons={ <Button variant="primary">Confirm</Button> }
					>
						{ message }
					</AlertDialog>
				</DialogTrigger>
			</div>
		</>
	);
}
