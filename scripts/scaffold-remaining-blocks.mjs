#!/usr/bin/env node
/**
 * Scaffolds the remaining 50 WordPress component preview blocks after range-control.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDIT_GENERATORS } from './scaffold-remaining-edits.mjs';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const SRC = path.join( ROOT, 'src' );

const BLOCKS = [
	{
		slug: 'badge',
		component: 'Badge',
		icon: 'tag',
		experimental: true,
		description:
			'Badge displays a compact label for status, counts, or metadata alongside other UI.',
		attributes: {
			label: { type: 'string', default: 'New' },
			intent: { type: 'string', default: 'default' },
		},
		editorScss: `.blocks-preview-badge-block__badge {
	display: inline-block;
	padding: 2px 8px;
	border-radius: 999px;
	background: #f0f0f0;
	font-size: 12px;
}
.blocks-preview-badge-block__badge.is-info { background: #e5f5fa; color: #007cba; }
.blocks-preview-badge-block__badge.is-success { background: #edfaef; color: #008a20; }
.blocks-preview-badge-block__badge.is-warning { background: #fcf9e8; color: #996800; }
.blocks-preview-badge-block__badge.is-error { background: #fcebea; color: #cc1818; }`,
	},
	{
		slug: 'calendar',
		component: 'DateCalendar',
		icon: 'calendar-alt',
		description:
			'Calendar components let users pick dates from a month grid or date range.',
		attributes: {
			selectedDate: { type: 'string', default: '2026-06-03' },
		},
	},
	{
		slug: 'circular-option-picker',
		component: 'CircularOptionPicker',
		icon: 'art',
		experimental: true,
		description:
			'CircularOptionPicker renders circular options, commonly used for color or style swatches.',
		attributes: {
			selectedColor: { type: 'string', default: '#3858e9' },
		},
		editorScss: `.blocks-preview-circular-option-picker-block__options {
	display: flex;
	gap: 8px;
}
.blocks-preview-circular-option-picker-block__option {
	padding: 0;
	border: 2px solid transparent;
	border-radius: 50%;
	background: none;
	cursor: pointer;
}
.blocks-preview-circular-option-picker-block__option.is-selected {
	border-color: #3858e9;
}`,
	},
	{
		slug: 'composite',
		component: 'Composite',
		icon: 'grid-view',
		description:
			'Composite provides roving tabindex and keyboard navigation for grouped interactive items.',
		attributes: {
			item1: { type: 'string', default: 'First item' },
			item2: { type: 'string', default: 'Second item' },
		},
	},
	{
		slug: 'confirm-dialog',
		component: 'ConfirmDialog',
		icon: 'warning',
		experimental: true,
		experimentalFallback: '__experimentalConfirmDialog',
		description:
			'ConfirmDialog asks users to confirm or cancel a destructive or important action.',
		attributes: {
			title: { type: 'string', default: 'Delete item?' },
			message: {
				type: 'string',
				default: 'This action cannot be undone.',
			},
			buttonText: { type: 'string', default: 'Open confirm dialog' },
		},
	},
	{
		slug: 'custom-select-control-v2',
		component: 'CustomSelectControlV2',
		icon: 'editor-ul',
		experimental: true,
		description:
			'CustomSelectControlV2 is the underlying select implementation used by CustomSelectControl.',
		attributes: {
			label: { type: 'string', default: 'Status' },
			value: { type: 'string', default: 'draft' },
			options: {
				type: 'array',
				default: [
					{ key: 'draft', name: 'Draft' },
					{ key: 'published', name: 'Published' },
				],
			},
		},
	},
	{
		slug: 'divider',
		component: 'Divider',
		icon: 'minus',
		experimental: true,
		experimentalFallback: '__experimentalDivider',
		description:
			'Divider renders a horizontal or vertical rule to separate content sections.',
		attributes: {
			orientation: { type: 'string', default: 'horizontal' },
		},
	},
	{
		slug: 'focusable-iframe',
		component: 'FocusableIframe',
		icon: 'media-code',
		description:
			'FocusableIframe renders an iframe that can receive keyboard focus within the editor.',
		attributes: {
			src: {
				type: 'string',
				default: 'https://wordpress.org',
			},
			title: { type: 'string', default: 'Embedded content' },
		},
	},
	{
		slug: 'form-file-upload',
		component: 'FormFileUpload',
		icon: 'upload',
		description:
			'FormFileUpload renders a button that opens a file picker for uploading files.',
		attributes: {
			label: { type: 'string', default: 'Upload file' },
			accept: { type: 'string', default: 'image/*' },
		},
	},
	{
		slug: 'grid',
		component: 'Grid',
		icon: 'grid-view',
		experimental: true,
		experimentalFallback: '__experimentalGrid',
		description:
			'Grid is a layout component that arranges children in a responsive CSS grid.',
		attributes: {
			columns: { type: 'number', default: 2 },
			item1: { type: 'string', default: 'Cell one' },
			item2: { type: 'string', default: 'Cell two' },
		},
		editorScss: `.blocks-preview-grid-block__cell {
	padding: 8px 12px;
	background: #f0f0f0;
	border-radius: 2px;
}`,
	},
	{
		slug: 'higher-order',
		component: 'withNotices',
		icon: 'admin-tools',
		description:
			'Higher-order components are utility wrappers (for example withNotices) rather than visual UI on their own.',
		attributes: {
			hocName: { type: 'string', default: 'withNotices' },
		},
	},
	{
		slug: 'isolated-event-container',
		component: 'IsolatedEventContainer',
		icon: 'shield',
		description:
			'IsolatedEventContainer stops event propagation from its children to parent handlers.',
		attributes: {
			label: { type: 'string', default: 'Click inside (isolated)' },
		},
	},
	{
		slug: 'item-group',
		component: 'ItemGroup',
		icon: 'list-view',
		experimental: true,
		experimentalFallback: '__experimentalItemGroup',
		description:
			'ItemGroup groups related Item components with consistent spacing and semantics.',
		attributes: {
			item1: { type: 'string', default: 'First item' },
			item2: { type: 'string', default: 'Second item' },
		},
	},
	{
		slug: 'keyboard-shortcuts',
		component: 'KeyboardShortcuts',
		icon: 'keyboard',
		description:
			'KeyboardShortcuts registers keyboard shortcuts and displays them in a help dialog.',
		attributes: {
			shortcutName: { type: 'string', default: 'mod+k' },
			shortcutLabel: { type: 'string', default: 'Open command palette' },
		},
	},
	{
		slug: 'menu',
		component: 'DropdownMenu',
		icon: 'menu',
		description:
			'Menu patterns combine menu containers and items for actionable lists.',
		attributes: {
			label: { type: 'string', default: 'Actions' },
			item1: { type: 'string', default: 'Edit' },
			item2: { type: 'string', default: 'Duplicate' },
		},
	},
	{
		slug: 'mobile',
		component: 'ResponsiveWrapper',
		icon: 'smartphone',
		description:
			'Mobile preview patterns use ResponsiveWrapper to simulate constrained viewports.',
		attributes: {
			naturalWidth: { type: 'number', default: 375 },
			naturalHeight: { type: 'number', default: 667 },
			content: { type: 'string', default: 'Mobile preview content' },
		},
	},
	{
		slug: 'number-control',
		component: 'NumberControl',
		icon: 'editor-ol',
		experimental: true,
		experimentalFallback: '__experimentalNumberControl',
		description:
			'NumberControl lets users enter numeric values with optional spin buttons and constraints.',
		attributes: {
			label: { type: 'string', default: 'Quantity' },
			value: { type: 'number', default: 3 },
		},
	},
	{
		slug: 'radio-group',
		component: 'RadioGroup',
		icon: 'marker',
		experimental: true,
		experimentalFallback: '__experimentalRadioGroup',
		description:
			'RadioGroup renders a set of radio inputs for selecting a single option.',
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
		slug: 'resizable-box',
		component: 'ResizableBox',
		icon: 'image-crop',
		description:
			'ResizableBox wraps content in a box that users can resize by dragging handles.',
		attributes: {
			width: { type: 'number', default: 240 },
			height: { type: 'number', default: 160 },
			content: { type: 'string', default: 'Resizable content' },
		},
		editorScss: `.blocks-preview-resizable-box-block {
	min-height: 180px;
}`,
	},
	{
		slug: 'responsive-wrapper',
		component: 'ResponsiveWrapper',
		icon: 'desktop',
		description:
			'ResponsiveWrapper scales embedded content to fit its container while preserving aspect ratio.',
		attributes: {
			naturalWidth: { type: 'number', default: 16 },
			naturalHeight: { type: 'number', default: 9 },
			content: { type: 'string', default: '16:9 responsive content' },
		},
	},
	{
		slug: 'sandbox',
		component: 'SandBox',
		icon: 'media-code',
		description:
			'SandBox safely renders HTML in an isolated iframe for previews and embeds.',
		attributes: {
			src: {
				type: 'string',
				default: 'https://wordpress.org',
			},
			title: { type: 'string', default: 'Sandbox iframe' },
		},
	},
	{
		slug: 'scroll-lock',
		component: 'ScrollLock',
		icon: 'lock',
		description:
			'ScrollLock prevents background scrolling while overlays or modals are open.',
		attributes: {
			isActive: { type: 'boolean', default: true },
			content: {
				type: 'string',
				default: 'Scrollable area behind scroll lock.',
			},
		},
		editorScss: `.blocks-preview-scroll-lock-block__scrollable {
	max-height: 120px;
	overflow: auto;
	padding: 8px;
	border: 1px solid #ddd;
}`,
	},
	{
		slug: 'scrollable',
		component: 'Scrollable',
		icon: 'editor-expand',
		experimental: true,
		experimentalFallback: '__experimentalScrollable',
		description:
			'Scrollable wraps content in a scrollable region with consistent styling.',
		attributes: {
			content: {
				type: 'string',
				default: 'Long scrollable content line.',
			},
		},
		editorScss: `.blocks-preview-scrollable-block__content {
	min-height: 240px;
}`,
	},
	{
		slug: 'search-control',
		component: 'SearchControl',
		icon: 'search',
		description:
			'SearchControl provides a search input field with optional label and help text.',
		attributes: {
			label: { type: 'string', default: 'Search' },
			value: { type: 'string', default: '' },
			placeholder: { type: 'string', default: 'Search items…' },
		},
	},
	{
		slug: 'select-control',
		component: 'SelectControl',
		icon: 'editor-ul',
		description:
			'SelectControl renders a native-style select dropdown for choosing one option.',
		attributes: {
			label: { type: 'string', default: 'Visibility' },
			value: { type: 'string', default: 'public' },
			options: {
				type: 'array',
				default: [
					{ label: 'Public', value: 'public' },
					{ label: 'Private', value: 'private' },
				],
			},
		},
	},
	{
		slug: 'slot-fill',
		component: 'SlotFillProvider',
		icon: 'admin-links',
		description:
			'Slot and Fill let distant components share UI regions via a provider pattern.',
		attributes: {
			slotContent: {
				type: 'string',
				default: 'Content rendered in the slot.',
			},
			fillContent: {
				type: 'string',
				default: 'Content provided by Fill.',
			},
		},
	},
	{
		slug: 'snackbar',
		component: 'SnackbarList',
		icon: 'info',
		description:
			'Snackbar and SnackbarList display brief, dismissible messages at the bottom of the screen.',
		attributes: {
			message: {
				type: 'string',
				default: 'Settings saved successfully.',
			},
		},
	},
	{
		slug: 'spacer',
		component: 'Spacer',
		icon: 'minus',
		experimental: true,
		experimentalFallback: '__experimentalSpacer',
		description:
			'Spacer adds consistent whitespace between layout elements.',
		attributes: {
			margin: { type: 'number', default: 4 },
		},
	},
	{
		slug: 'spinner',
		component: 'Spinner',
		icon: 'update',
		description:
			'Spinner indicates loading or processing state with an animated icon.',
		attributes: {},
	},
	{
		slug: 'surface',
		component: 'Surface',
		icon: 'admin-appearance',
		experimental: true,
		experimentalFallback: '__experimentalSurface',
		description:
			'Surface provides a styled container background for grouped content.',
		attributes: {
			content: {
				type: 'string',
				default: 'Surface content area.',
			},
		},
		editorScss: `.blocks-preview-surface-block {
	padding: 8px 0;
}`,
	},
	{
		slug: 'tab-panel',
		component: 'TabPanel',
		icon: 'table-col-after',
		description:
			'TabPanel renders a tabbed interface where each tab shows different content.',
		attributes: {
			tab1Label: { type: 'string', default: 'General' },
			tab2Label: { type: 'string', default: 'Advanced' },
			tab1Content: {
				type: 'string',
				default: 'General tab content.',
			},
			tab2Content: {
				type: 'string',
				default: 'Advanced tab content.',
			},
		},
	},
	{
		slug: 'tabs',
		component: 'TabPanel',
		icon: 'table-col-before',
		description:
			'Tabs organize related content into selectable panels with shared navigation.',
		attributes: {
			tab1Label: { type: 'string', default: 'Overview' },
			tab2Label: { type: 'string', default: 'Details' },
			tab1Content: {
				type: 'string',
				default: 'Overview tab content.',
			},
			tab2Content: {
				type: 'string',
				default: 'Details tab content.',
			},
		},
	},
	{
		slug: 'text',
		component: 'Text',
		icon: 'editor-textcolor',
		experimental: true,
		experimentalFallback: '__experimentalText',
		description:
			'Text renders typography with consistent sizing, weight, and color tokens.',
		attributes: {
			content: { type: 'string', default: 'Sample text' },
			size: { type: 'string', default: 'medium' },
		},
	},
	{
		slug: 'text-control',
		component: 'TextControl',
		icon: 'edit',
		description:
			'TextControl is a single-line text input with label and help text.',
		attributes: {
			label: { type: 'string', default: 'Title' },
			value: { type: 'string', default: 'Sample title' },
			help: { type: 'string', default: 'Enter a descriptive title.' },
		},
	},
	{
		slug: 'text-highlight',
		component: 'TextHighlight',
		icon: 'editor-textcolor',
		description:
			'TextHighlight emphasizes matching substrings within a larger text value.',
		attributes: {
			text: {
				type: 'string',
				default: 'The quick brown fox jumps over the lazy dog.',
			},
			highlight: { type: 'string', default: 'fox' },
		},
	},
	{
		slug: 'textarea-control',
		component: 'TextareaControl',
		icon: 'editor-paragraph',
		description:
			'TextareaControl is a multi-line text input for longer content.',
		attributes: {
			label: { type: 'string', default: 'Description' },
			value: { type: 'string', default: 'Sample description text.' },
			rows: { type: 'number', default: 4 },
		},
	},
	{
		slug: 'theme',
		component: 'StyleProvider',
		icon: 'admin-appearance',
		experimental: true,
		experimentalFallback: '__experimentalStyleProvider',
		description:
			'Theme and StyleProvider supply design tokens and scoped styles to child components.',
		attributes: {
			content: {
				type: 'string',
				default: 'Themed child content.',
			},
		},
	},
	{
		slug: 'toggle-control',
		component: 'ToggleControl',
		icon: 'visibility',
		description:
			'ToggleControl combines a FormToggle with a label for boolean settings.',
		attributes: {
			label: { type: 'string', default: 'Enable feature' },
			checked: { type: 'boolean', default: true },
		},
	},
	{
		slug: 'toggle-group-control',
		component: 'ToggleGroupControl',
		icon: 'button',
		experimental: true,
		experimentalFallback: '__experimentalToggleGroupControl',
		experimentalFallback: '__experimentalToggleGroupControl',
		description:
			'ToggleGroupControl replaces ButtonGroup with accessible segmented toggle options.',
		attributes: {
			label: { type: 'string', default: 'Alignment' },
			value: { type: 'string', default: 'left' },
		},
	},
	{
		slug: 'toolbar',
		component: 'Toolbar',
		icon: 'editor-kitchensink',
		description:
			'Toolbar groups ToolbarButton and ToolbarGroup controls for rich editing interfaces.',
		attributes: {
			buttonLabel: { type: 'string', default: 'Bold' },
		},
	},
	{
		slug: 'tools-panel',
		component: 'ToolsPanel',
		icon: 'admin-settings',
		experimental: true,
		experimentalFallback: '__experimentalToolsPanel',
		experimentalFallback: '__experimentalToolsPanel',
		description:
			'ToolsPanel organizes block settings into collapsible panel sections with reset support.',
		attributes: {
			panelLabel: { type: 'string', default: 'Settings' },
			itemLabel: { type: 'string', default: 'Sample setting' },
			itemValue: { type: 'string', default: 'Value' },
		},
	},
	{
		slug: 'tooltip',
		component: 'Tooltip',
		icon: 'info',
		description:
			'Tooltip displays supplementary information when hovering or focusing an element.',
		attributes: {
			text: { type: 'string', default: 'Helpful tooltip text.' },
			triggerText: { type: 'string', default: 'Hover me' },
		},
	},
	{
		slug: 'tree-grid',
		component: 'TreeGrid',
		icon: 'networking',
		experimental: true,
		experimentalFallback: '__experimentalTreeGrid',
		experimentalFallback: '__experimentalTreeGrid',
		description:
			'TreeGrid renders hierarchical data in an accessible grid with keyboard navigation.',
		attributes: {
			rowLabel: { type: 'string', default: 'Row item' },
		},
	},
	{
		slug: 'tree-select',
		component: 'TreeSelect',
		icon: 'category',
		description:
			'TreeSelect displays hierarchical options in a select control with indentation.',
		attributes: {
			label: { type: 'string', default: 'Category' },
			selectedId: { type: 'string', default: 'child-1' },
			tree: {
				type: 'array',
				default: [
					{
						id: 'parent',
						name: 'Parent',
						children: [
							{ id: 'child-1', name: 'Child one' },
							{ id: 'child-2', name: 'Child two' },
						],
					},
				],
			},
		},
	},
	{
		slug: 'truncate',
		component: 'Truncate',
		icon: 'editor-textcolor',
		experimental: true,
		experimentalFallback: '__experimentalTruncate',
		description:
			'Truncate ellipsizes overflowing text while preserving readable typography.',
		attributes: {
			content: {
				type: 'string',
				default:
					'This is a very long line of text that should be truncated when space is limited.',
			},
			limit: { type: 'number', default: 1 },
		},
		editorScss: `.blocks-preview-truncate-block {
	max-width: 240px;
}`,
	},
	{
		slug: 'unit-control',
		component: 'UnitControl',
		icon: 'editor-code',
		experimental: true,
		experimentalFallback: '__experimentalUnitControl',
		description:
			'UnitControl combines a numeric input with unit selection (px, em, rem, etc.).',
		attributes: {
			label: { type: 'string', default: 'Width' },
			value: { type: 'string', default: '100px' },
		},
	},
	{
		slug: 'v-stack',
		component: 'VStack',
		icon: 'menu',
		experimental: true,
		experimentalFallback: '__experimentalVStack',
		description:
			'VStack arranges children vertically with consistent spacing.',
		attributes: {
			spacing: { type: 'number', default: 4 },
			item1: { type: 'string', default: 'First item' },
			item2: { type: 'string', default: 'Second item' },
		},
		editorScss: `.blocks-preview-v-stack-block__item {
	padding: 8px 12px;
	background: #f0f0f0;
	border-radius: 2px;
}`,
	},
	{
		slug: 'view',
		component: 'View',
		icon: 'layout',
		experimental: true,
		experimentalFallback: '__experimentalView',
		description:
			'View is a primitive layout component for spacing, alignment, and display styles.',
		attributes: {
			content: { type: 'string', default: 'View content' },
		},
	},
	{
		slug: 'visually-hidden',
		component: 'VisuallyHidden',
		icon: 'hidden',
		description:
			'VisuallyHidden hides content visually while keeping it available to assistive technology.',
		attributes: {
			content: {
				type: 'string',
				default: 'Hidden from sight, available to screen readers.',
			},
			visibleLabel: {
				type: 'string',
				default: 'Visible label (hidden text follows)',
			},
		},
	},
	{
		slug: 'z-stack',
		component: 'ZStack',
		icon: 'layers',
		experimental: true,
		experimentalFallback: '__experimentalZStack',
		description:
			'ZStack layers children along the z-axis with offset positioning.',
		attributes: {
			layer1: { type: 'string', default: 'Back layer' },
			layer2: { type: 'string', default: 'Front layer' },
		},
		editorScss: `.blocks-preview-z-stack-block {
	min-height: 80px;
}`,
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
	const map = {
		badge: { destructure: 'label, intent', output: '{ label } ({ intent })' },
		calendar: {
			destructure: 'selectedDate',
			output: '{ selectedDate || \'—\' }',
		},
		'circular-option-picker': {
			destructure: 'selectedColor',
			output: '{ selectedColor }',
		},
		composite: {
			destructure: 'item1, item2',
			output: '{ item1 } · { item2 }',
		},
		'confirm-dialog': {
			destructure: 'title, message',
			output: '{ title }: { message }',
		},
		'custom-select-control-v2': {
			destructure: 'label, value',
			output: '{ label }: { value || \'—\' }',
		},
		divider: {
			destructure: 'orientation',
			output: '{ orientation } divider',
		},
		'focusable-iframe': {
			destructure: 'title, src',
			output: '{ title }: { src }',
		},
		'form-file-upload': {
			destructure: 'label',
			output: '{ label }',
		},
		grid: {
			destructure: 'item1, item2',
			output: '{ item1 } · { item2 }',
		},
		'higher-order': {
			destructure: 'hocName',
			output: '{ hocName }',
		},
		'isolated-event-container': {
			destructure: 'label',
			output: '{ label }',
		},
		'item-group': {
			destructure: 'item1, item2',
			output: '{ item1 } · { item2 }',
		},
		'keyboard-shortcuts': {
			destructure: 'shortcutLabel',
			output: '{ shortcutLabel }',
		},
		menu: {
			destructure: 'label, item1, item2',
			output: '{ label }: { item1 }, { item2 }',
		},
		mobile: {
			destructure: 'content',
			output: '{ content }',
		},
		'number-control': {
			destructure: 'label, value',
			output: '{ label }: { value }',
		},
		'radio-group': {
			destructure: 'label, selected',
			output: '{ label }: { selected || \'—\' }',
		},
		'resizable-box': {
			destructure: 'width, height, content',
			output: '{ width }×{ height }: { content }',
		},
		'responsive-wrapper': {
			destructure: 'content',
			output: '{ content }',
		},
		sandbox: {
			destructure: 'title, src',
			output: '{ title }: { src }',
		},
		'scroll-lock': {
			destructure: 'isActive, content',
			output: '{ isActive ? \'locked\' : \'unlocked\' }: { content }',
		},
		scrollable: {
			destructure: 'content',
			output: '{ content }',
		},
		'search-control': {
			destructure: 'label, value',
			output: '{ label }: { value || \'—\' }',
		},
		'select-control': {
			destructure: 'label, value',
			output: '{ label }: { value || \'—\' }',
		},
		'slot-fill': {
			destructure: 'slotContent, fillContent',
			output: '{ slotContent } / { fillContent }',
		},
		snackbar: {
			destructure: 'message',
			output: '{ message }',
		},
		spacer: {
			destructure: 'margin',
			output: 'Spacer ({ margin })',
		},
		spinner: { destructure: '', output: 'Spinner' },
		surface: { destructure: 'content', output: '{ content }' },
		'tab-panel': {
			destructure: 'tab1Label, tab2Label',
			output: '{ tab1Label } / { tab2Label }',
		},
		tabs: {
			destructure: 'tab1Label, tab2Label',
			output: '{ tab1Label } / { tab2Label }',
		},
		text: { destructure: 'content, size', output: '{ size }: { content }' },
		'text-control': {
			destructure: 'label, value',
			output: '{ label }: { value || \'—\' }',
		},
		'text-highlight': {
			destructure: 'text, highlight',
			output: '{ highlight } in { text }',
		},
		'textarea-control': {
			destructure: 'label, value',
			output: '{ label }: { value || \'—\' }',
		},
		theme: { destructure: 'content', output: '{ content }' },
		'toggle-control': {
			destructure: 'label, checked',
			output: '{ label }: { checked ? \'on\' : \'off\' }',
		},
		'toggle-group-control': {
			destructure: 'label, value',
			output: '{ label }: { value }',
		},
		toolbar: {
			destructure: 'buttonLabel',
			output: '{ buttonLabel }',
		},
		'tools-panel': {
			destructure: 'panelLabel, itemLabel, itemValue',
			output: '{ panelLabel }: { itemLabel } = { itemValue }',
		},
		tooltip: {
			destructure: 'triggerText, text',
			output: '{ triggerText }: { text }',
		},
		'tree-grid': {
			destructure: 'rowLabel',
			output: '{ rowLabel }',
		},
		'tree-select': {
			destructure: 'label, selectedId',
			output: '{ label }: { selectedId || \'—\' }',
		},
		truncate: { destructure: 'content', output: '{ content }' },
		'unit-control': {
			destructure: 'label, value',
			output: '{ label }: { value || \'—\' }',
		},
		'v-stack': {
			destructure: 'item1, item2',
			output: '{ item1 } · { item2 }',
		},
		view: { destructure: 'content', output: '{ content }' },
		'visually-hidden': {
			destructure: 'visibleLabel, content',
			output: '{ visibleLabel }',
		},
		'z-stack': {
			destructure: 'layer1, layer2',
			output: '{ layer1 } / { layer2 }',
		},
	};

	return map[ block.slug ] || { destructure: '', output: '—' };
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

function generateEditJs( block ) {
	const generator = EDIT_GENERATORS[ block.slug ];
	if ( ! generator ) {
		throw new Error( `No edit.js generator for ${ block.slug }` );
	}
	return generator( block );
}

function scaffoldBlock( block ) {
	const blockDir = path.join( SRC, block.slug );
	if ( fs.existsSync( blockDir ) ) {
		console.log( `\nSkipping ${ block.slug } (already exists)` );
		return false;
	}

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
	return true;
}

function updateComponentsConfig( createdBlocks ) {
	const configPath = path.join( SRC, 'components-config.json' );
	const config = JSON.parse( fs.readFileSync( configPath, 'utf8' ) );

	for ( const block of createdBlocks ) {
		const entry = {
			experimental: block.experimental ?? false,
			deprecated: block.deprecated ?? false,
			description: block.description,
			documentation: `https://developer.wordpress.org/block-editor/reference-guides/components/${ block.slug }/`,
		};
		if ( block.deprecatedReplacement ) {
			entry.deprecatedReplacement = block.deprecatedReplacement;
		}
		config[ block.slug ] = entry;
	}

	fs.writeFileSync( configPath, `${ JSON.stringify( config, null, '\t' ) }\n` );
	console.log( '\nUpdated src/components-config.json' );
}

function updatePluginPhp( createdBlocks ) {
	const phpPath = path.join( ROOT, 'blocks-preview-plugin.php' );
	let php = fs.readFileSync( phpPath, 'utf8' );

	php = php.replace( /Version:\s+[\d.]+/, 'Version:           0.5.0' );

	const slugsToAdd = createdBlocks
		.map( ( block ) => `\t'${ block.slug }',` )
		.join( '\n' );
	php = php.replace(
		/(const BLOCKS_PREVIEW_BLOCK_SLUGS = array\([\s\S]*?'range-control',)\n(\);)/,
		`$1\n${ slugsToAdd }\n$2`
	);

	fs.writeFileSync( phpPath, php );
	console.log( 'Updated blocks-preview-plugin.php (version 0.5.0)' );
}

function updateReadme( createdBlocks ) {
	const readmePath = path.join( ROOT, 'README.md' );
	let readme = fs.readFileSync( readmePath, 'utf8' );

	const rows = createdBlocks
		.map( ( block ) => {
			const title = slugToTitle( block.slug );
			const url = `https://developer.wordpress.org/block-editor/reference-guides/components/${ block.slug }/`;
			const suffix = block.deprecated ? ' (deprecated)' : '';
			return `| ${ title } | [${ block.component }](${ url })${ suffix } |`;
		} )
		.join( '\n' );

	readme = readme.replace(
		/(\| Range Control \| \[RangeControl\].*\|\n)/,
		`$1${ rows }\n`
	);

	fs.writeFileSync( readmePath, readme );
	console.log( 'Updated README.md' );
}

console.log( 'Scaffolding remaining 50 blocks after range-control…' );

const createdBlocks = [];
for ( const block of BLOCKS ) {
	if ( scaffoldBlock( block ) ) {
		createdBlocks.push( block );
	}
}

if ( createdBlocks.length ) {
	updateComponentsConfig( createdBlocks );
	updatePluginPhp( createdBlocks );
	updateReadme( createdBlocks );
}

console.log(
	`\nDone. Created ${ createdBlocks.length } block(s). Run npm run build to compile.`
);
