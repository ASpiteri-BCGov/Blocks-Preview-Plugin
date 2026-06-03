/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'spacer', blockJson );

const Spacer = resolveComponent( 'Spacer', '__experimentalSpacer' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { margin } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Spacer options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Spacer documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Margin', 'blocks-preview' ) }
					value={ margin }
					onChange={ ( v ) => setAttributes( { margin: v } ) }
					min={ 0 }
					max={ 12 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Spacer ? (
					<div style={ { background: '#f0f0f0' } }>
						Above
						<Spacer margin={ margin } />
						Below
					</div>
				) : (
					<ComponentUnavailable componentName="Spacer" />
				) }
			</div>
		</>
	);
}
