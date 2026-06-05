/**
 * Loads BC Sans and syncs BCDS component styles into the iframed editor canvas.
 */
import '@bcgov/bc-sans/css/BC_Sans.css';

const STYLE_MARKER = 'data-blocks-preview-bcds-synced';
const IFRAME_SELECTORS = [
	'iframe[name="editor-canvas"]',
	'iframe.editor-canvas__iframe',
];

/**
 * @return {Document|null} The editor canvas document when the iframe is ready.
 */
function getEditorCanvasDocument() {
	for ( const selector of IFRAME_SELECTORS ) {
		const iframe = document.querySelector( selector );

		if ( iframe?.contentDocument ) {
			return iframe.contentDocument;
		}
	}

	return null;
}

/**
 * @param {string} css Stylesheet text.
 * @return {string} Stable identifier for deduplicating copied styles.
 */
function hashStyleContent( css ) {
	return String( css.length ) + ':' + css.slice( 0, 48 );
}

/**
 * @param {string} css Stylesheet text.
 * @return {boolean} Whether the stylesheet belongs to the BC Gov design system.
 */
function isBcdsInjectedStyle( css ) {
	return (
		css.includes( '--surface-color' ) ||
		css.includes( '--typography-' ) ||
		css.includes( '[data-rac]' ) ||
		css.includes( 'bcds-react-aria' ) ||
		css.includes( 'react-aria' ) ||
		css.includes( 'BC Sans' )
	);
}

/**
 * Copies BCDS <style> tags from the parent document into the editor iframe.
 *
 * @return {boolean} True when the iframe was found and styles were processed.
 */
function syncBcdsStylesToEditorIframe() {
	const iframeDocument = getEditorCanvasDocument();

	if ( ! iframeDocument?.head ) {
		return false;
	}

	for ( const style of document.head.querySelectorAll( 'style' ) ) {
		const css = style.textContent || '';

		if ( ! isBcdsInjectedStyle( css ) ) {
			continue;
		}

		const styleId = `blocks-preview-bcds-style-${ hashStyleContent(
			css
		) }`;

		if ( iframeDocument.getElementById( styleId ) ) {
			continue;
		}

		const clone = iframeDocument.createElement( 'style' );
		clone.id = styleId;
		clone.setAttribute( STYLE_MARKER, '' );
		clone.textContent = css;
		iframeDocument.head.appendChild( clone );
	}

	return true;
}

/**
 * Retries until the editor iframe is available.
 */
function watchForEditorIframe() {
	if ( syncBcdsStylesToEditorIframe() ) {
		return;
	}

	window.requestAnimationFrame( watchForEditorIframe );
}

function initBcdsEditorStyles() {
	watchForEditorIframe();

	if ( typeof window.MutationObserver !== 'undefined' ) {
		const observer = new window.MutationObserver(
			syncBcdsStylesToEditorIframe
		);
		observer.observe( document.head, { childList: true } );
	}
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initBcdsEditorStyles );
} else {
	initBcdsEditorStyles();
}
