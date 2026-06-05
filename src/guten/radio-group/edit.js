/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
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

const metadata = getComponentMetadata( 'radio-group', blockJson );

const RadioGroup = resolveComponent( 'RadioGroup', '__experimentalRadioGroup' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, selected, options } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Radio Group options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'RadioGroup documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ RadioGroup ? (
					<RadioGroup
						label={ label }
						onChange={ ( v ) => setAttributes( { selected: v } ) }
						checked={ selected }
					>
						{ options.map( ( option ) => (
							<RadioGroup.Radio
								key={ option.value }
								value={ option.value }
							>
								{ option.label }
							</RadioGroup.Radio>
						) ) }
					</RadioGroup>
				) : (
					<ComponentUnavailable componentName="RadioGroup" />
				) }
			</div>
		</>
	);
}
