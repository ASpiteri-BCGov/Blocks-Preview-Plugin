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

const metadata = getComponentMetadata( 'elevation', blockJson );

const Elevation = resolveComponent( 'Elevation', '__experimentalElevation' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { borderRadius, level, content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Elevation options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Elevation documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Border radius', 'blocks-preview' ) }
					value={ borderRadius }
					onChange={ ( nextRadius ) =>
						setAttributes( { borderRadius: nextRadius } )
					}
					min={ 0 }
					max={ 16 }
				/>
				<RangeControl
					label={ __( 'Level', 'blocks-preview' ) }
					value={ level }
					onChange={ ( nextLevel ) =>
						setAttributes( { level: nextLevel } )
					}
					min={ 0 }
					max={ 3 }
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Elevation ? (
					<Elevation borderRadius={ borderRadius } level={ level }>
						<div className="blocks-preview-elevation-block__content">
							{ content }
						</div>
					</Elevation>
				) : (
					<ComponentUnavailable componentName="Elevation" />
				) }
			</div>
		</>
	);
}
