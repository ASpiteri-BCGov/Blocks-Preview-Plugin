/**
 * Scaffolds preview blocks for @bcgov/design-system-react-components.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve( import.meta.dirname, '..' );
const BCDS = path.join( ROOT, 'src', 'bcds' );
const DOCS_BASE = 'https://designsystem.gov.bc.ca/react-components/';

const COMPONENTS = [
	{
		slug: 'accordion',
		title: 'Accordion',
		icon: 'editor-ul',
		imports: [ 'Accordion' ],
		attributes: {
			label: { type: 'string', default: 'Section title' },
			content: {
				type: 'string',
				default: 'Accordion panel content goes here.',
			},
		},
		description:
			'Expandable disclosure panel for showing and hiding related content.',
		preview: `<Accordion label={ label }>{ content }</Accordion>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( value ) => setAttributes( { content: value } ) } />`,
	},
	{
		slug: 'accordion-group',
		title: 'Accordion Group',
		icon: 'editor-ul',
		imports: [ 'Accordion', 'AccordionGroup' ],
		attributes: {
			title: { type: 'string', default: 'Accordion group' },
			firstLabel: { type: 'string', default: 'First section' },
			secondLabel: { type: 'string', default: 'Second section' },
		},
		description: 'Groups multiple accordions with a shared heading.',
		preview: `<AccordionGroup title={ title }>
				<Accordion label={ firstLabel }>First panel content.</Accordion>
				<Accordion label={ secondLabel }>Second panel content.</Accordion>
			</AccordionGroup>`,
		controls: `<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
				<TextControl label={ __( 'First label', 'blocks-preview' ) } value={ firstLabel } onChange={ ( value ) => setAttributes( { firstLabel: value } ) } />
				<TextControl label={ __( 'Second label', 'blocks-preview' ) } value={ secondLabel } onChange={ ( value ) => setAttributes( { secondLabel: value } ) } />`,
	},
	{
		slug: 'alert-banner',
		title: 'Alert Banner',
		icon: 'info',
		imports: [ 'AlertBanner' ],
		attributes: {
			variant: { type: 'string', default: 'info' },
			message: {
				type: 'string',
				default: 'This is an alert banner message.',
			},
			isCloseable: { type: 'boolean', default: false },
		},
		description: 'Full-width banner for important site-wide messages.',
		preview: `<AlertBanner variant={ variant } isCloseable={ isCloseable }>{ message }</AlertBanner>`,
		controls: `<SelectControl label={ __( 'Variant', 'blocks-preview' ) } value={ variant } options={ [
					{ label: __( 'Info', 'blocks-preview' ), value: 'info' },
					{ label: __( 'Success', 'blocks-preview' ), value: 'success' },
					{ label: __( 'Warning', 'blocks-preview' ), value: 'warning' },
					{ label: __( 'Danger', 'blocks-preview' ), value: 'danger' },
					{ label: __( 'Black', 'blocks-preview' ), value: 'black' },
				] } onChange={ ( value ) => setAttributes( { variant: value } ) } />
				<TextControl label={ __( 'Message', 'blocks-preview' ) } value={ message } onChange={ ( value ) => setAttributes( { message: value } ) } />
				<ToggleControl label={ __( 'Closeable', 'blocks-preview' ) } checked={ isCloseable } onChange={ ( value ) => setAttributes( { isCloseable: value } ) } />`,
	},
	{
		slug: 'alert-dialog',
		title: 'Alert Dialog',
		icon: 'warning',
		imports: [ 'AlertDialog', 'Button' ],
		extraImports: '',
		extraPreviewImports: [ 'DialogTrigger' ],
		attributes: {
			variant: { type: 'string', default: 'confirmation' },
			title: { type: 'string', default: 'Confirm action' },
			message: {
				type: 'string',
				default: 'Are you sure you want to continue?',
			},
		},
		description: 'Modal dialog for confirmations and critical alerts.',
		preview: `<DialogTrigger>
				<Button variant="primary">Open alert dialog</Button>
				<AlertDialog variant={ variant } title={ title } buttons={ <Button variant="primary">Confirm</Button> }>
					{ message }
				</AlertDialog>
			</DialogTrigger>`,
		controls: `<SelectControl label={ __( 'Variant', 'blocks-preview' ) } value={ variant } options={ [
					{ label: __( 'Info', 'blocks-preview' ), value: 'info' },
					{ label: __( 'Confirmation', 'blocks-preview' ), value: 'confirmation' },
					{ label: __( 'Warning', 'blocks-preview' ), value: 'warning' },
					{ label: __( 'Error', 'blocks-preview' ), value: 'error' },
					{ label: __( 'Destructive', 'blocks-preview' ), value: 'destructive' },
				] } onChange={ ( value ) => setAttributes( { variant: value } ) } />
				<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
				<TextControl label={ __( 'Message', 'blocks-preview' ) } value={ message } onChange={ ( value ) => setAttributes( { message: value } ) } />`,
	},
	{
		slug: 'button',
		title: 'Button',
		icon: 'button',
		imports: [ 'Button' ],
		attributes: {
			text: { type: 'string', default: 'Click here' },
			variant: { type: 'string', default: 'primary' },
			size: { type: 'string', default: 'medium' },
			disabled: { type: 'boolean', default: false },
			danger: { type: 'boolean', default: false },
		},
		description: 'BC Gov button for actions and navigation.',
		preview: `<Button variant={ variant } size={ size } isDisabled={ disabled } danger={ danger }>{ text }</Button>`,
		controls: `<TextControl label={ __( 'Text', 'blocks-preview' ) } value={ text } onChange={ ( value ) => setAttributes( { text: value } ) } />
				<SelectControl label={ __( 'Variant', 'blocks-preview' ) } value={ variant } options={ [
					{ label: __( 'Primary', 'blocks-preview' ), value: 'primary' },
					{ label: __( 'Secondary', 'blocks-preview' ), value: 'secondary' },
					{ label: __( 'Tertiary', 'blocks-preview' ), value: 'tertiary' },
					{ label: __( 'Link', 'blocks-preview' ), value: 'link' },
				] } onChange={ ( value ) => setAttributes( { variant: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'XSmall', 'blocks-preview' ), value: 'xsmall' },
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
					{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />
				<ToggleControl label={ __( 'Disabled', 'blocks-preview' ) } checked={ disabled } onChange={ ( value ) => setAttributes( { disabled: value } ) } />
				<ToggleControl label={ __( 'Danger', 'blocks-preview' ) } checked={ danger } onChange={ ( value ) => setAttributes( { danger: value } ) } />`,
	},
	{
		slug: 'button-group',
		title: 'Button Group',
		icon: 'button',
		imports: [ 'Button', 'ButtonGroup' ],
		attributes: {
			orientation: { type: 'string', default: 'horizontal' },
			firstLabel: { type: 'string', default: 'First' },
			secondLabel: { type: 'string', default: 'Second' },
		},
		description: 'Groups related buttons with shared layout.',
		preview: `<ButtonGroup orientation={ orientation } ariaLabel="Button group preview">
				<Button variant="primary">{ firstLabel }</Button>
				<Button variant="secondary">{ secondLabel }</Button>
			</ButtonGroup>`,
		controls: `<SelectControl label={ __( 'Orientation', 'blocks-preview' ) } value={ orientation } options={ [
					{ label: __( 'Horizontal', 'blocks-preview' ), value: 'horizontal' },
					{ label: __( 'Vertical', 'blocks-preview' ), value: 'vertical' },
				] } onChange={ ( value ) => setAttributes( { orientation: value } ) } />
				<TextControl label={ __( 'First label', 'blocks-preview' ) } value={ firstLabel } onChange={ ( value ) => setAttributes( { firstLabel: value } ) } />
				<TextControl label={ __( 'Second label', 'blocks-preview' ) } value={ secondLabel } onChange={ ( value ) => setAttributes( { secondLabel: value } ) } />`,
	},
	{
		slug: 'calendar',
		title: 'Calendar',
		icon: 'calendar',
		imports: [ 'Calendar' ],
		attributes: {},
		description: 'Calendar grid for date selection.',
		preview: `<Calendar aria-label="Calendar preview" />`,
		controls: '',
	},
	{
		slug: 'callout',
		title: 'Callout',
		icon: 'megaphone',
		imports: [ 'Callout', 'Button' ],
		attributes: {
			variant: { type: 'string', default: 'lightBlue' },
			title: { type: 'string', default: 'Callout title' },
			description: {
				type: 'string',
				default: 'Supporting callout description text.',
			},
		},
		description: 'Highlighted content block with optional actions.',
		preview: `<Callout variant={ variant } title={ title } description={ description } buttons={ <Button variant="primary">Action</Button> } />`,
		controls: `<SelectControl label={ __( 'Variant', 'blocks-preview' ) } value={ variant } options={ [
					{ label: 'lightGrey', value: 'lightGrey' },
					{ label: 'lightBlue', value: 'lightBlue' },
					{ label: 'lightGold', value: 'lightGold' },
					{ label: 'Blue', value: 'Blue' },
					{ label: 'Grey', value: 'Grey' },
					{ label: 'Black', value: 'Black' },
				] } onChange={ ( value ) => setAttributes( { variant: value } ) } />
				<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
				<TextControl label={ __( 'Description', 'blocks-preview' ) } value={ description } onChange={ ( value ) => setAttributes( { description: value } ) } />`,
	},
	{
		slug: 'checkbox',
		title: 'Checkbox',
		icon: 'yes',
		imports: [ 'Checkbox' ],
		attributes: {
			label: { type: 'string', default: 'Checkbox label' },
			isSelected: { type: 'boolean', default: false },
		},
		description: 'Single checkbox input.',
		preview: `<Checkbox isSelected={ isSelected } onChange={ ( value ) => setAttributes( { isSelected: value } ) }>{ label }</Checkbox>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<ToggleControl label={ __( 'Selected', 'blocks-preview' ) } checked={ isSelected } onChange={ ( value ) => setAttributes( { isSelected: value } ) } />`,
	},
	{
		slug: 'checkbox-group',
		title: 'Checkbox Group',
		icon: 'yes',
		imports: [ 'Checkbox', 'CheckboxGroup' ],
		attributes: {
			label: { type: 'string', default: 'Select options' },
			orientation: { type: 'string', default: 'vertical' },
		},
		description: 'Group of related checkboxes with a shared label.',
		preview: `<CheckboxGroup label={ label } orientation={ orientation }>
				<Checkbox value="one">Option one</Checkbox>
				<Checkbox value="two">Option two</Checkbox>
			</CheckboxGroup>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<SelectControl label={ __( 'Orientation', 'blocks-preview' ) } value={ orientation } options={ [
					{ label: __( 'Vertical', 'blocks-preview' ), value: 'vertical' },
					{ label: __( 'Horizontal', 'blocks-preview' ), value: 'horizontal' },
				] } onChange={ ( value ) => setAttributes( { orientation: value } ) } />`,
	},
	{
		slug: 'date-picker',
		title: 'Date Picker',
		icon: 'calendar-alt',
		imports: [ 'DatePicker' ],
		attributes: {
			label: { type: 'string', default: 'Date' },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Date input with calendar popup.',
		preview: `<DatePicker label={ label } size={ size } />`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'dialog',
		title: 'Dialog',
		icon: 'admin-comments',
		imports: [ 'Button', 'Dialog' ],
		extraImports: '',
		extraPreviewImports: [ 'DialogTrigger' ],
		attributes: {
			title: { type: 'string', default: 'Dialog title' },
			message: { type: 'string', default: 'Dialog content goes here.' },
		},
		description: 'Generic modal dialog container.',
		preview: `<DialogTrigger>
				<Button variant="primary">Open dialog</Button>
				<Dialog isCloseable>
					<Heading slot="title">{ title }</Heading>
					<p>{ message }</p>
				</Dialog>
			</DialogTrigger>`,
		controls: `<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
				<TextControl label={ __( 'Message', 'blocks-preview' ) } value={ message } onChange={ ( value ) => setAttributes( { message: value } ) } />`,
		extraPreviewImports: [ 'Heading' ],
	},
	{
		slug: 'footer',
		title: 'Footer',
		icon: 'admin-site-alt3',
		imports: [ 'Footer' ],
		attributes: {
			copyright: { type: 'string', default: '' },
		},
		description: 'Government of B.C. footer with default content.',
		preview: `<Footer copyright={ copyright || undefined } />`,
		controls: `<TextControl label={ __( 'Copyright (optional)', 'blocks-preview' ) } value={ copyright } onChange={ ( value ) => setAttributes( { copyright: value } ) } />`,
	},
	{
		slug: 'footer-links',
		title: 'Footer Links',
		icon: 'admin-links',
		imports: [ 'FooterLinks', 'Link' ],
		attributes: {
			title: { type: 'string', default: 'Helpful links' },
		},
		description: 'Titled list of footer links.',
		preview: `<FooterLinks
				title={ title }
				links={ [
					<Link key="one" href="#">Link one</Link>,
					<Link key="two" href="#">Link two</Link>,
				] }
			/>`,
		controls: `<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />`,
	},
	{
		slug: 'form',
		title: 'Form',
		icon: 'feedback',
		imports: [ 'Form', 'TextField', 'Button' ],
		attributes: {
			label: { type: 'string', default: 'Name' },
		},
		description: 'Form wrapper with validation support.',
		preview: `<Form>
				<TextField label={ label } />
				<Button variant="primary" type="submit">Submit</Button>
			</Form>`,
		controls: `<TextControl label={ __( 'Field label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />`,
	},
	{
		slug: 'header',
		title: 'Header',
		icon: 'admin-site',
		imports: [ 'Header' ],
		attributes: {
			title: { type: 'string', default: 'Service name' },
		},
		description: 'Government of B.C. header with logo and title.',
		preview: `<Header title={ title } />`,
		controls: `<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />`,
	},
	{
		slug: 'heading',
		title: 'Heading',
		icon: 'heading',
		imports: [ 'Heading' ],
		attributes: {
			text: { type: 'string', default: 'Heading text' },
			level: { type: 'number', default: 2 },
			color: { type: 'string', default: 'primary' },
		},
		description: 'Styled heading text.',
		preview: `<Heading level={ level } color={ color }>{ text }</Heading>`,
		controls: `<TextControl label={ __( 'Text', 'blocks-preview' ) } value={ text } onChange={ ( value ) => setAttributes( { text: value } ) } />
				<SelectControl label={ __( 'Level', 'blocks-preview' ) } value={ String( level ) } options={ [
					{ label: 'H1', value: '1' },
					{ label: 'H2', value: '2' },
					{ label: 'H3', value: '3' },
					{ label: 'H4', value: '4' },
				] } onChange={ ( value ) => setAttributes( { level: Number( value ) } ) } />
				<SelectControl label={ __( 'Color', 'blocks-preview' ) } value={ color } options={ [
					{ label: __( 'Primary', 'blocks-preview' ), value: 'primary' },
					{ label: __( 'Secondary', 'blocks-preview' ), value: 'secondary' },
					{ label: __( 'Danger', 'blocks-preview' ), value: 'danger' },
				] } onChange={ ( value ) => setAttributes( { color: value } ) } />`,
	},
	{
		slug: 'inline-alert',
		title: 'Inline Alert',
		icon: 'info',
		imports: [ 'InlineAlert' ],
		attributes: {
			variant: { type: 'string', default: 'info' },
			title: { type: 'string', default: 'Inline alert' },
			description: {
				type: 'string',
				default: 'Additional inline alert details.',
			},
		},
		description: 'Compact alert for contextual messages.',
		preview: `<InlineAlert variant={ variant } title={ title } description={ description } />`,
		controls: `<SelectControl label={ __( 'Variant', 'blocks-preview' ) } value={ variant } options={ [
					{ label: __( 'Info', 'blocks-preview' ), value: 'info' },
					{ label: __( 'Success', 'blocks-preview' ), value: 'success' },
					{ label: __( 'Warning', 'blocks-preview' ), value: 'warning' },
					{ label: __( 'Danger', 'blocks-preview' ), value: 'danger' },
				] } onChange={ ( value ) => setAttributes( { variant: value } ) } />
				<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
				<TextControl label={ __( 'Description', 'blocks-preview' ) } value={ description } onChange={ ( value ) => setAttributes( { description: value } ) } />`,
	},
	{
		slug: 'link',
		title: 'Link',
		icon: 'admin-links',
		imports: [ 'Link' ],
		attributes: {
			text: { type: 'string', default: 'Learn more' },
			href: { type: 'string', default: 'https://www2.gov.bc.ca/' },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Styled link for navigation.',
		preview: `<Link href={ href } size={ size }>{ text }</Link>`,
		controls: `<TextControl label={ __( 'Text', 'blocks-preview' ) } value={ text } onChange={ ( value ) => setAttributes( { text: value } ) } />
				<TextControl label={ __( 'URL', 'blocks-preview' ) } value={ href } onChange={ ( value ) => setAttributes( { href: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
					{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'modal',
		title: 'Modal',
		icon: 'fullscreen-alt',
		imports: [ 'Button', 'Dialog', 'Modal' ],
		extraImports: '',
		extraPreviewImports: [ 'DialogTrigger' ],
		attributes: {
			title: { type: 'string', default: 'Modal title' },
			message: { type: 'string', default: 'Modal content goes here.' },
		},
		description: 'Overlay modal with dialog content.',
		preview: `<DialogTrigger>
				<Button variant="primary">Open modal</Button>
				<Modal>
					<Dialog isCloseable>
						<Heading slot="title">{ title }</Heading>
						<p>{ message }</p>
					</Dialog>
				</Modal>
			</DialogTrigger>`,
		controls: `<TextControl label={ __( 'Title', 'blocks-preview' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
				<TextControl label={ __( 'Message', 'blocks-preview' ) } value={ message } onChange={ ( value ) => setAttributes( { message: value } ) } />`,
		extraPreviewImports: [ 'Heading' ],
	},
	{
		slug: 'number-field',
		title: 'Number Field',
		icon: 'editor-code',
		imports: [ 'NumberField' ],
		attributes: {
			label: { type: 'string', default: 'Quantity' },
			defaultValue: { type: 'number', default: 1 },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Numeric input with increment controls.',
		preview: `<NumberField label={ label } defaultValue={ defaultValue } size={ size } />`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<TextControl label={ __( 'Default value', 'blocks-preview' ) } type="number" value={ String( defaultValue ) } onChange={ ( value ) => setAttributes( { defaultValue: Number( value ) || 0 } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'progress-bar',
		title: 'Progress Bar',
		icon: 'chart-bar',
		imports: [ 'ProgressBar' ],
		attributes: {
			value: { type: 'number', default: 45 },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Horizontal progress indicator.',
		preview: `<ProgressBar value={ value } size={ size } aria-label="Progress preview" />`,
		controls: `<TextControl label={ __( 'Value', 'blocks-preview' ) } type="number" value={ String( value ) } onChange={ ( val ) => setAttributes( { value: Number( val ) || 0 } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
					{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
				] } onChange={ ( val ) => setAttributes( { size: val } ) } />`,
	},
	{
		slug: 'progress-circle',
		title: 'Progress Circle',
		icon: 'image-rotate',
		imports: [ 'ProgressCircle' ],
		attributes: {
			value: { type: 'number', default: 45 },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Circular progress indicator.',
		preview: `<ProgressCircle value={ value } size={ size } aria-label="Progress preview" />`,
		controls: `<TextControl label={ __( 'Value', 'blocks-preview' ) } type="number" value={ String( value ) } onChange={ ( val ) => setAttributes( { value: Number( val ) || 0 } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
					{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
				] } onChange={ ( val ) => setAttributes( { size: val } ) } />`,
	},
	{
		slug: 'radio',
		title: 'Radio',
		icon: 'marker',
		imports: [ 'Radio', 'RadioGroup' ],
		attributes: {
			label: { type: 'string', default: 'Option one' },
		},
		description: 'Single radio option (shown inside a group).',
		preview: `<RadioGroup label="Radio preview" defaultValue="preview">
				<Radio value="preview">{ label }</Radio>
			</RadioGroup>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />`,
	},
	{
		slug: 'radio-group',
		title: 'Radio Group',
		icon: 'marker',
		imports: [ 'Radio', 'RadioGroup' ],
		attributes: {
			label: { type: 'string', default: 'Choose one' },
			orientation: { type: 'string', default: 'vertical' },
		},
		description: 'Group of mutually exclusive radio options.',
		preview: `<RadioGroup label={ label } orientation={ orientation }>
				<Radio value="one">Option one</Radio>
				<Radio value="two">Option two</Radio>
			</RadioGroup>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<SelectControl label={ __( 'Orientation', 'blocks-preview' ) } value={ orientation } options={ [
					{ label: __( 'Vertical', 'blocks-preview' ), value: 'vertical' },
					{ label: __( 'Horizontal', 'blocks-preview' ), value: 'horizontal' },
				] } onChange={ ( value ) => setAttributes( { orientation: value } ) } />`,
	},
	{
		slug: 'select',
		title: 'Select',
		icon: 'arrow-down-alt2',
		imports: [ 'Select' ],
		attributes: {
			label: { type: 'string', default: 'Choose an option' },
			placeholder: { type: 'string', default: 'Select…' },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Dropdown select with a list of options.',
		constants: `const SELECT_ITEMS = [
	{ id: 'one', label: 'Option one' },
	{ id: 'two', label: 'Option two' },
	{ id: 'three', label: 'Option three' },
];`,
		preview: `<Select label={ label } placeholder={ placeholder } size={ size } items={ SELECT_ITEMS } />`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<TextControl label={ __( 'Placeholder', 'blocks-preview' ) } value={ placeholder } onChange={ ( value ) => setAttributes( { placeholder: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'separator',
		title: 'Separator',
		icon: 'minus',
		imports: [ 'Separator' ],
		attributes: {
			size: { type: 'string', default: 'medium' },
		},
		description: 'Visual divider between content sections.',
		preview: `<Separator size={ size } />`,
		controls: `<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
					{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'switch',
		title: 'Switch',
		icon: 'controls-volumeon',
		imports: [ 'Switch' ],
		attributes: {
			label: { type: 'string', default: 'Enable feature' },
			isSelected: { type: 'boolean', default: false },
			labelPosition: { type: 'string', default: 'right' },
		},
		description: 'Toggle switch for boolean settings.',
		preview: `<Switch isSelected={ isSelected } onChange={ ( value ) => setAttributes( { isSelected: value } ) } labelPosition={ labelPosition }>{ label }</Switch>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<ToggleControl label={ __( 'Selected', 'blocks-preview' ) } checked={ isSelected } onChange={ ( value ) => setAttributes( { isSelected: value } ) } />
				<SelectControl label={ __( 'Label position', 'blocks-preview' ) } value={ labelPosition } options={ [
					{ label: __( 'Left', 'blocks-preview' ), value: 'left' },
					{ label: __( 'Right', 'blocks-preview' ), value: 'right' },
				] } onChange={ ( value ) => setAttributes( { labelPosition: value } ) } />`,
	},
	{
		slug: 'tag',
		title: 'Tag',
		icon: 'tag',
		imports: [ 'Tag' ],
		attributes: {
			textValue: { type: 'string', default: 'Tag label' },
			color: { type: 'string', default: 'bc-blue' },
			tagStyle: { type: 'string', default: 'rectangular' },
		},
		description: 'Compact label for categories or status.',
		preview: `<Tag textValue={ textValue } color={ color } tagStyle={ tagStyle } />`,
		controls: `<TextControl label={ __( 'Text', 'blocks-preview' ) } value={ textValue } onChange={ ( value ) => setAttributes( { textValue: value } ) } />
				<SelectControl label={ __( 'Color', 'blocks-preview' ) } value={ color } options={ [
					{ label: 'bc-blue', value: 'bc-blue' },
					{ label: 'bc-gold', value: 'bc-gold' },
					{ label: 'blue', value: 'blue' },
					{ label: 'gray', value: 'gray' },
					{ label: 'green', value: 'green' },
					{ label: 'red', value: 'red' },
					{ label: 'yellow', value: 'yellow' },
				] } onChange={ ( value ) => setAttributes( { color: value } ) } />
				<SelectControl label={ __( 'Style', 'blocks-preview' ) } value={ tagStyle } options={ [
					{ label: __( 'Rectangular', 'blocks-preview' ), value: 'rectangular' },
					{ label: __( 'Circular', 'blocks-preview' ), value: 'circular' },
				] } onChange={ ( value ) => setAttributes( { tagStyle: value } ) } />`,
	},
	{
		slug: 'tag-group',
		title: 'Tag Group',
		icon: 'tag',
		imports: [ 'Tag', 'TagGroup', 'TagList' ],
		attributes: {
			label: { type: 'string', default: 'Tags' },
		},
		description: 'Accessible group wrapper for a list of tags.',
		constants: `const TAG_ITEMS = [
	{ id: 'one', textValue: 'Alpha' },
	{ id: 'two', textValue: 'Beta' },
	{ id: 'three', textValue: 'Gamma' },
];`,
		preview: `<TagGroup label={ label }>
				<TagList items={ TAG_ITEMS }>
					{ ( item ) => <Tag textValue={ item.textValue } /> }
				</TagList>
			</TagGroup>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />`,
	},
	{
		slug: 'tag-list',
		title: 'Tag List',
		icon: 'tag',
		imports: [ 'Tag', 'TagList' ],
		attributes: {
			orientation: { type: 'string', default: 'horizontal' },
		},
		description: 'List layout for rendering multiple tags.',
		constants: `const TAG_ITEMS = [
	{ id: 'one', textValue: 'One' },
	{ id: 'two', textValue: 'Two' },
	{ id: 'three', textValue: 'Three' },
];`,
		preview: `<TagList items={ TAG_ITEMS } orientation={ orientation }>
				{ ( item ) => <Tag textValue={ item.textValue } /> }
			</TagList>`,
		controls: `<SelectControl label={ __( 'Orientation', 'blocks-preview' ) } value={ orientation } options={ [
					{ label: __( 'Horizontal', 'blocks-preview' ), value: 'horizontal' },
					{ label: __( 'Vertical', 'blocks-preview' ), value: 'vertical' },
				] } onChange={ ( value ) => setAttributes( { orientation: value } ) } />`,
	},
	{
		slug: 'text',
		title: 'Text',
		icon: 'editor-textcolor',
		imports: [ 'Text' ],
		attributes: {
			content: { type: 'string', default: 'Body text preview' },
			size: { type: 'string', default: 'medium' },
			color: { type: 'string', default: 'primary' },
		},
		description: 'Styled body text.',
		preview: `<Text size={ size } color={ color }>{ content }</Text>`,
		controls: `<TextControl label={ __( 'Content', 'blocks-preview' ) } value={ content } onChange={ ( value ) => setAttributes( { content: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
					{ label: __( 'Large', 'blocks-preview' ), value: 'large' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />
				<SelectControl label={ __( 'Color', 'blocks-preview' ) } value={ color } options={ [
					{ label: __( 'Primary', 'blocks-preview' ), value: 'primary' },
					{ label: __( 'Secondary', 'blocks-preview' ), value: 'secondary' },
					{ label: __( 'Danger', 'blocks-preview' ), value: 'danger' },
				] } onChange={ ( value ) => setAttributes( { color: value } ) } />`,
	},
	{
		slug: 'text-area',
		title: 'Text Area',
		icon: 'editor-alignleft',
		imports: [ 'TextArea' ],
		attributes: {
			label: { type: 'string', default: 'Comments' },
			defaultValue: { type: 'string', default: '' },
		},
		description: 'Multi-line text input.',
		preview: `<TextArea label={ label } defaultValue={ defaultValue } />`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<TextControl label={ __( 'Default value', 'blocks-preview' ) } value={ defaultValue } onChange={ ( value ) => setAttributes( { defaultValue: value } ) } />`,
	},
	{
		slug: 'text-field',
		title: 'Text Field',
		icon: 'editor-textcolor',
		imports: [ 'TextField' ],
		attributes: {
			label: { type: 'string', default: 'Name' },
			defaultValue: { type: 'string', default: '' },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Single-line text input.',
		preview: `<TextField label={ label } defaultValue={ defaultValue } size={ size } />`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<TextControl label={ __( 'Default value', 'blocks-preview' ) } value={ defaultValue } onChange={ ( value ) => setAttributes( { defaultValue: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'time-field',
		title: 'Time Field',
		icon: 'clock',
		imports: [ 'TimeField' ],
		attributes: {
			label: { type: 'string', default: 'Time' },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Time input field.',
		preview: `<TimeField label={ label } size={ size } />`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'toggle-button',
		title: 'Toggle Button',
		icon: 'button',
		imports: [ 'ToggleButton' ],
		attributes: {
			label: { type: 'string', default: 'Bold' },
			isSelected: { type: 'boolean', default: false },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Button that toggles on and off.',
		preview: `<ToggleButton isSelected={ isSelected } onChange={ ( value ) => setAttributes( { isSelected: value } ) } size={ size }>{ label }</ToggleButton>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<ToggleControl label={ __( 'Selected', 'blocks-preview' ) } checked={ isSelected } onChange={ ( value ) => setAttributes( { isSelected: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'toggle-button-group',
		title: 'Toggle Button Group',
		icon: 'button',
		imports: [ 'ToggleButton', 'ToggleButtonGroup' ],
		attributes: {
			label: { type: 'string', default: 'Text style' },
			size: { type: 'string', default: 'medium' },
		},
		description: 'Group of toggle buttons with single or multiple selection.',
		preview: `<ToggleButtonGroup label={ label } size={ size } selectionMode="single">
				<ToggleButton id="bold">Bold</ToggleButton>
				<ToggleButton id="italic">Italic</ToggleButton>
			</ToggleButtonGroup>`,
		controls: `<TextControl label={ __( 'Label', 'blocks-preview' ) } value={ label } onChange={ ( value ) => setAttributes( { label: value } ) } />
				<SelectControl label={ __( 'Size', 'blocks-preview' ) } value={ size } options={ [
					{ label: __( 'Small', 'blocks-preview' ), value: 'small' },
					{ label: __( 'Medium', 'blocks-preview' ), value: 'medium' },
				] } onChange={ ( value ) => setAttributes( { size: value } ) } />`,
	},
	{
		slug: 'tooltip',
		title: 'Tooltip',
		icon: 'info',
		imports: [ 'Button', 'Tooltip' ],
		extraImports: '',
		extraPreviewImports: [ 'TooltipTrigger' ],
		attributes: {
			tooltipText: { type: 'string', default: 'Tooltip text' },
			buttonText: { type: 'string', default: 'Hover me' },
		},
		description: 'Contextual label shown on hover or focus.',
		preview: `<TooltipTrigger>
				<Button variant="secondary">{ buttonText }</Button>
				<Tooltip>{ tooltipText }</Tooltip>
			</TooltipTrigger>`,
		controls: `<TextControl label={ __( 'Button text', 'blocks-preview' ) } value={ buttonText } onChange={ ( value ) => setAttributes( { buttonText: value } ) } />
				<TextControl label={ __( 'Tooltip text', 'blocks-preview' ) } value={ tooltipText } onChange={ ( value ) => setAttributes( { tooltipText: value } ) } />`,
	},
];

function toPascalFromSlug( slug ) {
	return slug
		.split( '-' )
		.map( ( part ) => part.charAt( 0 ).toUpperCase() + part.slice( 1 ) )
		.join( '' );
}

function getAttributeNames( attributes ) {
	return Object.keys( attributes );
}

function getDestructuring( attributes ) {
	const names = getAttributeNames( attributes );
	if ( ! names.length ) {
		return '';
	}
	return `const { ${ names.join( ', ' ) } } = attributes;`;
}

function getWpControlsImports( controls, preview ) {
	const needed = new Set();
	const source = `${ controls } ${ preview }`;
	if ( source.includes( 'TextControl' ) ) {
		needed.add( 'TextControl' );
	}
	if ( source.includes( 'SelectControl' ) ) {
		needed.add( 'SelectControl' );
	}
	if ( source.includes( 'ToggleControl' ) ) {
		needed.add( 'ToggleControl' );
	}
	if ( ! needed.size ) {
		return '';
	}
	return `import { ${ [ ...needed ].join( ', ' ) } } from '@wordpress/components';`;
}

function generateEditJs( component ) {
	const allImports = [
		...component.imports,
		...( component.extraPreviewImports || [] ),
	];
	const bcgovImport = `import { ${ [ ...new Set( allImports ) ].join( ', ' ) } } from '@bcgov/design-system-react-components';`;
	const wpControlsImport = getWpControlsImports(
		component.controls,
		component.preview
	);
	const extraImports = component.extraImports ? `${ component.extraImports }\n` : '';
	const attributeNames = getAttributeNames( component.attributes );
	const destructuring = getDestructuring( component.attributes );
	const editParams = attributeNames.length
		? '{ attributes, setAttributes }'
		: '';
	const constants = component.constants ? `${ component.constants }\n\n` : '';
	const controlsBlock = component.controls
		? `\n\t\t\t\t${ component.controls }`
		: '';

	return `/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
${ wpControlsImport ? wpControlsImport + '\n' : '' }
/**
 * BC Gov design system
 */
