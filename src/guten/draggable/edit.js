/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Draggable, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'draggable', blockJson );

const AXIS_OPTIONS = [
	{ label: __( 'Both', 'blocks-preview' ), value: 'both' },
	{ label: __( 'Horizontal', 'blocks-preview' ), value: 'x' },
	{ label: __( 'Vertical', 'blocks-preview' ), value: 'y' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { axis, dragText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Draggable options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Draggable documentation',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Axis', 'blocks-preview' ) }
					value={ axis }
					options={ AXIS_OPTIONS }
					onChange={ ( nextAxis ) =>
						setAttributes( { axis: nextAxis } )
					}
				/>
				<TextControl
					label={ __( 'Handle text', 'blocks-preview' ) }
					value={ dragText }
					onChange={ ( nextText ) =>
						setAttributes( { dragText: nextText } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Draggable axis={ axis } transferData={ {} }>
					{ ( { onMouseDown, onTouchStart } ) => (
						<div
							className="blocks-preview-draggable-block__handle"
							role="button"
							tabIndex={ 0 }
							aria-label={ dragText }
							onMouseDown={ onMouseDown }
							onTouchStart={ onTouchStart }
						>
							{ dragText }
						</div>
					) }
				</Draggable>
			</div>
		</>
	);
}
