/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, ToggleControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Checkbox } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'checkbox', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, isSelected } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-checkbox-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Checkbox settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Checkbox docs',
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
			</ComponentInspector>
			<div { ...blockProps }>
				<Checkbox
					isSelected={ isSelected }
					onChange={ ( value ) =>
						setAttributes( { isSelected: value } )
					}
				>
					{ label }
				</Checkbox>
			</div>
		</>
	);
}
