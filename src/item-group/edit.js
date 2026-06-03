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

const metadata = getComponentMetadata( 'item-group', blockJson );

const ItemGroup = resolveComponent( 'ItemGroup', '__experimentalItemGroup' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Item Group options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ItemGroup documentation',
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
				{ ItemGroup ? (
					<ItemGroup>
						<div>{ item1 }</div>
						<div>{ item2 }</div>
					</ItemGroup>
				) : (
					<ComponentUnavailable componentName="ItemGroup" />
				) }
			</div>
		</>
	);
}
