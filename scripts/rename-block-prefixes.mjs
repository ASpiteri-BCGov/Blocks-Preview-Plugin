/**
 * Renames bcgov → bcds and gutenberg → guten across block names, folders, and config.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve( import.meta.dirname, '..' );
const SRC = path.join( ROOT, 'src' );

const REPLACEMENTS = [
	[ 'blocks-preview-guten/', 'blocks-preview-guten/' ],
	[ 'blocks-preview-bcds/', 'blocks-preview-bcds/' ],
	[ 'blocks-preview-guten', 'blocks-preview-guten' ],
	[ 'blocks-preview-bcds', 'blocks-preview-bcds' ],
	[ '../guten/', '../guten/' ],
	[ '../bcds/', '../bcds/' ],
	[ 'src/guten/', 'src/guten/' ],
	[ 'src/bcds/', 'src/bcds/' ],
	[ 'build/guten/', 'build/guten/' ],
	[ 'build/bcds/', 'build/bcds/' ],
	[ 'gutenConfig', 'gutenConfig' ],
	[ 'bcdsConfig', 'bcdsConfig' ],
];

function walkFiles( dir, callback ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		if ( entry.name === 'node_modules' || entry.name === 'build' ) {
			continue;
		}

		const fullPath = path.join( dir, entry.name );

		if ( entry.isDirectory() ) {
			walkFiles( fullPath, callback );
		} else {
			callback( fullPath );
		}
	}
}

function applyReplacements( content ) {
	let next = content;

	for ( const [ from, to ] of REPLACEMENTS ) {
		next = next.replaceAll( from, to );
	}

	return next;
}

function renameDir( from, to ) {
	if ( fs.existsSync( to ) ) {
		console.warn( `Skip rename ${ from } → ${ to }: target exists` );
		return;
	}

	if ( fs.existsSync( from ) ) {
		fs.renameSync( from, to );
		console.log( `Renamed ${ path.relative( ROOT, from ) } → ${ path.relative( ROOT, to ) }` );
	}
}

renameDir( path.join( SRC, 'bcgov' ), path.join( SRC, 'bcds' ) );
renameDir( path.join( SRC, 'gutenberg' ), path.join( SRC, 'guten' ) );

const filesToUpdate = [
	ROOT,
	path.join( ROOT, 'scripts' ),
	path.join( ROOT, 'blocks-preview-plugin.php' ),
	path.join( ROOT, 'webpack.config.js' ),
	path.join( ROOT, 'package.json' ),
];

for ( const target of filesToUpdate ) {
	if ( ! fs.existsSync( target ) ) {
		continue;
	}

	if ( fs.statSync( target ).isDirectory() ) {
		walkFiles( target, ( filePath ) => {
			if ( ! /\.(js|jsx|mjs|json|php|scss|css|md)$/.test( filePath ) ) {
				return;
			}

			const content = fs.readFileSync( filePath, 'utf8' );
			const updated = applyReplacements( content );

			if ( updated !== content ) {
				fs.writeFileSync( filePath, updated );
				console.log( `Updated ${ path.relative( ROOT, filePath ) }` );
			}
		} );
	} else {
		const content = fs.readFileSync( target, 'utf8' );
		const updated = applyReplacements( content );

		if ( updated !== content ) {
			fs.writeFileSync( target, updated );
			console.log( `Updated ${ path.relative( ROOT, target ) }` );
		}
	}
}

// Fix PHP/config folder keys that use library directory names.
const phpPath = path.join( ROOT, 'blocks-preview-plugin.php' );
let php = fs.readFileSync( phpPath, 'utf8' );
php = php
	.replaceAll(
		"blocks_preview_get_library_config( 'gutenberg' )",
		"blocks_preview_get_library_config( 'guten' )"
	)
	.replaceAll(
		"blocks_preview_get_library_config( 'bcgov' )",
		"blocks_preview_get_library_config( 'bcds' )"
	)
	.replaceAll( "array( 'gutenberg', 'bcgov' )", "array( 'guten', 'bcds' )" )
	.replaceAll(
		"__( 'Blocks Preview — Gutenberg', 'blocks-preview' )",
		"__( 'Blocks Preview — Guten', 'blocks-preview' )"
	)
	.replaceAll(
		"__( 'Blocks Preview — BC Gov', 'blocks-preview' )",
		"__( 'Blocks Preview — BCDS', 'blocks-preview' )"
	);
fs.writeFileSync( phpPath, php );

console.log( 'Rename complete.' );
