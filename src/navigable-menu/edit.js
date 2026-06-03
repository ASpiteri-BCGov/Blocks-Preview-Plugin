/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { MenuItem, NavigableMenu, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'navigable-menu', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { item1, item2, item3 } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'NavigableMenu options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'NavigableMenu documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( nextItem ) =>
						setAttributes( { item1: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( nextItem ) =>
						setAttributes( { item2: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Third item', 'blocks-preview' ) }
					value={ item3 }
					onChange={ ( nextItem ) =>
						setAttributes( { item3: nextItem } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<NavigableMenu>
					<MenuItem onClick={ () => {} }>{ item1 }</MenuItem>
					<MenuItem onClick={ () => {} }>{ item2 }</MenuItem>
					<MenuItem onClick={ () => {} }>{ item3 }</MenuItem>
				</NavigableMenu>
			</div>
		</>
	);
}
