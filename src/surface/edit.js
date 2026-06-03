/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'surface', blockJson );

const Surface = resolveComponent( 'Surface', '__experimentalSurface' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-surface-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Surface options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Surface documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Surface ? (
					<Surface>
						<div style={ { padding: '12px' } }>{ content }</div>
					</Surface>
				) : (
					<ComponentUnavailable componentName="Surface" />
				) }
			</div>
		</>
	);
}
