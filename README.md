# Blocks Preview

WordPress blocks that preview [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/components/) in the block editor.

## Blocks

| Block | Component |
| --- | --- |
| Base Field | [BaseField](https://developer.wordpress.org/block-editor/reference-guides/components/base-field/) |
| Alignment Matrix Control | [AlignmentMatrixControl](https://developer.wordpress.org/block-editor/reference-guides/components/alignment-matrix-control/) |
| Angle Picker Control | [AnglePickerControl](https://developer.wordpress.org/block-editor/reference-guides/components/angle-picker-control/) |
| Animate | [Animate](https://developer.wordpress.org/block-editor/reference-guides/components/animate/) |
| Autocomplete | [Autocomplete](https://developer.wordpress.org/block-editor/reference-guides/components/autocomplete/) |
| Base Control | [BaseControl](https://developer.wordpress.org/block-editor/reference-guides/components/base-control/) |
| Border Box Control | [BorderBoxControl](https://developer.wordpress.org/block-editor/reference-guides/components/border-box-control/) |
| Border Control | [BorderControl](https://developer.wordpress.org/block-editor/reference-guides/components/border-control/) |
| Box Control | [BoxControl](https://developer.wordpress.org/block-editor/reference-guides/components/box-control/) |
| Button | [Button](https://developer.wordpress.org/block-editor/reference-guides/components/button/) |
| Button Group | [ButtonGroup](https://developer.wordpress.org/block-editor/reference-guides/components/button-group/) (deprecated) |
| Card | [Card](https://developer.wordpress.org/block-editor/reference-guides/components/card/) |
| Checkbox Control | [CheckboxControl](https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/) |
| Clipboard Button | [ClipboardButton](https://developer.wordpress.org/block-editor/reference-guides/components/clipboard-button/) (deprecated) |
| Color Indicator | [ColorIndicator](https://developer.wordpress.org/block-editor/reference-guides/components/color-indicator/) |
| Color Palette | [ColorPalette](https://developer.wordpress.org/block-editor/reference-guides/components/color-palette/) |
| Color Picker | [ColorPicker](https://developer.wordpress.org/block-editor/reference-guides/components/color-picker/) |
| Combobox Control | [ComboboxControl](https://developer.wordpress.org/block-editor/reference-guides/components/combobox-control/) |
| Custom Gradient Picker | [CustomGradientPicker](https://developer.wordpress.org/block-editor/reference-guides/components/custom-gradient-picker/) |
| Custom Select Control | [CustomSelectControl](https://developer.wordpress.org/block-editor/reference-guides/components/custom-select-control/) |
| Dashicon | [Dashicon](https://developer.wordpress.org/block-editor/reference-guides/components/dashicon/) |
| Date Time Picker | [DateTimePicker](https://developer.wordpress.org/block-editor/reference-guides/components/date-time-picker/) |
| Disabled | [Disabled](https://developer.wordpress.org/block-editor/reference-guides/components/disabled/) |
| Draggable | [Draggable](https://developer.wordpress.org/block-editor/reference-guides/components/draggable/) |
| Drop Zone | [DropZone](https://developer.wordpress.org/block-editor/reference-guides/components/drop-zone/) |
| Dropdown | [Dropdown](https://developer.wordpress.org/block-editor/reference-guides/components/dropdown/) |
| Dropdown Menu | [DropdownMenu](https://developer.wordpress.org/block-editor/reference-guides/components/dropdown-menu/) |
| Duotone Picker | [DuotonePicker](https://developer.wordpress.org/block-editor/reference-guides/components/duotone-picker/) |
| Elevation | [Elevation](https://developer.wordpress.org/block-editor/reference-guides/components/elevation/) |
| External Link | [ExternalLink](https://developer.wordpress.org/block-editor/reference-guides/components/external-link/) |
| Flex | [Flex](https://developer.wordpress.org/block-editor/reference-guides/components/flex/) |
| Focal Point Picker | [FocalPointPicker](https://developer.wordpress.org/block-editor/reference-guides/components/focal-point-picker/) |
| Font Size Picker | [FontSizePicker](https://developer.wordpress.org/block-editor/reference-guides/components/font-size-picker/) |
| Form Toggle | [FormToggle](https://developer.wordpress.org/block-editor/reference-guides/components/form-toggle/) |
| Form Token Field | [FormTokenField](https://developer.wordpress.org/block-editor/reference-guides/components/form-token-field/) |
| Gradient Picker | [GradientPicker](https://developer.wordpress.org/block-editor/reference-guides/components/gradient-picker/) |

Component **description**, **documentation** URL, **experimental**, and **deprecated** flags live in one file: [`src/components-config.json`](src/components-config.json). Blocks merge that config in the editor (JS) and at registration (PHP) so the inserter and sidebar stay in sync.

Each block sidebar shows a warning notice when `experimental` or `deprecated` is `true`. Deprecated blocks may also set `deprecatedReplacement` (for example, Button Group → `ToggleGroupControl`).

## Setup

```bash
npm install
npm run build
```

Activate **Blocks Preview** under **Plugins**, then insert blocks from the **Blocks Preview** category in the block inserter.

**Important:** Compiled assets live in `build/` and are not committed to git. You must run `npm run build` before blocks appear in the editor.

## Development

```bash
npm run start
```

Production build:

```bash
npm run build
```

## Linting

Same tooling pattern as [wordpress-search](https://github.com/bcgov/wordpress-search):

```bash
# JavaScript (@bcgov/wordpress-eslint via .eslintrc.js)
npm run lint:js
npm run fix:js

# SCSS (WordPress + BC Gov stylelint rules in .stylelintrc)
npm run lint:css
npm run fix:css

# All front-end linters
npm run lint

# PHP (WordPress Coding Standards via phpcs.xml.dist — plugin PHP only, not node_modules)
composer install
composer lint-php
composer fix-php
```

CI runs `.github/workflows/linting.yml` (JS, CSS, PHP) and `phpcs-validate.yml` on pull requests.
