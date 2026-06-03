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

const metadata = getComponentMetadata( 'tools-panel', blockJson );

const ToolsPanel = resolveComponent( 'ToolsPanel', '__experimentalToolsPanel' );
const ToolsPanelItem = resolveComponent(
	'ToolsPanelItem',
	'__experimentalToolsPanelItem'
);

export default function Edit( { attributes, setAttributes } ) {
	const { panelLabel, itemLabel, itemValue } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tools Panel options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ToolsPanel documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Panel label', 'blocks-preview' ) }
					value={ panelLabel }
					onChange={ ( v ) => setAttributes( { panelLabel: v } ) }
				/>
				<TextControl
					label={ __( 'Item label', 'blocks-preview' ) }
					value={ itemLabel }
					onChange={ ( v ) => setAttributes( { itemLabel: v } ) }
				/>
				<TextControl
					label={ __( 'Item value', 'blocks-preview' ) }
					value={ itemValue }
					onChange={ ( v ) => setAttributes( { itemValue: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				{ ToolsPanel && ToolsPanelItem ? (
					<ToolsPanel label={ panelLabel } resetAll={ () => {} }>
						<ToolsPanelItem
							hasValue={ () => true }
							label={ itemLabel }
							onDeselect={ () => {} }
							isShownByDefault
						>
							<TextControl
								label={ itemLabel }
								value={ itemValue }
								onChange={ ( v ) =>
									setAttributes( { itemValue: v } )
								}
							/>
						</ToolsPanelItem>
					</ToolsPanel>
				) : (
					<ComponentUnavailable componentName="ToolsPanel" />
				) }
			</div>
		</>
	);
}
