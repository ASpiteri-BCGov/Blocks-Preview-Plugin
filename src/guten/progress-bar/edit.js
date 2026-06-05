/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ProgressBar, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'progress-bar', blockJson );

/**
 * ProgressBar expects 0–100. Older block saves may still use 0–1.
 *
 * @param {unknown} value Block attribute.
 * @return {number} Progress percentage.
 */
function getProgressValue( value ) {
	if ( typeof value !== 'number' || Number.isNaN( value ) ) {
		return 50;
	}
	if ( value >= 0 && value <= 1 ) {
		return Math.round( value * 100 );
	}
	return Math.min( 100, Math.max( 0, value ) );
}

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value } = attributes;
	const progressValue = getProgressValue( value );

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ProgressBar options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ProgressBar documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Progress (%)', 'blocks-preview' ) }
					value={ progressValue }
					onChange={ ( nextValue ) =>
						setAttributes( {
							value:
								typeof nextValue === 'number' ? nextValue : 0,
						} )
					}
					min={ 0 }
					max={ 100 }
					step={ 1 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ProgressBar value={ progressValue } />
			</div>
		</>
	);
}
