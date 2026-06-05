/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl } from '@wordpress/components';

/**
 * BC Gov design system
 */
import { Callout, Button } from '@bcgov/design-system-react-components';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'callout', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { variant, title, description } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-callout-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Callout settings', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'View BC Gov Callout docs',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Variant', 'blocks-preview' ) }
					value={ variant }
					options={ [
						{ label: 'lightGrey', value: 'lightGrey' },
						{ label: 'lightBlue', value: 'lightBlue' },
						{ label: 'lightGold', value: 'lightGold' },
						{ label: 'Blue', value: 'Blue' },
						{ label: 'Grey', value: 'Grey' },
						{ label: 'Black', value: 'Black' },
					] }
					onChange={ ( value ) =>
						setAttributes( { variant: value } )
					}
				/>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
				<TextControl
					label={ __( 'Description', 'blocks-preview' ) }
					value={ description }
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					}
				/>
			</ComponentInspector>
			<div { ...blockProps }>
				<Callout
					variant={ variant }
					title={ title }
					description={ description }
					buttons={ <Button variant="primary">Action</Button> }
				/>
			</div>
		</>
	);
}
