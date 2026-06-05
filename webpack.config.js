/**
 * Extends @wordpress/scripts webpack config to fix blocks-manifest.php keys
 * for nested gutenberg/ and bcgov/ block directories.
 */
const path = require( 'path' );
const { execSync } = require( 'child_process' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

class FixBlocksManifestPlugin {
	apply( compiler ) {
		const fixManifest = () => {
			execSync( 'node scripts/build-blocks-manifest.mjs', {
				cwd: path.resolve( __dirname ),
				stdio: 'inherit',
			} );
		};

		// wp-scripts regenerates the manifest asynchronously in afterEmit; run
		// after the compilation lifecycle so our full-path keys win.
		compiler.hooks.done.tap( 'FixBlocksManifest', () => {
			setTimeout( fixManifest, 0 );
		} );
	}
}

function addManifestFixPlugin( config ) {
	return {
		...config,
		plugins: [ ...( config.plugins || [] ), new FixBlocksManifestPlugin() ],
	};
}

module.exports = Array.isArray( defaultConfig )
	? defaultConfig.map( addManifestFixPlugin )
	: addManifestFixPlugin( defaultConfig );
