/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Autocomplete } from '@wordpress/components';
import { useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { create, getTextContent } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { FRUIT_COMPLETER } from '../../shared/autocomplete-completers';
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'autocomplete', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { content } = attributes;
	const contentRef = useRef();
	const [ selection, setSelection ] = useState( { start: 0, end: 0 } );

	const record = useMemo(
		() =>
			create( {
				text: content,
				start: selection.start,
				end: selection.end,
			} ),
		[ content, selection.end, selection.start ]
	);

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	const updateContent = ( nextContent, target ) => {
		setAttributes( { content: nextContent } );
		if ( target ) {
			setSelection( {
				start: target.selectionStart,
				end: target.selectionEnd,
			} );
		}
	};

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Autocomplete options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Autocomplete documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				<p className="blocks-preview-component-block__preview-label">
					{ __(
						'Type ~ to trigger the fruit completer',
						'blocks-preview'
					) }
				</p>
				<Autocomplete
					record={ record }
					onChange={ ( newRecord ) =>
						setAttributes( {
							content: getTextContent( newRecord ),
						} )
					}
					onReplace={ () => {} }
					completers={ [ FRUIT_COMPLETER ] }
					contentRef={ contentRef }
					isSelected={ isSelected }
				>
					{ ( { onKeyDown } ) => (
						<textarea
							ref={ contentRef }
							className="blocks-preview-autocomplete-block__input"
							value={ content }
							rows={ 3 }
							placeholder={ __(
								'Start typing, then use ~ for suggestions…',
								'blocks-preview'
							) }
							onChange={ ( event ) =>
								updateContent(
									event.target.value,
									event.target
								)
							}
							onKeyDown={ onKeyDown }
							onSelect={ ( event ) =>
								updateContent(
									event.target.value,
									event.target
								)
							}
							onClick={ ( event ) =>
								updateContent(
									event.target.value,
									event.target
								)
							}
						/>
					) }
				</Autocomplete>
			</div>
		</>
	);
}
