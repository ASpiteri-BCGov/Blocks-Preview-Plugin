/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	canRenderNavigator,
	getNavigatorComponents,
} from './navigator-preview';
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import { ComponentUnavailable } from '../shared/resolve-component';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'navigator', blockJson );

/** Detail screen path (child of `/` per Navigator hierarchy rules). */
const DETAIL_PATH = '/child';

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { homeLabel, detailLabel, navigateLabel } = attributes;
	const { Navigator, Screen, Button, BackButton } = getNavigatorComponents();

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
					value={ homeLabel ?? '' }
					onChange={ ( nextLabel ) =>
						setAttributes( { homeLabel: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Detail label', 'blocks-preview' ) }
					value={ detailLabel ?? '' }
					onChange={ ( nextLabel ) =>
						setAttributes( { detailLabel: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Navigate button', 'blocks-preview' ) }
					value={ navigateLabel ?? '' }
					onChange={ ( nextLabel ) =>
						setAttributes( { navigateLabel: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ canRenderNavigator() ? (
					<Navigator initialPath="/">
						<Screen path="/">
							<p>{ homeLabel }</p>
							<Button path={ DETAIL_PATH } variant="secondary">
								{ navigateLabel }
							</Button>
						</Screen>
						<Screen path={ DETAIL_PATH }>
							<p>{ detailLabel }</p>
							<BackButton variant="secondary">
								{ __( 'Go back', 'blocks-preview' ) }
							</BackButton>
						</Screen>
					</Navigator>
				) : (
					<ComponentUnavailable componentName="Navigator" />
				) }
			</div>
		</>
	);
}
