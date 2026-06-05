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

const metadata = getComponentMetadata( 'z-stack', blockJson );

const ZStack = resolveComponent( 'ZStack', '__experimentalZStack' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { layer1, layer2 } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-z-stack-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Z Stack options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'ZStack documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Back layer', 'blocks-preview' ) }
					value={ layer1 }
					onChange={ ( v ) => setAttributes( { layer1: v } ) }
				/>
				<TextControl
					label={ __( 'Front layer', 'blocks-preview' ) }
					value={ layer2 }
					onChange={ ( v ) => setAttributes( { layer2: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ ZStack ? (
					<ZStack>
						<div style={ { padding: '12px', background: '#ddd' } }>
							{ layer1 }
						</div>
						<div
							style={ {
								padding: '12px',
								background: '#3858e9',
								color: '#fff',
							} }
						>
							{ layer2 }
						</div>
					</ZStack>
				) : (
					<ComponentUnavailable componentName="ZStack" />
				) }
			</div>
		</>
	);
}
