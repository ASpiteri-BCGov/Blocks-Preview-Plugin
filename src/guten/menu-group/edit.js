/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { MenuGroup, MenuItem, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'menu-group', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'MenuGroup options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'MenuGroup documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Group label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
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
			</ComponentInspector>

			<div { ...blockProps }>
				<MenuGroup label={ label }>
					<MenuItem onClick={ () => {} }>{ item1 }</MenuItem>
					<MenuItem onClick={ () => {} }>{ item2 }</MenuItem>
				</MenuGroup>
			</div>
		</>
	);
}