${ bcgovImport }
${ extraImports }
/**
 * Internal dependencies
 */
import { ComponentInspector } from '../../shared/component-inspector';
import { getComponentMetadata } from '../../shared/component-metadata';
import blockJson from './block.json';

const metadata = getComponentMetadata( '${ component.slug }', blockJson );

${ constants }${
		attributeNames.length
			? `/**
 * @param {import('@wordpress/blocks').BlockEditProps} props
 */
`
			: ''
	}export default function Edit( ${ editParams } ) {
	${ destructuring ? destructuring + '\n' : '' }

	const blockProps = useBlockProps( {
		className: 'blocks-preview-component-block blocks-preview-bcds-block blocks-preview-bcds-${ component.slug }-block',
	} );

	return (
		<>
			<ComponentInspector
				metadata={ metadata }
				panelTitle={ __( '${ component.title } settings', 'blocks-preview' ) }
				docsLinkLabel={ __( 'View BC Gov ${ component.title } docs', 'blocks-preview' ) }
			>${ controlsBlock }
			</ComponentInspector>
			<div { ...blockProps }>
				${ component.preview }
			</div>
		</>
	);
}
`;
}

function generateBlockJson( component ) {
	return {
		$schema: 'https://schemas.wp.org/trunk/block.json',
		apiVersion: 3,
		name: `blocks-preview-bcds/${ component.slug }`,
		version: '0.1.0',
		title: `BCDS ${ component.title }`,
		category: 'blocks-preview-bcds',
		icon: component.icon,
		example: {},
		attributes: component.attributes,
		supports: { html: false },
		textdomain: 'blocks-preview',
		editorScript: 'file:./index.js',
		editorStyle: 'file:./index.css',
		style: 'file:./style-index.css',
	};
}

function generateSaveJs( component ) {
	const className = `blocks-preview-bcds-${ component.slug }-block__saved`;
	return `/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'blocks-preview-component-block blocks-preview-bcds-block ${ className }',
	} );

	return (
		<div { ...blockProps }>
			<span className="blocks-preview-bcds-block__label">${ component.title } preview (editor only)</span>
		</div>
	);
}
`;
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
import '../../shared/bcds-editor-setup';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
} );
`;
}

