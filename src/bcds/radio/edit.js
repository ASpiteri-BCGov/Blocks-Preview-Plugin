/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Radio, RadioGroup } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'radio', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-radio-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Radio settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Radio docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<RadioGroup label="Radio preview" defaultValue="preview">
					<Radio value="preview">{ label }</Radio>
				</RadioGroup>
			</div>
		</>
	);
}
