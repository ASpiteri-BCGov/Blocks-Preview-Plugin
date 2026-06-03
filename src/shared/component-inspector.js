/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { ExternalLink, Notice, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const EXPERIMENTAL_NOTICE = __(
	'This feature is still experimental. "Experimental" means this is an early implementation subject to drastic and breaking changes.',
	'blocks-preview'
);

/**
 * Shared sidebar panel for component preview blocks.
 *
 * @param {Object}                    props
 * @param {Object}                    props.metadata      Imported block.json metadata.
 * @param {string}                    props.panelTitle    Inspector panel title.
 * @param {string}                    props.docsLinkLabel Documentation link text.
 * @param {import('react').ReactNode} props.children      Block-specific controls.
 */
export function ComponentInspector( {
	metadata,
	panelTitle,
	docsLinkLabel,
	children,
} ) {
	return (
		<InspectorControls>
			<PanelBody title={ panelTitle } initialOpen>
				{ metadata.experimental ? (
					<Notice
						status="warning"
						isDismissible={ false }
						className="blocks-preview-component-block__experimental-notice"
					>
						{ EXPERIMENTAL_NOTICE }
					</Notice>
				) : null }
				{ metadata.description ? (
					<p className="blocks-preview-component-block__description">
						{ metadata.description }
					</p>
				) : null }
				{ children }
				{ metadata.documentation ? (
					<p className="blocks-preview-component-block__docs">
						<ExternalLink href={ metadata.documentation }>
							{ docsLinkLabel }
						</ExternalLink>
					</p>
				) : null }
			</PanelBody>
		</InspectorControls>
	);
}
