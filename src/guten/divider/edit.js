/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'divider', blockJson );

const Divider = resolveComponent( 'Divider', '__experimentalDivider' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orientation } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Divider options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Divider documentation',
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
					onChange={ ( v ) => setAttributes( { orientation: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Divider ? (
					<Divider orientation={ orientation } />
				) : (
					<ComponentUnavailable componentName="Divider" />
				) }
			</div>
		</>
	);
}
