/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	TextControl,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { formatBold } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'toolbar', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { buttonLabel } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Toolbar options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Toolbar documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Button label', 'blocks-preview' ) }
					value={ buttonLabel }
					onChange={ ( v ) => setAttributes( { buttonLabel: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Toolbar label={ __( 'Options', 'blocks-preview' ) }>
					<ToolbarGroup>
						<ToolbarButton
							icon={ formatBold }
							label={ buttonLabel }
							onClick={ () => {} }
						/>
					</ToolbarGroup>
				</Toolbar>
			</div>
		</>
	);
}
