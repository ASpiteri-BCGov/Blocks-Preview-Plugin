/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'number-control', blockJson );

const NumberControl = resolveComponent(
	'NumberControl',
	'__experimentalNumberControl'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Number Control options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'NumberControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ NumberControl ? (
					<NumberControl
						label={ label }
						value={ value }
						onChange={ ( v ) => setAttributes( { value: v } ) }
					/>
				) : (
					<ComponentUnavailable componentName="NumberControl" />
				) }
			</div>
		</>
	);
}
