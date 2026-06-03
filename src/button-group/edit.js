/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Button, ButtonGroup, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'button-group', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { buttonOneLabel, buttonTwoLabel, buttonThreeLabel, selectedIndex } =
		attributes;

	const labels = [ buttonOneLabel, buttonTwoLabel, buttonThreeLabel ];

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-button-group-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ButtonGroup options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ButtonGroup documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Button 1 label', 'blocks-preview' ) }
					value={ buttonOneLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { buttonOneLabel: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Button 2 label', 'blocks-preview' ) }
					value={ buttonTwoLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { buttonTwoLabel: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Button 3 label', 'blocks-preview' ) }
					value={ buttonThreeLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { buttonThreeLabel: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ButtonGroup>
					{ labels.map( ( label, index ) => (
						<Button
							key={ label }
							variant="primary"
							isPressed={ selectedIndex === index }
							onClick={ () =>
								setAttributes( { selectedIndex: index } )
							}
						>
							{ label }
						</Button>
					) ) }
				</ButtonGroup>
			</div>
		</>
	);
}
