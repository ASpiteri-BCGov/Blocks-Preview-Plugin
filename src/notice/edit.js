/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Notice,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'notice', blockJson );

const STATUS_OPTIONS = [
	{ label: __( 'Info', 'blocks-preview' ), value: 'info' },
	{ label: __( 'Success', 'blocks-preview' ), value: 'success' },
	{ label: __( 'Warning', 'blocks-preview' ), value: 'warning' },
	{ label: __( 'Error', 'blocks-preview' ), value: 'error' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { status, content, isDismissible } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Notice options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Notice documentation', 'blocks-preview' ) }
			>
				<SelectControl
					label={ __( 'Status', 'blocks-preview' ) }
					value={ status }
					options={ STATUS_OPTIONS }
					onChange={ ( nextStatus ) =>
						setAttributes( { status: nextStatus } )
					}
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
				/>
				<ToggleControl
					label={ __( 'Dismissible', 'blocks-preview' ) }
					checked={ isDismissible }
					onChange={ ( nextDismissible ) =>
						setAttributes( { isDismissible: nextDismissible } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Notice
					status={ status }
					isDismissible={ isDismissible }
					onRemove={ isDismissible ? () => {} : undefined }
				>
					{ content }
				</Notice>
			</div>
		</>
	);
}
