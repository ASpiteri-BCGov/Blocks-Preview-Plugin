/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Button, ButtonGroup } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'button-group', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orientation, firstLabel, secondLabel } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-button-group-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Button Group settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Button Group docs',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Orientation', 'blocks-preview' ) }
					value={ orientation }
					options={ [
						{
							label: __( 'Horizontal', 'blocks-preview' ),
							value: 'horizontal',
						},
						{
							label: __( 'Vertical', 'blocks-preview' ),
							value: 'vertical',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { orientation: value } )
					}
				/>
				<TextControl
					label={ __( 'First label', 'blocks-preview' ) }
					value={ firstLabel }
					onChange={ ( value ) =>
						setAttributes( { firstLabel: value } )
					}
				/>
				<TextControl
					label={ __( 'Second label', 'blocks-preview' ) }
					value={ secondLabel }
					onChange={ ( value ) =>
						setAttributes( { secondLabel: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<ButtonGroup
					orientation={ orientation }
					ariaLabel="Button group preview"
				>
					<Button variant="primary">{ firstLabel }</Button>
					<Button variant="secondary">{ secondLabel }</Button>
				</ButtonGroup>
			</div>
		</>
	);
}
