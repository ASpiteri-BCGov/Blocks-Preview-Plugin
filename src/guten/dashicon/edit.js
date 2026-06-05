/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Dashicon, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'dashicon', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { icon } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-dashicon-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Dashicon options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Dashicon documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Icon slug', 'blocks-preview' ) }
					value={ icon }
					help={ __(
						'Use a WordPress Dashicon slug, e.g. admin-generic.',
						'blocks-preview'
					) }
					onChange={ ( nextIcon ) =>
						setAttributes( { icon: nextIcon } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Dashicon icon={ icon } />
				<span>{ icon }</span>
			</div>
		</>
	);
}
