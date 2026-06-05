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

const metadata = getComponentMetadata( 'heading', blockJson );

const Heading = resolveComponent( 'Heading', '__experimentalHeading' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { level, content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Heading options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Heading documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Level', 'blocks-preview' ) }
					value={ level }
					onChange={ ( nextLevel ) =>
						setAttributes( { level: nextLevel } )
					}
					min={ 1 }
					max={ 6 }
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
				{ Heading ? (
					<Heading level={ level }>{ content }</Heading>
				) : (
					<ComponentUnavailable componentName="Heading" />
				) }
			</div>
		</>
	);
}
