/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { TextArea } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'text-area', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, defaultValue } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-text-area-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Text Area settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Text Area docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
				<TextControl
					label={ __( 'Default value', 'blocks-preview' ) }
					value={ defaultValue }
					onChange={ ( value ) =>
						setAttributes( { defaultValue: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<TextArea label={ label } defaultValue={ defaultValue } />
			</div>
		</>
	);
}
