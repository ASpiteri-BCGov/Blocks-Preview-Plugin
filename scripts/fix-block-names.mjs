/**
 * Fixes block names to use a single namespace slash per WordPress rules.
 *
 * blocks-preview/gutenberg/button -> blocks-preview-guten/button
 * blocks-preview/bcgov/accordion  -> blocks-preview-bcds/accordion
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve( import.meta.dirname, '..' );
const SRC = path.join( ROOT, 'src' );

const RENAMES = [
	{
		dir: path.join( SRC, 'gutenberg' ),
		from: 'blocks-preview/gutenberg/',
		to: 'blocks-preview-guten/',
	},
	{
		dir: path.join( SRC, 'bcgov' ),
		from: 'blocks-preview/bcgov/',
		to: 'blocks-preview-bcds/',
	},
];

let updated = 0;

for ( const { dir, from, to } of RENAMES ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		if ( ! entry.isDirectory() ) {
			continue;
		}

		const blockJsonPath = path.join( dir, entry.name, 'block.json' );

		if ( ! fs.existsSync( blockJsonPath ) ) {
			continue;
		}

		const json = JSON.parse( fs.readFileSync( blockJsonPath, 'utf8' ) );

		if ( ! json.name?.startsWith( from ) ) {
			continue;
		}

		json.name = json.name.replace( from, to );
		fs.writeFileSync( blockJsonPath, JSON.stringify( json, null, '\t' ) + '\n' );
		updated++;
	}
}

console.log( `Updated ${ updated } block.json name fields.` );
