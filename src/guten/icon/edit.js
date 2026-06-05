/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Icon, RangeControl } from '@wordpress/components';
import { check } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'icon', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { size } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Icon options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Icon documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					onChange={ ( nextSize ) =>
						setAttributes( { size: nextSize } )
					}
					min={ 16 }
					max={ 48 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Icon icon={ check } size={ size } />
			</div>
		</>
	);
}
