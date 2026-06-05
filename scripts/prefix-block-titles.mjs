/**
 * Prefixes block.json title fields for list view / inserter display names.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve( import.meta.dirname, '..' );

const LIBRARIES = [
	{ dir: 'bcds', prefix: 'BCDS ' },
	{ dir: 'guten', prefix: 'Guten ' },
];

let updated = 0;

for ( const { dir, prefix } of LIBRARIES ) {
	const libraryDir = path.join( ROOT, 'src', dir );

	for ( const entry of fs.readdirSync( libraryDir, { withFileTypes: true } ) ) {
		if ( ! entry.isDirectory() ) {
			continue;
		}

		const blockJsonPath = path.join( libraryDir, entry.name, 'block.json' );

		if ( ! fs.existsSync( blockJsonPath ) ) {
			continue;
		}

		const json = JSON.parse( fs.readFileSync( blockJsonPath, 'utf8' ) );

		if ( ! json.title || json.title.startsWith( prefix ) ) {
			continue;
		}

		json.title = `${ prefix }${ json.title }`;
		fs.writeFileSync( blockJsonPath, JSON.stringify( json, null, '\t' ) + '\n' );
		updated++;
	}
}

console.log( `Updated ${ updated } block titles.` );
