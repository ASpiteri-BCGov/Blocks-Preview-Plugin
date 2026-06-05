/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import {
	Button,
	Tooltip,
	TooltipTrigger,
} from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tooltip', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { tooltipText, buttonText } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-tooltip-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tooltip settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Tooltip docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( value ) =>
						setAttributes( { buttonText: value } )
					}
				/>
				<TextControl
					label={ __( 'Tooltip text', 'blocks-preview' ) }
					value={ tooltipText }
					onChange={ ( value ) =>
						setAttributes( { tooltipText: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<TooltipTrigger>
					<Button variant="secondary">{ buttonText }</Button>
					<Tooltip>{ tooltipText }</Tooltip>
				</TooltipTrigger>
			</div>
		</>
	);
}
