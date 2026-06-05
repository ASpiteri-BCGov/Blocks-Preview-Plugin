/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Tag, TagGroup, TagList } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tag-group', blockJson );

const TAG_ITEMS = [
	{ id: 'one', textValue: 'Alpha' },
	{ id: 'two', textValue: 'Beta' },
	{ id: 'three', textValue: 'Gamma' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-tag-group-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tag Group settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Tag Group docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<TagGroup label={ label }>
					<TagList items={ TAG_ITEMS }>
						{ ( item ) => <Tag textValue={ item.textValue } /> }
					</TagList>
				</TagGroup>
			</div>
		</>
	);
}
