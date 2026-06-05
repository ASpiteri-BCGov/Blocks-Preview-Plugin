/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'spinner', blockJson );

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Spinner options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Spinner documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				<Spinner />
			</div>
		</>
	);
}
