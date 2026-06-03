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

const metadata = getComponentMetadata( 'scrollable', blockJson );

const Scrollable = resolveComponent( 'Scrollable', '__experimentalScrollable' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-scrollable-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Scrollable options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Scrollable documentation',
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
				{ Scrollable ? (
					<Scrollable className="blocks-preview-scrollable-block__content">
						<p>{ content }</p>
						<p>{ content }</p>
						<p>{ content }</p>
						<p>{ content }</p>
					</Scrollable>
				) : (
					<ComponentUnavailable componentName="Scrollable" />
				) }
			</div>
		</>
	);
}
