/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	QueryControls,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'query-controls', blockJson );

const ORDER_BY_OPTIONS = [
	{ label: __( 'Date', 'blocks-preview' ), value: 'date' },
	{ label: __( 'Title', 'blocks-preview' ), value: 'title' },
	{ label: __( 'ID', 'blocks-preview' ), value: 'id' },
];

const ORDER_OPTIONS = [
	{ label: __( 'Descending', 'blocks-preview' ), value: 'desc' },
	{ label: __( 'Ascending', 'blocks-preview' ), value: 'asc' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orderBy, order, numberOfItems } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'QueryControls options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'QueryControls documentation',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Order by', 'blocks-preview' ) }
					value={ orderBy }
					options={ ORDER_BY_OPTIONS }
					onChange={ ( nextOrderBy ) =>
						setAttributes( { orderBy: nextOrderBy } )
					}
				/>
				<SelectControl
					label={ __( 'Order', 'blocks-preview' ) }
					value={ order }
					options={ ORDER_OPTIONS }
					onChange={ ( nextOrder ) =>
						setAttributes( { order: nextOrder } )
					}
				/>
				<RangeControl
					label={ __( 'Number of items', 'blocks-preview' ) }
					value={ numberOfItems }
					onChange={ ( nextCount ) =>
						setAttributes( { numberOfItems: nextCount } )
					}
					min={ 1 }
					max={ 20 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<QueryControls
					orderBy={ orderBy }
					order={ order }
					numberOfItems={ numberOfItems }
					onOrderByChange={ ( nextOrderBy ) =>
						setAttributes( { orderBy: nextOrderBy } )
					}
					onOrderChange={ ( nextOrder ) =>
						setAttributes( { order: nextOrder } )
					}
					onNumberOfItemsChange={ ( nextCount ) =>
						setAttributes( { numberOfItems: nextCount } )
					}
				/>
			</div>
		</>
	);
}
