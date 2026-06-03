/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'badge', blockJson );

const INTENT_CLASS = {
	default: 'blocks-preview-badge-block__badge',
	info: 'blocks-preview-badge-block__badge is-info',
	success: 'blocks-preview-badge-block__badge is-success',
	warning: 'blocks-preview-badge-block__badge is-warning',
	error: 'blocks-preview-badge-block__badge is-error',
};

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, intent } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-badge-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Badge options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Badge documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( v ) => setAttributes( { label: v } ) }
				/>
				<SelectControl
					label={ __( 'Intent', 'blocks-preview' ) }
					value={ intent }
					options={ [
						{
							label: __( 'Default', 'blocks-preview' ),
							value: 'default',
						},
						{
							label: __( 'Info', 'blocks-preview' ),
							value: 'info',
						},
						{
							label: __( 'Success', 'blocks-preview' ),
							value: 'success',
						},
						{
							label: __( 'Warning', 'blocks-preview' ),
							value: 'warning',
						},
						{
							label: __( 'Error', 'blocks-preview' ),
							value: 'error',
						},
					] }
					onChange={ ( v ) => setAttributes( { intent: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<span
					className={ INTENT_CLASS[ intent ] || INTENT_CLASS.default }
				>
					{ label }
				</span>
			</div>
		</>
	);
}
