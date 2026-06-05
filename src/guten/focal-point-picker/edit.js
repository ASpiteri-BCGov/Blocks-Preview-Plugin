/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { FocalPointPicker, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'focal-point-picker', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { url, focalPoint } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'FocalPointPicker options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'FocalPointPicker documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Image URL', 'blocks-preview' ) }
					value={ url }
					onChange={ ( nextUrl ) =>
						setAttributes( { url: nextUrl } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<FocalPointPicker
					url={ url }
					value={ focalPoint }
					onChange={ ( nextFocalPoint ) =>
						setAttributes( { focalPoint: nextFocalPoint } )
					}
				/>
			</div>
		</>
	);
}
