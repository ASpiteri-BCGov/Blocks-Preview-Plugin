/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Navigator, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'navigator', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { homeLabel, detailLabel, navigateLabel } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-navigator-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Navigator options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Navigator documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Home label', 'blocks-preview' ) }
					value={ homeLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { homeLabel: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Detail label', 'blocks-preview' ) }
					value={ detailLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { detailLabel: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Navigate button', 'blocks-preview' ) }
					value={ navigateLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { navigateLabel: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Navigator initialPath="/">
					<Navigator.Screen path="/">
						<p>{ homeLabel }</p>
						<Navigator.Button path="/detail">
							{ navigateLabel }
						</Navigator.Button>
					</Navigator.Screen>
					<Navigator.Screen path="/detail">
						<p>{ detailLabel }</p>
						<Navigator.BackButton />
					</Navigator.Screen>
				</Navigator>
			</div>
		</>
	);
}
