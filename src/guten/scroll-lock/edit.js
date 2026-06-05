/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ScrollLock, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'scroll-lock', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { isActive, content } = attributes;
	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-scroll-lock-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Scroll Lock options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ScrollLock documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( 'Active', 'blocks-preview' ) }
					checked={ isActive }
					onChange={ ( v ) => setAttributes( { isActive: v } ) }
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				{ isActive ? <ScrollLock /> : null }
				<div className="blocks-preview-scroll-lock-block__scrollable">
					<p>{ content }</p>
					<p>{ content }</p>
					<p>{ content }</p>
				</div>
			</div>
		</>
	);
}
