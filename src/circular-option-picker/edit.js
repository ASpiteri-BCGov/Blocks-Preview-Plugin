/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ColorIndicator } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'circular-option-picker', blockJson );

const COLOR_OPTIONS = [
	{ value: '#3858e9', label: 'Blue' },
	{ value: '#00a32a', label: 'Green' },
	{ value: '#d63638', label: 'Red' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { selectedColor } = attributes;
	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-circular-option-picker-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'Circular Option Picker options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'CircularOptionPicker documentation',
					'blocks-preview'
				) }
			/>
			<div { ...blockProps }>
				<div className="blocks-preview-circular-option-picker-block__options">
					{ COLOR_OPTIONS.map( ( option ) => (
						<button
							key={ option.value }
							type="button"
							className={
								'blocks-preview-circular-option-picker-block__option' +
								( selectedColor === option.value
									? ' is-selected'
									: '' )
							}
							onClick={ () =>
								setAttributes( { selectedColor: option.value } )
							}
							aria-label={ option.label }
						>
							<ColorIndicator colorValue={ option.value } />
						</button>
					) ) }
				</div>
			</div>
		</>
	);
}
