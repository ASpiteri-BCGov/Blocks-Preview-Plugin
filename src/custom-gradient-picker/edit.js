/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
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

const metadata = getComponentMetadata( 'custom-gradient-picker', blockJson );

const CustomGradientPicker = resolveComponent(
	'CustomGradientPicker',
	'__experimentalCustomGradientPicker'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'CustomGradientPicker options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'CustomGradientPicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ CustomGradientPicker ? (
					<CustomGradientPicker
						value={ value }
						onChange={ ( nextValue ) =>
							setAttributes( { value: nextValue } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="CustomGradientPicker" />
				) }
			</div>
		</>
	);
}
