/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Notice, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'higher-order', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { hocName } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Higher-order options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Higher-order documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'HOC name', 'blocks-preview' ) }
					value={ hocName }
					onChange={ ( v ) => setAttributes( { hocName: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Notice status="info" isDismissible={ false }>
					{ __(
						'Higher-order components are utility wrappers, not standalone visual UI. Example:',
						'blocks-preview'
					) }{ ' ' }
					<code>{ hocName }</code>
				</Notice>
			</div>
		</>
	);
}
