/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Fill,
	Slot,
	SlotFillProvider,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'slot-fill', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { slotContent, fillContent } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Slot Fill options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'SlotFill documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Slot placeholder', 'blocks-preview' ) }
					value={ slotContent }
					onChange={ ( v ) => setAttributes( { slotContent: v } ) }
				/>
				<TextControl
					label={ __( 'Fill content', 'blocks-preview' ) }
					value={ fillContent }
					onChange={ ( v ) => setAttributes( { fillContent: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<SlotFillProvider>
					<Fill name="blocks-preview-slot">{ fillContent }</Fill>
					<div
						style={ {
							padding: '12px',
							border: '1px dashed #949494',
						} }
					>
						<p>{ slotContent }</p>
						<Slot name="blocks-preview-slot" />
					</div>
				</SlotFillProvider>
			</div>
		</>
	);
}
