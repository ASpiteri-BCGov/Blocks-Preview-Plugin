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

Component **description**, **documentation** URL, and **experimental** flag live in one file: [`src/components-config.json`](src/components-config.json). Blocks merge that config in the editor (JS) and at registration (PHP) so the inserter and sidebar stay in sync.

Each block sidebar also shows an experimental notice when `experimental` is `true` in that config.

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
