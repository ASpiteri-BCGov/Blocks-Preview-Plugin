/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl, TextControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'text', blockJson );

const Text = resolveComponent( 'Text', '__experimentalText' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content, size } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Text options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Text documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
				<SelectControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					options={ [
						{ label: 'Small', value: 'small' },
						{ label: 'Medium', value: 'medium' },
						{ label: 'Large', value: 'large' },
					] }
					onChange={ ( v ) => setAttributes( { size: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Text ? (
					<Text size={ size }>{ content }</Text>
				) : (
					<ComponentUnavailable componentName="Text" />
				) }
			</div>
		</>
	);
}
