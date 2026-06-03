#!/usr/bin/env node
/**
 * Scaffolds 20 WordPress component preview blocks after gradient-picker.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const SRC = path.join( ROOT, 'src' );

const BLOCKS = [
	{
		slug: 'guide',
		component: 'Guide',
		icon: 'info',
		description:
			'Guide is a React component that displays user tips in a stepped sequence, using GuidePage for each step.',
		attributes: {
			pageCount: { type: 'number', default: 2 },
			page1Content: {
				type: 'string',
				default: 'Welcome to the first guide step.',
			},
			page2Content: {
				type: 'string',
				default: 'This is the second guide step.',
			},
		},
	},
	{
		slug: 'heading',
		component: 'Heading',
		icon: 'heading',
		experimentalFallback: '__experimentalHeading',
		description:
			'Heading renders semantic heading text with consistent typography styles for a given level.',
		attributes: {
			level: { type: 'number', default: 2 },
			content: { type: 'string', default: 'Sample heading' },
		},
	},
	{
		slug: 'h-stack',
		component: 'HStack',
		icon: 'columns',
		experimentalFallback: '__experimentalHStack',
		description:
			'HStack is a horizontal layout component that arranges children in a row with consistent spacing.',
		attributes: {
			spacing: { type: 'number', default: 4 },
			item1: { type: 'string', default: 'First item' },
			item2: { type: 'string', default: 'Second item' },
		},
		editorScss: `.blocks-preview-h-stack-block__item {
	padding: 8px 12px;
	background: #f0f0f0;
	border-radius: 2px;
}`,
	},
	{
		slug: 'icon',
		component: 'Icon',
		icon: 'star-filled',
		description:
			'Icon renders an SVG icon from the WordPress icons library with consistent sizing.',
		attributes: {
			size: { type: 'number', default: 24 },
		},
	},
	{
		slug: 'input-control',
		component: 'InputControl',
		icon: 'edit',
		description:
			'InputControl is a text input component with built-in label, help, and error handling.',
		attributes: {
			label: { type: 'string', default: 'Name' },
			value: { type: 'string', default: 'Sample value' },
			help: { type: 'string', default: 'Enter your name.' },
		},
	},
	{
		slug: 'menu-group',
		component: 'MenuGroup',
		icon: 'menu',
		description:
			'MenuGroup groups related MenuItem components under a shared label in a menu.',
		attributes: {
			label: { type: 'string', default: 'Actions' },
			item1: { type: 'string', default: 'Edit' },
			item2: { type: 'string', default: 'Duplicate' },
		},
	},
	{
		slug: 'menu-item',
		component: 'MenuItem',
		icon: 'menu-alt',
		description:
			'MenuItem represents a single actionable item within a menu or menu group.',
		attributes: {
			label: { type: 'string', default: 'Menu item' },
		},
	},
	{
		slug: 'menu-items-choice',
		component: 'MenuItemsChoice',
		icon: 'yes',
		description:
			'MenuItemsChoice renders a set of mutually exclusive (or multiple) choices inside a menu.',
		attributes: {
			selected: { type: 'string', default: 'small' },
			choices: {
				type: 'array',
				default: [
					{ value: 'small', label: 'Small' },
					{ value: 'medium', label: 'Medium' },
					{ value: 'large', label: 'Large' },
				],
			},
		},
	},
	{
		slug: 'modal',
		component: 'Modal',
		icon: 'fullscreen-alt',
		description:
			'Modal displays content in an overlay dialog that traps focus until dismissed.',
		attributes: {
			title: { type: 'string', default: 'Modal title' },
			content: {
				type: 'string',
				default: 'Modal body content goes here.',
			},
			buttonText: { type: 'string', default: 'Open modal' },
		},
	},
	{
		slug: 'navigable-menu',
		component: 'NavigableMenu',
		icon: 'menu',
		description:
			'NavigableMenu is a menu container that supports keyboard navigation between items.',
		attributes: {
			item1: { type: 'string', default: 'First item' },
			item2: { type: 'string', default: 'Second item' },
			item3: { type: 'string', default: 'Third item' },
		},
	},
	{
		slug: 'navigator',
		component: 'Navigator',
		icon: 'admin-links',
		description:
			'Navigator provides a stack-based navigation pattern with screens and transitions between views.',
		attributes: {
			homeLabel: { type: 'string', default: 'Home screen' },
			detailLabel: { type: 'string', default: 'Detail screen' },
			navigateLabel: { type: 'string', default: 'Go to detail' },
		},
		editorScss: `.blocks-preview-navigator-block {
	min-height: 120px;
}`,
	},
	{
		slug: 'notice',
		component: 'Notice',
		icon: 'info',
		description:
			'Notice displays a dismissible admin-style message with status variants (success, warning, error, info).',
		attributes: {
			status: { type: 'string', default: 'info' },
			content: {
				type: 'string',
				default: 'This is an informational notice.',
			},
			isDismissible: { type: 'boolean', default: true },
		},
	},
	{
		slug: 'notice-list',
		component: 'NoticeList',
		icon: 'list-view',
		description:
			'NoticeList renders a collection of Notice components with shared remove handling.',
		attributes: {
			notices: {
				type: 'array',
				default: [
					{
						id: 'notice-1',
						content: 'First notice in the list.',
						status: 'info',
					},
					{
						id: 'notice-2',
						content: 'Second notice in the list.',
						status: 'success',
					},
				],
			},
		},
	},
	{
		slug: 'panel',
		component: 'Panel',
		icon: 'layout',
		description:
			'Panel is a container for grouped settings UI, typically composed of PanelBody and PanelRow children.',
		attributes: {
			panelTitle: { type: 'string', default: 'Panel section' },
			panelRowContent: {
				type: 'string',
				default: 'Panel row content.',
			},
		},
		editorScss: `.blocks-preview-panel-block .components-panel {
	margin: 0;
}`,
	},
	{
		slug: 'placeholder',
		component: 'Placeholder',
		icon: 'format-image',
		description:
			'Placeholder renders an empty-state container with icon, label, and instructions for setup flows.',
		attributes: {
			label: { type: 'string', default: 'No content yet' },
			instructions: {
				type: 'string',
				default: 'Add content to get started.',
			},
			buttonText: { type: 'string', default: 'Add content' },
		},
	},
	{
		slug: 'popover',
		component: 'Popover',
		icon: 'admin-comments',
		description:
			'Popover displays floating content anchored to a trigger element, such as a button.',
		attributes: {
			buttonText: { type: 'string', default: 'Toggle popover' },
			content: {
				type: 'string',
				default: 'Popover content goes here.',
			},
		},
	},
	{
		slug: 'progress-bar',
		component: 'ProgressBar',
		icon: 'controls-play',
		description:
			'ProgressBar displays progress toward completion as a horizontal bar.',
		attributes: {
			value: { type: 'number', default: 0.5 },
		},
	},
	{
		slug: 'query-controls',
		component: 'QueryControls',
		icon: 'filter',
		description:
			'QueryControls provides controls for ordering and sorting query results in block interfaces.',
		attributes: {
			orderBy: { type: 'string', default: 'date' },
			order: { type: 'string', default: 'desc' },
			numberOfItems: { type: 'number', default: 10 },
		},
	},
	{
		slug: 'radio-control',
		component: 'RadioControl',
		icon: 'marker',
		description:
			'RadioControl allows users to select a single option from a set of radio buttons.',
		attributes: {
			label: { type: 'string', default: 'Size' },
			selected: { type: 'string', default: 'medium' },
			options: {
				type: 'array',
				default: [
					{ label: 'Small', value: 'small' },
					{ label: 'Medium', value: 'medium' },
					{ label: 'Large', value: 'large' },
				],
			},
		},
	},
	{
		slug: 'range-control',
		component: 'RangeControl',
		icon: 'leftright',
		description:
			'RangeControl lets users select a numeric value within a range using a slider.',
		attributes: {
			label: { type: 'string', default: 'Opacity' },
			value: { type: 'number', default: 50 },
			min: { type: 'number', default: 0 },
			max: { type: 'number', default: 100 },
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

function getSaveFields( block ) {
	switch ( block.slug ) {
		case 'guide':
			return {
				destructure: 'pageCount',
				output: '{ pageCount } pages',
			};
		case 'heading':
			return {
				destructure: 'content, level',
				output: 'h{ level }: { content }',
			};
		case 'h-stack':
			return {
				destructure: 'item1, item2',
				output: '{ item1 } · { item2 }',
			};
		case 'icon':
			return {
				destructure: 'size',
				output: 'Icon ({ size }px)',
			};
		case 'input-control':
			return {
				destructure: 'label, value',
				output: '{ label }: { value || \'—\' }',
			};
		case 'menu-group':
			return {
				destructure: 'label, item1, item2',
				output: '{ label }: { item1 }, { item2 }',
			};
		case 'menu-item':
			return {
				destructure: 'label',
				output: '{ label }',
			};
		case 'menu-items-choice':
			return {
				destructure: 'selected',
				output: '{ selected || \'—\' }',
			};
		case 'modal':
			return {
				destructure: 'title, content',
				output: '{ title }: { content }',
			};
		case 'navigable-menu':
			return {
				destructure: 'item1, item2, item3',
				output: '{ item1 } · { item2 } · { item3 }',
			};
		case 'navigator':
			return {
				destructure: 'homeLabel, detailLabel',
				output: '{ homeLabel } → { detailLabel }',
			};
		case 'notice':
			return {
				destructure: 'status, content',
				output: '[{ status }] { content }',
			};
		case 'notice-list':
			return {
				destructure: 'notices',
				output: '{ notices?.length ?? 0 } notices',
			};
		case 'panel':
			return {
				destructure: 'panelTitle, panelRowContent',
				output: '{ panelTitle }: { panelRowContent }',
			};
		case 'placeholder':
			return {
				destructure: 'label, instructions',
				output: '{ label }: { instructions }',
			};
		case 'popover':
			return {
				destructure: 'buttonText, content',
				output: '{ buttonText }: { content }',
			};
		case 'progress-bar':
			return {
				destructure: 'value',
				output: '{ Math.round( value * 100 ) }%',
			};
		case 'query-controls':
			return {
				destructure: 'orderBy, order, numberOfItems',
				output: '{ orderBy } / { order } / { numberOfItems }',
			};
		case 'radio-control':
			return {
				destructure: 'label, selected',
				output: '{ label }: { selected || \'—\' }',
			};
		case 'range-control':
			return {
				destructure: 'label, value',
				output: '{ label }: { value }',
			};
		default:
			return { destructure: '', output: '—' };
	}
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

function generateEditorScss( block ) {
	const extra = block.editorScss ? `\n\n${ block.editorScss }` : '';
	return `@import '../shared/editor';${ extra }\n`;
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

function generateGuideEdit( block ) {
	return `${ editHeader(
		block,
		`import { Guide, GuidePage, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { pageCount, page1Content, page2Content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Guide options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Guide documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Page count', 'blocks-preview' ) }
					value={ pageCount }
					onChange={ ( nextCount ) =>
						setAttributes( { pageCount: nextCount } )
					}
					min={ 1 }
					max={ 2 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Guide pageCount={ pageCount }>
					<GuidePage pageNumber={ 1 }>
						<p>{ page1Content }</p>
					</GuidePage>
					{ pageCount > 1 ? (
						<GuidePage pageNumber={ 2 }>
							<p>{ page2Content }</p>
						</GuidePage>
					) : null }
				</Guide>
			</div>
		</>
	);
}
`;
}

function generateHeadingEdit( block ) {
	return `${ editHeader(
		block,
		`import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const Heading = resolveComponent( 'Heading', '__experimentalHeading' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { level, content } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Heading options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Heading documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Level', 'blocks-preview' ) }
					value={ level }
					onChange={ ( nextLevel ) =>
						setAttributes( { level: nextLevel } )
					}
					min={ 1 }
					max={ 6 }
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
				{ Heading ? (
					<Heading level={ level }>{ content }</Heading>
				) : (
					<ComponentUnavailable componentName="Heading" />
				) }
			</div>
		</>
	);
}
`;
}

function generateHStackEdit( block ) {
	return `${ editHeader(
		block,
		`import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const HStack = resolveComponent( 'HStack', '__experimentalHStack' );

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { spacing, item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-h-stack-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'HStack options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'HStack documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Spacing', 'blocks-preview' ) }
					value={ spacing }
					onChange={ ( nextSpacing ) =>
						setAttributes( { spacing: nextSpacing } )
					}
					min={ 0 }
					max={ 12 }
				/>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( nextItem ) =>
						setAttributes( { item1: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( nextItem ) =>
						setAttributes( { item2: nextItem } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				{ HStack ? (
					<HStack spacing={ spacing }>
						<span className="blocks-preview-h-stack-block__item">
							{ item1 }
						</span>
						<span className="blocks-preview-h-stack-block__item">
							{ item2 }
						</span>
					</HStack>
				) : (
					<ComponentUnavailable componentName="HStack" />
				) }
			</div>
		</>
	);
}
`;
}

function generateIconEdit( block ) {
	return `${ editHeader(
		block,
		`import { Icon, RangeControl } from '@wordpress/components';
import { check } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { size } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Icon options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Icon documentation', 'blocks-preview' ) }
			>
				<RangeControl
					label={ __( 'Size', 'blocks-preview' ) }
					value={ size }
					onChange={ ( nextSize ) =>
						setAttributes( { size: nextSize } )
					}
					min={ 16 }
					max={ 48 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Icon icon={ check } size={ size } />
			</div>
		</>
	);
}
`;
}

function generateInputControlEdit( block ) {
	return `${ editHeader(
		block,
		`import { InputControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, help } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'InputControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'InputControl documentation',
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
				<TextControl
					label={ __( 'Help text', 'blocks-preview' ) }
					value={ help }
					onChange={ ( nextHelp ) =>
						setAttributes( { help: nextHelp } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<InputControl
					label={ label }
					help={ help }
					value={ value }
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

function generateMenuGroupEdit( block ) {
	return `${ editHeader(
		block,
		`import { MenuGroup, MenuItem, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, item1, item2 } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'MenuGroup options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'MenuGroup documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Group label', 'blocks-preview' ) }
					value={ label }
					onChange={ ( nextLabel ) =>
						setAttributes( { label: nextLabel } )
					}
				/>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( nextItem ) =>
						setAttributes( { item1: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( nextItem ) =>
						setAttributes( { item2: nextItem } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<MenuGroup label={ label }>
					<MenuItem onClick={ () => {} }>{ item1 }</MenuItem>
					<MenuItem onClick={ () => {} }>{ item2 }</MenuItem>
				</MenuGroup>
			</div>
		</>
	);
}
`;
}

function generateMenuItemEdit( block ) {
	return `${ editHeader(
		block,
		`import { MenuItem, TextControl } from '@wordpress/components';
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

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'MenuItem options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'MenuItem documentation', 'blocks-preview' ) }
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
				<MenuItem onClick={ () => {} }>{ label }</MenuItem>
			</div>
		</>
	);
}
`;
}

function generateMenuItemsChoiceEdit( block ) {
	return `${ editHeader(
		block,
		`import { MenuItemsChoice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { selected, choices } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __(
					'MenuItemsChoice options',
					'blocks-preview'
				) }
				docsLinkLabel={ __(
					'MenuItemsChoice documentation',
					'blocks-preview'
				) }
			/>

			<div { ...blockProps }>
				<MenuItemsChoice
					choices={ choices }
					value={ selected }
					onSelect={ ( nextSelected ) =>
						setAttributes( { selected: nextSelected } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateModalEdit( block ) {
	return `${ editHeader(
		block,
		`import { Button, Modal, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, content, buttonText } = attributes;
	const [ isOpen, setIsOpen ] = useState( false );

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Modal options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Modal documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Title', 'blocks-preview' ) }
					value={ title }
					onChange={ ( nextTitle ) =>
						setAttributes( { title: nextTitle } )
					}
				/>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( nextText ) =>
						setAttributes( { buttonText: nextText } )
					}
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
				<Button variant="primary" onClick={ () => setIsOpen( true ) }>
					{ buttonText }
				</Button>
				{ isOpen ? (
					<Modal
						title={ title }
						onRequestClose={ () => setIsOpen( false ) }
					>
						<p>{ content }</p>
					</Modal>
				) : null }
			</div>
		</>
	);
}
`;
}

function generateNavigableMenuEdit( block ) {
	return `${ editHeader(
		block,
		`import { MenuItem, NavigableMenu, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { item1, item2, item3 } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'NavigableMenu options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'NavigableMenu documentation',
					'blocks-preview'
				) }
			>
				<TextControl
					label={ __( 'First item', 'blocks-preview' ) }
					value={ item1 }
					onChange={ ( nextItem ) =>
						setAttributes( { item1: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Second item', 'blocks-preview' ) }
					value={ item2 }
					onChange={ ( nextItem ) =>
						setAttributes( { item2: nextItem } )
					}
				/>
				<TextControl
					label={ __( 'Third item', 'blocks-preview' ) }
					value={ item3 }
					onChange={ ( nextItem ) =>
						setAttributes( { item3: nextItem } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<NavigableMenu>
					<MenuItem onClick={ () => {} }>{ item1 }</MenuItem>
					<MenuItem onClick={ () => {} }>{ item2 }</MenuItem>
					<MenuItem onClick={ () => {} }>{ item3 }</MenuItem>
				</NavigableMenu>
			</div>
		</>
	);
}
`;
}

function generateNavigatorEdit( block ) {
	return `${ editHeader(
		block,
		`import { Navigator, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
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
				docsLinkLabel={ __( 'Navigator documentation', 'blocks-preview' ) }
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
`;
}

function generateNoticeEdit( block ) {
	return `${ editHeader(
		block,
		`import { Notice, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const STATUS_OPTIONS = [
	{ label: __( 'Info', 'blocks-preview' ), value: 'info' },
	{ label: __( 'Success', 'blocks-preview' ), value: 'success' },
	{ label: __( 'Warning', 'blocks-preview' ), value: 'warning' },
	{ label: __( 'Error', 'blocks-preview' ), value: 'error' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { status, content, isDismissible } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Notice options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Notice documentation', 'blocks-preview' ) }
			>
				<SelectControl
					label={ __( 'Status', 'blocks-preview' ) }
					value={ status }
					options={ STATUS_OPTIONS }
					onChange={ ( nextStatus ) =>
						setAttributes( { status: nextStatus } )
					}
				/>
				<TextControl
					label={ __( 'Content', 'blocks-preview' ) }
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
				/>
				<ToggleControl
					label={ __( 'Dismissible', 'blocks-preview' ) }
					checked={ isDismissible }
					onChange={ ( nextDismissible ) =>
						setAttributes( { isDismissible: nextDismissible } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Notice
					status={ status }
					isDismissible={ isDismissible }
					onRemove={ isDismissible ? () => {} : undefined }
				>
					{ content }
				</Notice>
			</div>
		</>
	);
}
`;
}

function generateNoticeListEdit( block ) {
	return `${ editHeader(
		block,
		`import { NoticeList } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
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
`;
}

function generatePanelEdit( block ) {
	return `${ editHeader(
		block,
		`import { Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { panelTitle, panelRowContent } = attributes;

	const blockProps = useBlockProps( {
		className:
			'blocks-preview-component-block blocks-preview-panel-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Panel options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Panel documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Panel body title', 'blocks-preview' ) }
					value={ panelTitle }
					onChange={ ( nextTitle ) =>
						setAttributes( { panelTitle: nextTitle } )
					}
				/>
				<TextControl
					label={ __( 'Panel row content', 'blocks-preview' ) }
					value={ panelRowContent }
					onChange={ ( nextContent ) =>
						setAttributes( { panelRowContent: nextContent } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Panel>
					<PanelBody title={ panelTitle } initialOpen>
						<PanelRow>{ panelRowContent }</PanelRow>
					</PanelBody>
				</Panel>
			</div>
		</>
	);
}
`;
}

function generatePlaceholderEdit( block ) {
	return `${ editHeader(
		block,
		`import { Button, Placeholder, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, instructions, buttonText } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Placeholder options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'Placeholder documentation',
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
				<TextControl
					label={ __( 'Instructions', 'blocks-preview' ) }
					value={ instructions }
					onChange={ ( nextInstructions ) =>
						setAttributes( { instructions: nextInstructions } )
					}
				/>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( nextText ) =>
						setAttributes( { buttonText: nextText } )
					}
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<Placeholder
					icon="admin-post"
					label={ label }
					instructions={ instructions }
				>
					<Button variant="primary">{ buttonText }</Button>
				</Placeholder>
			</div>
		</>
	);
}
`;
}

function generatePopoverEdit( block ) {
	return `${ editHeader(
		block,
		`import { Button, Popover, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, content } = attributes;
	const [ isOpen, setIsOpen ] = useState( false );

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'Popover options', 'blocks-preview' ) }
				docsLinkLabel={ __( 'Popover documentation', 'blocks-preview' ) }
			>
				<TextControl
					label={ __( 'Button text', 'blocks-preview' ) }
					value={ buttonText }
					onChange={ ( nextText ) =>
						setAttributes( { buttonText: nextText } )
					}
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
				<Button
					variant="secondary"
					onClick={ () => setIsOpen( ! isOpen ) }
					aria-expanded={ isOpen }
				>
					{ buttonText }
				</Button>
				{ isOpen ? (
					<Popover onClose={ () => setIsOpen( false ) }>
						<div style={ { padding: '16px', minWidth: '200px' } }>
							<p>{ content }</p>
						</div>
					</Popover>
				) : null }
			</div>
		</>
	);
}
`;
}

function generateProgressBarEdit( block ) {
	return `${ editHeader(
		block,
		`import { ProgressBar, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
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
				panelTitle={ __( 'ProgressBar options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'ProgressBar documentation',
					'blocks-preview'
				) }
			>
				<RangeControl
					label={ __( 'Value', 'blocks-preview' ) }
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
					min={ 0 }
					max={ 1 }
					step={ 0.05 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<ProgressBar value={ value } />
			</div>
		</>
	);
}
`;
}

function generateQueryControlsEdit( block ) {
	return `${ editHeader(
		block,
		`import { QueryControls, RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
const ORDER_BY_OPTIONS = [
	{ label: __( 'Date', 'blocks-preview' ), value: 'date' },
	{ label: __( 'Title', 'blocks-preview' ), value: 'title' },
	{ label: __( 'ID', 'blocks-preview' ), value: 'id' },
];

const ORDER_OPTIONS = [
	{ label: __( 'Descending', 'blocks-preview' ), value: 'desc' },
	{ label: __( 'Ascending', 'blocks-preview' ), value: 'asc' },
];

/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orderBy, order, numberOfItems } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'QueryControls options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'QueryControls documentation',
					'blocks-preview'
				) }
			>
				<SelectControl
					label={ __( 'Order by', 'blocks-preview' ) }
					value={ orderBy }
					options={ ORDER_BY_OPTIONS }
					onChange={ ( nextOrderBy ) =>
						setAttributes( { orderBy: nextOrderBy } )
					}
				/>
				<SelectControl
					label={ __( 'Order', 'blocks-preview' ) }
					value={ order }
					options={ ORDER_OPTIONS }
					onChange={ ( nextOrder ) =>
						setAttributes( { order: nextOrder } )
					}
				/>
				<RangeControl
					label={ __( 'Number of items', 'blocks-preview' ) }
					value={ numberOfItems }
					onChange={ ( nextCount ) =>
						setAttributes( { numberOfItems: nextCount } )
					}
					min={ 1 }
					max={ 20 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<QueryControls
					orderBy={ orderBy }
					order={ order }
					numberOfItems={ numberOfItems }
					onOrderByChange={ ( nextOrderBy ) =>
						setAttributes( { orderBy: nextOrderBy } )
					}
					onOrderChange={ ( nextOrder ) =>
						setAttributes( { order: nextOrder } )
					}
					onNumberOfItemsChange={ ( nextCount ) =>
						setAttributes( { numberOfItems: nextCount } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateRadioControlEdit( block ) {
	return `${ editHeader(
		block,
		`import { RadioControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, selected, options } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'RadioControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'RadioControl documentation',
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
				<RadioControl
					label={ label }
					selected={ selected }
					options={ options }
					onChange={ ( nextSelected ) =>
						setAttributes( { selected: nextSelected } )
					}
				/>
			</div>
		</>
	);
}
`;
}

function generateRangeControlEdit( block ) {
	return `${ editHeader(
		block,
		`import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
	) }
/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
export default function Edit( { attributes, setAttributes } ) {
	const { label, value, min, max } = attributes;

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( 'RangeControl options', 'blocks-preview' ) }
				docsLinkLabel={ __(
					'RangeControl documentation',
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
				<RangeControl
					label={ __( 'Minimum', 'blocks-preview' ) }
					value={ min }
					onChange={ ( nextMin ) =>
						setAttributes( { min: nextMin } )
					}
					min={ 0 }
					max={ 100 }
				/>
				<RangeControl
					label={ __( 'Maximum', 'blocks-preview' ) }
					value={ max }
					onChange={ ( nextMax ) =>
						setAttributes( { max: nextMax } )
					}
					min={ 0 }
					max={ 100 }
				/>
			</ComponentInspector>

			<div { ...blockProps }>
				<RangeControl
					label={ label }
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( { value: nextValue } )
					}
					min={ min }
					max={ max }
				/>
			</div>
		</>
	);
}
`;
}

function generateEditJs( block ) {
	const generators = {
		guide: generateGuideEdit,
		heading: generateHeadingEdit,
		'h-stack': generateHStackEdit,
		icon: generateIconEdit,
		'input-control': generateInputControlEdit,
		'menu-group': generateMenuGroupEdit,
		'menu-item': generateMenuItemEdit,
		'menu-items-choice': generateMenuItemsChoiceEdit,
		modal: generateModalEdit,
		'navigable-menu': generateNavigableMenuEdit,
		navigator: generateNavigatorEdit,
		notice: generateNoticeEdit,
		'notice-list': generateNoticeListEdit,
		panel: generatePanelEdit,
		placeholder: generatePlaceholderEdit,
		popover: generatePopoverEdit,
		'progress-bar': generateProgressBarEdit,
		'query-controls': generateQueryControlsEdit,
		'radio-control': generateRadioControlEdit,
		'range-control': generateRangeControlEdit,
	};

	const generator = generators[ block.slug ];
	if ( ! generator ) {
		throw new Error( `No edit.js generator for ${ block.slug }` );
	}
	return generator( block );
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
	writeFile( path.join( blockDir, 'style.scss' ), '' );
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
		'Version:           0.4.0'
	);

	const slugsToAdd = BLOCKS.map( ( block ) => `\t'${ block.slug }',` ).join(
		'\n'
	);
	php = php.replace(
		/(const BLOCKS_PREVIEW_BLOCK_SLUGS = array\([\s\S]*?'gradient-picker',)\n(\);)/,
		`$1\n${ slugsToAdd }\n$2`
	);

	fs.writeFileSync( phpPath, php );
	console.log( 'Updated blocks-preview-plugin.php (version 0.4.0)' );
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
		/(\| Gradient Picker \| \[GradientPicker\].*\|\n)/,
		`$1${ rows }\n`
	);

	fs.writeFileSync( readmePath, readme );
	console.log( 'Updated README.md' );
}

console.log( 'Scaffolding 20 blocks after gradient-picker…' );

for ( const block of BLOCKS ) {
	scaffoldBlock( block );
}

updateComponentsConfig();
updatePluginPhp();
updateReadme();

console.log( '\nDone. Run npm run build to compile blocks.' );
