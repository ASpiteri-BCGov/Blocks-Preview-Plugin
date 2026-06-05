/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'truncate', blockJson );

const Truncate = resolveComponent( 'Truncate', '__experimentalTruncate' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content, limit } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-truncate-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Truncate options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Truncate documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
				<RangeControl
					label={ __( 'Lines', 'blocks-preview' ) }
					value={ limit }
					onChange={ ( v ) => setAttributes( { limit: v } ) }
					min={ 1 }
					max={ 3 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Truncate ? (
					<Truncate limit={ limit }>{ content }</Truncate>
				) : (
					<ComponentUnavailable componentName="Truncate" />
				) }
			</div>
		</>
	);
}
