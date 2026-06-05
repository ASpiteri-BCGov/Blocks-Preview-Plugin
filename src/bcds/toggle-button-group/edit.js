/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import {
	ToggleButton,
	ToggleButtonGroup,
} from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'toggle-button-group', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, size } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-toggle-button-group-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'Toggle Button Group settings',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'View BC Gov Toggle Button Group docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<SelectControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					options={ [
						{
							label: __( 'Small', 'blocks-preview' ),
							value: 'small',
						},
						{
							label: __( 'Medium', 'blocks-preview' ),
							value: 'medium',
						},
					] }
					onChange={ ( value ) => setAttributes( { size: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<ToggleButtonGroup
					label={ label }
					size={ size }
					selectionMode="single"
				>
					<ToggleButton id="bold">Bold</ToggleButton>
					<ToggleButton id="italic">Italic</ToggleButton>
				</ToggleButtonGroup>
			</div>
		</>
	);
}
