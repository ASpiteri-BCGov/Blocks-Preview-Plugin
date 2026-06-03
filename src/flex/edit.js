/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Flex,
	FlexBlock,
	FlexItem,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'flex', blockJson );

const DIRECTION_OPTIONS = [
	{ label: __( 'Row', 'blocks-preview' ), value: 'row' },
	{ label: __( 'Column', 'blocks-preview' ), value: 'column' },
];

const JUSTIFY_OPTIONS = [
	{ label: __( 'Flex start', 'blocks-preview' ), value: 'flex-start' },
	{ label: __( 'Center', 'blocks-preview' ), value: 'center' },
	{ label: __( 'Space between', 'blocks-preview' ), value: 'space-between' },
];

const ALIGN_OPTIONS = [
	{ label: __( 'Stretch', 'blocks-preview' ), value: 'stretch' },
	{ label: __( 'Center', 'blocks-preview' ), value: 'center' },
	{ label: __( 'Flex start', 'blocks-preview' ), value: 'flex-start' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { direction, justify, align } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-flex-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Flex options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Flex documentation', 'blocks-preview' ) }
			>
				<SelectControl
					label={ __( 'Direction', 'blocks-preview' ) }
					value={ direction }
					options={ DIRECTION_OPTIONS }
					onChange={ ( nextDirection ) =>
						setAttributes( { direction: nextDirection } )
					}
				/>
				<SelectControl
					label={ __( 'Justify', 'blocks-preview' ) }
					value={ justify }
					options={ JUSTIFY_OPTIONS }
					onChange={ ( nextJustify ) =>
						setAttributes( { justify: nextJustify } )
					}
				/>
				<SelectControl
					label={ __( 'Align', 'blocks-preview' ) }
					value={ align }
					options={ ALIGN_OPTIONS }
					onChange={ ( nextAlign ) =>
						setAttributes( { align: nextAlign } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Flex
					direction={ direction }
					justify={ justify }
					align={ align }
					gap={ 4 }
				>
					<FlexBlock>
						<div className="blocks-preview-flex-block__item">
							{ __( 'FlexBlock', 'blocks-preview' ) }
						</div>
					</FlexBlock>
					<FlexItem>
						<div className="blocks-preview-flex-block__item">
							{ __( 'FlexItem', 'blocks-preview' ) }
						</div>
					</FlexItem>
				</Flex>
			</div>
		</>
	);
}
