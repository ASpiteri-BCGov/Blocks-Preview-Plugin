/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Guide, GuidePage, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'guide', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { pageCount, page1Content, page2Content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Guide options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Guide documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Page count', 'blocks-preview' ) }
					value={ pageCount }
					onChange={ ( nextCount ) =>
						setAttributes( { pageCount: nextCount } )
					}
					min={ 1 }
					max={ 2 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Guide pageCount={ pageCount }>
					<GuidePage pageNumber={ 1 }>
						<p>{ page1Content }</p>
					</GuidePage>
					{ pageCount > 1 ? (
						<GuidePage pageNumber={ 2 }>
							<p>{ page2Content }</p>
						</GuidePage>
					) : null }
				</Guide>
			</div>
		</>
	);
}
