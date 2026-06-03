/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'button', blockJson );

const VARIANT_OPTIONS = [
	{ label: __( 'Primary', 'blocks-preview' ), value: 'primary' },
	{ label: __( 'Secondary', 'blocks-preview' ), value: 'secondary' },
	{ label: __( 'Tertiary', 'blocks-preview' ), value: 'tertiary' },
	{ label: __( 'Link', 'blocks-preview' ), value: 'link' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { text, variant, disabled, isDestructive, isPressed } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-button-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Button options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Button documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( nextText ) =>
						setAttributes( { text: nextText } )
					}
				/>
				<SelectControl
					label={ __( 'Variant', 'blocks-preview' ) }
					value={ variant }
					options={ VARIANT_OPTIONS }
					onChange={ ( nextVariant ) =>
						setAttributes( { variant: nextVariant } )
					}
				/>
				<ToggleControl
					label={ __( 'Disabled', 'blocks-preview' ) }
					checked={ disabled }
					onChange={ ( nextDisabled ) =>
						setAttributes( { disabled: nextDisabled } )
					}
				/>
				<ToggleControl
					label={ __( 'Destructive', 'blocks-preview' ) }
					checked={ isDestructive }
					onChange={ ( nextDestructive ) =>
						setAttributes( { isDestructive: nextDestructive } )
					}
				/>
				<ToggleControl
					label={ __( 'Pressed', 'blocks-preview' ) }
					checked={ isPressed }
					onChange={ ( nextPressed ) =>
						setAttributes( { isPressed: nextPressed } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Button
					variant={ variant }
					disabled={ disabled }
					isDestructive={ isDestructive }
					isPressed={ isPressed }
					accessibleWhenDisabled={ disabled }
					onClick={ () => {} }
				>
					{ text }
				</Button>
			</div>
		</>
	);
}
