/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * BC Gov design system
 */
import { Calendar } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'calendar', blockJson );

export default function Edit() {
	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-calendar-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Calendar settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Calendar docs',
					'blocks-preview'
				) }
			></ComponentInspector>
			<div { ...blockProps }>
				<Calendar aria-label="Calendar preview" />
			</div>
		</>
	);
}
