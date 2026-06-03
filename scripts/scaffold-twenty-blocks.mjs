#!/usr/bin/env node
/**
 * Scaffolds 20 WordPress component preview blocks after color-palette.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const SRC = path.join( ROOT, 'src' );

const BLOCKS = [
	{
		slug: 'color-picker',
		component: 'ColorPicker',
		icon: 'art',
		description:
			'ColorPicker is a color picking component based on react-colorful that lets you pick a color visually or by manipulating RGB(A), HSL(A), and hex values.',
		attributes: {
			color: { type: 'string', default: '#72aee6' },
			enableAlpha: { type: 'boolean', default: true },
		},
		editorScss: `.blocks-preview-color-picker-block {
	padding: 8px 0;
}`,
	},
	{
		slug: 'combobox-control',
		component: 'ComboboxControl',
		icon: 'editor-ul',
		description:
			'ComboboxControl is an enhanced SelectControl with autocomplete/filtering, allowing users to choose from predefined options or enter a custom value.',
		attributes: {
			label: { type: 'string', default: 'Select a user' },
			value: { type: 'string', default: 'alice' },
			options: {
				type: 'array',
				default: [
					{ label: 'Alice', value: 'alice' },
					{ label: 'Bob', value: 'bob' },
					{ label: 'Charlie', value: 'charlie' },
				],
			},
		},
	},
	{
		slug: 'custom-gradient-picker',
		component: 'CustomGradientPicker',
		icon: 'art',
		experimentalFallback: '__experimentalCustomGradientPicker',
		description:
			'CustomGradientPicker allows users to pick a gradient from a predefined set or create a custom one.',
		attributes: {
			value: {
				type: 'string',
				default:
					'linear-gradient(135deg,rgb(114,174,230) 0%,rgb(104,222,124) 100%)',
			},
		},
	},
	{
		slug: 'custom-select-control',
		component: 'CustomSelectControl',
		icon: 'editor-ul',
		description:
			'CustomSelectControl allows selection of one or more items from a short list, using a custom select control with more flexible styling than SelectControl.',
		attributes: {
			label: { type: 'string', default: 'Visibility' },
			value: { type: 'array', default: [ { key: 'public', name: 'Public' } ] },
			options: {
				type: 'array',
				default: [
					{ key: 'public', name: 'Public' },
					{ key: 'private', name: 'Private' },
					{ key: 'password', name: 'Password protected' },
				],
			},
		},
	},
	{
		slug: 'dashicon',
		component: 'Dashicon',
		icon: 'admin-generic',
		description:
			'Dashicon displays a single Dashicon from the WordPress Dashicon set as an SVG icon.',
		attributes: {
			icon: { type: 'string', default: 'admin-generic' },
		},
		editorScss: `.blocks-preview-dashicon-block {
	display: flex;
	align-items: center;
	gap: 8px;
}`,
	},
	{
		slug: 'date-time-picker',
		component: 'DateTimePicker',
		icon: 'calendar-alt',
		description:
			'DateTimePicker renders a combined date and time input for selecting a specific moment.',
		attributes: {
			date: { type: 'string', default: '2026-06-03T12:00:00' },
			is12Hour: { type: 'boolean', default: true },
		},
	},
	{
		slug: 'disabled',
		component: 'Disabled',
		icon: 'hidden',
		description:
			'Disabled is a wrapper component that disables pointer events and dims child elements when isDisabled is true.',
		attributes: {
			isDisabled: { type: 'boolean', default: true },
			inputValue: { type: 'string', default: 'Disabled field value' },
			inputLabel: { type: 'string', default: 'Sample field' },
		},
	},
	{
		slug: 'draggable',
		component: 'Draggable',
		icon: 'move',
		description:
			'Draggable is a Component that provides a way to set up a cross-browser (including touch) customizable draggable UI element.',
		attributes: {
			axis: { type: 'string', default: 'both' },
			dragText: { type: 'string', default: 'Drag me' },
		},
		editorScss: `.blocks-preview-draggable-block__handle {
	display: inline-block;
	padding: 8px 16px;
	border: 1px dashed #949494;
	border-radius: 2px;
	cursor: grab;
	background: #f0f0f0;
}`,
	},
	{
		slug: 'drop-zone',
		component: 'DropZone',
		icon: 'upload',
		description:
			'DropZone is a React component that renders a drop zone for dragging and dropping files.',
		attributes: {
			label: {
				type: 'string',
				default: 'Drop files here or click to upload',
			},
			lastDrop: { type: 'string', default: '' },
		},
		editorScss: `.blocks-preview-drop-zone-block {
	position: relative;
	min-height: 120px;
	padding: 24px;
	border: 1px dashed #949494;
	border-radius: 2px;
	text-align: center;
}`,
	},
	{
		slug: 'dropdown',
		component: 'Dropdown',
		icon: 'arrow-down-alt2',
		description:
			'Dropdown is a React component to render a dropdown menu, typically used to display a set of actions.',
		attributes: {
			buttonText: { type: 'string', default: 'Toggle dropdown' },
			contentText: {
				type: 'string',
				default: 'Dropdown content goes here.',
			},
		},
	},
	{
		slug: 'dropdown-menu',
		component: 'DropdownMenu',
		icon: 'menu',
		description:
			'DropdownMenu displays a list of actions in a dropdown menu, triggered by a button.',
		attributes: {
			label: { type: 'string', default: 'Actions' },
		},
	},
	{
		slug: 'duotone-picker',
		component: 'DuotonePicker',
		icon: 'art',
		experimentalFallback: '__experimentalDuotonePicker',
		description:
			'DuotonePicker renders a duotone filter picker that lets users choose shadow and highlight colors from a palette.',
		attributes: {
			duotone: {
				type: 'array',
				default: [ '#000000', '#ffffff' ],
			},
		},
		usesColorPalette: true,
	},
	{
		slug: 'elevation',
		component: 'Elevation',
		icon: 'admin-page',
		experimentalFallback: '__experimentalElevation',
		description:
			'Elevation is a component that adds a shadow to its content to convey depth along the z-axis.',
		attributes: {
			borderRadius: { type: 'number', default: 2 },
			level: { type: 'number', default: 1 },
			content: {
				type: 'string',
				default: 'Elevated content with a drop shadow.',
			},
		},
		editorScss: `.blocks-preview-elevation-block__content {
	padding: 16px;
	background: #fff;
}`,
	},
	{
		slug: 'external-link',
		component: 'ExternalLink',
		icon: 'external',
		description:
			'ExternalLink is a link to an external resource that includes an icon indicating it opens in a new tab.',
		attributes: {
			href: {
				type: 'string',
				default: 'https://wordpress.org',
			},
			linkText: { type: 'string', default: 'WordPress.org' },
		},
	},
	{
		slug: 'flex',
		component: 'Flex',
		icon: 'columns',
		description:
			'Flex is a layout component that wraps flex items and provides a consistent spacing API.',
		attributes: {
			direction: { type: 'string', default: 'row' },
			justify: { type: 'string', default: 'flex-start' },
			align: { type: 'string', default: 'stretch' },
		},
		editorScss: `.blocks-preview-flex-block__item {
	padding: 8px 12px;
	background: #f0f0f0;
	border-radius: 2px;
}`,
	},
	{
		slug: 'focal-point-picker',
		component: 'FocalPointPicker',
		icon: 'format-image',
		description:
			'FocalPointPicker renders a UI that allows selecting a focal point on an image for object-fit positioning.',
		attributes: {
			url: {
				type: 'string',
				default:
					'https://s.w.org/style/images/about/WordPress-logotype-wmark.png',
			},
			focalPoint: {
				type: 'object',
				default: { x: 0.5, y: 0.5 },
			},
		},
	},
	{
		slug: 'font-size-picker',
		component: 'FontSizePicker',
		icon: 'editor-textcolor',
		experimentalFallback: '__experimentalFontSizePicker',
		description:
			'FontSizePicker renders a UI that allows users to select a font size from a preset list or enter a custom value.',
		attributes: {
			fontSize: { type: 'string', default: '16px' },
			fontSizes: {
				type: 'array',
				default: [
					{ name: 'Small', slug: 'small', size: '13px' },
					{ name: 'Medium', slug: 'medium', size: '16px' },
					{ name: 'Large', slug: 'large', size: '24px' },
				],
			},
		},
	},
	{
		slug: 'form-toggle',
		component: 'FormToggle',
		icon: 'yes',
		description:
			'FormToggle renders a toggle switch for boolean on/off settings, styled for form usage.',
		attributes: {
			checked: { type: 'boolean', default: true },
			label: { type: 'string', default: 'Enable notifications' },
		},
		editorScss: `.blocks-preview-form-toggle-block {
	display: flex;
	align-items: center;
	gap: 8px;
}`,
	},
	{
		slug: 'form-token-field',
		component: 'FormTokenField',
		icon: 'tag',
		description:
			'FormTokenField renders an input field that accepts tokens (tags) with optional autocomplete suggestions.',
		attributes: {
			label: { type: 'string', default: 'Tags' },
			tokens: {
				type: 'array',
				default: [ 'WordPress', 'Blocks' ],
			},
			suggestions: {
				type: 'array',
				default: [
					'WordPress',
					'Blocks',
					'Components',
					'Editor',
					'Gutenberg',
				],
			},
		},
	},
	{
		slug: 'gradient-picker',
		component: 'GradientPicker',
		icon: 'art',
		experimentalFallback: '__experimentalGradientPicker',
		description:
			'GradientPicker allows users to pick a gradient from a predefined set or create a custom gradient.',
		attributes: {
			value: {
				type: 'string',
				default:
					'linear-gradient(135deg,rgb(114,174,230) 0%,rgb(230,80,84) 100%)',
			},
		},
	},
];

function slugToTitle( slug ) {
	return slug
		.split( '-' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
		.join( ' ' );
}

function writeFile( filePath, content ) {
	fs.mkdirSync( path.dirname( filePath ), { recursive: true } );
	fs.writeFileSync( filePath, content, 'utf8' );
	console.log( `  wrote ${ path.relative( ROOT, filePath ) }` );
}

function generateBlockJson( block ) {
	return `${ JSON.stringify(
		{
			$schema: 'https://schemas.wp.org/trunk/block.json',
			apiVersion: 3,
			name: `blocks-preview/${ block.slug }`,
			version: '0.1.0',
			title: slugToTitle( block.slug ),
			category: 'blocks-preview',
			icon: block.icon,
			example: {},
			attributes: block.attributes,
			supports: { html: false },
			textdomain: 'blocks-preview',
			editorScript: 'file:./index.js',
			editorStyle: 'file:./index.css',
			style: 'file:./style-index.css',
		},
		null,
		'\t'
	) }\n`;
}

function generateIndexJs() {
	return `/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './editor.scss';
import './style.scss';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
} );
`;
}

function generateSaveJs( block ) {
	const saveFields = getSaveFields( block );
	return `/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * @param {import('@wordpress/blocks').BlockSaveProps} props
 */
