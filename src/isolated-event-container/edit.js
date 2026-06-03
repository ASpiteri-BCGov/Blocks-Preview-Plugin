/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	IsolatedEventContainer,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'isolated-event-container', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'Isolated Event Container options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'IsolatedEventContainer documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps } role="presentation">
				<IsolatedEventContainer>
					<Button variant="secondary" onClick={ () => {} }>
						{ label }
					</Button>
				</IsolatedEventContainer>
			</div>
		</>
	);
}
