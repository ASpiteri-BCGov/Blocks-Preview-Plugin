/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Switch } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'switch', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, isSelected, labelPosition } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-switch-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Switch settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Switch docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<ToggleControl
					label={ __( 'Selected', 'blocks-preview' ) }
					checked={ isSelected }
					onChange={ ( value ) =>
						setAttributes( { isSelected: value } )
					}
				/>
				<SelectControl
					label={ __( 'Label position', 'blocks-preview' ) }
					value={ labelPosition }
					options={ [
						{
							label: __( 'Left', 'blocks-preview' ),
							value: 'left',
						},
						{
							label: __( 'Right', 'blocks-preview' ),
							value: 'right',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { labelPosition: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Switch
					isSelected={ isSelected }
					onChange={ ( value ) =>
						setAttributes( { isSelected: value } )
					}
					labelPosition={ labelPosition }
				>
					{ label }
				</Switch>
			</div>
		</>
	);
}