export default function save( { attributes } ) {
	const { ${ saveFields.destructure } } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<div { ...blockProps }>
			<p className="blocks-preview-component-block__saved-value">
				${ saveFields.output }
			</p>
		</div>
	);
}
`;
}

function getSaveFields( block ) {
	switch ( block.slug ) {
		case 'color-picker':
			return {
				destructure: 'color',
				output: '{ color || \'—\' }',
			};
		case 'combobox-control':
			return {
				destructure: 'label, value',
				output: '{ label }: { value || \'—\' }',
			};
		case 'custom-gradient-picker':
		case 'gradient-picker':
			return {
				destructure: 'value',
				output: '{ value || \'—\' }',
			};
		case 'custom-select-control':
			return {
				destructure: 'label, value',
				output:
					"{ label }: { value?.map( ( item ) => item.name ).join( ', ' ) || '—' }",
			};
		case 'dashicon':
			return {
				destructure: 'icon',
				output: '{ icon }',
			};
		case 'date-time-picker':
			return {
				destructure: 'date',
				output: '{ date || \'—\' }',
			};
		case 'disabled':
			return {
				destructure: 'isDisabled, inputValue',
				output: "{ isDisabled ? 'Disabled' : 'Enabled' }: { inputValue }",
			};
		case 'draggable':
			return {
				destructure: 'dragText, axis',
				output: '{ dragText } ({ axis })',
			};
		case 'drop-zone':
			return {
				destructure: 'lastDrop',
				output: "{ lastDrop || 'No files dropped yet' }",
			};
		case 'dropdown':
			return {
				destructure: 'buttonText, contentText',
				output: '{ buttonText }: { contentText }',
			};
		case 'dropdown-menu':
			return {
				destructure: 'label',
				output: '{ label }',
			};
		case 'duotone-picker':
			return {
				destructure: 'duotone',
				output: "{ duotone?.join( ' / ' ) || '—' }",
			};
		case 'elevation':
			return {
				destructure: 'content, level',
				output: '{ content } (level { level })',
			};
		case 'external-link':
			return {
				destructure: 'linkText, href',
				output: '<a href={ href }>{ linkText }</a>',
			};
		case 'flex':
			return {
				destructure: 'direction, justify, align',
				output: '{ direction } / { justify } / { align }',
			};
		case 'focal-point-picker':
			return {
				destructure: 'focalPoint',
				output:
					"{ focalPoint ? `${ Math.round( focalPoint.x * 100 ) }%, ${ Math.round( focalPoint.y * 100 ) }%` : '—' }",
			};
		case 'font-size-picker':
			return {
				destructure: 'fontSize',
				output: '{ fontSize || \'—\' }',
			};
		case 'form-toggle':
			return {
				destructure: 'label, checked',
				output: '{ label }: { checked ? \'On\' : \'Off\' }',
			};
		case 'form-token-field':
			return {
				destructure: 'tokens',
				output: "{ tokens?.join( ', ' ) || '—' }",
			};
		default:
			return { destructure: '', output: '—' };
	}
}

function generateEditorScss( block ) {
	const extra = block.editorScss ? `\n\n${ block.editorScss }` : '';
	return `@import '../shared/editor';${ extra }\n`;
}

function generateEditJs( block ) {
	const generators = {
		'color-picker': generateColorPickerEdit,
		'combobox-control': generateComboboxControlEdit,
		'custom-gradient-picker': generateCustomGradientPickerEdit,
		'custom-select-control': generateCustomSelectControlEdit,
		dashicon: generateDashiconEdit,
		'date-time-picker': generateDateTimePickerEdit,
		disabled: generateDisabledEdit,
		draggable: generateDraggableEdit,
		'drop-zone': generateDropZoneEdit,
		dropdown: generateDropdownEdit,
		'dropdown-menu': generateDropdownMenuEdit,
		'duotone-picker': generateDuotonePickerEdit,
		elevation: generateElevationEdit,
		'external-link': generateExternalLinkEdit,
		flex: generateFlexEdit,
		'focal-point-picker': generateFocalPointPickerEdit,
		'font-size-picker': generateFontSizePickerEdit,
		'form-toggle': generateFormToggleEdit,
		'form-token-field': generateFormTokenFieldEdit,
		'gradient-picker': generateGradientPickerEdit,
	};

	const generator = generators[ block.slug ];
	if ( ! generator ) {
		throw new Error( `No edit.js generator for ${ block.slug }` );
	}
	return generator( block );
}

function editHeader( block, extraImports = '' ) {
	const resolveImports = block.experimentalFallback
		? `import {
	ComponentUnavailable,
	resolveComponent,
} from '../shared/resolve-component';
`
		: '';
	const colorImport = block.usesColorPalette
		? "import { COMPONENT_COLOR_PALETTE } from '../shared/component-colors';\n"
		: '';

	return `/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
