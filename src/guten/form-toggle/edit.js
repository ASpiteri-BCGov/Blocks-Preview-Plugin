/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { FormToggle, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'form-toggle', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { checked, label } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-form-toggle-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FormToggle options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FormToggle documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<FormToggle
					checked={ checked }
					onChange={ ( nextChecked ) =>
						setAttributes( { checked: nextChecked } )
					}
				/>
				<span>{ label }</span>
			</div>
		</>
	);
}
