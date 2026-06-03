/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'disabled', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { isDisabled, inputValue, inputLabel } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Disabled options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Disabled documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( 'Disabled', 'blocks-preview' ) }
					checked={ isDisabled }
					onChange={ ( nextIsDisabled ) =>
						setAttributes( { isDisabled: nextIsDisabled } )
					}
				/>
				<TextControl
					label={ __( 'Field label', 'blocks-preview' ) }
					value={ inputLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { inputLabel: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Disabled isDisabled={ isDisabled }>
					<TextControl
						label={ inputLabel }
						value={ inputValue }
						onChange={ ( nextValue ) =>
							setAttributes( { inputValue: nextValue } )
						}
					/>
				</Disabled>
			</div>
		</>
	);
}