${ extraImports }
/**
 * Internal dependencies
 */
${ colorImport }import { ComponentInspector } from '../shared/component-inspector';
import { getComponentMetadata } from '../shared/component-metadata';
${ resolveImports }import blockJson from './block.json';

const metadata = getComponentMetadata( '${ block.slug }', blockJson );
`;
}

function generateColorPickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { ColorPicker, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { color, enableAlpha } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-color-picker-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ColorPicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ColorPicker documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( 'Enable alpha', 'blocks-preview' ) }
					checked={ enableAlpha }
					onChange={ ( nextEnableAlpha ) =>
						setAttributes( { enableAlpha: nextEnableAlpha } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ColorPicker
					color={ color }
					enableAlpha={ enableAlpha }
					onChange={ ( nextColor ) =>
						setAttributes( { color: nextColor } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateComboboxControlEdit( block ) {
	return `${ editHeader(
		block,
		`import { ComboboxControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, options } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ComboboxControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ComboboxControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ComboboxControl
					label={ label }
					value={ value }
					options={ options }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateCustomGradientPickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { __ } from '@wordpress/i18n';
`
	) }
const CustomGradientPicker = resolveComponent(
	'CustomGradientPicker',
	'__experimentalCustomGradientPicker'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'CustomGradientPicker options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'CustomGradientPicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ CustomGradientPicker ? (
					<CustomGradientPicker
						value={ value }
						onChange={ ( nextValue ) =>
							setAttributes( { value: nextValue } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="CustomGradientPicker" />
				) }
			</div>
		</>
	);
}
`;
}

function generateCustomSelectControlEdit( block ) {
	return `${ editHeader(
		block,
		`import { CustomSelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, options } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'CustomSelectControl options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'CustomSelectControl documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<CustomSelectControl
					label={ label }
					value={ value }
					options={ options }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateDashiconEdit( block ) {
	return `${ editHeader(
		block,
		`import { Dashicon, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { icon } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-dashicon-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Dashicon options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Dashicon documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Icon slug', 'blocks-preview' ) }
					value={ icon }
					help={ __(
						'Use a WordPress Dashicon slug, e.g. admin-generic.',
						'blocks-preview'
					) }
					onChange={ ( nextIcon ) =>
						setAttributes( { icon: nextIcon } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Dashicon icon={ icon } />
				<span>{ icon }</span>
			</div>
		</>
	);
}
`;
}

function generateDateTimePickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { DateTimePicker, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { date, is12Hour } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DateTimePicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DateTimePicker documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( '12-hour clock', 'blocks-preview' ) }
					checked={ is12Hour }
					onChange={ ( nextIs12Hour ) =>
						setAttributes( { is12Hour: nextIs12Hour } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<DateTimePicker
					currentDate={ date }
					is12Hour={ is12Hour }
					onChange={ ( nextDate ) =>
						setAttributes( { date: nextDate } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateDisabledEdit( block ) {
	return `${ editHeader(
		block,
		`import { Disabled, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { isDisabled, inputValue, inputLabel } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Disabled options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Disabled documentation',
					'blocks-preview'
				) }
			>
				<ToggleControl
					label={ __( 'Disabled', 'blocks-preview' ) }
					checked={ isDisabled }
					onChange={ ( nextIsDisabled ) =>
						setAttributes( { isDisabled: nextIsDisabled } )
					}
				/>
				<TextControl
					label={ __( 'Field label', 'blocks-preview' ) }
					value={ inputLabel }
					onChange={ ( nextLabel ) =>
						setAttributes( { inputLabel: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Disabled isDisabled={ isDisabled }>
					<TextControl
						label={ inputLabel }
						value={ inputValue }
						onChange={ ( nextValue ) =>
							setAttributes( { inputValue: nextValue } )
						}
					/>
				</Disabled>
			</div>
		</>
	);
}
`;
}

function generateDraggableEdit( block ) {
	return `${ editHeader(
		block,
		`import { Draggable, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const AXIS_OPTIONS = [
	{ label: __( 'Both', 'blocks-preview' ), value: 'both' },
	{ label: __( 'Horizontal', 'blocks-preview' ), value: 'x' },
	{ label: __( 'Vertical', 'blocks-preview' ), value: 'y' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { axis, dragText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Draggable options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Draggable documentation',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Axis', 'blocks-preview' ) }
					value={ axis }
					options={ AXIS_OPTIONS }
					onChange={ ( nextAxis ) =>
						setAttributes( { axis: nextAxis } )
					}
				/>
				<TextControl
					label={ __( 'Handle text', 'blocks-preview' ) }
					value={ dragText }
					onChange={ ( nextText ) =>
						setAttributes( { dragText: nextText } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Draggable axis={ axis } transferData={ {} }>
					{ ( { onMouseDown, onTouchStart } ) => (
						<div
							className="blocks-preview-draggable-block__handle"
							role="button"
							tabIndex={ 0 }
							aria-label={ dragText }
							onMouseDown={ onMouseDown }
							onTouchStart={ onTouchStart }
						>
							{ dragText }
						</div>
					) }
				</Draggable>
			</div>
		</>
	);
}
`;
}

function generateDropZoneEdit( block ) {
	return `${ editHeader(
		block,
		`import { DropZone, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, lastDrop } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-drop-zone-block',
	} );

	const onDrop = ( files ) => {
		const names = files?.map( ( file ) => file.name ).join( ', ' );
		setAttributes( { lastDrop: names || '' } );
	};

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DropZone options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DropZone documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<p>{ label }</p>
				{ lastDrop ? (
					<p className="blocks-preview-component-block__preview-label">
						{ __( 'Last drop:', 'blocks-preview' ) } { lastDrop }
					</p>
				) : null }
				<DropZone onDrop={ onDrop } />
			</div>
		</>
	);
}
`;
}

function generateDropdownEdit( block ) {
	return `${ editHeader(
		block,
		`import { Button, Dropdown, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, contentText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Dropdown options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Dropdown documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( nextText ) =>
						setAttributes( { buttonText: nextText } )
					}
				/>
				<TextControl
					label={ __( 'Content text', 'blocks-preview' ) }
					value={ contentText }
					onChange={ ( nextContent ) =>
						setAttributes( { contentText: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							variant="secondary"
							onClick={ onToggle }
							aria-expanded={ isOpen }
						>
							{ buttonText }
						</Button>
					) }
					renderContent={ () => <p>{ contentText }</p> }
				/>
			</div>
		</>
	);
}
`;
}

function generateDropdownMenuEdit( block ) {
	return `${ editHeader(
		block,
		`import { DropdownMenu, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	const controls = [
		{
			title: __( 'Edit', 'blocks-preview' ),
			onClick: () => {},
		},
		{
			title: __( 'Duplicate', 'blocks-preview' ),
			onClick: () => {},
		},
		{
			title: __( 'Remove', 'blocks-preview' ),
			onClick: () => {},
		},
	];

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DropdownMenu options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DropdownMenu documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<DropdownMenu
					icon="plus"
					label={ label }
					controls={ controls }
				/>
			</div>
		</>
	);
}
`;
}

function generateDuotonePickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { __ } from '@wordpress/i18n';
`
	) }
const DuotonePicker = resolveComponent(
	'DuotonePicker',
	'__experimentalDuotonePicker'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { duotone } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'DuotonePicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'DuotonePicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ DuotonePicker ? (
					<DuotonePicker
						colorPalette={ COMPONENT_COLOR_PALETTE }
						duotone={ duotone }
						onChange={ ( nextDuotone ) =>
							setAttributes( { duotone: nextDuotone } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="DuotonePicker" />
				) }
			</div>
		</>
	);
}
`;
}

function generateElevationEdit( block ) {
	return `${ editHeader(
		block,
		`import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const Elevation = resolveComponent( 'Elevation', '__experimentalElevation' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { borderRadius, level, content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Elevation options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Elevation documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Border radius', 'blocks-preview' ) }
					value={ borderRadius }
					onChange={ ( nextRadius ) =>
						setAttributes( { borderRadius: nextRadius } )
					}
					min={ 0 }
					max={ 16 }
				/>
				<RangeControl
					label={ __( 'Level', 'blocks-preview' ) }
					value={ level }
					onChange={ ( nextLevel ) =>
						setAttributes( { level: nextLevel } )
					}
					min={ 0 }
					max={ 3 }
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ Elevation ? (
					<Elevation borderRadius={ borderRadius } level={ level }>
						<div className="blocks-preview-elevation-block__content">
							{ content }
						</div>
					</Elevation>
				) : (
					<ComponentUnavailable componentName="Elevation" />
				) }
			</div>
		</>
	);
}
`;
}

function generateExternalLinkEdit( block ) {
	return `${ editHeader(
		block,
		`import { ExternalLink, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { href, linkText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'ExternalLink options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ExternalLink documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Link text', 'blocks-preview' ) }
					value={ linkText }
					onChange={ ( nextText ) =>
						setAttributes( { linkText: nextText } )
					}
				/>
				<TextControl
					label={ __( 'URL', 'blocks-preview' ) }
					value={ href }
					onChange={ ( nextHref ) =>
						setAttributes( { href: nextHref } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ExternalLink href={ href }>{ linkText }</ExternalLink>
			</div>
		</>
	);
}
`;
}

function generateFlexEdit( block ) {
	return `${ editHeader(
		block,
		`import {
	Flex,
	FlexBlock,
	FlexItem,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const DIRECTION_OPTIONS = [
	{ label: __( 'Row', 'blocks-preview' ), value: 'row' },
	{ label: __( 'Column', 'blocks-preview' ), value: 'column' },
];

const JUSTIFY_OPTIONS = [
	{ label: __( 'Flex start', 'blocks-preview' ), value: 'flex-start' },
	{ label: __( 'Center', 'blocks-preview' ), value: 'center' },
	{ label: __( 'Space between', 'blocks-preview' ), value: 'space-between' },
];

const ALIGN_OPTIONS = [
	{ label: __( 'Stretch', 'blocks-preview' ), value: 'stretch' },
	{ label: __( 'Center', 'blocks-preview' ), value: 'center' },
	{ label: __( 'Flex start', 'blocks-preview' ), value: 'flex-start' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { direction, justify, align } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-flex-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Flex options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Flex documentation', 'blocks-preview' ) }
			>
				<SelectControl
					label={ __( 'Direction', 'blocks-preview' ) }
					value={ direction }
					options={ DIRECTION_OPTIONS }
					onChange={ ( nextDirection ) =>
						setAttributes( { direction: nextDirection } )
					}
				/>
				<SelectControl
					label={ __( 'Justify', 'blocks-preview' ) }
					value={ justify }
					options={ JUSTIFY_OPTIONS }
					onChange={ ( nextJustify ) =>
						setAttributes( { justify: nextJustify } )
					}
				/>
				<SelectControl
					label={ __( 'Align', 'blocks-preview' ) }
					value={ align }
					options={ ALIGN_OPTIONS }
					onChange={ ( nextAlign ) =>
						setAttributes( { align: nextAlign } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Flex
					direction={ direction }
					justify={ justify }
					align={ align }
					gap={ 4 }
				>
					<FlexBlock>
						<div className="blocks-preview-flex-block__item">
							{ __( 'FlexBlock', 'blocks-preview' ) }
						</div>
					</FlexBlock>
					<FlexItem>
						<div className="blocks-preview-flex-block__item">
							{ __( 'FlexItem', 'blocks-preview' ) }
						</div>
					</FlexItem>
				</Flex>
			</div>
		</>
	);
}
`;
}

function generateFocalPointPickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { FocalPointPicker, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { url, focalPoint } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'FocalPointPicker options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'FocalPointPicker documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Image URL', 'blocks-preview' ) }
					value={ url }
					onChange={ ( nextUrl ) =>
						setAttributes( { url: nextUrl } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<FocalPointPicker
					url={ url }
					value={ focalPoint }
					onChange={ ( nextFocalPoint ) =>
						setAttributes( { focalPoint: nextFocalPoint } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateFontSizePickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { __ } from '@wordpress/i18n';
`
	) }
const FontSizePicker = resolveComponent(
	'FontSizePicker',
	'__experimentalFontSizePicker'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { fontSize, fontSizes } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FontSizePicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FontSizePicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ FontSizePicker ? (
					<FontSizePicker
						fontSizes={ fontSizes }
						value={ fontSize }
						onChange={ ( nextFontSize ) =>
							setAttributes( { fontSize: nextFontSize } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="FontSizePicker" />
				) }
			</div>
		</>
	);
}
`;
}

function generateFormToggleEdit( block ) {
	return `${ editHeader(
		block,
		`import { FormToggle, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { checked, label } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-form-toggle-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FormToggle options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FormToggle documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<FormToggle
					checked={ checked }
					onChange={ ( nextChecked ) =>
						setAttributes( { checked: nextChecked } )
					}
				/>
				<span>{ label }</span>
			</div>
		</>
	);
}
`;
}

function generateFormTokenFieldEdit( block ) {
	return `${ editHeader(
		block,
		`import { FormTokenField, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, tokens, suggestions } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'FormTokenField options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'FormTokenField documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'Label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<FormTokenField
					label={ label }
					value={ tokens }
					suggestions={ suggestions }
					onChange={ ( nextTokens ) =>
						setAttributes( { tokens: nextTokens } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateGradientPickerEdit( block ) {
	return `${ editHeader(
		block,
		`import { __ } from '@wordpress/i18n';
`
	) }
const GradientPicker = resolveComponent(
	'GradientPicker',
	'__experimentalGradientPicker'
);

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { value } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'GradientPicker options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'GradientPicker documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				{ GradientPicker ? (
					<GradientPicker
						value={ value }
						onChange={ ( nextValue ) =>
							setAttributes( { value: nextValue } )
						}
					/>
				) : (
					<ComponentUnavailable componentName="GradientPicker" />
				) }
			</div>
		</>
	);
}
`;
}

function scaffoldBlock( block ) {
	const blockDir = path.join( SRC, block.slug );
	console.log( `\nScaffolding ${ block.slug }…` );

	writeFile( path.join( blockDir, 'block.json' ), generateBlockJson( block ) );
	writeFile( path.join( blockDir, 'index.js' ), generateIndexJs() );
	writeFile( path.join( blockDir, 'edit.js' ), generateEditJs( block ) );
	writeFile( path.join( blockDir, 'save.js' ), generateSaveJs( block ) );
	writeFile(
		path.join( blockDir, 'editor.scss' ),
		generateEditorScss( block )
	);
	writeFile(
		path.join( blockDir, 'style.scss' ),
		'/* Front-end block styles (none required for this preview). */\n'
	);
}

function updateComponentsConfig() {
	const configPath = path.join( SRC, 'components-config.json' );
	const config = JSON.parse( fs.readFileSync( configPath, 'utf8' ) );

	for ( const block of BLOCKS ) {
		config[ block.slug ] = {
			experimental: false,
			deprecated: false,
			description: block.description,
			documentation: `https://developer.wordpress.org/block-editor/reference-guides/components/${ block.slug }/`,
		};
	}

	fs.writeFileSync( configPath, `${ JSON.stringify( config, null, '\t' ) }\n` );
	console.log( '\nUpdated src/components-config.json' );
}

function updatePluginPhp() {
	const phpPath = path.join( ROOT, 'blocks-preview-plugin.php' );
	let php = fs.readFileSync( phpPath, 'utf8' );

	php = php.replace(
		/Version:\s+[\d.]+/,
		'Version:           0.3.0'
	);

	const slugsToAdd = BLOCKS.map( ( block ) => `\t'${ block.slug }',` ).join(
		'\n'
	);
	php = php.replace(
		/(const BLOCKS_PREVIEW_BLOCK_SLUGS = array\([\s\S]*?'color-palette',)\n(\);)/,
		`$1\n${ slugsToAdd }\n$2`
	);

	fs.writeFileSync( phpPath, php );
	console.log( 'Updated blocks-preview-plugin.php (version 0.3.0)' );
}

function updateReadme() {
	const readmePath = path.join( ROOT, 'README.md' );
	let readme = fs.readFileSync( readmePath, 'utf8' );

	const rows = BLOCKS.map( ( block ) => {
		const title = slugToTitle( block.slug );
		const url = `https://developer.wordpress.org/block-editor/reference-guides/components/${ block.slug }/`;
		return `| ${ title } | [${ block.component }](${ url }) |`;
	} ).join( '\n' );

	readme = readme.replace(
		/(\| Color Palette \| \[ColorPalette\].*\|\n)/,
		`$1${ rows }\n`
	);

	fs.writeFileSync( readmePath, readme );
	console.log( 'Updated README.md' );
}

console.log( 'Scaffolding 20 blocks after color-palette…' );

for ( const block of BLOCKS ) {
	scaffoldBlock( block );
}

updateComponentsConfig();
updatePluginPhp();
updateReadme();

console.log( '\nDone. Run npm run build to compile blocks.' );
