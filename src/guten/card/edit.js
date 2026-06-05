/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'card', blockJson );

const SIZE_OPTIONS = [
	{ label: __( 'None', 'blocks-preview' ), value: 'none' },
	{ label: __( 'Extra small', 'blocks-preview' ), value: 'xSmall' },
	{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
	{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
	{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		headerTitle,
		bodyContent,
		footerContent,
		elevation,
		isBorderless,
		isRounded,
		size,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-card-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Card options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Card documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Header title', 'blocks-preview' ) }
					value={ headerTitle }
					onChange={ ( nextTitle ) =>
						setAttributes( { headerTitle: nextTitle } )
					}
				/>
				<TextControl
					label={ __( 'Body content', 'blocks-preview' ) }
					value={ bodyContent }
					onChange={ ( nextBody ) =>
						setAttributes( { bodyContent: nextBody } )
					}
				/>
				<TextControl
					label={ __( 'Footer content', 'blocks-preview' ) }
					value={ footerContent }
					onChange={ ( nextFooter ) =>
						setAttributes( { footerContent: nextFooter } )
					}
				/>
				<RangeControl
					label={ __( 'Elevation', 'blocks-preview' ) }
					value={ elevation }
					onChange={ ( nextElevation ) =>
						setAttributes( { elevation: nextElevation } )
					}
					min={ 0 }
					max={ 5 }
				/>
				<SelectControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					options={ SIZE_OPTIONS }
					onChange={ ( nextSize ) =>
						setAttributes( { size: nextSize } )
					}
				/>
				<ToggleControl
					label={ __( 'Borderless', 'blocks-preview' ) }
					checked={ isBorderless }
					onChange={ ( nextBorderless ) =>
						setAttributes( { isBorderless: nextBorderless } )
					}
				/>
				<ToggleControl
					label={ __( 'Rounded', 'blocks-preview' ) }
					checked={ isRounded }
					onChange={ ( nextRounded ) =>
						setAttributes( { isRounded: nextRounded } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Card
					elevation={ elevation }
					isBorderless={ isBorderless }
					isRounded={ isRounded }
					size={ size }
				>
					<CardHeader>
						<strong>{ headerTitle }</strong>
					</CardHeader>
					<CardBody>
						<p>{ bodyContent }</p>
					</CardBody>
					<CardFooter>
						<p>{ footerContent }</p>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
