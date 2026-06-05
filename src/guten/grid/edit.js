/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl, TextControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'grid', blockJson );

const Grid = resolveComponent( 'Grid', '__experimentalGrid' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { columns, item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-grid-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Grid options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Grid documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Columns', 'blocks-preview' ) }
					value={ columns }
					onChange={ ( v ) => setAttributes( { columns: v } ) }
					min={ 1 }
					max={ 4 }
				/>
				<TextControl
					label={ __( 'First cell', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( v ) => setAttributes( { item1: v } ) }
				/>
				<TextControl
					label={ __( 'Second cell', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( v ) => setAttributes( { item2: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Grid ? (
					<Grid columns={ columns }>
						<span className="blocks-preview-grid-block__cell">
							{ item1 }
						</span>
						<span className="blocks-preview-grid-block__cell">
							{ item2 }
						</span>
					</Grid>
				) : (
					<ComponentUnavailable componentName="Grid" />
				) }
			</div>
		</>
	);
}
