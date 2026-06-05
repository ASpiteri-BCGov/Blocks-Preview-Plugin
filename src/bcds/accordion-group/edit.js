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
	Accordion,
	AccordionGroup,
} from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'accordion-group', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, firstLabel, secondLabel } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-accordion-group-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'Accordion Group settings',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'View BC Gov Accordion Group docs',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
				<TextControl
					label={ __( 'First label', 'blocks-preview' ) }
					value={ firstLabel }
					onChange={ ( value ) =>
						setAttributes( { firstLabel: value } )
					}
				/>
				<TextControl
					label={ __( 'Second label', 'blocks-preview' ) }
					value={ secondLabel }
					onChange={ ( value ) =>
						setAttributes( { secondLabel: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<AccordionGroup title={ title }>
					<Accordion label={ firstLabel }>
						First panel content.
					</Accordion>
					<Accordion label={ secondLabel }>
						Second panel content.
					</Accordion>
				</AccordionGroup>
			</div>
		</>
	);
}
