/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl, ResizableBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'resizable-box', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { width, height, content } = attributes;
	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-resizable-box-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Resizable Box options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ResizableBox documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Width', 'blocks-preview' ) }
					value={ width }
					onChange={ ( v ) => setAttributes( { width: v } ) }
					min={ 120 }
					max={ 480 }
				/>
				<RangeControl
					label={ __( 'Height', 'blocks-preview' ) }
					value={ height }
					onChange={ ( v ) => setAttributes( { height: v } ) }
					min={ 80 }
					max={ 320 }
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<ResizableBox
					size={ { width, height } }
					minWidth={ 120 }
					minHeight={ 80 }
					enable={ { right: true, bottom: true } }
					onResizeStop={ ( e, direction, elt ) =>
						setAttributes( {
							width: elt.offsetWidth,
							height: elt.offsetHeight,
						} )
					}
				>
					<div style={ { padding: '12px' } }>{ content }</div>
				</ResizableBox>
			</div>
		</>
	);
}