function writeFile( filePath, content ) {
	fs.mkdirSync( path.dirname( filePath ), { recursive: true } );
	fs.writeFileSync( filePath, content );
}

if ( ! fs.existsSync( BCDS ) ) {
	fs.mkdirSync( BCDS, { recursive: true } );
}

const config = {};

for ( const component of COMPONENTS ) {
	const blockDir = path.join( BCDS, component.slug );
	writeFile(
		path.join( blockDir, 'block.json' ),
		JSON.stringify( generateBlockJson( component ), null, '\t' ) + '\n'
	);
	writeFile( path.join( blockDir, 'edit.js' ), generateEditJs( component ) );
	writeFile( path.join( blockDir, 'save.js' ), generateSaveJs( component ) );
	writeFile( path.join( blockDir, 'index.js' ), generateIndexJs() );
	writeFile(
		path.join( blockDir, 'editor.scss' ),
		`@import '../../shared/bcds-editor';\n\n/* BC Gov ${ component.title } block editor */\n\n.blocks-preview-bcds-${ component.slug }-block {\n\tpadding: 8px 0;\n}\n`
	);
	writeFile(
		path.join( blockDir, 'style.scss' ),
		`/* BC Gov ${ component.title } block frontend placeholder */\n`
	);

	config[ component.slug ] = {
		description: component.description,
		documentation: `${ DOCS_BASE }?path=/docs/${ component.slug }--docs`,
	};

	console.log( `Scaffolded bcds/${ component.slug }` );
}

writeFile(
	path.join( BCDS, 'components-config.json' ),
	JSON.stringify( config, null, '\t' ) + '\n'
);

console.log( `Scaffolded ${ COMPONENTS.length } BC Gov blocks.` );
