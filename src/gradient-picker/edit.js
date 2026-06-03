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

const metadata = getComponentMetadata( 'gradient-picker', blockJson );

const GradientPicker = resolveComponent(
	'GradientPicker',
	'__experimentalGradientPicker'
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
				panelTitle={ __( 'GradientPicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'GradientPicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ GradientPicker ? (
					<GradientPicker
						value={ value }
						onChange={ ( nextValue ) =>
							setAttributes( { value: nextValue } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="GradientPicker" />
				) }
			</div>
		</>
	);
}
