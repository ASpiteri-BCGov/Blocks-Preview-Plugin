/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { DropdownMenu, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'menu', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { label, item1, item2 } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	const controls = [
		{ title: item1, onClick: () => {} },
		{ title: item2, onClick: () => {} },
	];
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Menu options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Menu documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Menu label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
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
				<DropdownMenu label={ label } controls={ controls } />
			</div>
		</>
	);
}
