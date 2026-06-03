/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Button, SnackbarList, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'snackbar', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { message } = attributes;
	const [ notices, setNotices ] = useState( [] );
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Snackbar options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Snackbar documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Message', 'blocks-preview' ) }
					value={ message }
					onChange={ ( v ) => setAttributes( { message: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Button
					variant="secondary"
					onClick={ () =>
						setNotices( [
							{ content: message, id: 'snackbar-' + Date.now() },
						] )
					}
				>
					{ __( 'Show snackbar', 'blocks-preview' ) }
				</Button>
				<SnackbarList
					notices={ notices }
					onRemove={ ( id ) =>
						setNotices( notices.filter( ( n ) => n.id !== id ) )
					}
				/>
			</div>
		</>
	);
}
