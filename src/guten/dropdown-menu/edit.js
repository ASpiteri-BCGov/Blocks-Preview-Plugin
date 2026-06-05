/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { DropdownMenu, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'dropdown-menu', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	const controls = [
		{
			title: __( 'Edit', 'blocks-preview' ),
			onClick: () => {},
		},
		{
			title: __( 'Duplicate', 'blocks-preview' ),
			onClick: () => {},
		},
		{
			title: __( 'Remove', 'blocks-preview' ),
			onClick: () => {},
		},
	];

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DropdownMenu options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DropdownMenu documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<DropdownMenu
					icon="plus"
					label={ label }
					controls={ controls }
				/>
			</div>
		</>
	);
}
