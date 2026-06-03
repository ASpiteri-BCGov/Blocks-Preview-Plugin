/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TabPanel, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'tabs', blockJson );

export default function Edit( { attributes, setAttributes } ) {
	const { tab1Label, tab2Label, tab1Content, tab2Content } = attributes;
	const tabs = [
		{ name: 'tab1', title: tab1Label },
		{ name: 'tab2', title: tab2Label },
	];
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );
	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Tabs options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'TabPanel documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Tab 1 label', 'blocks-preview' ) }
					value={ tab1Label }
					onChange={ ( v ) => setAttributes( { tab1Label: v } ) }
				/>
				<TextControl
					label={ __( 'Tab 2 label', 'blocks-preview' ) }
					value={ tab2Label }
					onChange={ ( v ) => setAttributes( { tab2Label: v } ) }
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<TabPanel tabs={ tabs }>
					{ ( tab ) => (
						<p>
							{ tab.name === 'tab1' ? tab1Content : tab2Content }
						</p>
					) }
				</TabPanel>
			</div>
		</>
	);
}
