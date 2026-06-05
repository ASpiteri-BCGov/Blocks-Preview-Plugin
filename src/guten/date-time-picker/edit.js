/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { DateTimePicker, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'date-time-picker', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { date, is12Hour } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DateTimePicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DateTimePicker documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( '12-hour clock', 'blocks-preview' ) }
					checked={ is12Hour }
					onChange={ ( nextIs12Hour ) =>
						setAttributes( { is12Hour: nextIs12Hour } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<DateTimePicker
					currentDate={ date }
					is12Hour={ is12Hour }
					onChange={ ( nextDate ) =>
						setAttributes( { date: nextDate } )
					}
				/>
			</div>
		</>
	);
}
