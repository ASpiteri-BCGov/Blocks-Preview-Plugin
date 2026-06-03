/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'confirm-dialog', blockJson );

const ConfirmDialog = resolveComponent(
	'ConfirmDialog',
	'__experimentalConfirmDialog'
);

export default function Edit( { attributes, setAttributes } ) {
	const { title, message, buttonText } = attributes;
	const [ isOpen, setIsOpen ] = useState( false );
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Confirm Dialog options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ConfirmDialog documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
				/>
				<TextControl
					label={ __( 'Message', 'blocks-preview' ) }
					value={ message }
					onChange={ ( v ) => setAttributes( { message: v } ) }
				/>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( v ) => setAttributes( { buttonText: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Button variant="primary" onClick={ () => setIsOpen( true ) }>
					{ buttonText }
				</Button>
				{ isOpen && ConfirmDialog ? (
					<ConfirmDialog
						title={ title }
						onConfirm={ () => setIsOpen( false ) }
						onCancel={ () => setIsOpen( false ) }
					>
						{ message }
					</ConfirmDialog>
				) : null }
				{ isOpen && ! ConfirmDialog ? (
					<ComponentUnavailable componentName="ConfirmDialog" />
				) : null }
			</div>
		</>
	);
}
