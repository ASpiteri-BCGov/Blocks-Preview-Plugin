/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Animate,
	Notice,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'animate', blockJson );

const ANIMATION_TYPES = [
	{ label: __( 'Appear', 'blocks-preview' ), value: 'appear' },
	{ label: __( 'Loading', 'blocks-preview' ), value: 'loading' },
	{ label: __( 'Slide in', 'blocks-preview' ), value: 'slide-in' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { animationType, origin, noticeText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	const animationOptions = animationType === 'loading' ? {} : { origin };

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Animate options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Animate documentation',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Animation type', 'blocks-preview' ) }
					value={ animationType }
					options={ ANIMATION_TYPES }
					onChange={ ( nextType ) =>
						setAttributes( { animationType: nextType } )
					}
				/>
				{ animationType !== 'loading' && (
					<TextControl
						label={ __( 'Origin', 'blocks-preview' ) }
						value={ origin }
						onChange={ ( nextOrigin ) =>
							setAttributes( { origin: nextOrigin } )
						}
						help={ __(
							'For appear: top, bottom, middle, right, left, center. For slide-in: left.',
							'blocks-preview'
						) }
					/>
				) }
				<TextControl
					label={ __( 'Notice text', 'blocks-preview' ) }
					value={ noticeText }
					onChange={ ( nextText ) =>
						setAttributes( { noticeText: nextText } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Animate type={ animationType } options={ animationOptions }>
					{ ( { className } ) => (
						<Notice className={ className } status="success">
							<p>{ noticeText }</p>
						</Notice>
					) }
				</Animate>
			</div>
		</>
	);
}
