function slugToTitle( slug ) {
	return slug
		.split( '-' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
}

function editHeader( block, extraImports = '' ) {
	const resolveImports = block.experimentalFallback
		? `import {
	ComponentUnavailable,
	resolveComponent,
} from '../shared/resolve-component';
`
		: '';

	return `/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
${ extraImports }
/**
 * Internal dependencies
 */
import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
${ resolveImports }import blockJson from './block.json';

const metadata = getComponentMetadata( '${ block.slug }', blockJson );
`;
}

function layoutResolveEdit( block, config ) {
	const {
		componentName,
		stableName,
		experimentalName,
		extraImports = '',
		destructure = '',
		inspector = '',
		preview,
		className = 'blocks-preview-component-block',
	} = config;

	return `${ editHeader( block, extraImports ) }
const ${ componentName } = resolveComponent( '${ stableName }', '${ experimentalName }' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
${ destructure ? `\tconst { ${ destructure } } = attributes;\n` : '' }
	const blockProps = useBlockProps( {
		className: '${ className }',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( '${ slugToTitle( block.slug ) } options', 'blocks-preview' ) }
				docsLinkLabel={ __( '${ stableName } documentation', 'blocks-preview' ) }
			>
${ inspector }
			</ComponentInspector>

			<div { ...blockProps }>
				{ ${ componentName } ? (
${ preview }
				) : (
					<ComponentUnavailable componentName="${ stableName }" />
				) }
			</div>
		</>
	);
}
`;
}

function simpleControlEdit( block, config ) {
	const {
		imports,
		componentName,
		destructure,
		inspector,
		componentProps,
	} = config;

	return `${ editHeader( block, imports ) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { ${ destructure } } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( '${ componentName } options', 'blocks-preview' ) }
				docsLinkLabel={ __( '${ componentName } documentation', 'blocks-preview' ) }
			>
${ inspector }
			</ComponentInspector>

			<div { ...blockProps }>
				<${ componentName }
${ componentProps }${ config.closingTag === false ? '' : '\n\t\t\t\t/>' }
			</div>
		</>
	);
}
`;
}

export const EDIT_GENERATORS = {};

// Simple controls
EDIT_GENERATORS[ 'text-control' ] = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'TextControl',
		destructure: 'label, value, help',
		inspector: `				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Help text', 'blocks-preview' ) }
					value={ help }
					onChange={ ( nextHelp ) =>
						setAttributes( { help: nextHelp } )
					}
				/>`,
		componentProps: `					label={ label }
					help={ help }
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}`,
	} );

EDIT_GENERATORS[ 'textarea-control' ] = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { RangeControl, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'TextareaControl',
		destructure: 'label, value, rows',
		inspector: `				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
				<RangeControl
					label={ __( 'Rows', 'blocks-preview' ) }
					value={ rows }
					onChange={ ( nextRows ) =>
						setAttributes( { rows: nextRows } )
					}
					min={ 2 }
					max={ 10 }
				/>`,
		componentProps: `					label={ label }
					value={ value }
					rows={ rows }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}`,
	} );

EDIT_GENERATORS[ 'toggle-control' ] = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'ToggleControl',
		destructure: 'label, checked',
		inspector: `				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>`,
		componentProps: `					label={ label }
					checked={ checked }
					onChange={ ( nextChecked ) =>
						setAttributes( { checked: nextChecked } )
					}`,
	} );

EDIT_GENERATORS[ 'select-control' ] = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'SelectControl',
		destructure: 'label, value, options',
		inspector: `				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>`,
		componentProps: `					label={ label }
					value={ value }
					options={ options }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}`,
	} );

EDIT_GENERATORS[ 'search-control' ] = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { SearchControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'SearchControl',
		destructure: 'label, value, placeholder',
		inspector: `				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'Placeholder', 'blocks-preview' ) }
					value={ placeholder }
					onChange={ ( nextPlaceholder ) =>
						setAttributes( { placeholder: nextPlaceholder } )
					}
				/>`,
		componentProps: `					label={ label }
					value={ value }
					placeholder={ placeholder }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}`,
	} );

	EDIT_GENERATORS[ 'form-file-upload' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { FormFileUpload, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { label, accept } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'FormFileUpload options', 'blocks-preview' ) } docsLinkLabel={ __( 'FormFileUpload documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />
				<TextControl label={ __( 'Accept', 'blocks-preview' ) } value={ accept } onChange={ ( v ) => setAttributes( { accept: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<FormFileUpload accept={ accept } onChange={ () => {} }>{ label }</FormFileUpload>
			</div>
		</>
	);
}
`;

EDIT_GENERATORS.spinner = ( block ) =>
	`${ editHeader(
		block,
		`import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Spinner options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Spinner documentation', 'blocks-preview' ) }
			/>

			<div { ...blockProps }>
				<Spinner />
			</div>
		</>
	);
}
`;

EDIT_GENERATORS.tooltip = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { TextControl, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'Tooltip',
		destructure: 'text, triggerText',
		inspector: `				<TextControl
					label={ __( 'Trigger text', 'blocks-preview' ) }
					value={ triggerText }
					onChange={ ( nextText ) =>
						setAttributes( { triggerText: nextText } )
					}
				/>
				<TextControl
					label={ __( 'Tooltip text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( nextText ) =>
						setAttributes( { text: nextText } )
					}
				/>`,
		componentProps: `					text={ text }
				>
					<span>{ triggerText }</span>
				</Tooltip>`,
		closingTag: false,
	} );

EDIT_GENERATORS[ 'text-highlight' ] = ( block ) =>
	simpleControlEdit( block, {
		imports: `import { TextControl, TextHighlight } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
		componentName: 'TextHighlight',
		destructure: 'text, highlight',
		inspector: `				<TextControl
					label={ __( 'Text', 'blocks-preview' ) }
					value={ text }
					onChange={ ( nextText ) =>
						setAttributes( { text: nextText } )
					}
				/>
				<TextControl
					label={ __( 'Highlight', 'blocks-preview' ) }
					value={ highlight }
					onChange={ ( nextHighlight ) =>
						setAttributes( { highlight: nextHighlight } )
					}
				/>`,
		componentProps: `					text={ text }
					highlight={ highlight }`,
	} );

import { registerPart2Editors } from './scaffold-remaining-edits-part2.mjs';

registerPart2Editors( EDIT_GENERATORS, {
	editHeader,
	layoutResolveEdit,
	simpleControlEdit,
	slugToTitle,
} );
