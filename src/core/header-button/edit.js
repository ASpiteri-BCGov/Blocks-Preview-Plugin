/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useDispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/buttons' ];

function createActionBlock( actionType ) {
	if ( actionType === 'link' ) {
		return createBlock( 'core/paragraph', {
			content: '<a href="https://example.com">Learn more</a>',
		} );
	}

	return createBlock( 'core/buttons', {}, [
		createBlock( 'core/button', { text: 'Click here' } ),
	] );
}

function getTemplate( actionType ) {
	return [
		[ 'core/heading', { level: 2, content: 'Heading' } ],
		actionType === 'link'
			? [
					'core/paragraph',
					{
						content: '<a href="https://example.com">Learn more</a>',
					},
			  ]
			: [
					'core/buttons',
					{},
					[ [ 'core/button', { text: 'Click here' } ] ],
			  ],
	];
}

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { actionType } = attributes;
	const blockProps = useBlockProps();
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	useEffect( () => {
		const innerBlocks = select( blockEditorStore ).getBlocks( clientId );

		if ( ! innerBlocks.length ) {
			return;
		}

		const heading = innerBlocks.find(
			( block ) => block.name === 'core/heading'
		);
		const hasLink = innerBlocks.some(
			( block ) => block.name === 'core/paragraph'
		);
		const hasButton = innerBlocks.some(
			( block ) => block.name === 'core/buttons'
		);

		if ( actionType === 'link' && hasButton ) {
			replaceInnerBlocks(
				clientId,
				[
					heading ||
						createBlock( 'core/heading', {
							level: 2,
							content: 'Heading',
						} ),
					createActionBlock( 'link' ),
				],
				false
			);
		}

		if ( actionType === 'button' && hasLink ) {
			replaceInnerBlocks(
				clientId,
				[
					heading ||
						createBlock( 'core/heading', {
							level: 2,
							content: 'Heading',
						} ),
					createActionBlock( 'button' ),
				],
				false
			);
		}
	}, [ actionType, clientId, replaceInnerBlocks ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'blocks-preview' ) }>
					<SelectControl
						label={ __( 'Display as', 'blocks-preview' ) }
						value={ actionType }
						options={ [
							{
								label: __( 'Button', 'blocks-preview' ),
								value: 'button',
							},
							{
								label: __( 'Link', 'blocks-preview' ),
								value: 'link',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { actionType: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks
					template={ getTemplate( actionType ) }
					templateLock="insert"
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
		</>
	);
}
