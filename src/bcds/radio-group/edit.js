/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

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

const metadata = getComponentMetadata( 'radio-group', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, orientation } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-radio-group-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Radio Group settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Radio Group docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<SelectControl
					label={ __( 'Orientation', 'blocks-preview' ) }
					value={ orientation }
					options={ [
						{
							label: __( 'Vertical', 'blocks-preview' ),
							value: 'vertical',
						},
						{
							label: __( 'Horizontal', 'blocks-preview' ),
							value: 'horizontal',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { orientation: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<RadioGroup label={ label } orientation={ orientation }>
					<Radio value="one">Option one</Radio>
					<Radio value="two">Option two</Radio>
				</RadioGroup>
			</div>
		</>
	);
}
