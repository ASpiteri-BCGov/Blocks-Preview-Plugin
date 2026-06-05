/**
 * Moves flat src/<slug>/ blocks into src/guten/<slug>/ and updates paths.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve( import.meta.dirname, '..' );
const SRC = path.join( ROOT, 'src' );
const GUTENBERG = path.join( SRC, 'gutenberg' );

const KEEP_IN_SRC = new Set( [ 'shared', 'gutenberg', 'bcgov' ] );

function walkFiles( dir, callback ) {
	for ( const entry of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		const fullPath = path.join( dir, entry.name );
		if ( entry.isDirectory() ) {
			walkFiles( fullPath, callback );
		} else {
			callback( fullPath );
		}
	}
}

function updateFileContent( filePath ) {
	const ext = path.extname( filePath );
	if ( ! [ '.js', '.jsx', '.scss', '.css', '.json' ].includes( ext ) ) {
		return;
	}

	let content = fs.readFileSync( filePath, 'utf8' );
	let changed = false;

	if ( content.includes( '../shared/' ) ) {
		content = content.replaceAll( '../shared/', '../../shared/' );
		changed = true;
	}

	if ( content.includes( "@import '../shared/" ) ) {
		content = content.replaceAll(
			"@import '../shared/",
			"@import '../../shared/"
		);
		changed = true;
	}

	if ( filePath.endsWith( 'block.json' ) ) {
		const json = JSON.parse( content );
		if (
			json.name &&
			json.name.startsWith( 'blocks-preview/' ) &&
			! json.name.startsWith( 'blocks-preview-guten/' )
		) {
			const slug = json.name.replace( 'blocks-preview/', '' );
			json.name = `blocks-preview-guten/${ slug }`;
			json.category = 'blocks-preview-guten';
			content = JSON.stringify( json, null, '\t' ) + '\n';
			changed = true;
		}
	}

	if ( changed ) {
		fs.writeFileSync( filePath, content );
	}
}

if ( ! fs.existsSync( GUTENBERG ) ) {
	fs.mkdirSync( GUTENBERG, { recursive: true } );
}

const configPath = path.join( SRC, 'components-config.json' );
const gutenConfigPath = path.join( GUTENBERG, 'components-config.json' );
if ( fs.existsSync( configPath ) && ! fs.existsSync( gutenConfigPath ) ) {
	fs.renameSync( configPath, gutenConfigPath );
}

for ( const entry of fs.readdirSync( SRC, { withFileTypes: true } ) ) {
	if ( ! entry.isDirectory() || KEEP_IN_SRC.has( entry.name ) ) {
		continue;
	}

	const from = path.join( SRC, entry.name );
	const to = path.join( GUTENBERG, entry.name );

	if ( fs.existsSync( to ) ) {
		console.warn( `Skipping ${ entry.name }: already in gutenberg/` );
		continue;
	}

	fs.renameSync( from, to );
	console.log( `Moved ${ entry.name } -> gutenberg/${ entry.name }` );
}

walkFiles( GUTENBERG, updateFileContent );

console.log( 'Gutenberg migration complete.' );
