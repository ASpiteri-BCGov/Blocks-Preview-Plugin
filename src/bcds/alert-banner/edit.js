/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * BC Gov design system
 */
import { AlertBanner } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'alert-banner', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { variant, message, isCloseable } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-alert-banner-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Alert Banner settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Alert Banner docs',
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
						{
							label: __( 'Black', 'blocks-preview' ),
							value: 'black',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { variant: value } )
					}
				/>
				<TextControl
					label={ __( 'Message', 'blocks-preview' ) }
					value={ message }
					onChange={ ( value ) =>
						setAttributes( { message: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Closeable', 'blocks-preview' ) }
					checked={ isCloseable }
					onChange={ ( value ) =>
						setAttributes( { isCloseable: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<AlertBanner variant={ variant } isCloseable={ isCloseable }>
					{ message }
				</AlertBanner>
			</div>
		</>
	);
}
