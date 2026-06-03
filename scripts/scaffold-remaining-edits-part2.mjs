export function registerPart2Editors( EDIT_GENERATORS, helpers ) {
	const { editHeader, layoutResolveEdit, simpleControlEdit } = helpers;

	EDIT_GENERATORS.badge = ( block ) =>
		`${ editHeader(
			block,
			`import { SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
const INTENT_CLASS = {
	default: 'blocks-preview-badge-block__badge',
	info: 'blocks-preview-badge-block__badge is-info',
	success: 'blocks-preview-badge-block__badge is-success',
	warning: 'blocks-preview-badge-block__badge is-warning',
	error: 'blocks-preview-badge-block__badge is-error',
};

export default function Edit( { attributes, setAttributes } ) {
	const { label, intent } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block blocks-preview-badge-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Badge options', 'blocks-preview' ) } docsLinkLabel={ __( 'Badge documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />
				<SelectControl label={ __( 'Intent', 'blocks-preview' ) } value={ intent } options={ [
					{ label: __( 'Default', 'blocks-preview' ), value: 'default' },
					{ label: __( 'Info', 'blocks-preview' ), value: 'info' },
					{ label: __( 'Success', 'blocks-preview' ), value: 'success' },
					{ label: __( 'Warning', 'blocks-preview' ), value: 'warning' },
					{ label: __( 'Error', 'blocks-preview' ), value: 'error' },
				] } onChange={ ( v ) => setAttributes( { intent: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }><span className={ INTENT_CLASS[ intent ] || INTENT_CLASS.default }>{ label }</span></div>
		</>
	);
}
`;

	EDIT_GENERATORS.calendar = ( block ) =>
		`${ editHeader(
			block,
			`import { DatePicker, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { selectedDate } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Calendar options', 'blocks-preview' ) } docsLinkLabel={ __( 'Calendar documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Selected date', 'blocks-preview' ) } value={ selectedDate } onChange={ ( v ) => setAttributes( { selectedDate: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }><DatePicker currentDate={ selectedDate } onChange={ ( v ) => setAttributes( { selectedDate: v } ) } /></div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'circular-option-picker' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { ColorIndicator } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
const COLOR_OPTIONS = [
	{ value: '#3858e9', label: 'Blue' },
	{ value: '#00a32a', label: 'Green' },
	{ value: '#d63638', label: 'Red' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { selectedColor } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block blocks-preview-circular-option-picker-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Circular Option Picker options', 'blocks-preview' ) } docsLinkLabel={ __( 'CircularOptionPicker documentation', 'blocks-preview' ) } />
			<div { ...blockProps }>
				<div className="blocks-preview-circular-option-picker-block__options">
					{ COLOR_OPTIONS.map( ( option ) => (
						<button key={ option.value } type="button" className={ 'blocks-preview-circular-option-picker-block__option' + ( selectedColor === option.value ? ' is-selected' : '' ) } onClick={ () => setAttributes( { selectedColor: option.value } ) } aria-label={ option.label }>
							<ColorIndicator colorValue={ option.value } />
						</button>
					) ) }
				</div>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS.composite = ( block ) =>
		`${ editHeader(
			block,
			`import { Composite, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { item1, item2 } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Composite options', 'blocks-preview' ) } docsLinkLabel={ __( 'Composite documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'First item', 'blocks-preview' ) } value={ item1 } onChange={ ( v ) => setAttributes( { item1: v } ) } />
				<TextControl label={ __( 'Second item', 'blocks-preview' ) } value={ item2 } onChange={ ( v ) => setAttributes( { item2: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<Composite role="listbox">
					<Composite.Item>{ item1 }</Composite.Item>
					<Composite.Item>{ item2 }</Composite.Item>
				</Composite>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'confirm-dialog' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
`
		) }
const ConfirmDialog = resolveComponent( 'ConfirmDialog', '__experimentalConfirmDialog' );

export default function Edit( { attributes, setAttributes } ) {
	const { title, message, buttonText } = attributes;
	const [ isOpen, setIsOpen ] = useState( false );
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Confirm Dialog options', 'blocks-preview' ) } docsLinkLabel={ __( 'ConfirmDialog documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } />
				<TextControl label={ __( 'Message', 'blocks-preview' ) } value={ message } onChange={ ( v ) => setAttributes( { message: v } ) } />
				<TextControl label={ __( 'Button text', 'blocks-preview' ) } value={ buttonText } onChange={ ( v ) => setAttributes( { buttonText: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<Button variant="primary" onClick={ () => setIsOpen( true ) }>{ buttonText }</Button>
				{ isOpen && ConfirmDialog ? (
					<ConfirmDialog title={ title } onConfirm={ () => setIsOpen( false ) } onCancel={ () => setIsOpen( false ) }>{ message }</ConfirmDialog>
				) : null }
				{ isOpen && ! ConfirmDialog ? <ComponentUnavailable componentName="ConfirmDialog" /> : null }
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'custom-select-control-v2' ] = ( block ) =>
		simpleControlEdit( block, {
			imports: `import { CustomSelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			componentName: 'CustomSelectControl',
			destructure: 'label, value, options',
			inspector: `				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />`,
			componentProps: `					label={ label }
					value={ options.find( ( o ) => o.key === value ) }
					options={ options }
					onChange={ ( selected ) => setAttributes( { value: selected?.selectedItem?.key || value } ) }`,
		} );

	EDIT_GENERATORS.divider = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Divider',
			stableName: 'Divider',
			experimentalName: '__experimentalDivider',
			destructure: 'orientation',
			extraImports: `import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<SelectControl label={ __( 'Orientation', 'blocks-preview' ) } value={ orientation } options={ [
					{ label: __( 'Horizontal', 'blocks-preview' ), value: 'horizontal' },
					{ label: __( 'Vertical', 'blocks-preview' ), value: 'vertical' },
				] } onChange={ ( v ) => setAttributes( { orientation: v } ) } />`,
			preview: `					<Divider orientation={ orientation } />`,
		} );

	EDIT_GENERATORS[ 'focusable-iframe' ] = ( block ) =>
		simpleControlEdit( block, {
			imports: `import { FocusableIframe, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			componentName: 'FocusableIframe',
			destructure: 'src, title',
			inspector: `				<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } />
				<TextControl label={ __( 'Source URL', 'blocks-preview' ) } value={ src } onChange={ ( v ) => setAttributes( { src: v } ) } />`,
			componentProps: `					title={ title }
					src={ src }
					width="100%"
					height={ 200 }`,
		} );

	EDIT_GENERATORS.grid = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Grid',
			stableName: 'Grid',
			experimentalName: '__experimentalGrid',
			destructure: 'columns, item1, item2',
			extraImports: `import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			className: 'blocks-preview-component-block blocks-preview-grid-block',
			inspector: `				<RangeControl label={ __( 'Columns', 'blocks-preview' ) } value={ columns } onChange={ ( v ) => setAttributes( { columns: v } ) } min={ 1 } max={ 4 } />
				<TextControl label={ __( 'First cell', 'blocks-preview' ) } value={ item1 } onChange={ ( v ) => setAttributes( { item1: v } ) } />
				<TextControl label={ __( 'Second cell', 'blocks-preview' ) } value={ item2 } onChange={ ( v ) => setAttributes( { item2: v } ) } />`,
			preview: `					<Grid columns={ columns }>
						<span className="blocks-preview-grid-block__cell">{ item1 }</span>
						<span className="blocks-preview-grid-block__cell">{ item2 }</span>
					</Grid>`,
		} );

	EDIT_GENERATORS[ 'higher-order' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { Notice, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { hocName } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Higher-order options', 'blocks-preview' ) } docsLinkLabel={ __( 'Higher-order documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'HOC name', 'blocks-preview' ) } value={ hocName } onChange={ ( v ) => setAttributes( { hocName: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<Notice status="info" isDismissible={ false }>
					{ __( 'Higher-order components are utility wrappers, not standalone visual UI. Example:', 'blocks-preview' ) }{ ' ' }
					<code>{ hocName }</code>
				</Notice>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'isolated-event-container' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { Button, IsolatedEventContainer, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Isolated Event Container options', 'blocks-preview' ) } docsLinkLabel={ __( 'IsolatedEventContainer documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />
			</ComponentInspector>
			<div { ...blockProps } onClick={ () => {} } role="presentation">
				<IsolatedEventContainer><Button variant="secondary" onClick={ () => {} }>{ label }</Button></IsolatedEventContainer>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'item-group' ] = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'ItemGroup',
			stableName: 'ItemGroup',
			experimentalName: '__experimentalItemGroup',
			destructure: 'item1, item2',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'First item', 'blocks-preview' ) } value={ item1 } onChange={ ( v ) => setAttributes( { item1: v } ) } />
				<TextControl label={ __( 'Second item', 'blocks-preview' ) } value={ item2 } onChange={ ( v ) => setAttributes( { item2: v } ) } />`,
			preview: `					<ItemGroup>
						<div>{ item1 }</div>
						<div>{ item2 }</div>
					</ItemGroup>`,
		} );

	EDIT_GENERATORS[ 'keyboard-shortcuts' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { KeyboardShortcuts, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { shortcutName, shortcutLabel } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	const shortcuts = { [ shortcutName ]: () => {} };
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Keyboard Shortcuts options', 'blocks-preview' ) } docsLinkLabel={ __( 'KeyboardShortcuts documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Shortcut', 'blocks-preview' ) } value={ shortcutName } onChange={ ( v ) => setAttributes( { shortcutName: v } ) } />
				<TextControl label={ __( 'Description', 'blocks-preview' ) } value={ shortcutLabel } onChange={ ( v ) => setAttributes( { shortcutLabel: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<KeyboardShortcuts shortcuts={ shortcuts } />
				<p>{ shortcutLabel } ({ shortcutName })</p>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS.menu = ( block ) =>
		`${ editHeader(
			block,
			`import { DropdownMenu, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { label, item1, item2 } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	const controls = [
		{ title: item1, onClick: () => {} },
		{ title: item2, onClick: () => {} },
	];
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Menu options', 'blocks-preview' ) } docsLinkLabel={ __( 'Menu documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Menu label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />
				<TextControl label={ __( 'First item', 'blocks-preview' ) } value={ item1 } onChange={ ( v ) => setAttributes( { item1: v } ) } />
				<TextControl label={ __( 'Second item', 'blocks-preview' ) } value={ item2 } onChange={ ( v ) => setAttributes( { item2: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }><DropdownMenu label={ label } controls={ controls } /></div>
		</>
	);
}
`;

	EDIT_GENERATORS.mobile = ( block ) =>
		simpleControlEdit( block, {
			imports: `import { RangeControl, ResponsiveWrapper, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			componentName: 'ResponsiveWrapper',
			destructure: 'naturalWidth, naturalHeight, content',
			inspector: `				<RangeControl label={ __( 'Width', 'blocks-preview' ) } value={ naturalWidth } onChange={ ( v ) => setAttributes( { naturalWidth: v } ) } min={ 320 } max={ 428 } />
				<RangeControl label={ __( 'Height', 'blocks-preview' ) } value={ naturalHeight } onChange={ ( v ) => setAttributes( { naturalHeight: v } ) } min={ 568 } max={ 926 } />
				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />`,
			componentProps: `					naturalWidth={ naturalWidth }
					naturalHeight={ naturalHeight }
				>
					<div style={ { padding: '16px', background: '#f0f0f0' } }>{ content }</div>
				</ResponsiveWrapper>`,
			closingTag: false,
		} );

	EDIT_GENERATORS[ 'number-control' ] = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'NumberControl',
			stableName: 'NumberControl',
			experimentalName: '__experimentalNumberControl',
			destructure: 'label, value',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />`,
			preview: `					<NumberControl label={ label } value={ value } onChange={ ( v ) => setAttributes( { value: v } ) } />`,
		} );

	EDIT_GENERATORS[ 'radio-group' ] = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'RadioGroup',
			stableName: 'RadioGroup',
			experimentalName: '__experimentalRadioGroup',
			destructure: 'label, selected, options',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />`,
			preview: `					<RadioGroup label={ label } onChange={ ( v ) => setAttributes( { selected: v } ) } checked={ selected }>
						{ options.map( ( option ) => (
							<RadioGroup.Radio key={ option.value } value={ option.value }>{ option.label }</RadioGroup.Radio>
						) ) }
					</RadioGroup>`,
		} );

	EDIT_GENERATORS[ 'resizable-box' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { RangeControl, ResizableBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { width, height, content } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block blocks-preview-resizable-box-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Resizable Box options', 'blocks-preview' ) } docsLinkLabel={ __( 'ResizableBox documentation', 'blocks-preview' ) }>
				<RangeControl label={ __( 'Width', 'blocks-preview' ) } value={ width } onChange={ ( v ) => setAttributes( { width: v } ) } min={ 120 } max={ 480 } />
				<RangeControl label={ __( 'Height', 'blocks-preview' ) } value={ height } onChange={ ( v ) => setAttributes( { height: v } ) } min={ 80 } max={ 320 } />
				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<ResizableBox size={ { width, height } } minWidth={ 120 } minHeight={ 80 } enable={ { right: true, bottom: true } } onResizeStop={ ( e, direction, elt ) => setAttributes( { width: elt.offsetWidth, height: elt.offsetHeight } ) }>
					<div style={ { padding: '12px' } }>{ content }</div>
				</ResizableBox>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'responsive-wrapper' ] = ( block ) =>
		simpleControlEdit( block, {
			imports: `import { RangeControl, ResponsiveWrapper, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			componentName: 'ResponsiveWrapper',
			destructure: 'naturalWidth, naturalHeight, content',
			inspector: `				<RangeControl label={ __( 'Natural width', 'blocks-preview' ) } value={ naturalWidth } onChange={ ( v ) => setAttributes( { naturalWidth: v } ) } min={ 1 } max={ 32 } />
				<RangeControl label={ __( 'Natural height', 'blocks-preview' ) } value={ naturalHeight } onChange={ ( v ) => setAttributes( { naturalHeight: v } ) } min={ 1 } max={ 32 } />
				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />`,
			componentProps: `					naturalWidth={ naturalWidth }
					naturalHeight={ naturalHeight }
				>
					<div style={ { padding: '16px', background: '#3858e9', color: '#fff' } }>{ content }</div>
				</ResponsiveWrapper>`,
			closingTag: false,
		} );

	EDIT_GENERATORS.sandbox = ( block ) =>
		`${ editHeader(
			block,
			`import { SandBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { src, title } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	const html = '<iframe src="' + src + '" title="' + title + '" width="100%" height="200" style="border:0;"></iframe>';
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'SandBox options', 'blocks-preview' ) } docsLinkLabel={ __( 'SandBox documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } />
				<TextControl label={ __( 'Source URL', 'blocks-preview' ) } value={ src } onChange={ ( v ) => setAttributes( { src: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<SandBox title={ title } html={ html } />
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'scroll-lock' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { ScrollLock, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { isActive, content } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block blocks-preview-scroll-lock-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Scroll Lock options', 'blocks-preview' ) } docsLinkLabel={ __( 'ScrollLock documentation', 'blocks-preview' ) }>
				<ToggleControl label={ __( 'Active', 'blocks-preview' ) } checked={ isActive } onChange={ ( v ) => setAttributes( { isActive: v } ) } />
				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				{ isActive ? <ScrollLock /> : null }
				<div className="blocks-preview-scroll-lock-block__scrollable">
					<p>{ content }</p><p>{ content }</p><p>{ content }</p>
				</div>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS.scrollable = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Scrollable',
			stableName: 'Scrollable',
			experimentalName: '__experimentalScrollable',
			destructure: 'content',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			className: 'blocks-preview-component-block blocks-preview-scrollable-block',
			inspector: `				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />`,
			preview: `					<Scrollable className="blocks-preview-scrollable-block__content">
						<p>{ content }</p><p>{ content }</p><p>{ content }</p><p>{ content }</p>
					</Scrollable>`,
		} );

	EDIT_GENERATORS[ 'slot-fill' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { Fill, Slot, SlotFillProvider, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { slotContent, fillContent } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Slot Fill options', 'blocks-preview' ) } docsLinkLabel={ __( 'SlotFill documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Slot placeholder', 'blocks-preview' ) } value={ slotContent } onChange={ ( v ) => setAttributes( { slotContent: v } ) } />
				<TextControl label={ __( 'Fill content', 'blocks-preview' ) } value={ fillContent } onChange={ ( v ) => setAttributes( { fillContent: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<SlotFillProvider>
					<Fill name="blocks-preview-slot">{ fillContent }</Fill>
					<div style={ { padding: '12px', border: '1px dashed #949494' } }>
						<p>{ slotContent }</p>
						<Slot name="blocks-preview-slot" />
					</div>
				</SlotFillProvider>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS.snackbar = ( block ) =>
		`${ editHeader(
			block,
			`import { Button, SnackbarList, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { message } = attributes;
	const [ notices, setNotices ] = useState( [] );
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Snackbar options', 'blocks-preview' ) } docsLinkLabel={ __( 'Snackbar documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Message', 'blocks-preview' ) } value={ message } onChange={ ( v ) => setAttributes( { message: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<Button variant="secondary" onClick={ () => setNotices( [ { content: message, id: 'snackbar-' + Date.now() } ] ) }>{ __( 'Show snackbar', 'blocks-preview' ) }</Button>
				<SnackbarList notices={ notices } onRemove={ ( id ) => setNotices( notices.filter( ( n ) => n.id !== id ) ) } />
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS.spacer = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Spacer',
			stableName: 'Spacer',
			experimentalName: '__experimentalSpacer',
			destructure: 'margin',
			extraImports: `import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<RangeControl label={ __( 'Margin', 'blocks-preview' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } min={ 0 } max={ 12 } />`,
			preview: `					<div style={ { background: '#f0f0f0' } }>Above<Spacer margin={ margin } />Below</div>`,
		} );

	EDIT_GENERATORS.surface = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Surface',
			stableName: 'Surface',
			experimentalName: '__experimentalSurface',
			destructure: 'content',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			className: 'blocks-preview-component-block blocks-preview-surface-block',
			inspector: `				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />`,
			preview: `					<Surface><div style={ { padding: '12px' } }>{ content }</div></Surface>`,
		} );

	const tabPanelEdit = ( block, panelTitle ) =>
		`${ editHeader(
			block,
			`import { TabPanel, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { tab1Label, tab2Label, tab1Content, tab2Content } = attributes;
	const tabs = [
		{ name: 'tab1', title: tab1Label },
		{ name: 'tab2', title: tab2Label },
	];
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( '${ panelTitle } options', 'blocks-preview' ) } docsLinkLabel={ __( 'TabPanel documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Tab 1 label', 'blocks-preview' ) } value={ tab1Label } onChange={ ( v ) => setAttributes( { tab1Label: v } ) } />
				<TextControl label={ __( 'Tab 2 label', 'blocks-preview' ) } value={ tab2Label } onChange={ ( v ) => setAttributes( { tab2Label: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<TabPanel tabs={ tabs }>
					{ ( tab ) => <p>{ tab.name === 'tab1' ? tab1Content : tab2Content }</p> }
				</TabPanel>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'tab-panel' ] = ( block ) => tabPanelEdit( block, 'Tab Panel' );
	EDIT_GENERATORS.tabs = ( block ) => tabPanelEdit( block, 'Tabs' );

	EDIT_GENERATORS.text = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Text',
			stableName: 'Text',
			experimentalName: '__experimentalText',
			destructure: 'content, size',
			extraImports: `import { SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: 'Small', value: 'small' },
					{ label: 'Medium', value: 'medium' },
					{ label: 'Large', value: 'large' },
				] } onChange={ ( v ) => setAttributes( { size: v } ) } />`,
			preview: `					<Text size={ size }>{ content }</Text>`,
		} );

	EDIT_GENERATORS.theme = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'StyleProvider',
			stableName: 'StyleProvider',
			experimentalName: '__experimentalStyleProvider',
			destructure: 'content',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />`,
			preview: `					<StyleProvider><div style={ { padding: '12px' } }>{ content }</div></StyleProvider>`,
		} );

	EDIT_GENERATORS[ 'toggle-group-control' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
const ToggleGroupControl = resolveComponent( 'ToggleGroupControl', '__experimentalToggleGroupControl' );
const ToggleGroupControlOption = resolveComponent( 'ToggleGroupControlOption', '__experimentalToggleGroupControlOption' );

export default function Edit( { attributes, setAttributes } ) {
	const { label, value } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Toggle Group Control options', 'blocks-preview' ) } docsLinkLabel={ __( 'ToggleGroupControl documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				{ ToggleGroupControl && ToggleGroupControlOption ? (
					<ToggleGroupControl label={ label } value={ value } onChange={ ( v ) => setAttributes( { value: v } ) } isBlock>
						<ToggleGroupControlOption value="left" label={ __( 'Left', 'blocks-preview' ) } />
						<ToggleGroupControlOption value="center" label={ __( 'Center', 'blocks-preview' ) } />
						<ToggleGroupControlOption value="right" label={ __( 'Right', 'blocks-preview' ) } />
					</ToggleGroupControl>
				) : (
					<ComponentUnavailable componentName="ToggleGroupControl" />
				) }
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS.toolbar = ( block ) =>
		`${ editHeader(
			block,
			`import { TextControl, Toolbar, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { formatBold } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { buttonLabel } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Toolbar options', 'blocks-preview' ) } docsLinkLabel={ __( 'Toolbar documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Button label', 'blocks-preview' ) } value={ buttonLabel } onChange={ ( v ) => setAttributes( { buttonLabel: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<Toolbar label={ __( 'Options', 'blocks-preview' ) }>
					<ToolbarGroup>
						<ToolbarButton icon={ formatBold } label={ buttonLabel } onClick={ () => {} } />
					</ToolbarGroup>
				</Toolbar>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'tools-panel' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
const ToolsPanel = resolveComponent( 'ToolsPanel', '__experimentalToolsPanel' );
const ToolsPanelItem = resolveComponent( 'ToolsPanelItem', '__experimentalToolsPanelItem' );

export default function Edit( { attributes, setAttributes } ) {
	const { panelLabel, itemLabel, itemValue } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Tools Panel options', 'blocks-preview' ) } docsLinkLabel={ __( 'ToolsPanel documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Panel label', 'blocks-preview' ) } value={ panelLabel } onChange={ ( v ) => setAttributes( { panelLabel: v } ) } />
				<TextControl label={ __( 'Item label', 'blocks-preview' ) } value={ itemLabel } onChange={ ( v ) => setAttributes( { itemLabel: v } ) } />
				<TextControl label={ __( 'Item value', 'blocks-preview' ) } value={ itemValue } onChange={ ( v ) => setAttributes( { itemValue: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				{ ToolsPanel && ToolsPanelItem ? (
					<ToolsPanel label={ panelLabel } resetAll={ () => {} }>
						<ToolsPanelItem hasValue={ () => true } label={ itemLabel } onDeselect={ () => {} } isShownByDefault>
							<TextControl label={ itemLabel } value={ itemValue } onChange={ ( v ) => setAttributes( { itemValue: v } ) } />
						</ToolsPanelItem>
					</ToolsPanel>
				) : (
					<ComponentUnavailable componentName="ToolsPanel" />
				) }
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'tree-grid' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
const TreeGrid = resolveComponent( 'TreeGrid', '__experimentalTreeGrid' );
const TreeGridRow = resolveComponent( 'TreeGridRow', '__experimentalTreeGridRow' );
const TreeGridCell = resolveComponent( 'TreeGridCell', '__experimentalTreeGridCell' );
const TreeGridItem = resolveComponent( 'TreeGridItem', '__experimentalTreeGridItem' );

export default function Edit( { attributes, setAttributes } ) {
	const { rowLabel } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Tree Grid options', 'blocks-preview' ) } docsLinkLabel={ __( 'TreeGrid documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Row label', 'blocks-preview' ) } value={ rowLabel } onChange={ ( v ) => setAttributes( { rowLabel: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				{ TreeGrid && TreeGridRow && TreeGridCell && TreeGridItem ? (
					<TreeGrid>
						<TreeGridRow level={ 1 }>
							<TreeGridCell><TreeGridItem>{ rowLabel }</TreeGridItem></TreeGridCell>
						</TreeGridRow>
					</TreeGrid>
				) : (
					<ComponentUnavailable componentName="TreeGrid" />
				) }
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'tree-select' ] = ( block ) =>
		simpleControlEdit( block, {
			imports: `import { TextControl, TreeSelect } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			componentName: 'TreeSelect',
			destructure: 'label, selectedId, tree',
			inspector: `				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />`,
			componentProps: `					label={ label }
					selectedId={ selectedId }
					tree={ tree }
					onChange={ ( v ) => setAttributes( { selectedId: v } ) }`,
		} );

	EDIT_GENERATORS.truncate = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'Truncate',
			stableName: 'Truncate',
			experimentalName: '__experimentalTruncate',
			destructure: 'content, limit',
			extraImports: `import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			className: 'blocks-preview-component-block blocks-preview-truncate-block',
			inspector: `				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />
				<RangeControl label={ __( 'Lines', 'blocks-preview' ) } value={ limit } onChange={ ( v ) => setAttributes( { limit: v } ) } min={ 1 } max={ 3 } />`,
			preview: `					<Truncate limit={ limit }>{ content }</Truncate>`,
		} );

	EDIT_GENERATORS[ 'unit-control' ] = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'UnitControl',
			stableName: 'UnitControl',
			experimentalName: '__experimentalUnitControl',
			destructure: 'label, value',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( v ) => setAttributes( { label: v } ) } />`,
			preview: `					<UnitControl label={ label } value={ value } onChange={ ( v ) => setAttributes( { value: v } ) } />`,
		} );

	EDIT_GENERATORS[ 'v-stack' ] = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'VStack',
			stableName: 'VStack',
			experimentalName: '__experimentalVStack',
			destructure: 'spacing, item1, item2',
			extraImports: `import { RangeControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			className: 'blocks-preview-component-block blocks-preview-v-stack-block',
			inspector: `				<RangeControl label={ __( 'Spacing', 'blocks-preview' ) } value={ spacing } onChange={ ( v ) => setAttributes( { spacing: v } ) } min={ 0 } max={ 12 } />
				<TextControl label={ __( 'First item', 'blocks-preview' ) } value={ item1 } onChange={ ( v ) => setAttributes( { item1: v } ) } />
				<TextControl label={ __( 'Second item', 'blocks-preview' ) } value={ item2 } onChange={ ( v ) => setAttributes( { item2: v } ) } />`,
			preview: `					<VStack spacing={ spacing }>
						<span className="blocks-preview-v-stack-block__item">{ item1 }</span>
						<span className="blocks-preview-v-stack-block__item">{ item2 }</span>
					</VStack>`,
		} );

	EDIT_GENERATORS.view = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'View',
			stableName: 'View',
			experimentalName: '__experimentalView',
			destructure: 'content',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			inspector: `				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />`,
			preview: `					<View><div style={ { padding: '8px' } }>{ content }</div></View>`,
		} );

	EDIT_GENERATORS[ 'visually-hidden' ] = ( block ) =>
		`${ editHeader(
			block,
			`import { TextControl, VisuallyHidden } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`
		) }
export default function Edit( { attributes, setAttributes } ) {
	const { content, visibleLabel } = attributes;
	const blockProps = useBlockProps( { className: 'blocks-preview-component-block' } );
	return (
		<>
			<ComponentInspector metadata={ metadata } panelTitle={ __( 'Visually Hidden options', 'blocks-preview' ) } docsLinkLabel={ __( 'VisuallyHidden documentation', 'blocks-preview' ) }>
				<TextControl label={ __( 'Visible label', 'blocks-preview' ) } value={ visibleLabel } onChange={ ( v ) => setAttributes( { visibleLabel: v } ) } />
				<TextControl label={ __( 'Hidden text', 'blocks-preview' ) } value={ content } onChange={ ( v ) => setAttributes( { content: v } ) } />
			</ComponentInspector>
			<div { ...blockProps }>
				<span>{ visibleLabel }</span>
				<VisuallyHidden>{ content }</VisuallyHidden>
			</div>
		</>
	);
}
`;

	EDIT_GENERATORS[ 'z-stack' ] = ( block ) =>
		layoutResolveEdit( block, {
			componentName: 'ZStack',
			stableName: 'ZStack',
			experimentalName: '__experimentalZStack',
			destructure: 'layer1, layer2',
			extraImports: `import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
`,
			className: 'blocks-preview-component-block blocks-preview-z-stack-block',
			inspector: `				<TextControl label={ __( 'Back layer', 'blocks-preview' ) } value={ layer1 } onChange={ ( v ) => setAttributes( { layer1: v } ) } />
				<TextControl label={ __( 'Front layer', 'blocks-preview' ) } value={ layer2 } onChange={ ( v ) => setAttributes( { layer2: v } ) } />`,
			preview: `					<ZStack>
						<div style={ { padding: '12px', background: '#ddd' } }>{ layer1 }</div>
						<div style={ { padding: '12px', background: '#3858e9', color: '#fff' } }>{ layer2 }</div>
					</ZStack>`,
		} );
}
