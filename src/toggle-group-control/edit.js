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

const metadata = getComponentMetadata( 'toggle-group-control', blockJson );

const ToggleGroupControl = resolveComponent(
	'ToggleGroupControl',
	'__experimentalToggleGroupControl'
);
const ToggleGroupControlOption = resolveComponent(
	'ToggleGroupControlOption',
	'__experimentalToggleGroupControlOption'
);

export default function Edit( { attributes, setAttributes } ) {
	const { label, value } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'Toggle Group Control options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'ToggleGroupControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				{ ToggleGroupControl && ToggleGroupControlOption ? (
					<ToggleGroupControl
						label={ label }
						value={ value }
						onChange={ ( v ) => setAttributes( { value: v } ) }
						isBlock
					>
						<ToggleGroupControlOption
							value="left"
							label={ __( 'Left', 'blocks-preview' ) }
						/>
						<ToggleGroupControlOption
							value="center"
							label={ __( 'Center', 'blocks-preview' ) }
						/>
						<ToggleGroupControlOption
							value="right"
							label={ __( 'Right', 'blocks-preview' ) }
						/>
					</ToggleGroupControl>
				) : (
					<ComponentUnavailable componentName="ToggleGroupControl" />
				) }
			</div>
		</>
	);
}
