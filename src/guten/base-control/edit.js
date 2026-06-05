/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	BaseControl,
	TextControl,
	ToggleControl,
	useBaseControlProps,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'base-control', blockJson );

/**
 * @param {Object}                    props
 * @param {string}                    props.value
 * @param {( value: string ) => void} props.onChange
 * @param {string}                    props.label
 * @param {string}                    props.help
 * @param {boolean}                   props.hideLabelFromVision
 */
function BaseControlTextarea( {
	value,
	onChange,
	label,
	help,
	hideLabelFromVision,
} ) {
	const { baseControlProps, controlProps } = useBaseControlProps( {
		label,
		help,
		hideLabelFromVision,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<textarea
				{ ...controlProps }
				className="blocks-preview-base-control-block__textarea"
				value={ value }
				rows={ 4 }
				onChange={ ( event ) => onChange( event.target.value ) }
			/>
		</BaseControl>
	);
}

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, help, hideLabelFromVision, value } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'BaseControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'BaseControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Help text', 'blocks-preview' ) }
					value={ help }
					onChange={ ( nextHelp ) =>
						setAttributes( { help: nextHelp } )
					}
				/>
				<ToggleControl
					label={ __( 'Hide label from vision', 'blocks-preview' ) }
					checked={ hideLabelFromVision }
					onChange={ ( nextHide ) =>
						setAttributes( { hideLabelFromVision: nextHide } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<BaseControlTextarea
					label={ label }
					help={ help }
					hideLabelFromVision={ hideLabelFromVision }
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
