/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Tag, TagList } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tag-list', blockJson );

const TAG_ITEMS = [
	{ id: 'one', textValue: 'One' },
	{ id: 'two', textValue: 'Two' },
	{ id: 'three', textValue: 'Three' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orientation } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-tag-list-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tag List settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Tag List docs',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Orientation', 'blocks-preview' ) }
					value={ orientation }
					options={ [
						{
							label: __( 'Horizontal', 'blocks-preview' ),
							value: 'horizontal',
						},
						{
							label: __( 'Vertical', 'blocks-preview' ),
							value: 'vertical',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { orientation: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<TagList items={ TAG_ITEMS } orientation={ orientation }>
					{ ( item ) => <Tag textValue={ item.textValue } /> }
				</TagList>
			</div>
		</>
	);
}
