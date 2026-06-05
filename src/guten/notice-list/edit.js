/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { NoticeList } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( 'notice-list', blockJson );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { notices } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	const onRemove = ( id ) => {
		setAttributes( {
			notices: notices.filter( ( notice ) => notice.id !== id ),
		} );
	};

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'NoticeList options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'NoticeList documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				<NoticeList notices={ notices } onRemove={ onRemove } />
			</div>
		</>
	);
}
