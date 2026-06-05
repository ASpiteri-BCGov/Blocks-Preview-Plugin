/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl, TextControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'h-stack', blockJson );

const HStack = resolveComponent( 'HStack', '__experimentalHStack' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { spacing, item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-h-stack-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'HStack options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'HStack documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Spacing', 'blocks-preview' ) }
					value={ spacing }
					onChange={ ( nextSpacing ) =>
						setAttributes( { spacing: nextSpacing } )
					}
					min={ 0 }
					max={ 12 }
				/>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( nextItem ) =>
						setAttributes( { item1: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( nextItem ) =>
						setAttributes( { item2: nextItem } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ HStack ? (
					<HStack spacing={ spacing }>
						<span className="blocks-preview-h-stack-block__item">
							{ item1 }
						</span>
						<span className="blocks-preview-h-stack-block__item">
							{ item2 }
						</span>
					</HStack>
				) : (
					<ComponentUnavailable componentName="HStack" />
				) }
			</div>
		</>
	);
}
