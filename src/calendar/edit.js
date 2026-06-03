/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { DatePicker, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'calendar', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { selectedDate } = attributes;
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Calendar options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Calendar documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Selected date', 'blocks-preview' ) }
					value={ selectedDate }
					onChange={ ( v ) => setAttributes( { selectedDate: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<DatePicker
					currentDate={ selectedDate }
					onChange={ ( v ) => setAttributes( { selectedDate: v } ) }
				/>
			</div>
		</>
	);
}
