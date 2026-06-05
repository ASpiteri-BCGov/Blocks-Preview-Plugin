/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { MenuItemsChoice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'menu-items-choice', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { selected, choices } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'MenuItemsChoice options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'MenuItemsChoice documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				<MenuItemsChoice
					choices={ choices }
					value={ selected }
					onSelect={ ( nextSelected ) =>
						setAttributes( { selected: nextSelected } )
					}
				/>
			</div>
		</>
	);
}
