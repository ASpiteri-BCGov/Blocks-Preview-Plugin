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

const metadata = getComponentMetadata( 'theme', blockJson );

const StyleProvider = resolveComponent(
	'StyleProvider',
	'__experimentalStyleProvider'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Theme options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'StyleProvider documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ StyleProvider ? (
					<StyleProvider>
						<div style={ { padding: '12px' } }>{ content }</div>
					</StyleProvider>
				) : (
					<ComponentUnavailable componentName="StyleProvider" />
				) }
			</div>
		</>
	);
}
