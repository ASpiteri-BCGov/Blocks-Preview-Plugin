/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { InlineAlert } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'inline-alert', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { variant, title, description } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-inline-alert-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Inline Alert settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Inline Alert docs',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Variant', 'blocks-preview' ) }
					value={ variant }
					options={ [
						{
							label: __( 'Info', 'blocks-preview' ),
							value: 'info',
						},
						{
							label: __( 'Success', 'blocks-preview' ),
							value: 'success',
						},
						{
							label: __( 'Warning', 'blocks-preview' ),
							value: 'warning',
						},
						{
							label: __( 'Danger', 'blocks-preview' ),
							value: 'danger',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { variant: value } )
					}
				/>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
				<TextControl
					label={ __( 'Description', 'blocks-preview' ) }
					value={ description }
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<InlineAlert
					variant={ variant }
					title={ title }
					description={ description }
				/>
			</div>
		</>
	);
}
