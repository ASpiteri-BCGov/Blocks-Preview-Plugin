/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	RangeControl,
	ResponsiveWrapper,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'mobile', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { naturalWidth, naturalHeight, content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'ResponsiveWrapper options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'ResponsiveWrapper documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Width', 'blocks-preview' ) }
					value={ naturalWidth }
					onChange={ ( v ) => setAttributes( { naturalWidth: v } ) }
					min={ 320 }
					max={ 428 }
				/>
				<RangeControl
					label={ __( 'Height', 'blocks-preview' ) }
					value={ naturalHeight }
					onChange={ ( v ) => setAttributes( { naturalHeight: v } ) }
					min={ 568 }
					max={ 926 }
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ResponsiveWrapper
					naturalWidth={ naturalWidth }
					naturalHeight={ naturalHeight }
				>
					<div style={ { padding: '16px', background: '#f0f0f0' } }>
						{ content }
					</div>
				</ResponsiveWrapper>
			</div>
		</>
	);
}
