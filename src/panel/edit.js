/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'panel', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { panelTitle, panelRowContent } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-panel-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Panel options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Panel documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Panel body title', 'blocks-preview' ) }
					value={ panelTitle }
					onChange={ ( nextTitle ) =>
						setAttributes( { panelTitle: nextTitle } )
					}
				/>
				<TextControl
					label={ __( 'Panel row content', 'blocks-preview' ) }
					value={ panelRowContent }
					onChange={ ( nextContent ) =>
						setAttributes( { panelRowContent: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Panel>
					<PanelBody title={ panelTitle } initialOpen>
						<PanelRow>{ panelRowContent }</PanelRow>
					</PanelBody>
				</Panel>
			</div>
		</>
	);
}
