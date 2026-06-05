/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tree-grid', blockJson );

const TreeGrid = resolveComponent( 'TreeGrid', '__experimentalTreeGrid' );
const TreeGridRow = resolveComponent(
	'TreeGridRow',
	'__experimentalTreeGridRow'
);
const TreeGridCell = resolveComponent(
	'TreeGridCell',
	'__experimentalTreeGridCell'
);
const TreeGridItem = resolveComponent(
	'TreeGridItem',
	'__experimentalTreeGridItem'
);

export default function Edit( { attributes, setAttributes } ) {
	const { rowLabel } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tree Grid options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'TreeGrid documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Row label', 'blocks-preview' ) }
					value={ rowLabel }
					onChange={ ( v ) => setAttributes( { rowLabel: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				{ TreeGrid && TreeGridRow && TreeGridCell && TreeGridItem ? (
					<TreeGrid>
						<TreeGridRow level={ 1 }>
							<TreeGridCell>
								<TreeGridItem>{ rowLabel }</TreeGridItem>
							</TreeGridCell>
						</TreeGridRow>
					</TreeGrid>
				) : (
					<ComponentUnavailable componentName="TreeGrid" />
				) }
			</div>
		</>
	);
}
