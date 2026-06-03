/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import {
	ComponentUnavailable,
	resolveComponent,
} from '../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'v-stack', blockJson );

const VStack = resolveComponent( 'VStack', '__experimentalVStack' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { spacing, item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-v-stack-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'V Stack options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'VStack documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Spacing', 'blocks-preview' ) }
					value={ spacing }
					onChange={ ( v ) => setAttributes( { spacing: v } ) }
					min={ 0 }
					max={ 12 }
				/>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( v ) => setAttributes( { item1: v } ) }
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( v ) => setAttributes( { item2: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ VStack ? (
					<VStack spacing={ spacing }>
						<span className="blocks-preview-v-stack-block__item">
							{ item1 }
						</span>
						<span className="blocks-preview-v-stack-block__item">
							{ item2 }
						</span>
					</VStack>
				) : (
					<ComponentUnavailable componentName="VStack" />
				) }
			</div>
		</>
	);
}
