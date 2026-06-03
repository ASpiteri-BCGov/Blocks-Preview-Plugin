# Blocks Preview

WordPress blocks that preview [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/components/) patterns in the block editor.

## Blocks

### Base Field (`blocks-preview/base-field`)

Implements the [BaseField](https://developer.wordpress.org/block-editor/reference-guides/components/base-field/) hook pattern (`useBaseField` + custom field) with the documented props: `disabled`, `hasError`, `isInline`, and `isSubtle`. The hook is bundled in the block because `useBaseField` is not part of the public `@wordpress/components` API.

## Setup

```bash
npm install
npm run build
```

Activate **Blocks Preview** under **Plugins**, then insert the **Base Field** block from the block inserter.

## Development

```bash
npm run start
```

Rebuild for production:

```bash
npm run build
```
