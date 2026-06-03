/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Composite, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'composite', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { item1, item2 } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Composite options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Composite documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( v ) => setAttributes( { item1: v } ) }
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( v ) => setAttributes( { item2: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Composite role="listbox">
					<Composite.Item>{ item1 }</Composite.Item>
					<Composite.Item>{ item2 }</Composite.Item>
				</Composite>
			</div>
		</>
	);
}
