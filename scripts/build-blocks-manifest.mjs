/**
 * Regenerates build/blocks-manifest.php using full relative paths as keys.
 *
 * wp-scripts' default manifest uses only the parent folder basename, which
 * collides when both src/guten/button and src/bcds/button exist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire( import.meta.url );
const glob = require( 'fast-glob' );
const json2php = require( 'json2php' );

const ROOT = path.resolve( import.meta.dirname, '..' );
const INPUT_DIR = path.join( ROOT, 'build' );
const OUTPUT_FILE = path.join( INPUT_DIR, 'blocks-manifest.php' );

const blockJsonFiles = glob.sync( '**/block.json', {
	cwd: INPUT_DIR,
	absolute: true,
} );

const blocks = {};

for ( const file of blockJsonFiles ) {
	const blockJson = JSON.parse( fs.readFileSync( file, 'utf8' ) );
	const relativeDir = path
		.relative( INPUT_DIR, path.dirname( file ) )
		.replace( /\\/g, '/' );

	blocks[ relativeDir ] = blockJson;
}

const printer = json2php.make( { linebreak: '\n', indent: '\t' } );
const phpContent = `<?php
// This file is generated. Do not modify it manually.
return ${ printer( blocks ) };
`;

fs.writeFileSync( OUTPUT_FILE, phpContent );

console.log(
	`Block metadata PHP file regenerated with ${ Object.keys( blocks ).length } entries at: ${ OUTPUT_FILE }`
);
